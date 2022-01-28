// components/info/info.js
const {network} = require('../../assets/js/network');
const getTopPage = require('../../utils/util').getTopPage;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    info: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    formSubmit(e) {
      let user = {};
      user._id = wx.getStorageSync('userInfo')._id;
      user.openid = wx.getStorageSync('_3rdSession');
      user.username = e.detail.value.username;
      user.gender = wx.getStorageSync('userInfo').gender;
      user.class = e.detail.value.class;
      user.school = e.detail.value.school;
      user.resume = e.detail.value.resume;
      user.avatarUrl = wx.getStorageSync('userInfo').avatarUrl;
      this.updateInfo(user);
    },
    // 上传表单数据
    updateInfo(user) {
      network('/updateInfo', 'POST', user).then(update => {
        if(update == '更新成功') {
          wx.setStorageSync('userInfo', user);
          let pages = getCurrentPages();
          getTopPage(pages, 2).setData({
            userInfo: user
          })
        }
      })
    }
  },
  lifetimes: {
    attached() {
      this.setData({
        info: wx.getStorageSync('userInfo')
      })
    }
  }
})
