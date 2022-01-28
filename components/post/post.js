const {network} = require('../../assets/js/network');
const getTopPage = require('../../utils/util').getTopPage;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    postItem: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    myopenid: wx.getStorageSync('_3rdSession')
  },
  /**
   * 组件的方法列表
   */
  methods: {
    toDetail() {
      let postStr = JSON.stringify(this.properties.postItem)
      wx.navigateTo({
        url: '../../pages/postdetail/postdetail?post=' + postStr,
      })
    },
    delClick() {
      let postId = {
        _id: this.properties.postItem._id
      }
      wx.showModal({
        title: '提示',
        content: '确定要删除该帖子吗?',
        cancelColor: 'cancelColor',
        success(res) {
          if(res.confirm) {
            network('/delpost', 'GET', postId).then(data => {
              console.log(data);
              if(data.msg == '删除成功') {
                wx.showToast({
                  title: '删除成功',
                  duration: 1000
                })
                let pages = getCurrentPages();
                getTopPage(pages, 1).setData({
                  postArr: data.docs
                })
              }
            })
          }
        }
      })
    }
  }
})
