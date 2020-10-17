// pages/talent/post_internship/post_internship.js
const $ =require("../../../utils/request")
const util =require("../../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['广东省', '广州市', '海珠区'],
    schoolIndex: 0,
    schoolPicker: ['北京大学', '清华大学', '北京理工大学'],
    studyIndex: 0,
    studyPicker: ['大一', '大二', '研一'],

    learningStagesIndex:0,
    learningStagesPicker:[],


    jobPeriodIndex:2,
    jobPeriodPicker:[],
    jobDayNumIndex:5,
    jobDayNumPicker:['弹性','1日','2日','3日','4日','5日','6日','7日'],
    teacherIndex:0,
    teacherPicker:['张三','李四'],
    method:"高校",
    color:"grey",
    imgList: [],

    type:null,
    schoolId:null,
    jobTitle:null,
    cityId:null,
    learningStages:null,
    article:null,
    courseName:null,
    images:null,
    workMonths:null,
    workDays:null,
    contacts:null,
    teacherId:null,
    authorId:null,

    city:{
      cityName:"选择城市",
      cityCode:null
    },
  },
  setSelectedCity(city){
    this.setData({city:city})
  },
  selectCity(){
    console.log("selectCity");
    wx.navigateTo({
      url: '/pages/resource/select_city/select_city?type=post_practice',
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
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        var tempFilePaths = res.tempFilePaths;
        //上传图片
        $.uploadImg($.UPLOAD_IMG_URL,tempFilePaths[0]).then(res=>{
          console.log("uploadImg",res)
          that.setData({
            imgList: this.data.imgList.concat(res)
          })
        })
     
      },
      complete:(res=>{
        console.log("complete",res);
      })
    });
  },
  // ChooseImage() {
  //   wx.chooseImage({
  //     count: 4, //默认9
  //     sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
  //     sourceType: ['album'], //从相册选择
  //     success: (res) => {
  //       if (this.data.imgList.length != 0) {
  //         this.setData({
  //           imgList: this.data.imgList.concat(res.tempFilePaths)
  //         })
  //       } else {
  //         this.setData({
  //           imgList: res.tempFilePaths
  //         })
  //       }
  //     }
  //   });
  // },
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
  methodChange(e){
    this.setData({
      method: e.detail.value?"个人":"高校",
      color:e.detail.value?"green":"grey"
    })
  },
  onSubmit(e){

    const contact = this.selectComponent('#contact');
    var list = contact.__data__.list;
    console.log("this.data",this.data)
    console.log(util)
    var data = {
      type:this.data.method=="高校"?2:1,
      schoolId:this.data.schoolPicker[this.data.schoolIndex].id,
      jobTitle:this.data.jobName,
      cityId:this.data.city.cityCode,
      learningStages:this.data.learningStagesPicker[this.data.learningStagesIndex].id,
      article:this.data.article,
      courseName:this.data.courseName,
      images:this.data.imgList,
      workMonths:this.data.jobPeriodPicker[this.data.jobPeriodIndex].id,
      workDays:this.data.jobDayNumPicker[this.data.jobDayNumIndex].id,
      contacts:list,
      teacherId:this.data.teacherPicker[this.data.teacherIndex].teacherId,
      authorId:util.local.getUser().id
    }
    console.log(data);
  },
  teacherChange(e) {
    console.log(e);
    this.setData({
      teacherIndex: e.detail.value
    })
  },
  jobPeriodChange(e) {
    console.log(e);
    this.setData({
      jobPeriodIndex: e.detail.value
    })
  },
  jobDayNumChange(e) {
    console.log(e);
    this.setData({
      jobDayNumIndex: e.detail.value
    })
  },
  RegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  schoolChange(e) {
    console.log(e);
    this.setData({
      schoolIndex: e.detail.value
    })
  },
  studyChange(e) {
    console.log(e);
    this.setData({
      studyIndex: e.detail.value
    })
  },
  learningStagesChange(e){
    
    this.setData({
      learningStagesIndex: e.detail.value
    })
    console.log(this.data.learningStagesPicker[this.data.learningStagesIndex])
  },
  write(){
    console.log("write....")
    wx.navigateTo({
      url: '/pages/talent/write_internship/write_internship?id=3&title=课程描述',

    })
  },
  setHtml(html){
    console.log("set_post_practice",html)
    this.setData({article:html})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    $.get("/api/common/teacherList",
      {"schoolId":util.local.getSchool().id,
      "collegeId":util.local.getUser().collegeId}).then(res=>{
        console.log(res)
        this.setData({teacherPicker:res.data.data})
        console.log(this.data)
      })
    this.setData({
      learningStagesPicker:util.local.getLearningStages(),
      jobPeriodPicker:util.local.getJobPeriod(),
      schoolPicker:util.local.getSchool(),
      jobDayNumPicker:util.local.getobDayNum()
    })
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