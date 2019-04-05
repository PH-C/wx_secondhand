'use strict';

const Service = require('egg').Service;
const {
  ERROR,
  SUCCESS,
  unique,
} = require('../util/util');
class TopicService extends Service {
  async create(topic) {
    const {
      ctx,
    } = this;
    const user = this.ctx.session.user;
    console.log("userId", user)
    if(!user) {
      return {
        code:400,
        msg:"未登录"
      }
    }

    try {
      const res = await this.ctx.model.Topic.create({...topic,user_id:user.id});
      return Object.assign({
        data: res,
      }, SUCCESS);
    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }

  async index({
    page = 1,
    pageSize = 10,
    order_by = 'created_at',
    order = 'DESC',
    title = "",
    tags = ''
  }) {
   
    const {
      Op,
    } = this.app.Sequelize;
    pageSize = pageSize || 10                           //一页多少条
    const currentPage = page || 1                  //设置当前页默认第一页
    const skipNum = (currentPage - 1) * pageSize   //跳过数
    const options = {
      offset: parseInt(skipNum),
      limit: parseInt(pageSize),
      order: [
        [ order_by, order.toUpperCase() ],
      ],
      where:{}
    };

    if(title){
      options.where = {
        ...options.where,
        title: {
          [Op.like]: `%${title}%`,
        },
      }
    }

    if (tags) {
      options.where = {
        ...options.where,
        tags:tags
      }
    }
   
    const res = await this.ctx.model.Topic.findAndCountAll(Object.assign(options, {
      include: [{
        model: this.ctx.model.User,
        as: 'user',
        attributes: [ 'id', 'username', 'avatar' ],
        include: [{
          model: this.ctx.model.Authority,
          attributes: [ 'id', 'name' ],
        }],
      }],
    }));
    return Object.assign(SUCCESS, {
      data: res,
    });
  }

  async banner(){
    const {
      Op,
    } = this.app.Sequelize;
   
    const options = {
      limit: 4,
      order: [
        [ 'created_at', 'DESC' ],
      ],
      where:{
        tags:'推荐'
      }
    };

    const res = await this.ctx.model.Topic.findAndCountAll(Object.assign(options, {
      include: [{
        model: this.ctx.model.User,
        as: 'user',
        attributes: [ 'id', 'username', 'avatar' ],
        include: [{
          model: this.ctx.model.Authority,
          attributes: [ 'id', 'name' ],
        }],
      }],
    }));
    return Object.assign(SUCCESS, {
      data: res,
    });
  }

  async del({
    id,
  }) {
    const user = this.ctx.session.user;
    console.log("userId", user)
    if(!user) {
      return {
        code:400,
        msg:"未登录"
      }
    }
    const Topic = await this.ctx.model.Topic.findById(id);
    if (!Topic) {
      return Object.assign({
        error_msg: 'Topic not found',
      }, ERROR);
    }
    Topic.destroy();
    return SUCCESS;

  }

  async update({
    id,
    updates,
  }) {
    const user = this.ctx.session.user;
    console.log("userId", user)
    if(!user) {
      return {
        code:400,
        msg:"未登录"
      }
    }
    const Topic = await this.ctx.model.Topic.findById(id);
    if (!Topic) {
      return Object.assign(ERROR, {
        msg: 'Topic not found',
      });
    }
    Topic.update(updates);
    return SUCCESS;

  }

  async find(id) {
    const Topic = await this.ctx.model.Topic.findById(id, {
      include: [{
        model: this.ctx.model.User,
        as: 'user',
        attributes: [ 'id', 'username','avatar'  ],
        include: [{
          model: this.ctx.model.Authority,
          attributes: [ 'id', 'name' ],
        }],
      }, {
        model: this.ctx.model.Comment,
        as: 'comment',
        attributes: [ 'id', 'content', 'created_at', 'updated_at' ],
        include: [{
          model: this.ctx.model.User,
          attributes: [ 'id','username','avatar' ],
        }],
      }],
    });
    Topic.set('readSize', Topic.get('readSize') + 1);
    Topic.increment('readSize').then().catch(err => {
      console.log(err);
    });
    if (!Topic) {
      return Object.assign(ERROR, {
        msg: 'Topic not found',
      });
    }
    return Object.assign(SUCCESS, {
      data: Topic,
    });

  }

  async edit(id) {
    const Topic = await this.ctx.model.Topic.findById(id, {
      include: [{
        model: this.ctx.model.User,
        as: 'user',
        attributes: [ 'id','username','avatar' ],
        include: [{
          model: this.ctx.model.Authority,
          attributes: [ 'id', 'name' ],
        }],
      }],
    });
    if (!Topic) {
      return Object.assign(ERROR, {
        msg: 'Topic not found',
      });
    }
    return Object.assign(SUCCESS, {
      data: Topic,
    });

  }

 
}

module.exports = TopicService;
