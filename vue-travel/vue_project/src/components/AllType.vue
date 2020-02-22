<template>
  <div>
    <div style="height: .8rem;text-align: left;padding: .4rem 0 0 .4rem;border-bottom: 1px solid #f5f4f9;">
      <router-link to="/buy">
        <div class="iconfont iconzuojiantou back" style="font-size: .5rem;"/>
      </router-link>
    </div>
    <cube-tab-bar v-model="selectedLabel">
      <cube-tab label="品牌" class="navFz"/>
      <cube-tab label="系列" class="navFz"/>
    </cube-tab-bar>
    <div class="interval"></div>
    <cube-tab-panels v-model="selectedLabel">
      <cube-tab-panel label="品牌">
        <ul>
          <li class="tab-panel-li">
            <img src="../img/adidas.png">
            <img src="../img/nike.png">
          </li>
          <li class="tab-panel-li">
            <img src="../img/nike.png">
            <img src="../img/converse.png">
          </li>
          <li class="tab-panel-li">
            <img src="../img/AJ.png">
            <img src="../img/converse.png">
          </li>
          <li class="tab-panel-li">
            <img src="../img/converse.png">
            <img src="../img/vans.png">
          </li>
          <li class="tab-panel-li">
            <img src="../img/converse.png">
            <img src="../img/adidas2.png">
          </li>
        </ul>
      </cube-tab-panel>
      <cube-tab-panel label="系列">
        <ul>
          <li class="tab-panel-li">
            <img src="../img/Aj1.png">
            <img src="../img/Aj4.png">
          </li>
          <li class="tab-panel-li">
            <img src="../img/Aj6.png">
            <img src="../img/Aj7.png">
          </li>
          <li class="tab-panel-li">
            <img src="../img/Aj1.png">
            <img src="../img/Aj4.png">
          </li>
          <li class="tab-panel-li">
            <img src="../img/Aj1.png">
            <img src="../img/Yeezy.png">
          </li>
        </ul>
      </cube-tab-panel>
    </cube-tab-panels>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      selectedLabel: '品牌'
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tab-panel-li{
    height: 2.8rem;
    line-height: 4.4rem;
    border-bottom: 1px solid #f5f4f9;
    text-align: left;
  }
  .tab-panel-li img{
    height: 2rem;
    margin-left: 1.5rem;
  }
  .interval{
    background: #f5f4f9;
    width: 100%;
    height: .2rem;
  }
  .navFz{
    font-size: .6rem;
  }
</style>
