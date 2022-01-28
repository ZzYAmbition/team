const {BASE_URL} = require('../../static/wxurl');
const {network} = require('../../assets/js/network');
let app = getApp();
Page({
  data: {
    isLogin: false,
    userInfo: {},
    profileItemInfo: app.globalData.profileItemInfo,
  },
  onLoad: function () {
    let that = this;
    if(wx.getUserProfile) {
      network('/queryInfo', 'GET', {openid: wx.getStorageSync('_3rdSession')}).then(info => {
        wx.setStorageSync('userInfo', info)
        console.log(info)
        that.setData({
          userInfo: info,
          isLogin: true
        })
      })
    }
  },
  get3_rdSession() {
    return new Promise((resolve, reject) => {
      wx.login({
        success(res) {
          if(res.code) {
            wx.request({
              url: BASE_URL + '/getOpenid',
              data: {
                code: res.code
              },
              success(res) {
                resolve(res.data);
              }
            })
          }
        }
      })
    })
  },
  getUserProfile(e) {
    let that = this;
    wx.getUserProfile({
      lang: 'zh_CN',
      desc: '用于注册登录',
      success(res) {
        that.get3_rdSession().then(oid => {
          wx.setStorageSync('_3rdSession', oid);
          let userInfo = {
            openid: oid,
            username: res.userInfo.nickName,
            gender: res.userInfo.gender,
            avatarUrl: res.userInfo.avatarUrl
          }
          network('/login', 'POST', userInfo).then(result => {
            wx.setStorageSync('userInfo', result)
            that.setData({
              userInfo: result,
              isLogin: true
            })
            console.log(result)
          }, reason => {
            console.log(reason)
          })
        });
      },
      fail(res) {
        console.log('失败aaaaaa', res)
      }
    })
  }
})