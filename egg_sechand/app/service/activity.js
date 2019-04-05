'use strict';

const Service = require('egg').Service;
const {
  ERROR,
  SUCCESS,
} = require('../util/util');
class ActivityService extends Service {
  async create(activity) {
    const {
      ctx,
    } = this;
    try {
      const res = await ctx.model.Activity.create(activity);
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
      const activity = await ctx.model.Activity.findById(id);
      if (!activity) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: 'activity not found',
        });
      }
      const res = await activity.destroy();
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
      const res = await ctx.model.Activity.findAndCountAll({
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
      const activity = await ctx.model.Activity.findById(id);
      if (!activity) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: 'activity not found',
        });
      }
      const res = await activity.update(updates);
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
      const activity = await ctx.model.Activity.findById(id);
      if (!activity) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: 'activity not found',
        });
      }
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: activity,
      });

    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }
}

module.exports = ActivityService;
