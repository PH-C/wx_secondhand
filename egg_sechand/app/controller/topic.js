'use strict';

const Controller = require('egg').Controller;
class TopicController extends Controller {
  async create() {
    const {
      ctx,
    } = this;
    const body = ctx.request.body;
    const created = await ctx.service.topic.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = created;

  }

  async index() {
    const {
      ctx,
    } = this;
    const res = await ctx.service.topic.index(ctx.query);
    ctx.body = res;
  }

  async banner(){
    const {
      ctx,
    } = this;
    const res = await ctx.service.topic.banner();
    ctx.body = res;
  }

  async destroy() {
    const {
      ctx,
    } = this;
    const id = ctx.params.id;
    const res = await ctx.service.topic.del({
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
    ctx.body = await ctx.service.topic.update({
      id,
      updates: body,
    });
  }

  async find() {
    const {
      ctx,
    } = this;
    const id = ctx.params.id;
    ctx.body = await ctx.service.topic.find(id);
  }

  async edit() {
    const {
      ctx,
    } = this;
    const id = ctx.params.id;
    ctx.body = await ctx.service.topic.edit(id);
  }

 
}

module.exports = TopicController;
