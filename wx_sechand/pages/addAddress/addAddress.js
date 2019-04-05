// pages/publish/publish.js
var app = getApp()
var constant = require('../../utils/constant.js')
var Api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

 
  formSubmit: function (e) {
    let _this = this;
    let formData = e.detail.value;
    this.publish(formData)
  },
  publish: function (formData) {
    console.log("formData", formData)
    Api.WxPost('/api/address', {
      ...formData,
    }, function (res) {
      if (res.code == 0) {
        wx.navigateBack()

        wx.showToast({
          title: '添加成功！',
          icon: 'success',
          duration: 1000
        })
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