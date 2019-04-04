// pages/user-detail/user-detail.js
//获取app实例
var app = getApp();

Page({
  data: {
    userInfo: null,
    count: 0,
    subscribe: 0
  },
  onLoad: function(e) {
    wx.showShareMenu({
      // 要求小程序返回分享目标信息
      withShareTicket: true
    }); 
  },
  onShow: function(e) {

    let count = app.globalData.count;
    let subscribe = app.globalData.subscribe;
    let that = this;
    let userInfo = app.globalData.userInfo;
    if (userInfo) {
      this.setData({
        userInfo: userInfo,
        count: count,
        subscribe: subscribe
      })
    }

  },/* 转发*/
  onShareAppMessage: function (ops) {
    
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }

   
    return {
      title: '短视频下载工具',
      path: '/pages/start/start', //分享地址
      imageUrl: '/images/invite_bg_1.png', //分享图片
      success: function (res) {
        
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
       
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }

       
    }
    
  },
})