'use strict';

const Service = require('egg').Service;
const {
  ERROR,
  SUCCESS,
} = require('../util/util');
class CollectService extends Service {
  async create(collect) {
    const {
      ctx,
    } = this;
    const id = ctx.state.user.data.id

    const favor = await ctx.model.Collect.find({
      where:{
        user_id: id,
        product_id: collect.product_id
      }
    });

    if(favor){
      return Object.assign(ERROR, {
        msg: "您已经收藏过了",
      });
    }

    try {
      const created = await ctx.model.Collect.create({...collect,user_id: id});
      ctx.status = 201;
      return Object.assign(SUCCESS, {
        data: created,
      });
    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }

  async uncollect(collect){
    const {
      ctx,
    } = this;
    const id = ctx.state.user.data.id

    const favor = await ctx.model.Collect.find({
      where:{
        user_id: id,
        product_id: collect.product_id
      }
    });

    if(!favor){
      return Object.assign(ERROR, {
        msg: "您没有收藏",
      });
    }
    favor.destroy();
    return Object.assign(SUCCESS, {
      msg: "取消收藏成功",
    });
  }

  async list({
    page = 1,
    pageSize = 10,
    order_by = 'created_at',
    order = 'DESC',
  }) {
    const {
      ctx,
    } = this;
    pageSize = pageSize || 10                           //一页多少条
    const currentPage = page || 1                  //设置当前页默认第一页
    const skipNum = (currentPage - 1) * pageSize   //跳过数
    const options = {
      offset: parseInt(skipNum),
      limit: parseInt(pageSize),
      order: [
        [ order_by, order.toUpperCase() ],
      ],
    };
    try {
      const res = await ctx.model.Collect.findAndCountAll(Object.assign(options,{
        include: [{
          model: this.ctx.model.User,
          as: 'user',
          attributes: [ 'id', 'username','avatarUrl' ],
          include: [{
            model: this.ctx.model.Authority,
            attributes: [ 'id', 'name' ],
          }],
        },{
          model: this.ctx.model.Product,
          as: 'product',
        }],
      }));
      return Object.assign(SUCCESS, {
        data: res,
      });
    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }

  async currentUserCollectlist({
    page = 1,
    pageSize = 10,
    order_by = 'created_at',
    order = 'DESC',
  }) {
    
    const {
      ctx,
    } = this;
    const id = ctx.state.user.data.id

    pageSize = pageSize || 10                           //一页多少条
    const currentPage = page || 1                  //设置当前页默认第一页
    const skipNum = (currentPage - 1) * pageSize   //跳过数
    const options = {
      offset: parseInt(skipNum),
      limit: parseInt(pageSize),
      order: [
        [ order_by, order.toUpperCase() ],
      ],
      where:{user_id:id}
    };
    try {
      const res = await ctx.model.Collect.findAndCountAll(Object.assign(options,{
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
      }));
      return Object.assign(SUCCESS, {
        data: res,
      });
    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }

  async del(id) {
    const {
      ctx,
    } = this;
    try {
      const collect = await ctx.model.Collect.findById(id);
      if (!collect) {
        return Object.assign(ERROR, {
          msg: 'collect not found',
        });
      }
      collect.destroy();
      return Object.assign(SUCCESS, {
        data: collect,
      });

    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }

  async find(id) {
    const {
      ctx,
    } = this;
    try {
      const collect = await ctx.model.Collect.findById(id,{
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
      if (!collect) {
        return Object.assign(ERROR, {
          msg: 'collect not found',
        });
      }
      return Object.assign(SUCCESS, {
        data: collect,
      });

    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }

  async update({
    id,
    updates,
  }) {
    const {
      ctx,
    } = this;
    try {
      const collect = await ctx.model.Collect.findById(id);
      if (!collect) {
        return Object.assign(ERROR, {
          msg: 'collect not found',
        });
      }
      const res = await collect.update(updates);
      return Object.assign(SUCCESS, {
        data: res,
      });

    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }
}

module.exports = CollectService;
