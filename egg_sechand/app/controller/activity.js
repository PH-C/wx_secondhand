'use strict';

const Controller = require('egg').Controller;

class ActivityController extends Controller {
  async create() {
    const {
      ctx,
    } = this;
    ctx.body = await ctx.service.activity.create(ctx.request.body);
  }

  async list() {
    const {
      ctx,
    } = this;
    ctx.body = await ctx.service.activity.list(ctx.query);
  }

  async destroy() {
    const {
      ctx,
    } = this;
    ctx.body = await ctx.service.activity.del(ctx.params.id);
  }

  async find() {
    const {
      ctx,
    } = this;
    ctx.body = await ctx.service.activity.find(ctx.params.id);
  }

  async update() {
    const {
      ctx,
    } = this;
    const id = ctx.params.id;
    const updates = Object.assign({}, ctx.request.body);
    ctx.body = await ctx.service.activity.update({
      id,
      updates,
    });
  }
}

module.exports = ActivityController;
