//app.js
// pages/task/task.js
const ajax = require('utils/ajax.js')

App({
  onLaunch: function(e) {
    console.log("初始化---", e)
    var share_openid = e.query.share_openid;

    var that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    var urlPath = that.globalData.urlPath;
    wx.login({
      success(loginRes) {
        if (loginRes) {
          var code = loginRes.code;
          var url = that.globalData.login;
          var data = {
            code: code,
            shareOpenid: share_openid
          };
          ajax.ajax(url, data, function(res) {
            that.globalData.openid = res.data.openid;
            that.globalData.session_key = res.data.session_key;
            that.globalData.subscribe = res.data.subscribe;
            that.globalData.count = res.data.count;
            that.globalData.inviteCode = res.data.inviteCode;


          });

        } else {

        }
      }
    });

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          //console.log(11111)
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              that.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          //console.log(22222)
        }

      }
    })

  },
  downSuccess: function() {
    var that = this;
    that.globalData.subscribe = that.globalData.subscribe - 1;
  },
  setUserInfo: function(userInfo) {
    var that = this;
    that.globalData.userInfo = userInfo;
  },
  globalData: {
    userInfo: null,
    openid: '',
    session_key: "",
    subscribe: 0,
    count: 0,
    inviteCode: "",
    login: "login/wxLogin",
    parseUrl: "down/download",
    downSucccessUrl: "down/downSuccess",
    saveAdviceUrl: "advice/insert",
    attendanceUrl: "attendance/insert",
    taskCompleteUrl: "/down/task",
    validateUrl: "/down/validate",
    
  }



})