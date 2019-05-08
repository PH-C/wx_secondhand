'use strict';

const Controller = require('egg').Controller;

class NoticeController extends Controller {
  async create() {
    const {
      ctx,
    } = this;
    ctx.body = await ctx.service.notice.create(ctx.request.body);
  }

  async list() {
    const {
      ctx,
    } = this;
    ctx.body = await ctx.service.notice.list(ctx.query);
  }

  async destroy() {
    const {
      ctx,
    } = this;
    ctx.body = await ctx.service.notice.del(ctx.params.id);
  }

  async find() {
    const {
      ctx,
    } = this;
    ctx.body = await ctx.service.notice.find(ctx.params.id);
  }

  async update() {
    const {
      ctx,
    } = this;
    const id = ctx.params.id;
    const updates = Object.assign({}, ctx.request.body);
    ctx.body = await ctx.service.notice.update({
      id,
      updates,
    });
  }
}

module.exports = NoticeController;
