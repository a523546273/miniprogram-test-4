//index.js
//获取应用实例
const app = getApp()
const ajax = require('../../utils/ajax.js')
Page({
  data: {
    imgUrls: [
      '/images/bg_1.png',
      '/images/bg_2.png'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    url: 'http://www.gifshow.com/s/e4XcxdHE',
    isHidden: true,
    filePath: ""

  },
  onLoad: function() {

  },
  onShow(e) {
    var that = this;
    wx.getClipboardData({
      success(result) {
        var copyData = result.data;
        if (ajax.checkUrl(copyData)){
          wx.showModal({
            title: '快捷复制',
            content: '检测到视频地址',
            confirmText:"一键粘贴",
            confirmColor:"#179B16",
            success(res) {
              if (res.confirm) {
                that.setData({         
                  url: copyData
                })
              }
            }
          })
        }
      }
    })
  },
  getUserInfo: function(e) {
    var that = this;

    if (e.detail.userInfo) {

      var subscribe = app.globalData.subscribe;

      //次数不够
      if (subscribe < 1) {
        wx.showModal({
          title: '提示',
          content: '亲，您的下载次数已经用完，可以在人中心进行充值哦',
          showCancel: true,
          confirmText: '确定',
          success: function(res) {
            if (res.confirm) {
              //console.log('用户点击了“返回授权”')
              wx.switchTab({
                url: '../join/join',
              })
            }
          }
        })
      } else {

        //调用解析接口
        var url1 = app.globalData.parseUrl;
        var url = this.data.url;
        var data = {
          url: url
        }
        ajax.ajax(url1, data, function(result) {
          that.setData({
            isHidden: false,
            filePath: result.msg
          })
        });

      }

    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '提示',
        content: '您点击了拒绝授权，无法使用该功能，请授权之后再点击!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')

          }
        }
      })
    }

  },
  /**
   * 监听url输入，并把输入的值保存在data变量中
   */
  listenerInput: function(e) {
    this.data.url = e.detail.value;

  },
  qingkong: function() {
    // this.data.url = "";
    var that = this;
    that.setData({
      url: "",
      isHidden: true
    })
  },
  doSave(e) {
    var that = this;
    var filePath = this.data.filePath;
    var openid = app.globalData.openid;
    wx.showLoading({
      title: '加载中',
    })
    wx.downloadFile({
      url: filePath,
      success: function(res) {
        //图片保存到本地
        wx.saveVideoToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function(data) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000,
              success: function() {
                wx.hideLoading();
                app.downSuccess();
                //调用下载成功回调
                that.qingkong();

                var url = app.globalData.downSucccessUrl;
                var data = {
                  openid: openid
                };
                ajax.ajax(url, data, function(result) {

                });
              }
            })
          },
          fail: function(err) {
            wx.hideLoading();
            if (err.errMsg == "saveVideoToPhotosAlbum:fail auth deny") {
              //拒绝授权时会弹出提示框，提醒用户需要授权
              wx.showModal({
                title: '提示',
                content: '保存图片需要授权，是否去授权',
                success: function(res) {
                  if (res.confirm) {
                    wx.openSetting({
                      success: function(res) {

                      }
                    })
                  }
                }
              })
            }
          }
        })
      }
    })

  }
})