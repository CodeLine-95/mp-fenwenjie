// pages/login/login.js
const $ =require("../../utils/request")
const util =require("../../utils/util")
var app = getApp()
Page({
	data:{
		openId: null,
		userInfo: null,
	},
	
	onLoad(options){
		let that = this;
		var openId = wx.getStorageSync('openId');
		if(!openId){
			wx.navigateTo({
				url: '/pages/login/list/list',
			})
		}
		
		that.setData({
			openId: openId
		})
		
		//获取用户信息
		wx.getUserInfo({
			lang:'zh_CN',
			success: function(res) {
				that.setData({
					userInfo: res.userInfo
				})
			}
		})
	},
	
	bindsubmit(e){
		console.log(e.detail.value);
		var formData = e.detail.value;
		$.post("/api/user/login",JSON.stringify(formData)).then(res=>{
			console.log(res.data)
			if(res.data.code == 200){
				wx.setStorage({
					key: "userInfo",
					data: res.data.data
				});
				wx.showToast({
					title: '登录成功',
					icon: 'success',
					duration: 2000,
					mask: true,
					success:function(){
						wx.navigateTo({
							url: '/pages/index/index',
						});
					}
				})	
			}else{
				console.log('登录失败...',res);
				wx.showToast({
				  title: '登录失败',
				  icon: 'none',
				  duration: 2000,
				  mask: true,
				})
			}
		}).catch(res=>{
			console.log('登录失败...',res);
		})
	}
})