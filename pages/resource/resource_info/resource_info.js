// pages/resource/resource_info/resource_info.js
const $ =require("../../../utils/request")
const util =require("../../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    $.get("/api/post/activity_detail",options).then(res=>{
      var data = res.data;
      if(data.code=200){
        console.log(data.data);
        this.setData({resource:data.data,html:data.data.article})
        console.log(this.data);
      }else{
        console.log("error code:"+data.code)
      }
    }).catch(res=>{
      console.log("error...")
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