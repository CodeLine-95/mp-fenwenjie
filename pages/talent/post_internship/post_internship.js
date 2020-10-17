const util = require("../../../utils/util");

// pages/talent/post_internship/post_internship.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyIndex: 0,
    companyPicker: ['百度', '阿里', '腾讯'],
    jobName:'',
    educationIndex: 2,
    educationPicker: ['无','专科', '本科', '硕士','博士'],
    a_index: 0,
    a_picker: ['百度', '阿里', '腾讯'],
    b_index: 0,
    b_picker: ['百度', '阿里', '腾讯'],
    c_index: 0,
    c_picker: ['百度', '阿里', '腾讯'],
    d_index: 0,
    d_picker: ['百度', '阿里', '腾讯'],
    jobDescription:"",
    region: ['广东省', '广州市', '海珠区'],
    address:'',
    end_date:'2020-08-08',
    chargePersonIndex:0,
    chargePersonPicker:['张三','李四'],
    dayWageIndex:1,
    dayWagePicker:['0','100','200','300','400','500','600','700','800','900'],
    jobPeriodIndex:2,
    jobPeriodPicker:['1个月','2个月','3个月','4个月','5个月','6个月','7个月','8个月','9个月','10个月','11个月','12个月','长期'],
    jobDayNumIndex:5,
    jobDayNumPicker:['弹性','1日','2日','3日','4日','5日','6日','7日'],
    peopleNum:'',
    city:{
      cityName:"选择城市",
      cityCode:null
    },

    companyId: null,
    jobTitle: null,
    article: null,
    cityId: null,
    workAddress: null,
    degree: null,
    workMonths: null,
    workDays: null,
    contacts: null,
    jobsCount: null,
    authorId: null,
    gmtFinish: null
  },
  selectCity(){
    wx.navigateTo({
      url:'/pages/resource/select_city/select_city?type=internship'
    })
  },
  setInternshipSelectedCity(city){
    console.log("setInternshipSelectedCity",city);
    this.setData({city:city});
  },
  write(){
    console.log("write....")
    wx.navigateTo({
      url: '/pages/talent/write_internship/write_internship?id=2&title=职位描述',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function(data) {
          console.log(data)
        },
        someEvent: function(data) {
          console.log(data)
        }
      },
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
      }
    })
  },
  check(list){
    for(let i=0;i<list.length;i++){
      if(list[i].name==''||list[i].tel==''||list[i].mail==''){
        return false;
      }
    }
    return true;
  },
  onSubmit(){
    const child = this.selectComponent('#component');
    var list = child.__data__.list;
    console.log(child,list);

    if(this.check(list)){
      // 提交表单
      wx.showToast({
        title: '添加成功',
        icon: 'success',
        duration: 2000
      });
    }else{
      wx.showToast({
        title: '请完成数据输入',
        icon: 'none',
        duration: 2000
      });
    }

    var data = {
      companyId: this.data.companyPicker[this.data.companyIndex].id,
      jobTitle: this.data.jobTitle,
      article: this.data.article,
      cityId: this.data.city.cityCode,
      workAddress: this.data.workAddress,

      degree: this.data.educationPicker[this.data.educationIndex].id,

      dayWage:this.data.dayWagePicker[this.data.dayWageIndex].id,

      workMonths:this.data.jobPeriodPicker[this.data.jobPeriodIndex].id,
      workDays:this.data.jobDayNumPicker[this.data.jobDayNumIndex].id,

      contacts: list,
      jobsCount: this.data.peopleNum,
      authorId: util.local.getUser().id,
      gmtFinish: new Date(this.data.end_date).getTime()
    }
    console.log(data);
  },
  setHtml(html){
    console.log("setTalent_postResource_reportInfo",html)
    this.setData({article:html})
  },
  educationChange(e) {
    console.log(e);
    this.setData({
      educationIndex: e.detail.value
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
  dayWageChange(e) {
    console.log(e);
    this.setData({
      dayWageIndex: e.detail.value
    })
  },
  chargePersonChange(e){
    console.log(e);
    this.setData({
      chargePersonIndex: e.detail.value
    })
  },
  companyChange(e) {
    console.log(e);
    this.setData({
      companyIndex: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      end_date: e.detail.value
    })
  },
  RegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
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
    this.setData({
      "educationPicker":util.local.getDegree(),
      "companyPicker":util.local.getCompany(),
      "dayWagePicker":util.local.getDayWage(),
      "jobDayNumPicker":util.local.getobDayNum(),
      "jobPeriodPicker":util.local.getJobPeriod()
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