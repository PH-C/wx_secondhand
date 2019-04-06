'use strict';

const Service = require('egg').Service;
const {
  ERROR,
  SUCCESS,
  unique,
} = require('../util/util');
class ProductService extends Service {
  async create(Product) {
    const {
      ctx,
    } = this;
    const userid = ctx.state.user.data.id
    try {
      const res = await this.ctx.model.Product.create({...Product, user_id:userid});
      return Object.assign({
        data: res,
      }, SUCCESS);
    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }

  async index({
    page = 1,
    pageSize = 10,
    type = "",//种类分类
    series = "",//主题系列
    isHot = "",
    isRecommend = "",
    name = "",
    order_by = 'created_at',
    order = 'DESC',
  }) {
   
    const {
      Op,
    } = this.app.Sequelize;

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
        sellState:0
      }
    };
    if(name){
      options.where = {
        ...options.where,
        name: {
          [Op.like]: `%${name}%`,
        },
      }
    }
    if (type) {
      options.where = {
        ...options.where,
        type: type
      }
    }

    if (series) {
      options.where = {
        ...options.where,
        series: series
      }
    }

    if (isHot) {
      options.where = {
        ...options.where,
        isHot:isHot
      }
    }

    if (isRecommend) {
      options.where = {
        ...options.where,
        isRecommend:isRecommend
      }
    }

    console.log("options", options)
   
    const res = await this.ctx.model.Product.findAndCountAll({
      ...options,
      // include:{
      //   model: this.ctx.model.Comment,
      //   as:"comments"
      // }
    });
    return Object.assign(SUCCESS, {
      data: res,
      page:currentPage,
    });
  }

  async banner(){
    const {
      Op,
    } = this.app.Sequelize;
   
    const options = {
      limit: 4,
      order: [
        [ 'created_at', 'DESC' ],
      ],
      where:{
        isRecommend:1
      }
    };

    const res = await this.ctx.model.Product.findAndCountAll(options);
    return Object.assign(SUCCESS, {
      data: res,
    });
  }

  async del({
    id,
  }) {
    
    const Product = await this.ctx.model.Product.findById(id);
    if (!Product) {
      return Object.assign({
        error_msg: 'Product not found',
      }, ERROR);
    }
    Product.destroy();
    return SUCCESS;

  }

  async update({
    id,
    updates,
  }) {
    
    const Product = await this.ctx.model.Product.findById(id);
    if (!Product) {
      return Object.assign(ERROR, {
        msg: 'Product not found',
      });
    }
    Product.update(updates);
    return SUCCESS;

  }

  async findWithToken(id) {
    const {
      ctx,
    } = this;
    console.log("ctx.state.user",ctx.state)
    const user = ctx.state.user

    const Product = await this.ctx.model.Product.findById(id, {
      include:[{
        model: ctx.model.User,
        as:"user",
        attributes: [ 'id', 'username','avatarUrl' ],
      },{
        model: ctx.model.Comment,
        as:"comments",
        include:[{
          model:ctx.model.CommentReply,
          as:"replies",
          include:{
            model: ctx.model.User,
            as:"user",
            attributes: [ 'id', 'username','avatarUrl' ],
          }
        },{
          model: ctx.model.User,
          as:"user",
          attributes: [ 'id', 'username','avatarUrl' ],
        }]
      }]
    });

    console.log("product", Product)
  
    if (!Product) {
      return Object.assign(ERROR, {
        msg: 'Product not found',
      });
    }

    let collect = false;
    if(user){
      const col = await this.ctx.model.Collect.findOne({
        where:{
          user_id: user.data.id,
          product_id: id
        }
      })
  
      if(col){
        collect = true
      } else {
        collect = false
      }
    }
    
    return Object.assign(SUCCESS, {
      data: Product,
      collect
    });

  }

  async find(id) {
    const {
      ctx,
    } = this;

    const Product = await this.ctx.model.Product.findById(id, {
      include:[{
        model: ctx.model.User,
        as:"user",
        attributes: [ 'id', 'username','avatarUrl' ],
      },{
        model: ctx.model.Comment,
        as:"comments",
        include:[{
          model:ctx.model.CommentReply,
          as:"replies",
          include:{
            model: ctx.model.User,
            as:"user",
            attributes: [ 'id', 'username','avatarUrl' ],
          }
        },{
          model: ctx.model.User,
          as:"user",
          attributes: [ 'id', 'username','avatarUrl' ],
        }]
      }]
    });

    console.log("product", Product)
  
    if (!Product) {
      return Object.assign(ERROR, {
        msg: 'Product not found',
      });
    }
    
    return Object.assign(SUCCESS, {
      data: Product,
      collect:false
    });

  }

  async edit(id) {
    const Product = await this.ctx.model.Product.findById(id);
    if (!Product) {
      return Object.assign(ERROR, {
        msg: 'Product not found',
      });
    }
    return Object.assign(SUCCESS, {
      data: Product,
    });

  }

  async findCurrentSell({
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
    const userid = ctx.state.user.data.id
    const {
      Op,
    } = this.app.Sequelize;

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
        sellState:Number(state)
      }
    }

    console.log("options", options)
    const res = await this.ctx.model.Product.findAndCountAll(Object.assign(options, {
      include: [{
        model: this.ctx.model.User,
        as: 'user',
        attributes: [ 'id', 'username','avatarUrl','mobile' ],
      }],
    }));

    // let allOrderPrice = await this.ctx.model.UserOrder.sum('price', {
    //   where:{...options.where}
    // })

    return Object.assign(SUCCESS, {
      data: res,
      page: currentPage
    });
  }

 
}

module.exports = ProductService;
