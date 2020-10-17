// pages/resource/home/home.js
const $ =require("../../../utils/request")
const util =require("../../../utils/util")
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  // behaviors: [myBehavior],
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
	  userInfo: null,
	  openId: null,
	  viewList: [],
	  isLogin: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
	  logout(){
		  wx.showModal({
		  	title: '警告',
		  	content: '确认要退出登录吗？',
		  	showCancel: true,
			cancelText: '取消',
		  	confirmText: '确定',
		  	success: res => {
				if (res.confirm) {
					try {
						wx.removeStorageSync('openId');
						wx.removeStorageSync('userInfo');
						wx.navigateTo({
							url: '/pages/my/home/home'
						})
					} catch (e) {
						wx.showToast({
							title: '退出失败',
							icon: 'none',
							duration: 2000
						})
					}
				}else if (res.cancel) {
					console.log('用户点击取消');
				}
		  	}
		  })
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
  },  /*组件生命周期*/ 
  lifetimes: {
    created() {
		let that = this;
		console.log("在组件实例刚刚被创建时执行")
		var openId = wx.getStorageSync('openId');
		var userInfo = wx.getStorageSync('userInfo');
		if(!openId || !userInfo){
		  wx.removeStorageSync('openId');
		  wx.removeStorageSync('userInfo');
		  wx.navigateTo({
			  url: '/pages/login/list/list'
		  })
		}

		//用户信息
		$.get("/api/user/page",{userId:userInfo.id}).then(res=>{
			if(res.data.code == 200){
				var viewList = res.data.data;
				viewList.forEach(function(item,index){
					if(item.itemName.indexOf('审核') != -1){
						viewList[index]['itemUrl'] = '/pages/my/check/check?id='+userInfo.id
					}else{
						viewList[index]['itemUrl'] = '/pages/my/publish/publish?id='+userInfo.id
					}
				})
				that.setData({
					isLogin: true,
					viewList: res.data.data,
					openId: openId,
					userInfo: userInfo
				});
			}else{
				console.log('获取失败...',res);
			}
		}).catch(res=>{
			console.log('获取失败...',res);
		})
    },
    attached() { 
      console.log("在组件实例进入页面节点树时执行")
      console.log("app",app)
    },
    ready() {
      console.log("在组件在视图层布局完成后执行");
    },

    moved() {
      console.log("在组件实例被移动到节点树另一个位置时执行")
    },
    detached() {
      console.log("在组件实例被从页面节点树移除时执行")
    },
    error() {
      console.log("每当组件方法抛出错误时执行")
    },
    /*组件所在页面的生命周期 */
    pageLifetimes: {
      show: function () {
        // 页面被展示
        console.log("页面被展示")
      },
      hide: function () {
        // 页面被隐藏
        console.log("页面被隐藏")
      },
      resize: function (size) {
        // 页面尺寸变化
        console.log("页面尺寸变化")
      }
    }
   
  }
})
