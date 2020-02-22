<template>
  <div>
    <div class="container" style="margin-bottom: .6rem">
      <div class="personalInfo">
      <div class="img-container">
        <img v-if="!userInfo.avatar" src="../../img/headImg.jpg">
        <img v-else-if="userInfo.avatar" :src="$host+'/public'+userInfo.avatar">
        <div class="ava-modal">
           <router-link to="/editUser">
            修改头像
           </router-link>
        </div>
      </div>
      
        {{userInfo.username}}
        
      </div>
    </div>

   
    <div class="container">
      <router-link to="/HistoryList">
        <div class="liked">
            <span style="flex: 10">
              <i class="iconfont icongoumai" style="font-size: .5rem;"></i>
              我的订单
            </span>
            <span class="number">
                <span></span>
                <i class="iconfont iconjiantou"></i>
            </span>
        </div>
      </router-link>
     
      <router-link to="Collection">
        <div class="liked">
          <span style="flex: 10">
            <i class="iconfont iconshoucang1" style="font-size: .5rem;"></i>
            我的收藏
          </span>
          <span class="number">
              <span></span>
              <i class="iconfont iconjiantou"></i>
            </span>
        </div>
      </router-link>

       <router-link to="addressMan">
        <div class="liked">
          <span style="flex: 10">
            <i class="iconfont iconshoucang1" style="font-size: .5rem;"></i>
            我的地址
          </span>
          <span class="number">
              <span></span>
              <i class="iconfont iconjiantou"></i>
            </span>
        </div>
      </router-link>

      
      <div class="liked moneyBorder">
          <span>
            <i class="iconfont iconqianbao" style="font-size: .5rem;"></i>
            钱包
          </span>
          <span class="money">￥ {{userInfo.money}}</span>
        </div>
      </div>
     <div class="interval"></div>

      <div class="container-title" v-if="authority.id==2">
        <div class="liked-font ">
          <span>
          商家中心
          </span>
        </div>
      </div>
       <div v-else></div>
      <div class="interval"></div>

    <div class="container" v-if="authority.id==2">
      <router-link to="publishPro" >
        <div class="liked">
          <span style="flex: 10">
            <i class="iconfont icontianjia" style="font-size: .5rem;"></i>
            发布商品
          </span>
          <span class="number">
            
          </span>
        </div>
      </router-link>

       <router-link to="orderMan" >
        <div class="liked">
          <span style="flex: 10">
            <i class="iconfont icontianjia" style="font-size: .5rem;"></i>
            订单管理
          </span>
          <span class="number">
            
          </span>
        </div>
      </router-link>
    </div>
    <div v-else></div>
    

  </div>
</template>

<script>
  export default {
    name: "index",
     data() {
      return {
        userInfo:{},
        authority:{}
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
          url: `${_this.$host}/api/users/current`,
          params: {

          }
        }).then(function (res) {
          console.log(res);
          if(res.data.code===0){
            let userInfo = res.data.data
            _this.userInfo = userInfo
            _this.authority = userInfo.authority
          } else {
            _this.$router.push({path: '/login'})
          }
          
        }).catch(function (error) {
          console.log(error);
        });
      },
    }
};
</script>

<style scoped>
  .container{
    padding: .4rem;
    padding-bottom: 0;
    font-weight: bold;
  }
  .container-title{
    padding: .4rem;
    font-weight: bold;
  }
  .personalInfo{
    position: relative;
    display: flex;
    align-items: center;
    font-size: .5rem;
  }
  .ava-modal{
    display: none;
    position: absolute;
    left:0;
    top:0;
    width: 1.6rem;
    height: 1.6rem;
    line-height: 1.6rem;
    text-align: center;
    color:#fff;
    font-size: 0.3rem;
  }
  .img-container{
    position: relative;
    border-radius: 50%;
    width: 1.6rem;
    height: 1.6rem;
    margin-right: .4rem;
  }
  .img-container:hover .ava-modal{
    display:block;
  }
  .personalInfo img{
    border-radius: 50%;
    width: 1.6rem;
    height: 1.6rem;
    margin-right: .4rem;
  }
  .number{
    float: right;
  }
  .liked{
    display: flex;
    align-items: center;
    height: 1.4rem;
    font-size: .5rem;
    text-align: left;
    border-bottom: 1px solid #f5f4f9;
  }
  .liked-font{
    display: flex;
    align-items: center;
    font-size: .5rem;
    text-align: left;
    border-bottom: 1px solid #f5f4f9;
  }
  .interval{
    background: #f5f4f9;
    width: 100%;
    height: .2rem;
  }
  .money{
    font-size: .4rem;
    margin-left: .4rem;
  }
  .moneyBorder{
    border-bottom: 1px solid #f5f4f9;
    margin-bottom: .6rem;
  }
  .bannerItem{
    height: 3.6rem;
  }
  .bannerImg{
    width: 100%;
    height: 100%;
  }
</style>
