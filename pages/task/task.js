// pages/task/task.js
const ajax = require('../../utils/ajax.js')
//获取应用实例
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskList: [{
        icon: "/images/task-1.png",
        operation: "邀请好友",
        reward: "平均奖励100次",
        tip: "奖励次数无上限",
        wc: 0,
        total: 1,
        buttonText: "去邀请",
        disabled: false,
        bindtap: 'invite'
      },
      {
        icon: "/images/task-2.png",
        operation: "输入邀请码",
        reward: "奖励10次",
        tip: "输入你好友的邀请码，可以获得奖励",
        wc: 0,
        total: '不限',
        buttonText: "去完成",
        disabled: false,
        bindtap: 'validate'
      },
      {
        icon: "/images/task-3.png",
        operation: "每日签到",
        reward: "奖励2次",
        tip: "每日签到获得2次奖励",
        wc: 0,
        total: '1',
        buttonText: "签到",
        bindtap: 'attendance',
        disabled: false
      },
      {
        icon: "/images/task-4.png",
        operation: "分享小程序",
        reward: "奖励15次",
        tip: "分享到微信群,并有5位好友浏览",
        wc: 0,
        total: 1,
        buttonText: "去分享",
        bindtap: 'share',
        disabled: false,
        openType: "share"
      },
      {
        icon: "/images/task-5.png",
        operation: "关注公众号",
        reward: "奖励20次",
        tip: "搜索关注公众号",
        wc: 0,
        total: 1,
        buttonText: "去关注",
        disabled: false
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showShareMenu({
      withShareTicket: true
    })

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(option) {
    let that = this;
    var url = app.globalData.taskCompleteUrl;
    var openid = app.globalData.openid;
    var data = {
      openid: openid
    };
    ajax.ajax(url, data, function(e) {
      console.log(e)
      var taskList = that.data.taskList;
      for (var i = 1; i <= taskList.length; i++) {
        taskList[i - 1].disabled = e.data["task" + i];
        if (e.data["task" + i]) {
          taskList[i - 1].buttonText = '已完成';

          if (i == 3) {
            taskList[i - 1].wc = 1;
          }
        }
      }

      that.setData({
        taskList: taskList
      })
    })
  },
  invite(e) {
    wx.navigateTo({
      url: '/pages/invite/invite'
    })
  },
  validate(e) {
    wx.navigateTo({
      url: '/pages/validate/validate'
    })
  },
  /**
   * 用户签到
   */
  attendance: function(e) {
    var that = this;
    if (e.detail.userInfo) {
      var url = app.globalData.attendanceUrl;
      var openid = app.globalData.openid;
      var data = {
        openid: openid
      };
      ajax.ajax(url, data, function(res) {
        var taskList = that.data.taskList;
        taskList[2].disabled = true;
        taskList[2].wc = 1;
        app.globalData.subscribe += 2;
        app.globalData.count += 1;
        that.setData({
          taskList: taskList
        })
        wx.showToast({
          title: '签到成功',
          icon: 'success',
          duration: 1000
        })
      });
    }
  },
  share(e) {
    var that = this;
    if (e.detail.userInfo) {

    }
  },
  onShareAppMessage: function(res) {
    var that = this;
    let openid = app.globalData.openid;
    if (res.from === 'button') {

    }
    return {
      title: '短视频下载工具', //分享内容
      path: '/pages/start/start', //分享地址
      imageUrl: '/images/invite_bg_1.png', //分享图片
      success: function(res) {
        console.log(res)

      }
    }

  }


})