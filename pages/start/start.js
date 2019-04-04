//login.js
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中',
    angle: 0,
    userInfo: {}
  },
  getUserInfo : function (e) {
    let userInfo = e.detail.userInfo;
    if (userInfo) {
      app.setUserInfo(userInfo);
      wx.switchTab({
        url: '/pages/index/index',
      });
    }
    
  },
  onLoad: function () {
    var that = this
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onShow: function () {
    let that = this
    let userInfo = app.globalData.userInfo;
    if (!userInfo) {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
          })
        }
      })
    } else {
      that.setData({
        userInfo: userInfo
      })
    }
  },
  onReady: function () {
    var that = this;
    setTimeout(function () {
      that.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function (res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) {
        angle = 14;
      } else if (angle < -14) {
        angle = -14;
      }
      if (that.data.angle !== angle) {
        that.setData({
          angle: angle
        });
      }
    });
  }
});