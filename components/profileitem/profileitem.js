// components/profileitem/profileitem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgUrl: {
      type: String,
      value: ''
    },
    itemName: {
      type: String,
      value: ''
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
    itemClick() {
      wx.navigateTo({
        url: '../../pages/commonpage/commonpage?data=' + this.properties.itemName,
      })
    }
  }
})
