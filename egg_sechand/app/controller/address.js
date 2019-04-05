'use strict';

const Controller = require('egg').Controller;

class AddressController extends Controller {
  async create() {
    const {
      ctx,
    } = this;
    ctx.body = await ctx.service.address.create(ctx.request.body);
  }

  async list() {
    const {
      ctx,
    } = this;
    ctx.body = await ctx.service.address.list(ctx.query);
  }

  async currentUserAddresslist(){
    const {
      ctx,
    } = this;
    ctx.body = await ctx.service.address.currentUserAddresslist(ctx.query);
  }

  async destroy() {
    const {
      ctx,
    } = this;
    ctx.body = await ctx.service.address.del(ctx.params.id);
  }

  async find() {
    const {
      ctx,
    } = this;
    ctx.body = await ctx.service.address.find(ctx.params.id);
  }

  async update() {
    const {
      ctx,
    } = this;
    const id = ctx.params.id;
    const updates = Object.assign({}, ctx.request.body);
    ctx.body = await ctx.service.address.update({
      id,
      updates,
    });
  }
}

module.exports = AddressController;
