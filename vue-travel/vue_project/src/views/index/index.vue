<template>
  <div>
    <router-view/>
    <!--<buy/>-->
    <cube-tab-bar
      v-model="selectedLabelDefault"
      :data="tabs"
      @click="clickHandler"
      @change="changeHandler"
      class="nav">
    </cube-tab-bar>
  </div>
</template>

<script>
  // import buy from '@/views/buy'
  export default {
    components: {
      // buy
    },
    name: "index",
    data () {
      return {
        selectedLabelDefault: '购买',
        tabs: [{
          label: '发帖',
          icon: 'iconfont icontianjia'
        },{
          label: '发现',
          icon: 'iconfont iconfaxian'
        }, {
          label: '购买',
          icon: 'iconfont icongoumai'
        }, {
          label: '我',
          icon: 'iconfont iconwode'
        }]
      }
    },
    created() {
      const that = this
      if (this.$route.query.id) {
        that.selectedLabelDefault = that.$route.query.id
      } else {
        this.$router.push({path: '/buy'})
      }
    },
    methods: {
      clickHandler (label) {
        // if you clicked home tab, then print 'Home'
      },
      changeHandler (label) {
        const that = this
        // if you clicked different tab, this methods can be emitted
        if (label === '我') {
          that.$router.push({path: '/PageMy'})
        } else if (label === '购买') {
          that.$router.push({path: '/buy'})
        } else if (label === '发现') {
          that.$router.push({path: '/find'})
        } else if(label ==='发帖'){
          that.$router.push({path: '/IssueFind'})
        }
      }
    }
  }
</script>

<style scoped>
  .nav{
    position: fixed;
    bottom: 0;
    left: 0;
    height: 1rem;
    width: 100%;
    font-size: .36rem;
    border-top: 1px solid #d4d4d4;
    z-index: 2;
    background: #fff;
    line-height: .5rem;
    padding-top: .2rem;
  }
</style>
