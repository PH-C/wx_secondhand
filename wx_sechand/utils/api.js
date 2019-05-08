// let HOST = 'http://localhost:7001'
var constant = require('./constant.js')
let HOST = constant.HOST;
let app = getApp();
let wxRequest = (params, url) => {
  wx.request({
    url: url,
    method: params.method || 'GET',
    data: params.data || {},
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    success: (res) => {
      params.success && params.success(res)
    },
    fail: (res) => {
      params.fail && params.fail(res)
    },
    complete: (res) => {
      params.complete && params.complete(res)
    }
  })
}

function WxPost(url, params = {}, callBack) {

  if (HOST) {
    const auth = wx.getStorageSync("token")
    wx.request({
      url: HOST + url,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth
      },
      data: params,
      success: function (res) {
        callBack && callBack(res.data)
      }
    })
  }
}

function WxPut(url, params = {}, callBack) {
  if (HOST) {
    const auth = wx.getStorageSync("token")
    wx.request({
      url: HOST + url,
      method: 'PUT',
      header: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth
      },
      data: params,
      success: function (res) {
        callBack && callBack(res.data)
      }
    })
  }
}

function WxDelete(url, params = {}, callBack) {
  if (HOST) {
    const auth = wx.getStorageSync("token")
    wx.request({
      url: HOST + url,
      method: 'DELETE',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + auth
      },
      data: params,
      success: function (res) {
        callBack && callBack(res.data)
      }
    })
  }
}

function WxGet(url, params = {}, callBack) {
  if (HOST) {
    const auth = wx.getStorageSync("token")
    wx.request({
      url: HOST + url,
      method: 'GET',
      header: {
        'Authorization': 'Bearer ' + auth
      },
      data: params,
      success: function (res) {
        callBack && callBack(res.data)
      }
    })
  }
}

module.exports = {
  WxPost,
  WxPut,
  WxDelete,
  WxGet
}
