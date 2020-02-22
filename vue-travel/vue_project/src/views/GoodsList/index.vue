<template>
    <div class="goodsList">
      <div class="eachGoodsBox" 
        v-for="item in goodlist"
        v-bind:key="item.id">
        <router-link :to= "{ name: 'GoodsDetail', params: { id: item.id } }">
          <img :src="$host+'/public'+item.pic.split(',')[0]" style="width:4rem;height: 4rem;">
          <div class="shoesInfo">{{ item.name.slice(0,16) }}...</div>
          <div class="elseInfo">
            <span class="price">￥{{ item.price }}</span>
            <!-- <span class="bought">200人付款</span> -->
          </div>
        </router-link>
      </div>
    </div>
</template>

<script>
  export default {
    name: "index",
    props: ['goodlist'],
  };
</script>

<style scoped>
  .goodsList{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    margin-bottom: 1.1rem;
  }
  .eachGoodsBox{
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 50%;
    height: 6rem;
    border-bottom: 6px solid #f5f4f9;
    padding: .4rem;
    font-size: .36rem;
  }
  .eachGoodsBox:nth-child(odd) {
    border-right: 6px solid #f5f4f9;
  }
  .eachGoodsBox img{
    display: block;
    height: 4rem;
    width: 3.2rem;
    margin: 0 auto;
  }
  .price{
    float: left;
  }
  .shoesInfo{
    text-align: left;
    line-height: .36rem;
    padding: 0.2rem;
  }
  .elseInfo{
    padding-left: 0.2rem;
  }
  .bought{
    float: right;
    font-size: .3rem;
    color: #807f8d;
  }
</style>
