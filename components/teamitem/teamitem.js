const {network} = require('../../assets/js/network')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    team: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isDisabled: false,
    isAdd: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toTeamDetail() {
      let team = JSON.stringify(this.properties.team);
      wx.navigateTo({
        url: '../../pages/teamdetail/teamdetail?data=' + team,
      })
    },
    apply() {
      if(this.properties.team.maxnum > this.properties.team.teammates.length + 1) {
        let applicant = wx.getStorageSync('userInfo');
        let receiver = this.properties.team.captain;
        let team = {
          _id: this.properties.team._id,
          teamtitle: this.properties.team.teamtitle
        }
        let msg_type = 'applyteam';
        console.log(applicant)
        console.log(receiver)
        console.log(team)
        let msg = {
          applicant,
          receiver,
          team,
          msg_type
        }
        network('/applyteam', 'GET', msg).then(docs => {
          if(docs == 'err') {
            wx.showToast({
              title: '您已经申请过了',
              duration: 500
            })
          } else {
            wx.showToast({
            title: '您的申请已提交',
            duration: 500
            })
          }
        })
      } else {
        wx.showToast({
          title: '队伍人已满',
          duration: 500
        })
      }
    }
  },
  lifetimes: {
    attached() {
      let isDisabled = this.properties.team.captain.openid == wx.getStorageSync('_3rdSession') ? true : false;
      let isAdd = false;
      for(let teammate of this.properties.team.teammates) {
        if(teammate.openid == wx.getStorageSync('_3rdSession')) {
          isAdd = true;
          break;
        }
      }
      this.setData({
        isDisabled,
        isAdd
      })
    }
  }
})
