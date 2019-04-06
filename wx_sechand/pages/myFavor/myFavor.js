// pages/myFavor/myFavor.js
var Api = require('../../utils/api.js')
var constant = require('../../utils/constant.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comProducts:[],
    page: 1,
    pageSize: 7,
    totalPages: 0,//总页数
    loadMore: '加载更多',
    isLoading: false,
  },

  getResult: function () {
    const _this = this;
    const { comProducts, page, pageSize } = this.data;
    let data = {
      page,
      pageSize,
    }
  
    Api.WxGet("/api/users/collect", data, function (res) {
      if (res.code === 0) {
        console.log(res)
        let products = res.data.rows;
        let totalPages = Math.ceil(res.data.count / pageSize);
        for (var i = 0; i < products.length; i++) {
          let item = products[i].product
          item.pic = constant.HOST + "/public" + item.pic.split(',')[0]
        }
        _this.setData({
          loading: true,
          comProducts: comProducts.concat(products),
          page: res.page,
          totalPages
        })
      } else {
        console.log(res.msg)
      }
    })
  },

  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    console.log("e.target", e.currentTarget.dataset.id)
    wx.navigateTo({
      url: `/pages/productDetail/productDetail?id=${id}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getResult()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getMoreLists()
  },

  getMoreLists: function () {
    let { page, totalPages, comProducts } = this.data;
    const _this = this;
    console.log("加载更多")
    if (page >= totalPages) {
      _this.setData({
        isLoading: false,
        loadMore: '没有更多了'
      })
    } else {
      this.setData({
        page: ++page
      })
      this.getResult();
    }
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})