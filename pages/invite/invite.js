// pages/invite/invite.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inviteCode: "",
    ruleList:[
      '累计1-2人，每人奖励2次',
      '累计3-10人，每人奖励10次',
      '累计10人以上，每人奖励20次',
      '达到11人时，可获得额外30天会员奖励(当有数天时，不会扣除次数)',

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.showShareMenu({
      withShareTicket: true
    })
    var inviteCode = app.globalData.inviteCode;
    that.setData({
      inviteCode: inviteCode
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    return {
      title: '短视频下载工具', //分享内容
      path: '/pages/start/start', //分享地址
      imageUrl: '/images/invite_bg_1.png', //分享图片
      success: function (res) {

      }

    }
  },
  setClipboardData(e) {
    var that = this;
    wx.setClipboardData({
      data: that.data.inviteCode,
      success(res) {

      }
    })
  }
})