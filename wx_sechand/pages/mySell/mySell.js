// pages/myOrder/myOrder.js
var Api = require('../../utils/api.js')
var constant = require('../../utils/constant.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curIndex: 0,
    orders: [],
    page: 1,
    pageSize: 7,
    totalPages: 0,//总页数
    loadMore: '加载更多',
    isLoading: false,
  },

  bindSelect(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: index,
      orders: [],
      page: 1,
      pageSize: 7,
      totalPages: 0,//总页数
      loadMore: '加载更多',
      isLoading: false,
    })
    this.getData() 
  },

  getData: function(){
    const { curIndex } = this.data;
    if (curIndex === 0) {
      this.getSells()
    } else {
      this.getOrders()
    }
  },

  getSells: function () {
    const _this = this;
    const { curIndex, page, pageSize, orders } = this.data;
    ///api/users/product/sell
    Api.WxGet("/api/users/product/sell", {
        state: curIndex, 
        pageSize,
        page,
      }, function (res) {
      if (res.code === 0) {
        console.log(res)
        let norders = res.data.rows;
        let totalPages = Math.ceil(res.data.count/pageSize);
        for (var i = 0; i < norders.length; i++) {
          let item = norders[i]
          item.pic = constant.HOST + "/public" + item.pic.split(',')[0]
        }
        _this.setData({
          loading: true,
          orders: orders.concat(norders),
          page: res.page,
          totalPages
        })
      } else {
        console.log(res.msg)
      }
    })
  },

  getOrders: function () {
    const _this = this;
    const { curIndex, page, pageSize, orders  } = this.data;
    ///api/users/product/sell
    Api.WxGet("/api/users/sellerorder", { 
      state: curIndex,
      pageSize,
      page,
    }, function (res) {
      if (res.code === 0) {
        console.log(res)
        let norders = res.data.rows;
        let totalPages = Math.ceil(res.data.count / pageSize);
        for (var i = 0; i < norders.length; i++) {
          let item = norders[i].product
          item.pic = constant.HOST + "/public" + item.pic.split(',')[0]
        }
        _this.setData({
          orders: orders.concat(norders),
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

  deliverProduct:function(e){
    const id = e.currentTarget.dataset.id;
    const transaction = e.currentTarget.dataset.transaction;
    if (transaction==="在线交易"){
      wx.navigateTo({
        url: `/pages/deliverProduct/deliverProduct?id=${id}`,
      })
    }else{
      this.deliver(id)
    }
    
  },

  deliver: function (id) {
    const _this = this;
    Api.WxPut(`/api/users/userorder/${id}`, {
      orderState: 2
    }, function (res) {
      if (res.code === 0) {
        _this.getData()
        wx.showToast({
          title: '发货成功',
          icon: 'success',
          duration: 1000
        })
      } else if (res.code === 401) {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'success',
          duration: 1000
        })
      }

    })
  },

  getMoreLists: function () {
    let { page, totalPages } = this.data;
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
      this.getData();
    }
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
    this.getData()
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})