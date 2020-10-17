// pages/my/practice_check_info/practice_check_info.js
const $ =require("../../../utils/request")
const util =require("../../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{},//实践审核详情页的数据
    html:'',//需要替换的article文段
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
    console.log('传入的参数',options.postId);
    var data = {
		userId: options.postId
	}
    $.get("/api/user/practiceAuditDetail",data).then(res=>{
      console.log('请求的detail数据',res.data)
      if(res.data.code==200){
        this.setData({
          detail:res.data.data,
          html:res.data.data.article
        })
      }else{
        console.log("数据加载失败....");
      }
    })
    
  },
  
  userAudit(e){
  	  var formData = e.currentTarget.dataset;
  	  wx.request({
  		  url: $.BASE_URL+'/api/user/practiceAudit',
  		  method:'GET',
  		  dataType:'json',
  		  header: {
  			  'content-type': 'application/x-www-form-urlencoded'
  		  },
  		  data: {
			  userId: formData.userid,
			  status: formData.status,
  		  },
  		  success(res){
  			  if(res.data.code == 200){
  				  wx.showModal({
  				  	title: '提示',
  				  	content: '审核成功',
  				  	showCancel: false,
  				  	confirmText: '确定',
  				  	complete: res => {
  				  		wx.navigateBack({
  							delta:1,
  						})
  				  	}
  				  })
  			  }else{
  				  wx.showModal({
  				  	title: '警告',
  				  	content: '审核失败',
  				  	showCancel: false,
  				  	confirmText: '确定',
  				  	complete: res => {
  						return true;
  				  	}
  				  })
  			  }
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