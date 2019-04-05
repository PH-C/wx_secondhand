// pages/publish/publish.js
var app = getApp()
var constant = require('../../utils/constant.js')
var Api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    updateImg: [],
    typeIndex:0,
    transactionIndex:0,
    postageShow:false,
    typeArray: ['服饰', '数码','手机','书籍','食品','生活用品','其他'],
    transactionArray: ["见面交易","在线交易"]
  },

  bindCityPickerChange: function (e) {
    console.log('选的是', this.data.typeArray[e.detail.value])
    this.setData({
      typeIndex: e.detail.value
    })
  },

  bindTransactionChange: function(e){
    let transactionIndex = e.detail.value
    console.log('选的是', this.data.transactionArray[transactionIndex])
    if (transactionIndex==1){
      this.setData({
        postageShow: true
      })
    }
    this.setData({
      transactionIndex: transactionIndex
    })
  },

  chooseImg: function () {
    let _this = this;
    let updateImg = _this.data.updateImg;
    wx.chooseImage({
      count: 4, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths

        // updateImg.unshift(tempFilePaths[0]);
        // console.log("updateImg", updateImg, tempFilePaths)
        let newUpdateImg = updateImg.concat(tempFilePaths)
        console.log("updateImgupdateImg", newUpdateImg)
        _this.setData({
          updateImg: [...new Set(newUpdateImg)]
        });
      }
    })
  },

  preview: function (event) {
    let _this = this;
    var img = event.currentTarget.dataset.img;
    let updateImg = _this.data.updateImg;
    console.log(updateImg);
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: updateImg // 需要预览的图片http链接列表
    })
  },

  deleteimg: function (event) {
    let _this = this;
    var index = event.currentTarget.dataset.index - 0;
    let updateImg = _this.data.updateImg;
    let newImgArr = [];
    for (let i = 0; i < updateImg.length; i++) {
      if (index != i) {
        newImgArr.push(updateImg[i]);
      }
    }
    _this.setData({
      updateImg: newImgArr
    });
  },

  formSubmit: function (e) {
    let _this = this;
    let updateImg = this.data.updateImg;
    let formData = e.detail.value;
    formData.postage = formData.postage||0
    if (updateImg.length) {
      app.uploadimg({
        url: constant.HOST + '/api/upload',//这里是你图片上传的接口
        path: updateImg //这里是选取的图片的地址数组
      }, function (resp) {
        //图片上传成功后才可以发布问题
        console.log('uploadimg', resp)
        wx.showToast({
          title: '上传成功：' + resp.success + " 失败：" + resp.fail,
          icon: 'success',
          duration: 1000
        })

        _this.publish(formData, resp.picUrls)

      });
    } else {
      wx.showToast({
        title: '请上传图片!',
        icon: 'success',
        duration: 1000
      })
    }

  },
  publish: function(formData,pic){
    ///api/product
    const { typeArray, transactionArray, typeIndex, transactionIndex} = this.data
    console.log("formData", formData, pic)
    Api.WxPost('/api/product',{
      ...formData,
      type: typeArray[typeIndex],
      transactionMode: transactionArray[transactionIndex],
      pic:pic.join(",")
    },function(res){
      if(res.code==0){
        wx.reLaunch({
          url: '/pages/publish/publish',
        }) 
       
        wx.showToast({
          title: '发布成功！',
          icon: 'success',
          duration: 1000
        })
      } else if (res.code === 401) {
        wx.navigateTo({
          url: '/pages/login/login',
        })
        console.log(res.msg)
      }else{
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