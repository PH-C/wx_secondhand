'use strict';

const Service = require('egg').Service;
const {
  ERROR,
  SUCCESS,
  unique,
} = require('../util/util');
class UserOrderService extends Service {
  async create(UserOrder) {
    const {
      ctx,
    } = this;
    const userid = ctx.state.user.data.id

    try {
      if(!UserOrder.product_id) return ERROR
      const product = await this.ctx.model.Product.findById(UserOrder.product_id);
      if(product.user_id===Number(userid)){
        return {...ERROR,msg:"您不能购买自己出售的商品！"}
      }
      if(product.sellState>=1){
        return {...ERROR,msg:"该商品已经出售！"}
      }


      const user  =  await this.ctx.model.User.findById(userid)
      let money = user.money-UserOrder.price
      if(money<0){
        return {...ERROR,msg:"余额不足请充值！"}
      }

      const res = await this.ctx.model.UserOrder.create({...UserOrder, user_id:userid});
      //下单后需要更新产品出售状态
      if(product){
        product.update({
          sellState: 1
        });
      }
      user.update({money: money})
     
      return Object.assign({
        data: res,
      }, SUCCESS);
    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }

  async index({
    page = "",
    pageSize = "",
    state = '',
    order_by = 'created_at',
    order = 'DESC',
    start_date = '',
    end_date = ''
  }) {
   
    const {
      Op,
    } = this.app.Sequelize;

    let options = {
      order: [
        [ order_by, order.toUpperCase() ],
      ],
      where: {}
    };

    if(page && pageSize){
      pageSize = pageSize || 10                           //一页多少条
      const currentPage = page || 1                  //设置当前页默认第一页
      const skipNum = (currentPage - 1) * pageSize   //跳过数
      options.offset = parseInt(skipNum);
      options.limit = parseInt(pageSize);
    }
    
    if (state) {
      options.where = {
        ...options.where,
        orderState:state
      }
    }

    if(start_date && end_date){
      options.where = {
        ...options.where,
        created_at: {
          [Op.lt]: start_date,
          [Op.gt]: end_date
        }
      }
    }

    console.log("options", options)
   
    const res = await this.ctx.model.UserOrder.findAndCountAll(Object.assign(options, {
      include: [{
        model: this.ctx.model.User,
        as: 'user',
        attributes: [ 'id', 'username','avatarUrl','mobile' ],
      },{
        model: this.ctx.model.Product,
        as: 'product',
       
        include: [{
          model: this.ctx.model.User,
          as: 'user',
          attributes: [ 'id', 'username','avatarUrl','mobile' ],
        }],
      }],
    }));

    let allOrderPrice = await this.ctx.model.UserOrder.sum('price', {
      where:{...options.where}
    })

    return Object.assign(SUCCESS, {
      data: {
        ...res,
        allOrderPrice
      },
      
    });
  }

  async findCurrentUserOrder({
    page = 1,
    pageSize = 10,
    state = '',
    order_by = 'created_at',
    order = 'DESC',
    start_date = '',
    end_date = ''
  }){
    const {
      ctx,
    } = this;
    const {
      Op,
    } = this.app.Sequelize;
    const userid = ctx.state.user.data.id

    pageSize = pageSize || 10                           //一页多少条
    const currentPage = page || 1                  //设置当前页默认第一页
    const skipNum = (currentPage - 1) * pageSize   //跳过数

    let options = {
      offset: parseInt(skipNum),
      limit: parseInt(pageSize),
      order: [
        [ order_by, order.toUpperCase() ],
      ],
      where: {
        user_id: userid
      }
    };
    
    if (state) {
      options.where = {
        ...options.where,
        orderState:Number(state)
      }
    }

    if(start_date && end_date){
      options.where = {
        ...options.where,
        created_at: {
          [Op.lt]: start_date,
          [Op.gt]: end_date
        }
      }
    }

    console.log("options", options)
    const res = await this.ctx.model.UserOrder.findAndCountAll(Object.assign(options, {
      include: [{
        model: this.ctx.model.User,
        as: 'user',
        attributes: [ 'id', 'username','avatarUrl','mobile' ],
      },{
        model: this.ctx.model.Product,
        as: 'product',
       
        include: [{
          model: this.ctx.model.User,
          as: 'user',
          attributes: [ 'id', 'username','avatarUrl','mobile' ],
        }],
      }],
    }));

    return Object.assign(SUCCESS, {
      data: res,
      page:currentPage
    });
  }

  async findCurrentUserSellOrder({
    page = 1,
    pageSize = 10,
    state = '',
    order_by = 'created_at',
    order = 'DESC',
    start_date = '',
    end_date = ''
  }){
    const {
      ctx,
    } = this;
    const {
      Op,
    } = this.app.Sequelize;
    const userid = ctx.state.user.data.id//当前登录用户即卖家id
    let sellState = Number(state)===-1?0:state

    pageSize = pageSize || 10                           //一页多少条
    const currentPage = page || 1                  //设置当前页默认第一页
    const skipNum = (currentPage - 1) * pageSize   //跳过数

    let options = {
      offset: parseInt(skipNum),
      limit: parseInt(pageSize),
      order: [
        [ order_by, order.toUpperCase() ],
      ],
      where: {}
    };
    
    if (state) {
      options.where = {
        ...options.where,
        orderState:Number(state)
      }
    }

    if(start_date && end_date){
      options.where = {
        ...options.where,
        created_at: {
          [Op.lt]: start_date,
          [Op.gt]: end_date
        }
      }
    }

    console.log("options", options)
    const res = await this.ctx.model.UserOrder.findAndCountAll(Object.assign(options, {
      include: [{
        model: this.ctx.model.User,
        as: 'user',
        attributes: [ 'id', 'username','avatarUrl','mobile' ],
      },{
        model: this.ctx.model.Product,
        as: 'product',
        // separate: true,
        where:{
          sellState:sellState,
          user_id:userid
        },
        include: [{
          model: this.ctx.model.User,
          as: 'user',
          attributes: [ 'id', 'username','avatarUrl','mobile' ],
        }],
      }],
    }));

    return Object.assign(SUCCESS, {
      data: res,
      page:currentPage
    });
  }

  async del({
    id,
  }) {
   
    const UserOrder = await this.ctx.model.UserOrder.findById(id);
    if (!UserOrder) {
      return Object.assign(ERROR,{
        msg: 'UserOrder not found',
      });
    }
    UserOrder.destroy();
    return SUCCESS;

  }

  async update({
    id,
    updates,
  }) {

    const userid = ctx.state.user.data.id//当前登录用户即卖家id
    
    
    const userOrder = await this.ctx.model.UserOrder.findById(id);

    if (!userOrder) {
      return Object.assign(ERROR, {
        msg: 'UserOrder not found',
      });
    }
    const product = await this.ctx.model.Product.findById(userOrder.product_id);
    const orderState = Number(updates.orderState);
    if(orderState===-1){
      product.update({sellState:0})
      //买家取消订单，增加买家钱包余额
      const user  = await this.ctx.model.User.findById(userid)
      user.update({money:user.money+userOrder.price})
    }else if(orderState===3){
      //买家确认收货增加卖家收益
      const user  = await this.ctx.model.User.findById(product.user_id)
      product.update({sellState:updates.orderState})
      user.update({money:user.money+userOrder.price})
    } else {
      product.update({sellState:updates.orderState})
    }
    userOrder.update(updates);
    return SUCCESS;

  }

  async find(id) {
    const UserOrder = await this.ctx.model.UserOrder.findById(id,{
      include: [{
        model: this.ctx.model.User,
        as: 'user',
        attributes: [ 'id', 'username' ],
        include: [{
          model: this.ctx.model.Authority,
          attributes: [ 'id', 'name' ],
        }],
      },{
        model: this.ctx.model.Product,
        as: 'product',
      }],
    });
  
    if (!UserOrder) {
      return Object.assign(ERROR, {
        msg: 'UserOrder not found',
      });
    }
    return Object.assign(SUCCESS, {
      data: UserOrder,
    });

  }

  async edit(id) {
    const UserOrder = await this.ctx.model.UserOrder.findById(id);
    if (!UserOrder) {
      return Object.assign(ERROR, {
        msg: 'UserOrder not found',
      });
    }
    return Object.assign(SUCCESS, {
      data: UserOrder,
    });

  }

 
}

module.exports = UserOrderService;
