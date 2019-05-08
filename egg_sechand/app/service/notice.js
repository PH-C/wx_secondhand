'use strict';

const Service = require('egg').Service;
const {
  ERROR,
  SUCCESS,
} = require('../util/util');
class NoticeService extends Service {
  async create(Notice) {
    const {
      ctx,
    } = this;
    try {
      const res = await ctx.model.Notice.create(Notice);
      ctx.status = 201;
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
      const Notice = await ctx.model.Notice.findById(id);
      if (!Notice) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: 'Notice not found',
        });
      }
      const res = await Notice.destroy();
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: res,
      });

    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }

  async list({
    order_by = 'created_at',
    order = 'DESC',
  }) {
    const {
      ctx,
    } = this;
    try {
      const res = await ctx.model.Notice.findAndCountAll({
        order: [
          [ order_by, order.toUpperCase() ],
        ],
      });
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: res,
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
      const Notice = await ctx.model.Notice.findById(id);
      if (!Notice) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: 'Notice not found',
        });
      }
      const res = await Notice.update(updates);
      return Object.assign(SUCCESS, {
        data: res,
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
      const Notice = await ctx.model.Notice.findById(id);
      if (!Notice) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: 'Notice not found',
        });
      }
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: Notice,
      });

    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }
  
}

module.exports = NoticeService;
