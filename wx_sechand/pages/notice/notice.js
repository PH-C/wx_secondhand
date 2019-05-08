// pages/system/system.js
const Api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notice:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNotices()
  },

  getNotices: function () {
    const _this = this;
    Api.WxGet("/api/notice", {}, function (res) {
      if (res.code === 0) {
        console.log(res)
        let notice = res.data.rows;
        for(let i=0;i<notice.length;i++){
          notice[i].title = notice[i].title.slice(0,20)
        }
        _this.setData({
          notice: notice
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
      url: `/pages/noticeDetail/noticeDetail?id=${id}`,
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