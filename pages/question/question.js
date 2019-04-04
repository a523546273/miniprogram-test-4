import WxValidate from '../../utils/WxValidate'
const ajax = require('../../utils/ajax.js')

//获取app实例
var app = getApp();

Page({
  data: {
    focus: false,
    photoList: [],
    carWin_img_hidden: true,
    phototip: "请添加文字说明",
    photonum: 0,
    form: {
      advice: '',
      photoUrl: '',
      wechatNumber: '',
      disableUrl: ''
    }

  },
  onLoad: function(options) {
    this.initValidate();
  },
  chosePhoto(e) {
    var that = this;
    wx.chooseImage({
      count: 4,
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: function(res) {
        // 无论用户是从相册选择还是直接用相机拍摄，路径都是在这里面
        var photoList = res.tempFilePaths;
        console.log(photoList)
        //将刚才选的照片/拍的 放到下面view视图中
        that.setData({
          photoList: photoList, //把照片路径存到变量中，
          carWin_img_hidden: false, //让展示照片的view显示
          photonum: photoList.length
        });
        // 这个是使用微信接口保存文件到数据库
        // wx.uploadFile({
        //   url: "",
        //   filePath: filePath,
        //   name: 'file',
        //   success: function (res) {

        //   }
        // })
      },
      fail: function(error) {
        console.error("调用本地相册文件时出错")
        console.warn(error)
      },
      complete: function() {

      }
    });
  },
  previewImage: function(e) {
    var that = this;
    var dataid = e.currentTarget.dataset.id;
    var photoList = that.data.photoList;
    wx.previewImage({
      current: photoList[dataid],
      urls: photoList
    });
  },
  //验证函数
  initValidate() {
    const rules = {
      advice: {
        required: true,
        minlength: 10
      }
    }
    const messages = {
      advice: {
        required: '亲，请填写您宝贵的建议吧',
        minlength: '亲，请输入10字以上哦'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)

  },
  formSubmit(e) {
    var openid = app.globalData.openid;
    var data = e.detail.value;
    data.openid = openid;

    if (!this.WxValidate.checkForm(data)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }

    var url = app.globalData.saveAdviceUrl;
    ajax.ajax(url, data, function(res) {
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 1000,
        success: function() {
          setTimeout(function() {
            //要延时执行的代码
            wx.navigateBack({
              delta: 1
            })
          }, 1500) //延迟时间
        }
      })
    });
  },
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
})