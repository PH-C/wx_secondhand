'use strict';

const Service = require('egg').Service;
const {
  ERROR,
  SUCCESS,
} = require('../util/util');
class AddressService extends Service {
  async create(Address) {
    const {
      ctx,
    } = this;
    const id = ctx.state.user.data.id
    try {
      const created = await ctx.model.Address.create({...Address,user_id: id});
      ctx.status = 201;
      return Object.assign(SUCCESS, {
        data: created,
      });
    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
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
      const res = await ctx.model.Address.findAndCountAll(Object.assign(options,{
        include: [{
          model: this.ctx.model.User,
          as: 'user',
          attributes: [ 'id', 'username' ],
          include: [{
            model: this.ctx.model.Authority,
            attributes: [ 'id', 'name' ],
          }],
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

  async currentUserAddresslist({
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
      const res = await ctx.model.Address.findAndCountAll(Object.assign(options,{
        include: [{
          model: this.ctx.model.User,
          as: 'user',
          attributes: [ 'id', 'username' ],
          include: [{
            model: this.ctx.model.Authority,
            attributes: [ 'id', 'name' ],
          }],
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
      const Address = await ctx.model.Address.findById(id);
      if (!Address) {
        return Object.assign(ERROR, {
          msg: 'Address not found',
        });
      }
      Address.destroy();
      return Object.assign(SUCCESS, {
        data: Address,
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
      const Address = await ctx.model.Address.findById(id,{
        include: [{
          model: this.ctx.model.User,
          as: 'user',
          attributes: [ 'id', 'username' ],
          include: [{
            model: this.ctx.model.Authority,
            attributes: [ 'id', 'name' ],
          }],
        }],
      });
      if (!Address) {
        return Object.assign(ERROR, {
          msg: 'Address not found',
        });
      }
      return Object.assign(SUCCESS, {
        data: Address,
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
      const Address = await ctx.model.Address.findById(id);
      if (!Address) {
        return Object.assign(ERROR, {
          msg: 'Address not found',
        });
      }
      const res = await Address.update(updates);
      return Object.assign(SUCCESS, {
        data: res,
      });

    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }
}

module.exports = AddressService;
