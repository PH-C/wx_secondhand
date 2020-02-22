<template>
    <div style="padding: .4rem;margin-bottom: 1.8rem">
      <cube-tab-bar v-model="selectedLabel">
        <cube-tab label="2月" class="navFz"/>
        <cube-tab label="3月" class="navFz"/>
        <cube-tab label="4月" class="navFz"/>
      </cube-tab-bar>
      <div class="interval"></div>
      <cube-tab-panels v-model="selectedLabel">
        <cube-tab-panel label="2月">
          <img src="../../img/serverFeb.png">
          <img src="../../img/serverFeb-2.png">
        </cube-tab-panel>
        <cube-tab-panel label="3月">
          <img src="../../img/serverMar.png">
          <img src="../../img/serverMar-3.png">
        </cube-tab-panel>
        <cube-tab-panel label="4月">
          <img src="../../img/serverApr.png">
          <img src="../../img/serverApr-2.png">
        </cube-tab-panel>
      </cube-tab-panels>
    </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        selectedLabel: '3月'
      }
    }
  }
</script>

<style scoped>
  .navFz{
    font-size: .6rem;
    border-right: 1px solid #000;
    border-bottom: 1px solid #000;
    margin-bottom: .4rem;
  }
  .navFz:last-child{
    border-right: none;
  }
  img{
    width: 100%;
  }
</style>
