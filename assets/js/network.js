const {BASE_URL} = require('../../static/wxurl.js')
function network(url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + url,
      data: data,
      method: method,
      header: {
        'Content-Type': method == 'POST' ? 'application/x-www-form-urlencoded'
        : 'application/json'
      },
      success: function(res) {
        if(res.statusCode == 200) {
          resolve(res.data);
        } else {
          reject('哈哈哈');
        }
      },
      timeout: 3000
    })
  })
}
module.exports = {
  network
}