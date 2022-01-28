const {network} = require('../../assets/js/network');
const getTopPage = require('../../utils/util').getTopPage;
Page({
  data: {
    tags: [
    ],
    showModal: false
  },
  onLoad: function () {
    console.log(wx.getStorageSync('tags'))
    this.setData({
      tags: wx.getStorageSync('tags')
    })
  },
  toAddTag() {
    this.setData({
      showModal: true
    })
  },
  cancel() {
    this.setData({
      showModal: false
    })
  },
  confirm(e) {
    let tagname = e.detail.newTagName;
    let _this = this;
    this.setData({
      showModal: false
    });
    let tagObj = {
      tagname
    }
    network('/addtag', 'GET', tagObj).then(data => {
      if(data.msg == '添加分类成功') {
        _this.setTags(_this, data, '添加成功');
      } else if(data.msg == '该标签已经存在') {
        wx.showToast({
          title: '该标签已经存在',
        })
      }
    })
  },
  deleteTag(e) {
    let _this = this;
    wx.showModal({
      title: '提示',
      content: '这将会删除该分类和当前你所有属于该分类的队伍',
      cancelColor: 'cancelColor',
      success(res) {
        if(res.confirm) {
        let _id = _this.data.tags[e.target.dataset.index]._id;
        network('/deletetag', 'GET', {_id: _id, openid: wx.getStorageSync('_3rdSession')}).then(data => {
          if(data.msg == '删除成功') {
            _this.setTags(_this, data, '删除成功');
          }
        })
        }
      }
    })
  },
  setTags(current, data, msg) {
    current.setData({
      tags: data.tags
    })
    wx.showToast({
      title: msg,
      duration: 500
    });
    let parentPage = getTopPage(getCurrentPages(), 2);
    data.tags.unshift({_id: 'all', tagname: '全部'});
    parentPage.setData({
      tags: data.tags
    })
  }
})