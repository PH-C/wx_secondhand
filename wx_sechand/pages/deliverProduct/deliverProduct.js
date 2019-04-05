// pages/deliverProduct/deliverProduct.js
var Api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeIndex: 0,
    typeArray: ['顺丰', '圆通', '韵达', '中通', 'EMS', '其他'],
    inputValue:'',
    id:''
  },

  bindCityPickerChange: function (e) {
    console.log('选的是', this.data.typeArray[e.detail.value])
    this.setData({
      typeIndex: e.detail.value
    })
  },

  bindKeyInput(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  deliver: function (e) {
    const { inputValue, id, typeArray, typeIndex } = this.data;
    if(!inputValue){
      wx.showToast({
        title: '请输入物流单号！',
        icon: 'success',
        duration: 1000
      })
      return
    }
    Api.WxPut(`/api/users/userorder/${id}`, {
      trackingNumber: inputValue,
      trackingCompany: typeArray[typeIndex],
      orderState: 2 
    }, function (res) {
      if (res.code === 0) {
        wx.showToast({
          title: '发货成功',
          icon: 'success',
          duration: 1000
        })
      } else if (res.code === 401) {
        wx.navigateTo({
          url: '/pages/myWallet/myWallet',
        })
      } else {
        wx.showToast({
          title: '充值失败',
          icon: 'success',
          duration: 1000
        })
      }

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      typeIndex:0
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