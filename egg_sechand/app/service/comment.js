'use strict';

const Service = require('egg').Service;
const {
  ERROR,
  SUCCESS,
} = require('../util/util');
class CommentService extends Service {
  async create({
    product_id,
    content,
  }) {
    const {
      ctx,
    } = this;
    const id = ctx.state.user.data.id

    try {
      if (!content || !product_id) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: `expected an object with content,Product_id but got: ${JSON.stringify({
            product_id,
            content,
          })}`,
        });
      }
    
      const product = await ctx.model.Product.findById(product_id);
      if(!product){
        return {...ERROR,msg:"未找到要评论的商品"}
      }

      const res = await ctx.model.Comment.create({
        user_id:id,
        product_id,
        content,
      });
      ctx.status = 201;

     
      return Object.assign(SUCCESS, {
        data: res,
      });

    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }

  async commentReplyCreate({
    comment_id,
    content,
  }) {
    const {
      ctx,
    } = this;
    const id = ctx.state.user.data.id

    try {
      if (!content || !comment_id) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: `expected an object with content,comment_id but got: ${JSON.stringify({
            comment_id,
            content,
          })}`,
        });
      }
    
      const comment = await ctx.model.Comment.findById(comment_id);
      if(!comment){
        return {...ERROR,msg:"未找到评论"}
      }

      const res = await ctx.model.CommentReply.create({
        user_id:id,
        comment_id,
        content,
      });
      ctx.status = 201;

     
      return Object.assign(SUCCESS, {
        data: res,
      });

    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }

  async del({
    id,
  }) {
    const {
      ctx,
    } = this;

    try {
      const comment = await ctx.model.Comment.findById(id);
      // const user = await ctx.model.User.findById(user_id);
      if (!comment) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: 'comment is not exists',
        });
      }
     
      const res = await comment.destroy();
    
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: res,
      });

    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }
}

module.exports = CommentService;
