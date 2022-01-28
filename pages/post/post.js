// pages/post/post.js
const {network} = require('../../assets/js/network')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postArr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    network('/querypost', 'GET', {}).then(data => {
      console.log(data)
      _this.setData({
        postArr: data
      })
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
  publishpost() {
    wx.navigateTo({
      url: '../../pages/publishpost/publishpost'
    })
  }
})