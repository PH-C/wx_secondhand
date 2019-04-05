'use strict';

const Controller = require('egg').Controller;
class UserOrderController extends Controller {
  async create() {
    const {
      ctx,
    } = this;
    const body = ctx.request.body;
    const created = await ctx.service.userOrder.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = created;

  }

  async index() {
    const {
      ctx,
    } = this;
    const res = await ctx.service.userOrder.index(ctx.query);
    ctx.body = res;
  }

  async findCurrentUserOrder(){
    const {
      ctx,
    } = this;
    const res = await ctx.service.userOrder.findCurrentUserOrder(ctx.query);
    ctx.body = res;
  }

  async findCurrentUserSellOrder(){
    const {
      ctx,
    } = this;
    const res = await ctx.service.userOrder.findCurrentUserSellOrder(ctx.query);
    ctx.body = res;
  }


  async destroy() {
    const {
      ctx,
    } = this;
    const id = ctx.params.id;
    const res = await ctx.service.userOrder.del({
      id,
    });
    ctx.status = 200;
    ctx.body = res;
  }

  async update() {
    const {
      ctx,
    } = this;
    const id = +ctx.params.id;
    const body = ctx.request.body;
    ctx.body = await ctx.service.userOrder.update({
      id,
      updates: body,
    });
  }

  async find() {
    const {
      ctx,
    } = this;
    const id = ctx.params.id;
    ctx.body = await ctx.service.userOrder.find(id);
  }

  async edit() {
    const {
      ctx,
    } = this;
    const id = ctx.params.id;
    ctx.body = await ctx.service.userOrder.edit(id);
  }

}

module.exports = UserOrderController;
