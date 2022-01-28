const {network} = require('../../assets/js/network');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    msgs: {
      type: Array,
      value: []
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
    updatemsg(e) {
      let applicant = e.detail;
      this.triggerEvent('updatemsg', applicant);
    }
  },
})
