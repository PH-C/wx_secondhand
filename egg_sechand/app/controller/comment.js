'use strict';

const Controller = require('egg').Controller;

class CommentController extends Controller {
  async create() {
    const {
      ctx,
    } = this;
   
    ctx.body = await ctx.service.comment.create(ctx.request.body);
  }

  async destroy() {
    const {
      ctx,
    } = this;
    const id = +ctx.params.id;
    ctx.body = await ctx.service.comment.del({
      id,
    });
  }
}

module.exports = CommentController;
