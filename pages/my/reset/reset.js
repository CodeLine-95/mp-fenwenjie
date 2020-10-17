// pages/my/reset/reset.js
const $ =require("../../../utils/request")
const util =require("../../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  userInfo: null,
	  openId: null,
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
	  //确认密码判断
	  if(formData.password == ''){
		  wx.showModal({
		  	title: '警告',
		  	content: '密码不能为空',
		  	showCancel: false,
		  	confirmText: '确定',
		  	complete: res => {
		  		return false;
		  	}
		  })
	  }else{
		  if(formData.valid_password != formData.password){
		  	wx.showModal({
		  		title: '警告',
		  		content: '两次密码输入不一致',
		  		showCancel: false,
		  		confirmText: '确定',
		  		complete: res => {
		  			return false;
		  		}
		  	})
		  }
	  }
	  delete formData.valid_password;
	  //修改密码
	  wx.request({
		  url: $.BASE_URL+ '/api/user/modifyPwd',
		  method: 'POST',
		  dataType:'json',
		  header: {
			  'content-type': 'application/x-www-form-urlencoded'
		  },
		  data: formData,
		  success(res) {
		  	if(res.data.code == 200){
			  wx.showModal({
				title: '提示',
				content: '密码修改成功',
				showCancel: false,
				confirmText: '确定',
				complete: res => {
					wx.navigateBack({
						delta:2,
					});
				}
			  })
		  	}else{
			  wx.showModal({
				title: '警告',
				content: '密码修改失败',
				showCancel: false,
				confirmText: '确定',
				complete: res => {
					return false;
				}
			  })
		  	}
		  },
		  fail(res){
			  wx.showModal({
				title: '警告',
				content: '异常错误',
				showCancel: false,
				confirmText: '确定',
				complete: res => {
					return false;
				}
			  })
		  }
	  })
	  
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