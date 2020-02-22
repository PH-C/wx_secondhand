<template>
  <div>
    <div class="container">
      <div class="header">
        <cube-input v-model="value" class="searchInput iconfont iconsousuo" placeholder="输入商品名称、货号">
           
        </cube-input>
       <span v-if="value" class="delabel" @click="delabel">×</span>
       <cube-button :inline=true :primary=true @click="getData">搜索</cube-button>
      </div>
    </div>
    <cube-slide 
      ref="slide"
     :data="banners"
    >
      <cube-slide-item 
        v-for="item in banners"
         v-bind:key="item.id"
         :to= "{ name: 'GoodsDetail', params: { id: item.id } }"
        class="bannerItem"
      >
        <p class="banner-name">{{item.name.slice(0,20)}}...</p>
        <img :src="$host+'/public'+item.pic.split(',')[0]"  class="bannerImg">
      </cube-slide-item>
    </cube-slide>
    <goods-list v-bind:goodlist="goodlist"/>
  </div>
</template>

<script>
import GoodsList from '@/views/GoodsList'
export default {
  name: "index",
  components: {
    GoodsList
  },
  data() {
    return {
      value: '',
      goodlist:[],
      banners:[]
    }
  },
  created: function () {
    // `this` 指向 vm 实例
    this.getData()
  },
  methods: {
    
    getData () {
      const _this = this;
      let params = {}
      if(_this.value){
        params.name = _this.value
      }
      this.$http({
        method: 'GET',
        url: `${_this.$host}/api/product`,
        params:params
      }).then(function (res) {
        console.log(res);
        if(res.data.code===0){
          _this.goodlist = res.data.data.rows
        }
        
      }).catch(function (error) {
        console.log(error);
      });

       this.$http({
          method: 'GET',
          url: `${_this.$host}/api/product/banner`,
          params: {

          }
        }).then(function (res) {
          console.log(res);
          if(res.data.code===0){
            _this.banners = res.data.data.rows
          }
          
        }).catch(function (error) {
          console.log(error);
        });
    },
    delabel:function(){
      this.value = ""
      this.getData()
    }
  }
}
</script>

<style scoped>
  .container{
    margin: 0 .2rem;
  }
  .header{
    position: relative;
    margin-top: .5rem;
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-bottom: .5rem;
  }
  .searchInput{
    box-sizing: border-box;
    height: 1rem;
    width: 85%;
    margin-right: 4%;
    background: #f5f4f9;
    font-size: .4rem;
    padding-left: .2rem;
  }
  .typeImg{
    height: 1rem;
  }
  .bannerItem{
    position: relative;
    height: 3.6rem;
  }
  .bannerImg{
    width: 100%;
    height: 100%;
  }
  .infoImg{
    margin-top: .4rem;
    width: 100%;
  }
  .delabel{
    position: absolute;
    top: 0;
    right: 1.5rem;
    font-size: 0.5rem;
    text-align: center;
    width: 1rem;
    height: 1rem;
    line-height: 1rem;
  }
  .banner-name{
    position: absolute;
    bottom:20px;
    left:20px;
    color:#fff;
    font-size: 0.36rem;
  }
</style>
