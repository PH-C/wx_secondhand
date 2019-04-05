'use strict'

const Service = require('egg').Service

class ActionTokenService extends Service {
  async apply(id) {
    const {ctx} = this
    return ctx.app.jwt.sign({
      data: {
        id: id
      },
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7)
    }, ctx.app.config.jwt.secret)
  }
}

module.exports = ActionTokenService