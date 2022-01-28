const formatDate = require('../../utils/util').formatDate;
const {network} = require('../../assets/js/network');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tags: [],
    selectedTags: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({
      tags: wx.getStorageSync('tags')
    })
  },
  // picker标签选择事件
  bindPickerChange(e) {
    let tag = this.data.tags[e.detail.value];
    let _this = this;
    if(this.data.selectedTags != null) {
      wx.showModal({
        title: '提示',
        content: '这将会替换掉已有分类，确定替换吗？',
        cancelColor: 'cancelColor',
        success(res) {
          if(res.confirm) {
            _this.setData({
              selectedTags: tag
            })
          }
        }
      })
    } else {
      this.setData({
        selectedTags: tag
      })
    }
  },
  formSubmit(e) {
    let teamtitle = e.detail.value.teamtitle;
    let declaration = e.detail.value.declaration;
    let maxnum = e.detail.value.maxnum;
    let isaward = e.detail.value.isaward;
    let type = this.data.selectedTags;
    let date = formatDate(new Date());
    let captain = wx.getStorageSync('userInfo');
    let contact = e.detail.value.contact;
    let teammates = [];
    let team = {
      teamtitle,
      declaration,
      maxnum,
      isaward,
      type,
      date,
      captain,
      teammates,
      contact
    };
    network('/addteam', 'GET', team).then(data => {
      if(data == '成功') {
        wx.showToast({
          title: '创建成功',
          duration: 500
        })
        wx.navigateBack({
          delta: 1,
        })
      }
    })
  }
})