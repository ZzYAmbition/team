const {network} = require('../../assets/js/network');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemName: '',
    msgs: [],
    teams: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    let openidObj = {
      openid: wx.getStorageSync('_3rdSession')
    };
    wx.setNavigationBarTitle({
      title: options.data,
    })
    this.setData({
      itemName: options.data
    })
    let receiver = wx.getStorageSync('userInfo');
    network('/querymsg', 'GET', receiver).then(msgs => {
      _this.setData({
        msgs: msgs
      })
    });
    network('/querymyteam', 'GET', openidObj).then(teams => {
      console.log(teams)
      _this.setData({
        teams: teams
      })
    });
  },
  updatemsg(e) {
    let wherestr = {
      msg_id: e.detail._id,
      openid: wx.getStorageSync('_3rdSession')
    }
    let _this = this;
    network('/deletemsg', 'GET', wherestr).then(docs => {
      _this.setData({
        msgs: docs
      })
    })
  }
})