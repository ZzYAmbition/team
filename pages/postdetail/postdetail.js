const formatDate = require('../../utils/util').formatDate;
const {network} = require('../../assets/js/network');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    post: {},
    inputValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let postJson = JSON.parse(options.post)
    this.setData({
      post: postJson
    })
  },
  formSubmit(e) {
    let _this = this;
    let userInfo = wx.getStorageSync('userInfo')
    let words = e.detail.value.words; // 留言内容
    let openid = wx.getStorageSync('_3rdSession'); // 留言者的openid
    let cla = userInfo.class; // 留言者的班级
    let username = userInfo.username; // 留言者的名字
    let avatarUrl = userInfo.avatarUrl; // 留言者的头像地址
    let school = userInfo.school; // 留言者的学校
    let date = formatDate(new Date()); // 留言的日期
    let postId = this.data.post._id;
    let replyObj = {
      openid,
      words,
      school,
      cla,
      username,
      date,
      avatarUrl
    }
    let mergeObj = {
      replyObj,
      postId,
    }
    network('/addreply', 'GET', mergeObj).then(result => {
      if(result.msg == '留言成功') {
        wx.showToast({
          title: '留言成功',
          duration: 1000
        })

        _this.setData({
          post: result.post,
          inputValue: ''
        })
      }
    })
  }
})