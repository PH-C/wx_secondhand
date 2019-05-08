'use strict';

const Service = require('egg').Service;
const md5 = require('js-md5')
const {
  ERROR,
  SUCCESS,
} = require('../util/util');
class UserService extends Service {
  async create(user) {
    const {
      ctx,
    } = this;
    try {
      if (!user.username || !user.password) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: `expected an object with username, password but got: ${JSON.stringify(user)}`,
        });
      }
      const md5Passwd = md5(user.password)
      user = Object.assign(user, {
        password: md5Passwd,
      });
      const userDB = await ctx.model.User.findOne({
        where: {
          username: user.username,
        },
      });
      if (!userDB) {
        const res = await this.ctx.model.User.create({ ...user, "authority_id": 1 });
        ctx.status = 201;
        return Object.assign(SUCCESS, {
          data: res,
        });
      }
      ctx.status = 406;
      return Object.assign(ERROR, {
        msg: 'username already exists',
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
      const user = await ctx.model.User.findById(id);
      if (!user) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: 'user not found',
        });
      }
      const res = await user.update({delete:1});
      // user.destroy();
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: user,
      });

    } catch (error) {
      ctx.throw(500);
    }
  }

  async update({ id, user }) {
    const {
      ctx,
    } = this;
    try {
      const userDB = await ctx.model.User.findById(id);
      if (!userDB) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: 'user not found',
        });
      }
      const md5Passwd = md5(user.password)
      user = Object.assign(user, {
        password: md5Passwd,
      });
      const res = await userDB.update(user);
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: res,
      });

    } catch (error) {
      ctx.throw(500);
    }
  }

  async recharge({
    money = 0
  }) {
    const {
      ctx,
    } = this;
    const id = ctx.state.user.data.id
    try {
      const userDB = await ctx.model.User.findById(id);
      if (!userDB) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: 'user not found',
        });
      }

      if (money) {
        money = Number(userDB.money) + Number(money)
      }

      const res = await userDB.update({ money: money });
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: res,
        msg: "充值成功!"
      });

    } catch (error) {
      ctx.throw(500);
    }
  }

  async pay({
    money = 0
  }) {
    const {
      ctx,
    } = this;
    const id = ctx.state.user.data.id
    try {
      const userDB = await ctx.model.User.findById(id);
      if (!userDB) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: 'user not found',
        });
      }


      money = userDB.money - money
      if (money < 0) {
        return { ...ERROR, msg: "余额不足，请充值！" }
      }

      const res = await userDB.update({ money: money });
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: res,
        msg: "支付成功!"
      });

    } catch (error) {
      ctx.throw(500);
    }
  }

  async adminLogin({ username, password }) {
    const {
      ctx,
    } = this;
    try {
      const user = await ctx.model.User.findOne({
        where: {
          username: username.toString(),
          delete:0
        },
      });
      
      if (!user) {
        return {
          ...ERROR,
          msg: 'username is error',
        }
      }
      if (user.authority_id != 2) {
        return {
          ...ERROR,
          msg: '您没有管理员权限',
        }
      }
      if (md5(password) === user.password) {
        ctx.status = 200;
        const hash = md5.hex(password)

        ctx.session.user = user;

        return Object.assign(SUCCESS, {
          data: Object.assign(user, {
            password: '',
          }),
        }, { token: await ctx.service.actionToken.apply(user.id) });

      }

      return Object.assign(ERROR, {
        msg: 'password is error',
      });

    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }

  async login({ username, password }) {
    const {
      ctx,
    } = this;
    try {
      const user = await ctx.model.User.findOne({
        where: {
          username: username.toString(),
          delete: 0
        },
      });
      if (!user) {
        return Object.assign(ERROR, {
          msg: 'username is error',
        });
      }

      if (md5(password) === user.password) {
        ctx.status = 200;
        const hash = md5.hex(password)

        return Object.assign(SUCCESS, {
          data: Object.assign(user, {
            password: '',
          }),
        }, { token: await ctx.service.actionToken.apply(user.id) });
      }
      return Object.assign(ERROR, {
        msg: 'password is error',
      })

    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }

  async list({
    page = 1,
    pageSize = 10,
    order_by = 'created_at',
    order = 'DESC',
  }) {
    const {
      ctx,
    } = this;
    const {
      Op,
    } = this.app.Sequelize;

    pageSize = pageSize || 10                           //一页多少条
    const currentPage = page || 1                  //设置当前页默认第一页
    const skipNum = (currentPage - 1) * pageSize   //跳过数
    let options = {
      offset: parseInt(skipNum),
      limit: parseInt(pageSize),
      order: [
        [order_by, order.toUpperCase()],
      ],
      where: {
        delete:0
      }
    }

    try {
      const res = await ctx.model.User.findAndCountAll({
        ...options,
        include: [{
          model: ctx.model.Authority,
          attributes: ['id', 'name'],
        }]
      })
      ctx.status = 200
      return {
        ...SUCCESS,
        data: res,
        pageSize: pageSize
      }
    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }


  async authoritylist({
    page = 1,
    pageSize = 50,
    order_by = 'created_at',
    order = 'DESC',
  }) {
    const {
      ctx,
    } = this;
    const {
      Op,
    } = this.app.Sequelize;

    pageSize = pageSize || 10                           //一页多少条
    const currentPage = page || 1                  //设置当前页默认第一页
    const skipNum = (currentPage - 1) * pageSize   //跳过数
    let options = {
      offset: parseInt(skipNum),
      limit: parseInt(pageSize),
      order: [
        [order_by, order.toUpperCase()],
      ],
      where: {}
    }

    try {
      const res = await ctx.model.Authority.findAndCountAll({
        ...options
      })
      ctx.status = 200
      return {
        ...SUCCESS,
        data: res,
        pageSize: pageSize
      }
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
      let user = await ctx.model.User.findById(id, {
        include: [{
          model: ctx.model.Authority,
          attributes: ['id', 'name'],
        }],
      });
      if (!user) {
        ctx.status = 401;
        return Object.assign(ERROR, {
          msg: 'user not found',
        });
      }
      ctx.status = 200;
      user = Object.assign(user, {
        password: '',
      })
      return {
        ...SUCCESS,
        data: user
      }

    } catch (error) {
      throw (500);
    }
  }

  async current() {
    const {
      ctx,
    } = this;
    const id = ctx.state.user.data.id

    try {
      const userInfo = await ctx.model.User.findById(id, {
        include: [{
          model: ctx.model.Authority,
          attributes: ['id', 'name'],
        }],
      });
      if (!userInfo) {
        // ctx.status = 401;
        return Object.assign(ERROR, {
          msg: 'user not found',
        });
      }
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: userInfo,
      });

    } catch (error) {
      throw (500);
    }

  }

  async updateLoginUser({ user }) {
    const {
      ctx,
    } = this;

    const id = ctx.state.user.data.id


    try {
      const userDB = await ctx.model.User.findById(id);
      if (!userDB) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: 'user not found',
        });
      }

      if (user.password) {
        const md5Passwd = md5(user.password)
        user = Object.assign(user, {
          password: md5Passwd,
        });
      }

      const res = await userDB.update(user);
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: res,
      });

    } catch (error) {
      ctx.throw(500);
    }
  }
}

module.exports = UserService;
