const path = require('path')
const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    this.ctx.body = "welcome"
  }
}

module.exports = HomeController
