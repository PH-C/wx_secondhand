// pages/noticeDetail/noticeDetail.js
const Api = require('../../utils/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    notice:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this;
    this.setData({
      id: options.id
    })
    this.initData();
  },

  initData: function (options) {
    const _this = this;
    const { id } = this.data;
    Api.WxGet(`/api/notice/${id}`, {}, function (res) {
      if (res.code === 0) {
        console.log(res)
        let notice = res.data;
       
        _this.setData({
          loading: true,
          notice: notice
        })
      } else {
        console.log(res.msg)
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