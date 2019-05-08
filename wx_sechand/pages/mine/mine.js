// pages/mine/mine.js
const Api = require('../../utils/api.js');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    userInfo: {},
    modalState:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  getUserInfo: function () {
    var that = this;
    Api.WxGet(`/api/users/current`, {}, function (res) {
      if (res.code === 0) {
        let userInfo = res.data;
        app.globalData.userInfo = userInfo
        app.globalData.hasLogin = true;
        if (!userInfo.avatarUrl || !userInfo.nickName){
          that.setData({
            loading: false,
            userInfo: res.data,   
            modalState:true
          })
        }
        that.setData({
          loading: false,
          userInfo: res.data,
        })
        
        wx.setStorageSync('userInfo', userInfo)
    
      } else if(res.code===401){
        wx.navigateTo({
          url: '/pages/login/login',
        })
        console.log(res.msg)
      }
    })
  },

  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      that.setData({
        userInfo: e.detail.userInfo
      })
      that.updateUserInfo()
    }
  },

  updateUserInfo: function(){
    const that = this;
    const {userInfo} = this.data;
    const data = {
      nickName: userInfo.nickName,
      avatarUrl: userInfo.avatarUrl,
    }
    Api.WxPut(`/api/users/current`, data, function (res) {
      if (res.code === 0) {
        that.setData({
          loading: false,
          userInfo: res.data,
          modalState: false,
        })
      } else if (res.code === 401) {
        wx.navigateTo({
          url: '/pages/login/login',
        })
        console.log(res.msg)
      } else {

      }
    })
  },

  goMyAddress: function(){
    wx.navigateTo({
      url: '/pages/myAddress/myAddress',
    })
  },

  goSz: function(){
    wx.navigateTo({
      url: '/pages/myFavor/myFavor',
    })
  },

  goMyOrder: function(){
    wx.navigateTo({
      url: '/pages/myOrder/myOrder',
    })
  },

  goMySells: function () {
    wx.navigateTo({
      url: '/pages/mySell/mySell',
    })
  },

  goPayMoney: function(){
    wx.navigateTo({
      url: '/pages/myWallet/myWallet',
    })
  },

  goSuggest: function(){
    wx.navigateTo({
      url: '/pages/suggest/suggest',
    })
  },

  goSystem: function(){
    wx.navigateTo({
      url: '/pages/notice/notice',
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
    var that = this;
    // var hasLogin = app.globalData.hasLogin;
    // console.log("hasLogin", hasLogin)
    // if (!hasLogin) {
    //   wx.navigateTo({
    //     url: '/pages/login/login',
    //   })
    //   return
    // }
    that.getUserInfo()
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