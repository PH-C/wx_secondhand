// pages/productDetail/productDetail.js
var Api = require('../../utils/api.js')
var constant = require('../../utils/constant.js')
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    product:{},
    showBox:false,
    type:"留言",
    commentid:'',
    collect:false,
    commentValue:"",
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
  },

  gotobuy: function(e){
    wx.setStorageSync('cart', this.data.product)
    wx.navigateTo({
      url: '/pages/confirmOrder/confirmOrder',
    })
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

  initData: function(options){
    const _this = this;
    const {id} = this.data;
    let url = "";
    url = app.globalData.hasLogin ? `/api/users/product/${id}` : `/api/product/${id}`;
    Api.WxGet(url, {}, function (res) {
      if (res.code === 0) {
        console.log(res)
        let product = res.data;
        let pic = product.pic.split(",")
        let pics = [];
        for (var i = 0; i < pic.length; i++) {
          let item = pic[i]
          item = constant.HOST + "/public" + item
          pics.push(item)
        }
        _this.setData({
          loading: true,
          collect: res.collect,
          product: { ...product, pic: pics }
        })
      } else {
        console.log(res.msg)
      }
    })
  },

  collect:function(){
    const _this = this;
    const { product} = this.data;
    Api.WxPost('/api/collect', { product_id: product.id}, function (res) {
      if (res.code === 0) {
        _this.setData({
          collect:true
        })
        wx.showToast({
          title: '收藏成功！',
          icon: 'success',
          duration: 1000
        })
      } else if(res.code===401){
        wx.navigateTo({
          url: '/pages/login/login',
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'success',
          duration: 1000
        })
        console.log(res.msg)
      }
    })
  },

  uncollect: function () {
    const _this = this;
    const { product } = this.data;
    Api.WxPost('/api/uncollect', { product_id: product.id }, function (res) {
      if (res.code === 0) {
        _this.setData({
          collect: false
        })
        wx.showToast({
          title: '取消收藏成功！',
          icon: 'success',
          duration: 1000
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'success',
          duration: 1000
        })
        console.log(res.msg)
      }
    })
  },

  makePhoneCall: function () {
    let { mobile } = this.data.product;
    wx.makePhoneCall({
      phoneNumber: mobile
    })
  },

  showBox: function(e){
    const comment_id = e.currentTarget.dataset.commentid||"";
    const type = e.currentTarget.dataset.type;

    this.setData({
      commentid: comment_id,
      type: type,
      showBox:true
    })
  },

  closeBox: function () {
    this.setData({
      showBox: false
    })
  },

  bindKeyInput(e) {
    this.setData({
      commentValue: e.detail.value
    })
  },

  createContent: function(){
    const { type } = this.data;
    if (type==="留言"){
      this.makeComment()
    } else if (type === "回复"){
      this.makeReply()
    }

  },

  makeComment: function(){
    const _this = this;
    const { product, commentValue } = this.data;
    Api.WxPost("/api/users/comment",{
      product_id: product.id,
      content: commentValue
    },function(res){
      if(res.code===0){
        wx.showToast({
          title: '留言成功！',
        })
        _this.setData({
          commentValue : ""
        })
        _this.initData()
        
      }else {
        wx.showToast({
          title: res.msg,
        })
      }

    })
  },

  makeReply: function(e){
    const _this = this;
    const { commentid, commentValue } = this.data;
    Api.WxPost("/api/users/comment/reply", {
      comment_id: commentid,
      content: commentValue
    }, function (res) {
      if (res.code === 0) {
        wx.showToast({
          title: '回复成功！',
        })
        _this.setData({
          commentValue: ""
        })
        _this.initData()
       
      } else {
        wx.showToast({
          title: res.msg,
        })
      }

    })
  },

  imgYu: function (event) {
    var src =  event.currentTarget.dataset.src;//获取data-src
    var imgList = event.currentTarget.dataset.list;//获取data-list
    
    console.log("ev", src, imgList)
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
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