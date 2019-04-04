// pages/validate/validate.js
const $ = require('../../utils/ajax.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inviteCode: "",
  },
  listenerInput: function (e) {
    this.data.inviteCode = e.detail.value;

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  getUserInfo(e) {
    var that = this;
    if (e.detail.userInfo) {
      var inviteCode = that.data.inviteCode;
      var openid = app.globalData.openid;
      var url = app.globalData.validateUrl;
      var data = {
        inviteCode: inviteCode,
        openid: openid
      };
      if (inviteCode != "") {
        $.ajax(url, data, function(result) {
          app.globalData.subscribe += 10;
          wx.showToast({
            title: '邀请成功',
            icon: 'success',
            duration: 1000,
            success: function () {
              setTimeout(function () {
                //要延时执行的代码
                wx.navigateBack({
                  delta: 1
                })
              }, 1500) //延迟时间
            }
          })
        });

      } else {
        wx.showModal({
          title: '提示',
          content: '邀请码不能为空',
          showCancel: false,
          success(res) {

          }
        })
      }
    }
  }
})