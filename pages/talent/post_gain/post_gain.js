// pages/talent/post_gain/post_gain.js
const $ =require("../../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyIndex: 0,
    companyPicker: ['百度', '阿里', '腾讯'],
    positionIndex: 0,
    positionPicker: [ '前端', 'Java','Python'],
    imgList: [],
    img:'',
    title:"",
    content:"",
    multiArray: [['高校', '企业'], ['中国农业大学', '华中农业大学', '南京农业大学', '江西农业大学']],
    multiIndex: [0, 0, 0]
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['中国农业大学', '华中农业大学', '南京农业大学', '江西农业大学'];
            break;
          case 1:
            data.multiArray[1] = ['字节跳动', '百度', '阿里巴巴','京东','腾讯'];
            break;
        }
        data.multiIndex[1] = 0;
        break;
    }
    console.log(data.multiIndex);
    this.setData(data);
  },
  companyChange(e) {
    console.log(e);
    this.setData({
      companyIndex: e.detail.value
    })
  },
  positionChange(e) {
    console.log(e);
    this.setData({
      positionIndex: e.detail.value
    })
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  ChooseImage() {
    console.log("ChooseImage")
    const that = this
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        var tempFilePaths = res.tempFilePaths;
        //上传图片
        $.uploadImg($.UPLOAD_IMG_URL,tempFilePaths[0]).then(res=>{
          console.log("uploadImg",res)
          that.setData({
            imgList: [res]
          })
        })
     
      },
      complete:(res=>{
        console.log("complete",res);
      })
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '警告',
      content: '确定要删除这张图片吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("start..........")
    // wx.request({
    //   url: 'http://localhost/api/post/common_list',
    //   method: "GET",//指定请求方式，默认get
    //   data: { id: 2010140},
    //   header: {
    //      //默认值'Content-Type': 'application/json'
    //     'content-type': 'application/x-www-form-urlencoded' //post
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    //   },
    //   error:function(res){
    //     console.log(res.data)
    //   }
    // });
    console.log("end..........")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})