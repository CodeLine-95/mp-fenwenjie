const $ =require("../../../utils/request")
const util =require("../../../utils/util")
/*
*本页面的userId还未填写 全部暂设为1
 */

// pages/my/check/check.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    waitCheckFlag:1,  //待审核
    passCheckFlag:0,  //已审核

    userCheckFlag:1,  //用户审核
    practiceCheckFlag:0,  //实践审核

    waitUserList:[], //待审核用户审核数组
    waitPracticeList:[], //待审核实践审核数组
    passUserList:[],//已审核用户审核数组
    passPracticeList:[],//已审核实践审核数组
	
	userInfo: null,
  },

  //选择待审核界面
  waitCheckHandler:function(){
    if(this.data.waitCheckFlag==0){
      this.setData({
        waitCheckFlag:1,
        passCheckFlag:0,

        userCheckFlag:1,
        practiceCheckFlag:0,
        //待审核---用户审核
        //待审核数据请求（未写）
      })
      console.log("待审核---用户审核界面")
    }
  },
  //选择已审核界面
  passCheckHandler:function(){
    if(this.data.passCheckFlag==0){
      this.setData({
        waitCheckFlag:0,
        passCheckFlag:1,

        userCheckFlag:1,
        practiceCheckFlag:0,
        //已审核数据请求（未写）
      })
      console.log("已审核---用户审核界面")
    }
  },
  //选择用户审核界面
  userCheckHandler:function(){
    if(this.data.userCheckFlag==0){
      if(this.data.waitCheckFlag==1){
        this.setData({
          userCheckFlag:1,
          practiceCheckFlag:0,
        })
        console.log("待审核---用户审核界面")
      }else{
        this.setData({
          userCheckFlag:1,
          practiceCheckFlag:0,
        })
        console.log("已审核---用户审核界面")
      }
    }
  },
  //选择实践审核界面
  practiceCheckHandler:function(){
    if(this.data.practiceCheckFlag==0){
      if(this.data.waitCheckFlag==1){
        this.setData({
          userCheckFlag:0,
          practiceCheckFlag:1,
        })
        console.log("待审核---实践审核界面")
      }else{
        this.setData({
          userCheckFlag:0,
          practiceCheckFlag:1,
        })
        console.log("已审核---实践审核界面")
      }
    }
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

	var userInfo = wx.getStorageSync('userInfo');
	that.setData({
	  userInfo: userInfo,
	})
	  
	//待审核用户
	var waitData = {
		userId: options.id,
		status: 2,
		pageSize: 10
	}
	$.post("/api/user/userAuditList",waitData).then(res=>{
		console.log("waitData",res.data)
		// res.data = {"code":200,"msg":"success","errMsg":"","sysTime":10999999233,"data":[{"userId":1,"wxIcon":"https://inews.gtimg.com/newsapp_bt/0/9924121813/1000","wxId":"xiaohong","userIdentity":2,"realName":"王大锤","organizeName":"百度网讯","gmtUpdate":10999999233,"userStatus":2},{"userId":2,"wxIcon":"https://inews.gtimg.com/newsapp_bt/0/9924121813/1000","wxId":"xiaohong","userIdentity":1,"realName":"小明","organizeName":"中国农业大学 计算机学院","gmtUpdate":10999999234,"userStatus":2}]}
		if(res.data.code==200){
			this.setData({
			  waitUserList:res.data.data
			})
		}else{
			console.log("数据加载失败....");
		}
	}).catch(res=>{
		console.log("error",res);
	})
	
	//已审核用户
	var passUserData = {
		userId: options.id,
		status: 1,
		pageSize: 10
	}
    $.post("/api/user/userAuditList",passUserData).then(res=>{
		console.log('passUserList',res.data)
		// res.data = {"code":200,"msg":"success","errMsg":"","sysTime":10999999233,"data":[{"userId":1,"wxIcon":"https://inews.gtimg.com/newsapp_bt/0/9924121813/1000","wxId":"xiaohong","userIdentity":2,"realName":"王智慧","organizeName":"百度网讯","gmtUpdate":10999999233,"userStatus":1},{"userId":2,"wxIcon":"https://inews.gtimg.com/newsapp_bt/0/9924121813/1000","wxId":"xiaohong","userIdentity":1,"realName":"小王","organizeName":"华中农业大学 工学院","gmtUpdate":10999999234,"userStatus":0}]}
		if(res.data.code==200){
			this.setData({
			  passUserList:res.data.data
			})
		}
    }).catch(res=>{
		console.log("error",res);
    })
	
	//待审核实践
	var waitPracticeData = {
		userId: options.id,
		status: 2,
		pageSize: 10
	}
    $.post("/api/user/practiceAuditList",waitPracticeData).then(res=>{
      console.log("waitPracticeList",res.data)
	  // res.data = {"code":200,"msg":"success","errMsg":"","sysTime":10999999233,"data":[{"postId":1,"wxIcon":"https://inews.gtimg.com/newsapp_bt/0/9924121813/1000","wxId":"xiaohong","postType":1,"title":"李二狗","gmtUpdate":10999999233,"gmtUpdateFormat":"2019-10-11 12:23:45","schoolName":"中国农业大学","majorName":"计算机学院","jobTitle":"java开发","cityName":"北京","postStatus":2},{"postId":1,"wxIcon":"https://inews.gtimg.com/newsapp_bt/0/9924121813/1000","wxId":"xiaohong","postType":2,"title":"毕业实习","gmtUpdate":10999999233,"gmtUpdateFormat":"2019-10-11 12:23:45","schoolName":"中国农业大学","majorName":"计算机学院","jobTitle":"产品经理","cityName":"北京","postStatus":2}]}
      if(res.data.code==200){
        this.setData({
          waitPracticeList:res.data.data
        })
      }
    }).catch(res=>{
         console.log("error",res);
    })
	
	//已审核实践
	var passPracticeData = {
		userId: options.id,
		status: 1,
		pageSize: 10
	}
    $.post("/api/user/practiceAuditList",passPracticeData).then(res=>{
      console.log("passPracticeList",res.data)
	  // res.data = {"code":200,"msg":"success","errMsg":"","sysTime":10999999233,"data":[{"postId":1,"wxIcon":"https://inews.gtimg.com/newsapp_bt/0/9924121813/1000","wxId":"xiaohong","postType":1,"title":"李二狗","gmtUpdate":10999999233,"gmtUpdateFormat":"2019-10-11 12:23:45","schoolName":"中国农业大学","majorName":"计算机学院","jobTitle":"java开发","cityName":"北京","postStatus":1},{"postId":2,"wxIcon":"https://inews.gtimg.com/newsapp_bt/0/9924121813/1000","wxId":"xiaohong","postType":2,"title":"毕业实习","gmtUpdate":10999999233,"gmtUpdateFormat":"2019-10-11 12:23:45","schoolName":"中国农业大学","majorName":"计算机学院","jobTitle":"产品经理","cityName":"北京","postStatus":0}]}
      if(res.data.code==200){
        this.setData({
          passPracticeList:res.data.data
        })
      }
    }).catch(res=>{
         console.log("error",res);
    }),

    this.setData({
      waitCheckFlag:1,
      passCheckFlag:0,

      userCheckFlag:1,
      practiceCheckFlag:0,
      //待审核---用户审核
      //待审核数据请求（未写）
    })
    console.log("待审核---用户审核界面")
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