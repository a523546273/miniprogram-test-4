var app = getApp();

/**
 * @name 请求数据
 * @param {string} url        请求地址
 * @param {object} params     参数
 * @param {function} callback   成功回调函数
 * @param {function} failcall   失败回调函数
 * @param {bool} loading 是否显示加载框
 */
var urlPath = "http://192.168.1.2:8080/";

function ajax(url, params, callback, failcall) {
  let that = this;
  // 判断是否需要显示加载框
  wx.showLoading({
    title: '加载中',
    mask: true
  });

  wx.request({
    url: urlPath + url,
    data: params,
    header: {
      'content-type': 'application/x-www-form-urlencoded;'
    },
    method: "POST",
    success: function(res) {
      wx.hideLoading();
      // 此处与接口约定好，返回的code对应不同的结果
      if (res.statusCode = 200 && res.data.code == "0") {
        // 如果有请求成功回调函数，则调用
        typeof callback == "function" && callback(res.data);
      } else if (res.statusCode = 200 && res.data.code != "0") {
        wx.showModal({
          title: '提示',
          content: res.data.msg,
          showCancel: false,
          confirmColor: '#92BA00'
        });
      } else {
        // 如果有请求失败回调函数，则调用
        if (failcall) {
          failcall(res.data);
        } else {
          if (res.data.message) {
            wx.showModal({
              title: '提示',
              content: res.data.message,
              showCancel: false,
              confirmColor: '#92BA00'
            });
          }
        }
      }
    },
    fail: function(res) {
      console.log(res);
      wx.hideLoading();
      wx.showModal({
        title: '提示',
        content: "网络异常，请稍后再试",
        showCancel: false,
        confirmColor: '#92BA00'
      });
      return false;
    }
  });
}

function checkUrl(urlString) {
  if (urlString != "") {
    var reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
    if (!reg.test(urlString)) {
      return false;
    }
    return true;
  }
  return false;
}

function returnShare(callback, failcall){
  return {
    title: '短视频下载工具', //分享内容
    path: '/pages/start/start', //分享地址
    imageUrl: '/images/invite_bg_1.png', //分享图片
    success: function (res) {
      
      if (failcall) {
        failcall(res.data);
      } 

    }
  }
}

module.exports.ajax = ajax
module.exports.checkUrl = checkUrl
module.exports.returnShare = returnShare