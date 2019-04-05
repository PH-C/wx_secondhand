// pages/myAddress/myAddress.js
const Api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selAddress: "",
    cart: {},
    showIndex: 0,
    address: [],
    showAddress: false,
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
  // selectAddressOK: function () {
  //   const { address, showIndex } = this.data
  //   this.setData({
  //     selAddress: address[showIndex]
  //   })
  //   this.closeAddressBox()
  // },

  getAddress: function () {
    const _this = this;
    Api.WxGet("/api/users/address", {}, function (res) {
      if (res.code === 0) {
        console.log(res)
        let address = res.data.rows;
        _this.setData({
          address: address
        })
      } else {
        console.log(res.msg)
      }
    })
  },
  addAddress: function(){
    wx.navigateTo({
      url: '/pages/addAddress/addAddress',
    })
  },

  delAddress: function(){
    const _this = this;
    const { address, showIndex } = this.data
    let sel = address[showIndex]
    Api.WxDelete(`/api/address/${sel.id}`, {}, function (res) {
      if (res.code === 0) {
        console.log(res)
        _this.getAddress()
        wx.showToast({
          title: '删除成功！',
          icon: 'success',
          duration: 1000
        })
      } else {
        console.log(res.msg)
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