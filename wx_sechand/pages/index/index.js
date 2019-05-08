//index.js
//获取应用实例
var Api = require('../../utils/api.js')
var constant = require('../../utils/constant.js')

const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    loading:false,
    searchValue:'',
    hasUserInfo: false,
    recProducts:[],
    comProducts:[],
    hotProducts:[],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  searchproduct(e) {    
    this.setData({
      searchValue: e.detail.value
    })
    wx.navigateTo({
      url: `/pages/search/search?searchValue=${e.detail.value}`,
    })
  },

  goToRecommend(e){
    wx.navigateTo({
      url: `/pages/search/search?isRecommend=1`,
    })
  },

  goToSearch(e) {
    wx.navigateTo({
      url: `/pages/search/search`,
    })
  },

  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    console.log("e.target", e.currentTarget.dataset.id)
    wx.navigateTo({
      url: `/pages/productDetail/productDetail?id=${id}`,
    })
  },

  onLoad: function () {
    const _this = this;
    this.getRecently();
    this.getRecommend();
    this.getHots();
  },

  getRecently: function(){
    const _this = this;
    Api.WxGet("/api/product", { pageSize: 6, state: 0  }, function (res) {
      if (res.code === 0) {
        console.log(res)
        let recProducts = res.data.rows;
        for (var i = 0; i < recProducts.length; i++) {
          let item = recProducts[i]
          item.pic = constant.HOST + "/public" + item.pic.split(',')[0]
        }
        _this.setData({
          loading: true,
          recProducts: recProducts
        })
      } else {
        console.log(res.msg)
      }
    })
  },

  getRecommend: function () {
    const _this = this;
    Api.WxGet("/api/product", { pageSize: 6, isRecommend:1,state:0 }, function (res) {
      if (res.code === 0) {
        console.log(res)
        let comProducts = res.data.rows;
        for (var i = 0; i < comProducts.length; i++) {
          let item = comProducts[i]
          item.name = item.name.slice(0,28)+"..."
          item.pic = constant.HOST + "/public" + item.pic.split(',')[0]
        }
        _this.setData({
          loading: true,
          comProducts: comProducts
        })
      } else {
        console.log(res.msg)
      }
    })
  },

  getHots: function () {
    const _this = this;
    Api.WxGet("/api/product", { pageSize: 4, isHot: 1, state: 0  }, function (res) {
      if (res.code === 0) {
        console.log(res)
        let comProducts = res.data.rows;
        for (var i = 0; i < comProducts.length; i++) {
          let item = comProducts[i]
          item.name = item.name.slice(0, 28) + "..."
          item.pic = constant.HOST + "/public" + item.pic.split(',')[0]
        }
        _this.setData({
          loading: true,
          hotProducts: comProducts
        })
      } else {
        console.log(res.msg)
      }
    })
  },
  
  getUserInfo: function(e) {
   
  }
})
