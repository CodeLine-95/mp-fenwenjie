// pages/authen/authen.js
const $ =require("../../utils/request")
const util =require("../../utils/util")
Page({
  data: {
      //判断小程序的API，回调，参数，组件等是否在当前版本可用。
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
	  action: null,
  },
  onLoad: function (options) {
		var that = this;
		that.setData({
		  action: options.action
		})
		//查看是否授权
		var openId = wx.getStorageSync('openId')
		if(openId){
			if(that.data.action == 'login'){
				var jumpUrl = '/pages/login/login';
			}else if(that.data.action == 'auth'){
				var jumpUrl = '/pages/auth/auth';
			}
			wx.navigateTo({
				url: jumpUrl
			})
		}
  },
  bindGetUserInfo: function (e) {
      if (e.detail.userInfo) {
          //用户按了允许授权按钮，获取openid
          var that = this;
		  var appId = 'wxbc3feeb2e4b31e69';
		  var AppSecret = '759c59192a6b18d247923e2fb1936c0f';
		  // var appId = 'wx6da3c72afe9a3244';
		  // var AppSecret = '9b9e81afc2b516855e0b50e5f7073f3c';
		  wx.login({
		    success (res) {
		      if (res.code) {
		        //发起网络请求
		        wx.request({
					url: 'https://api.weixin.qq.com/sns/jscode2session',
					data: {
						appid: appId,
						secret: AppSecret,
						js_code: res.code,
						grant_type: 'authorization_code'
					},
					header: {
						'content-type': 'application/json'
					},
					method: 'GET',
					success: function(resData){
						console.log(resData)
						if(("openid" in resData.data) && resData.data.openid != ''){
							getApp().globalData.openId = resData.data.openid;
							wx.setStorage({
							  key: "openId",
							  data: resData.data.openid
							})
							if(that.data.action == 'login'){
								var jumpUrl = '/pages/login/login';
							}else if(that.data.action == 'auth'){
								var jumpUrl = '/pages/auth/auth';
							}
							wx.navigateTo({
								url: jumpUrl
							})
						}else{
							wx.showModal({
							    title:'警告',
							    content:'获取openid失败，请重试!!!',
							    showCancel:false,
							    confirmText:'确定',
							    success:function(res){
							        if (res.confirm) {
							            console.log('获取openid失败，请重试!!!')
							        } 
							    }
							})
						}
					}
		        })
		      } else {
				wx.showModal({
				    title:'警告',
				    content:'登录失败！'+res.errMsg,
				    showCancel:false,
				    confirmText:'确定',
				    success:function(res){
				        if (res.confirm) {
				            console.log('登录失败！'+res.errMsg)
				        } 
				    }
				})
		      }
		    }
		  })
      } else {
          //用户按了拒绝按钮
          wx.showModal({
              title:'警告',
              content:'您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
              showCancel:false,
              confirmText:'返回授权',
              success:function(res){
                  if (res.confirm) {
                      console.log('用户点击了“返回授权”')
                  } 
              }
          })
      }
  },
  
})