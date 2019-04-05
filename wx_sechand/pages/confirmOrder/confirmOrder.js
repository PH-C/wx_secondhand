// pages/cart/cart.js
var Api = require('../../utils/api.js')
var constant = require('../../utils/constant.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selAddress:"",
    cart:{},
    showIndex: 0,
    address:[],
    showAddress:false,
  },

  showAddressBox: function (index) {
    this.setData({
      showAddress: !this.data.showAddress
    })
  },
  closeAddressBox: function () {
    this.setData({
      showAddress: false
    })
  },
  selectAddress: function (e) {
    console.log("e.detail.dataset.index", e.currentTarget.dataset)
    this.setData({
      showIndex: e.currentTarget.dataset.index
    })
  },
  selectAddressOK: function () {
    const { address, showIndex } = this.data
    this.setData({
      selAddress: address[showIndex]
    })
    this.closeAddressBox()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let cart = wx.getStorageSync('cart')
    this.setData({
      cart
    })
    
  },

  getAddress: function(){
    const _this = this;
    Api.WxGet("/api/users/address", {}, function (res) {
      if (res.code === 0) {
        console.log(res)
        let address = res.data.rows;  
        let selAddress = address.length>0? address[0]:""
        _this.setData({
          address: address,
          selAddress
        })
      } else {
        console.log(res.msg)
      }
    })
  },

  goAddAddress: function(){
    wx.navigateTo({
      url: '/pages/addAddress/addAddress',
    })
  },

  confirmOrder: function () {
    const { cart, selAddress} = this.data;
    Api.WxPost('/api/userorder', {
      product_id:cart.id,
      originalPrice:cart.price,
      price: cart.price + cart.postage,
      address: `${selAddress.realName}, ${selAddress.mobile},${selAddress.address}`
    }, function (res) {
      if (res.code == 0) {
        wx.navigateBack()
        wx.showToast({
          title: '支付成功！',
          icon: 'success',
          duration: 1000
        })
        let timer = setTimeout(function(){
          wx.showToast({
            title: '下单成功！',
            icon: 'success',
            duration: 1000
          })
          clearTimeout(timer)
        },1000)
       
      } else if (res.code === 401) {
        wx.navigateTo({
          url: '/pages/login/login',
        })
        console.log(res.msg)
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'success',
          duration: 1000
        })
      }
    })
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
    this.getAddress()
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})