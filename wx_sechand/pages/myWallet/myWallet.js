// pages/myWallet/myWallet.js
const Api = require('../../utils/api.js');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:'',
    userInfo:{}
  },

  bindKeyInput(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },

  pay: function(){
    const { inputValue } = this.data;
    Api.WxPut('/api/users/recharge', { money: inputValue},function(res){
      if(res.code===0){
        wx.showToast({
          title: '充值成功',
          icon: 'success',
          duration: 1000
        })
      }else if(res.code===401){
        wx.navigateTo({
          url: '/pages/myWallet/myWallet',
        })
      }else{
        wx.showToast({
          title: '充值失败',
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