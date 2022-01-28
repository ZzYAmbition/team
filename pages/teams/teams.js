const {network} = require('../../assets/js/network')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tag: '全部',
    isShow: false,
    tags: [
      {_id: 'all', tagname: '全部'}
    ],
    teams: []
  },
  onLoad: function () {
    let _this = this;
    network('/gettags', {}).then(data => {
      console.log(data);
      let tags = _this.data.tags;
      tags.push(...data);
      _this.setData({
        tags: tags
      })
      wx.setStorageSync('tags', data);
    });
    network('/queryteam', {}).then(data => {
      _this.setData({
        teams: data
      })
      console.log(_this.data.teams);
    })
  },
  changeState() {
    this.setData({
      isShow: !this.data.isShow
    })
  },
  changeTag(e) {
    let index = e.target.dataset.index;
    let tag = {
      type: this.data.tags[index]
    }
    let _this = this;
    network('/queryteambytag', 'GET', tag).then(docs => {
      console.log(docs)
      this.setData({
      tag: _this.data.tags[index].tagname,
      isShow: !_this.data.isShow,
      teams: docs
    })
    })
  },
  toEditTag() {
    wx.navigateTo({
      url: '../edittag/edittag',
    })
  },
  addTeam() {
    wx.navigateTo({
      url: '../addteam/addteam',
    })
  }
})