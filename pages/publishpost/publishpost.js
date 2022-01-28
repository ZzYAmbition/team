// pages/publishpost/publishpost.js
const formatDate = require('../../utils/util').formatDate;
const {network} = require('../../assets/js/network');
const getTopPage = require('../../utils/util').getTopPage;
Page({
  data: {

  },
  formSubmit(e) {
    let post_title = e.detail.value.post_title;
    let post_content = e.detail.value.post_content;
    let date = formatDate(new Date());
    let userInfo = wx.getStorageSync('userInfo');
    let user = {
      openid: userInfo.openid,
      class: userInfo.class,
      username: userInfo.username,
      school: userInfo.school
    }
    let post = {
      post_title,
      post_content,
      date,
      user,
      reply: []
    }
    network('/addpost', 'GET', post).then(result => {
      let pages = getCurrentPages();
      getTopPage(pages, 2).setData({
        postArr: result
      })
      wx.navigateBack({
        delta: 1,
      })
    })
  }
})