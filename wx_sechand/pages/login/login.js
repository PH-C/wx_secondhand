// pages/login/login.js
const Api = require('../../utils/api.js');
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    pwd: "",
    linktype: 1,
    url: ''
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

  textinput: function (event) {
    var type = event.currentTarget.dataset.type;
    if (type == 1) {
      this.setData({
        username: event.detail.value
      })
    } else {
      this.setData({
        pwd: event.detail.value
      })
    }
  },

  login: function () {
    var that = this;
    wx.showToast({
      title: '登录中...',
      icon: 'loading'
    })
    var data = {
      username: that.data.username,
      password: that.data.pwd
    };
    Api.WxPost(`/api/users/login`, data, function (res) {
      wx.hideToast();
      if (res.code === 0) {
        console.log(res)
        app.globalData.hasLogin = true;
        app.globalData.userInfo = res.data;
        wx.setStorageSync("token", res.token)
        wx.showModal({
          title: '提示',
          content: '登录成功！',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.switchTab({
                url: '/pages/mine/mine',
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
       
      } else {
        wx.showModal({
          title: '提示',
          content: '登录失败，请重试！'
        })
        return;
      }
    })
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