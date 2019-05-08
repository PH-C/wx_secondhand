// pages/search/search.js
var Api = require('../../utils/api.js')
var constant = require('../../utils/constant.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    curClass: '',
    searchValue:'',
    isRecommend:"",
    comProducts:[],
    hotDiscussClass: ['服饰', '数码', '手机', '书籍', '食品', '生活用品', '其他'],
    page: 1,
    pageSize:7,
    totalPages: 0,//总页数
    loadMore: '加载更多',
    isLoading: false,
  },

  //事件处理函数
  searchProduct(e) {
    console.log("e.detail.value", e.detail.value)
    this.setData({
      comProducts: [],
      searchValue: e.detail.value,
      page: 1,
      pageSize: 7,
      totalPages: 0,//总页数
      loadMore: '加载更多',
      isLoading: false,
    })
    this.getSearchResult()
  },

  resetSearch(e){
    this.setData({
      comProducts: [],
      searchValue: "",
      page: 1,
      pageSize: 7,
      totalPages: 0,//总页数
      loadMore: '加载更多',
      isLoading: false,
    })
    this.getSearchResult()
  },

  goToDetail(e){
    const id = e.currentTarget.dataset.id;
    console.log("e.target", e.currentTarget.dataset.id)
    wx.navigateTo({  
      url: `/pages/productDetail/productDetail?id=${id}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      searchValue: options.searchValue||"",
      isRecommend: options.isRecommend||""
    })
    this.getSearchResult()
  },

  getSearchResult: function () {
    const _this = this;
    const { searchValue, comProducts, curClass, isRecommend,page, pageSize} = this.data;
    let data = {
      page,
      pageSize, 
    }
    if (searchValue){
      data.name=searchValue
    }
    if (isRecommend){
      data.isRecommend = isRecommend
    }
    if (curClass){
      data.type = curClass
    }
   data.state = 0
    Api.WxGet("/api/product", data, function (res) {
      if (res.code === 0) {
        console.log(res)
        let products = res.data.rows;
        let totalPages = Math.ceil(res.data.count/pageSize);
        for (var i = 0; i < products.length; i++) {
          let item = products[i]
          item.pic = constant.HOST + "/public" + item.pic.split(',')[0]
        }
        _this.setData({
          loading: true,
          comProducts: comProducts.concat(products),
          page: res.page,
          totalPages
        })
      } else {
        console.log(res.msg)
      }
    })
  },

  bindClickClass: function (e) {
    console.log("e", e);
    this.setData({
      curClass: e.target.dataset.value,
      comProducts: [],
      page: 1,
      pageSize: 7,
      totalPages: 0,//总页数
      loadMore: '加载更多',
    })
    this.getSearchResult()
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
    this.getMoreLists()
  },

  getMoreLists: function(){
    let { page, totalPages, comProducts } = this.data;
    const _this = this;
    console.log("加载更多")
    if (page >= totalPages) {
      _this.setData({
        isLoading: false,
        loadMore: '没有更多了'
      })
    } else {
      this.setData({
        page: ++page
      })
      this.getSearchResult();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})