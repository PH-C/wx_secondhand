'use strict';

const Controller = require('egg').Controller;
class ProductController extends Controller {
  async create() {
    const {
      ctx,
    } = this;
    const body = ctx.request.body;
    const created = await ctx.service.product.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = created;

  }

  async index() {
    const {
      ctx,
    } = this;
    const res = await ctx.service.product.index(ctx.query);
    ctx.body = res;
  }

  
  async banner(){
    const {
      ctx,
    } = this;
    const res = await ctx.service.product.banner();
    ctx.body = res;
  }

  async findCurrentSell(){
    const {
      ctx,
    } = this;
    const res = await ctx.service.product.findCurrentSell(ctx.query);
    ctx.body = res;
  }

  async destroy() {
    const {
      ctx,
    } = this;
    const id = ctx.params.id;
    const res = await ctx.service.product.del({
      id,
    });
    ctx.status = 200;
    ctx.body = res;
  }

  async update() {
    const {
      ctx,
    } = this;
    const id = ctx.params.id;
    const body = ctx.request.body;
    ctx.body = await ctx.service.product.update({
      id,
      updates: body,
    });
  }

  async find() {
    const {
      ctx,
    } = this;
    const id = +ctx.params.id;
    ctx.body = await ctx.service.product.find(id);
  }

  async findWithToken() {
    const {
      ctx,
    } = this;
    const id = +ctx.params.id;
    ctx.body = await ctx.service.product.findWithToken(id);
  }

  async edit() {
    const {
      ctx,
    } = this;
    const id = ctx.params.id;
    ctx.body = await ctx.service.product.edit(id);
  }

}

module.exports = ProductController;
