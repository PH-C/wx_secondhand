<template>
  <div>
    <div style="height: .8rem;text-align: left;padding: .4rem 0 0 .4rem;border-bottom: 1px solid #f5f4f9;">
      <div class="iconfont iconzuojiantou back" style="font-size: .5rem;" @click="back"/>
    </div>
    <cube-tab-bar v-model="selectedLabel">
      <cube-tab label="待发货" class="navFz">
        <p>待发货</p>
        <p v-if="selectedLabel=='待发货'">{{count}}</p>
        <p v-else class="wb">0</p>
      </cube-tab>
      <cube-tab label="已发货" class="navFz">
        <p>已发货</p>
        <p v-if="selectedLabel=='已发货'">{{count}}</p>
         <p v-else class="wb">0</p>
      </cube-tab>
      <cube-tab label="交易成功" class="navFz">
        <p>交易成功</p>
        <p v-if="selectedLabel=='交易成功'">{{count}}</p>
         <p v-else class="wb">0</p>
      </cube-tab>
      
    </cube-tab-bar>
    <div class="interview"/>

    <cube-tab-panels >
     

      <cube-tab-panel label="待发货" v-if="selectedLabel=='待发货'">
        <div 
          v-for="item in userorders"
          v-bind:key="item.id">

          <router-link class="goodsRow" :to= "{ name: 'GoodsDetail', params: { id: item.product.id } }">
            <img :src="$host+'/public'+item.product.pic.split(',')[0]" alt="">
            <div>
              <div class="goodsName">{{item.product.name}}</div>
              <div style="font-size: .36rem;text-align: left">
                <span class="size">{{item.size}}</span>
                数量*1
                <span class="goodsPrice">￥{{item.price}}</span>
              </div>
            </div>
          </router-link>
      
          <div class="address">收货地址：{{item.address}}</div>
            <div class="interview"/>
          </div>
        
      </cube-tab-panel>

      <cube-tab-panel label="已发货" v-else-if="selectedLabel=='已发货' ">
        <div 
          v-for="item in userorders"
          v-bind:key="item.id">

          <router-link class="goodsRow" :to= "{ name: 'GoodsDetail', params: { id: item.product.id } }">
            <img :src="$host+'/public'+item.product.pic.split(',')[0]" alt="">
            <div>
              <div class="goodsName">{{item.product.name}}</div>
              <div style="font-size: .36rem;text-align: left">
                <span class="size">{{item.size}}</span>
                数量*1
                <span class="goodsPrice">￥{{item.price}}</span>
              </div>
            </div>
          </router-link>
      
          <div class="address">收货地址：{{item.address}}</div>
           <p  class="buyBtn">
            <button @click="publishBtn(item.id)">确认收货</button>
          </p>
          <div class="interview"/>
        </div>
        
      </cube-tab-panel>

       <cube-tab-panel label="交易成功" v-else-if="selectedLabel=='交易成功' ">
        <div 
          v-for="item in userorders"
          v-bind:key="item.id">

          <router-link class="goodsRow" :to= "{ name: 'GoodsDetail', params: { id: item.product.id } }">
            <img :src="$host+'/public'+item.product.pic.split(',')[0]" alt="">
            <div>
              <div class="goodsName">{{item.product.name}}</div>
              <div style="font-size: .36rem;text-align: left">
                <span class="size">{{item.size}}</span>
                数量*1
                <span class="goodsPrice">￥{{item.price}}</span>
              </div>
            </div>
          </router-link>
      
        <div class="address">收货地址：{{item.address}}</div>
          <div class="interview"/>
        </div>
        
      </cube-tab-panel>

     
    </cube-tab-panels>
  </div>
</template>

<script>
export default {
  name: "HistoryList",
  data() {
    return {
      userorders:[],
      selectedLabel: '待发货',
      count:0
    }
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    selectedLabel: function (newselectedLabel, oldselectedLabel) {
      this.getData()
    }
  },
  created: function () {
    this.getData()
  },
  methods: {
    getData () {
      const _this = this;
      let state = "";
      if(this.selectedLabel==='待发货'){
        state=1
      }else if(this.selectedLabel==='已发货'){
        state=2
      }else if(this.selectedLabel==='交易成功'){
        state=3
      }
      this.$http({
        method: 'GET',
        url: `${_this.$host}/api/users/userorder`,
        params: {
          state
        }
      }).then(function (res) {
        console.log(res);
        if(res.data.code===0){
          let userorders = res.data.data.rows
          _this.userorders = userorders
          _this.count = res.data.data.count
        }
        
      }).catch(function (error) {
        console.log(error);
      });
    },
    publishBtn: function(id){
      const _this = this;
      let state = "";
      if(this.selectedLabel==='已发货'){
        state=3
        this.$http({
          method: 'PUT',
          url: `${_this.$host}/api/users/userorder/${id}`,
          data: {
            orderState:state
          }
        }).then(function (res) {
          console.log(res);
          if(res.data.code===0){
            _this.selectedLabel='交易成功';
            _this.getData()
          }
          
        }).catch(function (error) {
          console.log(error);
        });
      }
       
    },
    back: function() {
      this.$router.push({path: '/PageMy',query: {id: '我'}})
    },
  }
}
</script>

<style scoped>
  .navFz{
    font-size: .46rem;
  }
  .navFz p{
    margin-top: .2rem;
  }
  .interview{
    width: 100%;
    height: .2rem;
    background: #f5f5f7;
  }
  .goodsRow{
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    width: 100%;
    padding: .4rem;
  }
  .address{
    display: flex;
    font-size: 0.32rem;
    padding-left: .4rem;
    padding-bottom: 0.2rem;
    color:#a07c7c;
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
  .buyBtn{
  	width: 100%;
  	padding: .2rem .4rem;
  }
  .buyBtn button{
  	width: 100%;
  	height: 1rem;
  	background: #00c2c2;
  	color: #fff;
  	border: none;
  	outline: none;
  	border-radius: 4px;
  }
  .wb{
    color:#fff;
  }
</style>
