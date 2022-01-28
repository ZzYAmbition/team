const {network} = require('../../assets/js/network');
Page({
  data: {
    users: [],
    nameForS: '',
    tid: ''
  },
  input(e) {
    let nameForS = e.detail.value.trim();
    this.setData({
      nameForS
    })
  },
  toSearch() {
    let nObj = {
      username: this.data.nameForS
    }
    let _this = this;
    network('/searchUser', 'GET', nObj).then(data => {
      _this.setData({
        users: data
      })
    });
  },
  onLoad: function (options) {
    let tid = options.tid;
    this.setData({
      tid
    })
  },
  adduser(e) {
    let index = e.currentTarget.dataset.index;
    let mJson = {
      tid: this.data.tid,
      member: this.data.users[index]
    }
    network('/addmember', 'GET', mJson).then(data => {
      if(data == '添加成功') {
        wx.navigateBack({
          delta: 1,
        })
      } else if(data == '添加失败') {
        wx.showToast({
          title: '添加成员失败',
          duration: 500
        })
      } else {
        wx.showToast({
          title: '成员已经存在',
          duration: 500
        })
      }
    })
  }
})