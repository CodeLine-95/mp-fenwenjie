// pages/my/my_info/my_info.js
const $ =require("../../../utils/request")
const util =require("../../../utils/util")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  userInfo: null,
	  openId: null,
	  wxIcon: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  let that = this;
	  var openId = wx.getStorageSync('openId');
	  if(!openId){
	    wx.navigateTo({
	  	  url: '/pages/login/list/list'
	    })
	  }
	  
	  //获取用户信息
	  var userInfo = wx.getStorageSync('userInfo');
	  that.setData({
		  userInfo: userInfo,
		  openId: openId,
	  })
  },
  
  bindsubmit(e){
	  var formData = e.detail.value;
	  $.post('/api/user/modify',formData).then(res=>{
		  console.log(res)
		  if(res.data.code == 200){
			  wx.setStorage({
			  	key: "userInfo",
			  	data: res.data.data
			  });
			  wx.showModal({
			  	title: '提示',
			  	content: '修改成功',
			  	showCancel: false,
			  	confirmText: '确定',
			  	complete: res => {
					wx.navigateBack({
						delta:1,
					});
			  	}
			  })
		  }else{
			  wx.showModal({
			  	title: '警告',
			  	content: '修改失败',
			  	showCancel: false,
			  	confirmText: '确定',
			  	complete: res => {
			  		return true;
			  	}
			  })
		  }
	  }).catch(res=>{
		  console.log('修改失败',res)
	  })
  },
  
  //调起相机
  ChooseImage() {
  	let that = this
  	wx.chooseImage({
  		count: 1, //默认9
  		sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
  		sourceType: ['album'], //从相册选择
  		success: (res) => {
  			console.log(res.tempFilePaths)
  			$.uploadImg($.UPLOAD_IMG_URL,res.tempFilePaths[0]).then(resImg=>{
  				that.setData({
  					wxIcon: resImg
  				})
  			}).catch(resImg=>{
  				console.log("error",resImg);
  			});
  		}
  	});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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