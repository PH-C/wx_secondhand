<template>
  <div>
    <div class="header">
      <cube-input v-model="value" class="searchInput iconfont iconsousuo" placeholder="输入帖子名称">
          
      </cube-input>
      <span v-if="value" class="delabel" @click="delabel">×</span>
      <cube-button :inline=true :primary=true @click="getData">搜索</cube-button>
    </div>
    <cube-slide 
      ref="slide"
      :data="banners"
    >
      <cube-slide-item 
        v-for="item in banners"
         v-bind:key="item.id"
         :to= "{ name: 'FindDetail', params: { id: item.id } }"
        class="bannerItem"
      >
        <p class="banner-name">{{item.title.slice(0,20)}}...</p>
        <img :src="$host+'/public'+item.pic.split(',')[0]"  class="bannerImg">
      </cube-slide-item>
     
    </cube-slide>
    <div class="interview"/>
    <div class="pictureWall">
      <router-link  
        v-for="item in topics"
        v-bind:key="item.id"
        :to= "{ name: 'FindDetail', params: { id: item.id } }"
        class="picture-item"
      > 
        <p class="pic-title">{{item.title.slice(0,9)}}...</p>
        <img :src="$host+'/public'+item.pic.split(',')[0]" style="width: 100%;">
      </router-link>
     
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data(){
      return {
        value: '',
        banners:[],
        topics:[]
      }
    },
    created: function () {
      this.getData()
    },
    methods:{
      getData () {
        const _this = this;
        let params = {}
        if(_this.value){
          params.title = _this.value
        }
        this.$http({
          method: 'GET',
          url: `${_this.$host}/api/topic`,
          params: params
        }).then(function (res) {
          console.log(res);
          if(res.data.code===0){
            _this.topics = res.data.data.rows
          }
          
        }).catch(function (error) {
          console.log(error);
        });

         this.$http({
            method: 'GET',
            url: `${_this.$host}/api/topic/banner`,
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

        //http://localhost:7001/api/topic/banner
      },
      delabel:function(){
        this.value = ""
        this.getData()
      }
    }
  };
</script>

<style scoped>
  .header{
    position: relative;
    margin-top: .5rem;
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-bottom: .5rem;
  }
  .bannerItem{
    position: relative;
     height: 3.6rem;
  }
  .banner-name{
    position: absolute;
    bottom:20px;
    left:20px;
    color:#fff;
    font-size: 0.36rem;
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
  .picture-item{
    position: relative;
    width: 3.2rem;
    height: 3rem;
  }
  .pic-title{
    position: absolute;
    top:0px;
    left:0px;
    width: 3.2rem;
    height: 3rem;
    text-align: center;
    line-height: 3rem;
    color:#fff;
    font-size: 0.3rem;
  }
  .bannerImg{
    width: 100%;
    height: 100%;
  }
  .interview{
    width: 100%;
    height: .2rem;
    background: #f5f5f7;
  }
  .pictureWall{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-bottom: 1.2rem;
  }
  .pictureWall img{
    width: 3.2rem;
    height: 3rem;
    /* margin-right: .1rem; */
    margin-bottom: .1rem;
  }
  .pictureWall img:nth-child(3n){
    margin-right: 0;
  }
  a{
    width: 3.2rem;
    margin-right: .1rem;
  }
</style>
