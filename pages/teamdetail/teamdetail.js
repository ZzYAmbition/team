const {network} = require('../../assets/js/network');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    team: {},
    isDisabled: true,
    isAdd: true,
    mergeFlag: true,
    contact: '',
    isaward: '',
    isC: false,
    isI: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let team = JSON.parse(options.data);
    let isDisabled = team.captain.openid == wx.getStorageSync('_3rdSession') ? false : true;
    let isAdd = true;
    for(let teammate of team.teammates) {
      if(teammate.openid == wx.getStorageSync('_3rdSession')) {
        isAdd = false;
        break;
      }
    }
    let mergeFlag = true;
    if(isDisabled == false || isAdd == false) {
      mergeFlag = false;
    }
    this.setData({
      team,
      isDisabled,
      isAdd,
      mergeFlag
    })
    console.log(team);
  },
  addMember() {
    let team = this.data.team;
    if(!this.data.isDisabled) {
      if(team.teammates.length == team.maxnum) {
        wx.showToast({
          title: '队伍人数已经最大',
          duration: 1000
        })
      } else {
        wx.navigateTo({
          url: '../../pages/searchuser/searchuser?tid=' + team._id,
        })
      }
    } else {
      wx.showToast({
        title: '无权限'
      })
    }
  },
  deleteteam() {
    let team_id = {
      _id: this.data.team._id
    }
    if(!this.data.isDisabled) {
      network('/deleteteam', 'GET', team_id).then(docs => {
        if(docs == '删除成功') {
          wx.showToast({
            title: '删除成功'
          });
          wx.navigateBack({
            delta: 1,
          })
        }
      })
    } else {
      wx.showToast({
        title: '无权限',
      })
    }
  },
  removeFromTeam(e) {
    let index = e.currentTarget.dataset.index;
    let teammates = this.data.team.teammates;
    teammates.splice(index, 1);
    let _this = this;
    if(!this.data.isDisabled) {
      wx.showModal({
        title: '提示',
        content: '确定要移除该队友吗？',
        cancelColor: 'cancelColor',
        success(res) {
          if(res.confirm) {
            _this.setData({
              'team.teammates': teammates
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: '无权限'
      })
    }
  },
  save() {
    let team = this.data.team;
    team.contact = this.data.isC ? this.data.contact : team.contact;
    team.isaward = this.data.isI ? this.data.isaward : team.isaward;
    console.log(this.data.team);
    network('/updateteam', 'GET', team).then(docs => {
      if(docs == '保存成功') {
        wx.showToast({
          title: '保存成功',
          duration: 500
        })
        wx.navigateBack({
          delta: 1,
        })
      }
    }, reason => {
      console.log(reason);
    })
  },
  contactinput(e) {
    this.data.isC = true;
    this.setData({
      contact: e.detail.value.trim()
    })
  },
  isawardinput(e) {
    this.data.isI = true;
    this.setData({
      isaward: e.detail.value.trim()
    })
  }
})