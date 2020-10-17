// pages/login/login.js
Page({
	data: {
	},
	
	login(){
		//查看是否授权
		var openId = wx.getStorageSync('openId')
		if(openId){
			wx.navigateTo({
				url: '/pages/login/login'
			})
		}else{
			wx.navigateTo({
				url: '/pages/authen/authen?action=login'
			})
		}
		
	},
	
	auth(){
		//查看是否授权
		var openId = wx.getStorageSync('openId')
		if(openId){
			wx.navigateTo({
				url: '/pages/auth/auth'
			})
		}else{
			wx.navigateTo({
				url: '/pages/authen/authen?action=auth'
			})
		}
	}
  })