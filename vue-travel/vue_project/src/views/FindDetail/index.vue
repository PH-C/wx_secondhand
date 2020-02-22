<template>
  <div>
    <div class="header">
      <div class="iconfont iconzuojiantou back" style="font-size: .7rem;" @click="back"/>
      <div class="userInfo">
        <img v-if="!topic.user.avatar" src="../../img/headImg.jpg">
        <img v-else-if="topic.user.avatar" :src="$host+'/public'+topic.user.avatar">
        {{topic.user&&topic.user.username}}
      </div>
    </div>
     <cube-slide 
			ref="slide"
      :data="pic"
		>
      <cube-slide-item
			 v-for="(pitem, index) in pic"
			 :key="index"
			 class="bannerItem"
			>
        <img :src="$host+'/public' + pitem" >
      </cube-slide-item>
    </cube-slide>
    <div class="mainInfo">
      <h1 style="font-size:.45rem;font-weight:bold;padding:.1rem">{{topic.title}}</h1>
      <div>
        {{topic.content}}
      </div>
    </div>
    <div class="commentsNum" @click="showReply = true">
      <i class="iconfont iconpinglun" style="font-size: .7rem;margin-right: .1rem"></i>2
    </div>

    <div class="allComments">
      {{topic.comment&&topic.comment.length?'全部评论':'暂无评论'}}
    </div>
    <div class="everyComment" 
      v-for="(item, index) in topic.comment"
      :key="index"
    >
      <img v-if="!item.user.avatar" src="../../img/headImg.jpg">
      <img v-else-if="item.user.avatar" :src="$host+'/public'+item.user.avatar">
      <div class="rightBox">
        <div class="userName">{{item.user.username}}</div>
        <div class="commentContent">{{item.content}}</div>
      </div>
    </div>
    <!-- <div class="everyComment">
      <img src="../../img/headImg.jpg">
      <div class="rightBox">
        <div class="userName">亮闪闪的七号</div>
        <div class="commentContent">这鞋真的好看</div>
        <div class="likeAndComment">
          <i class="iconfont iconlike" style="font-size: .6rem;margin-right: .1rem"></i>11
          <i class="iconfont iconpinglun" style="font-size: .6rem;margin-left: .8rem"></i>
        </div>
      </div>
    </div> -->
    <div v-if="showReply" class="replyBox">
      <input type="text" v-model="comment"  placeholder="说点什么吧..." class="replyInput">
      <div class="showReplyRow" @click="onReply">回复</div>
      <div class="showReplyRow" @click="showReply = false">取消</div>
    </div>
    <div v-if="showReply" class="blackBg" @click="showReply = false"  @touchmove.prevent/>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        showReply: false,
        topic:{},
        pic:[],
        comment:''
      }
    },
    created: function () {
      this.getData()
    },
    methods: {
      getData () {
        const _this = this;
        this.$http({
          method: 'GET',
          url: `${_this.$host}/api/topic/${_this.$route.params.id}`,
          params: {

          }
        }).then(function (res) {
          console.log(res);
          if(res.data.code===0){
            let topic = res.data.data
            topic.pic = topic.pic.split(",")
            _this.topic = topic
            _this.pic = topic.pic
          }
          
        }).catch(function (error) {
          console.log(error);
        });
      },
      back: function() {
        this.$router.push({path: '/find',query: {id: '发现'}})
      },
      closeSizeBox: function() {
        this.showReply = false
      },
      onReply:function(){
        const _this = this;
        const {comment,topic} = _this;
        this.$http({
          method: 'POST',
          url: `${_this.$host}/api/users/comment`,
          data: {
            topic_id:topic.id,
            content:comment
          }
        }).then(function (res) {
          console.log(res);
          if(res.data.code===0){
            console.log("评论成功！")
            _this.showToastType("评论成功！", "correct")
            _this.comment=""
            _this.getData()
          } else if(res.data.code===400) {
            console.log("登录失败，请输入正确的账户或者密码")
             _this.showToastType(res.data.msg, "error")
             _this.$router.push({path: '/login'})
          }else{
             _this.showToastType(res.data.msg, "error")
          }
        }).catch(function (error) {
          console.log(error);
        });
    },
    
    showToastType:function(txt, type) {
      const toast = this.$createToast({
        txt: txt,
        type: type
      })
      toast.show()
    }
  }
}

</script>

<style scoped>
  .cube-slide-group{
    width:100%;
  }
  .bannerItem{
    width:100%;
    height: 12rem;
  }
  .bannerItem img{
    width:100%;
    height: 12rem;
  }
  .header{
    display: flex;
    flex-direction: row;
    height: 1.6rem;
    text-align: left;
    align-items: center;
    padding: .4rem 0 0 .4rem;
    border-bottom: 1px solid #f5f4f9;
    margin-bottom: .2rem;
  }
  .userInfo{
    display: flex;
    align-items: center;
    font-size: .46rem;
  }
 
  .userInfo img{
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    margin: 0 .2rem 0 .6rem;
  }
  .mainImg{
    box-sizing: border-box;
    width: 100%;
    padding: 0 .4rem;
  }
  .mainInfo{
    box-sizing: border-box;
    width: 100%;
    padding: 0 .4rem;
    font-size: .4rem;
    text-align: left;
    line-height: .56rem;
    margin-bottom: .6rem;
  }
  .commentsNum{
    display: flex;
    align-items: center;
    font-size: .5rem;
    padding: 0 .4rem;
  }
  .allComments{
    box-sizing: border-box;
    width: 100%;
    height: .8rem;
    line-height: .8rem;
    text-align: left;
    padding: 0 .4rem;
    font-size: .4rem;
    background: #f5f5f7;
    margin: .4rem 0;
  }
  .everyComment{
    box-sizing: border-box;
    width: 100%;
    padding: .4rem;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #f5f4f9;
  }
  .everyComment img{
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
  }
  .rightBox{
    width: 100%;
    margin-left: .4rem;
    font-size: .4rem;
    text-align: left;
  }
  .userName{
    font-size: .3rem;
    color: #acaab7;
    margin-top: .1rem;
    margin-bottom: .2rem;
  }
  .likeAndComment{
    float: right;
    text-align: right;
    margin-top: .3rem;
  }
  .blackBg{
    position: fixed;
    z-index: 3;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000000;
    opacity: .4;
  }
  .replyBox{
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 4;
    background: #fff;
    width: 100%;
  }
  .replyInput{
    box-sizing: border-box;
    padding: .4rem;
    width: 100%;
    font-size: .4rem;
    border: none;
    outline: none;
  }
  .showReplyRow{
    height: 1.4rem;
    line-height: 1.4rem;
    width: 100%;
    border-top: 1px solid #d4d4d4;
    font-size: .4rem;
  }
</style>
