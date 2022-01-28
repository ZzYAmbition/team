const {network} = require('../../assets/js/network')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    applymsg: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    agree() {
      let _this = this;
      let mJson = {
        tid: this.properties.applymsg.team._id,
        member: this.properties.applymsg.applicant
    }
      network('/addmember', 'GET', mJson).then(data => {
        let id = {
          _id: _this.properties.applymsg._id
        }
        if(data == '添加成功') {
          wx.showToast({
            title: '已同意',
            duration: 1000
          })
          _this.triggerEvent('updatemsg', id);
        } else if(data == '添加失败') {
          wx.showToast({
            title: '添加成员失败',
            duration: 500
          })
          _this.triggerEvent('updatemsg', id);
        } else {
          wx.showToast({
            title: '成员已经存在',
            duration: 500
          })
          _this.triggerEvent('updatemsg', id);
        }
      })
    },
    refuse() {
      let id = {
        _id: this.properties.applymsg._id
      }
      this.triggerEvent('updatemsg', id);
    }
  }
})
