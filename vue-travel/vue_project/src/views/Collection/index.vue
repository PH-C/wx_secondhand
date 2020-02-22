<template>
    <div>
      <div class="header">
          <div class="iconfont iconzuojiantou back" @click="back"/>
          我的收藏
      </div>
      
        <div 
          v-for="item in usercollects"
          v-bind:key="item.id"
        >
          <router-link class="goodsRow" :to= "{ name: 'GoodsDetail', params: { id: item.product.id } }">
            <img :src="$host+'/public'+item.product.pic.split(',')[0]" alt="">
            <div>
              <div class="goodsName">{{item.product.name}}</div>
              <div style="font-size: .36rem;text-align: left">
                <!-- <span class="size">库存{{item.sku}}</span> -->
                <span class="goodsPrice">￥{{item.product.price}}</span>
              </div>
            </div>
          </router-link>
        </div>
        <div class="interval"/>
    
      
    </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        usercollects:[],
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
          url: `${_this.$host}/api/users/collect`,
          params: {

          }
        }).then(function (res) {
          console.log(res);
          if(res.data.code===0){
            let usercollects = res.data.data.rows
            _this.usercollects = usercollects
          }
          
        }).catch(function (error) {
          console.log(error);
        });
      },
      back: function() {
        this.$router.push({path: '/PageMy',query: {id: '我'}})
      },
      viewGoods: function() {
        this.$router.push({path: '/GoodsDetail'})
      }
    }
  };
</script>

<style scoped>
  .goodsRow{
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    width: 100%;
    padding: .4rem;
  }
  .goodsRow img{
    width: 2rem;
    height: 2rem;
    margin-right: .4rem;
  }
  .goodsName{
    font-size: .4rem;
    text-align: left;
    margin: .3rem 0;
  }
  .size{
    margin-right: .3rem;
  }
  .goodsPrice{
    float: right;
  }
  .interval{
    width: 100%;
    height: .2rem;
    background: #f5f5f7;
  }
  .header{
    box-sizing: border-box;
    line-height: 1rem;
    width: 100%;
    padding: .2rem .4rem;
    font-size: .5rem;
    text-align: left;
    border-bottom: 2px solid #e4e5e9;
  }
  .back{
    float: left;
    font-size: .6rem;
    margin-right: .4rem;
  }
</style>
