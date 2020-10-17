const $ =require("../../../utils/request")
const util =require("../../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyIndex: 0,
    companyPicker: ['百度', '阿里', '腾讯'],
    region: ['广东省', '广州市', '海珠区'],
    method:"线上",
    color:"grey",
    time: '00:00',
    date: '2020-09-01',

    authorId:null,
    type:null,
    organizeId:null,
    title:null,
    cityId:null,
    address:null,
    startTime:null,
    endTime:null,
    guests:null,
    article:null,
    count:null,
    contacts:null,
    startDate:'2020-09-01',
    startTime:'00:00',
    endDate:'2020-09-01',
    endTime:'00:00',
    multiArray: [['高校', '企业'], ['中国农业大学', '华中农业大学', '南京农业大学', '江西农业大学']],
    multiIndex: [0, 0, 0],
    city:{
      cityName:"选择城市",
      cityCode:null
    },
  },
  setHtml(html){
    console.log("set article html",html)
    this.setData({article:html});
  },
  write(){
    console.log("write....")
    wx.navigateTo({
      url: '/pages/talent/write_internship/write_internship?id=1&title=报告简介',

    })
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['中国农业大学', '华中农业大学', '南京农业大学', '江西农业大学'];
            break;
          case 1:
            data.multiArray[1] = ['字节跳动', '百度', '阿里巴巴','京东','腾讯'];
            break;
        }
        data.multiIndex[1] = 0;
        break;
    }
    console.log(data.multiIndex);
    this.setData(data);
  },
  startTimeChange(e) {
    console.log("startTimeChange",e.detail.value)
    this.setData({
      startTime: e.detail.value
    })
  },
  startDateChange(e) {
    console.log("startDateChange",e.detail.value)
    this.setData({
      startDate: e.detail.value
    })
  },
  endTimeChange(e) {
    console.log("endTimeChange",e.detail.value)
    this.setData({
      endTime: e.detail.value
    })
  },
  endDateChange(e) {
    console.log("endDateChange",e.detail.value)
    this.setData({
      endDate: e.detail.value
    })
  },
  companyChange(e) {
    console.log(e);
    this.setData({
      companyIndex: e.detail.value
    })
  },
  RegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  methodChange(e){
    this.setData({
      method: e.detail.value?"线下":"线上",
      color:e.detail.value?"green":"grey"
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
  checkExpert(list){
    for(let i=0;i<list.length;i++){
      if(list[i].name==''||list[i].info==''){
        return false;
      }
    }
    return true;
  },
  selectCity(){
    wx.navigateTo({
      url:'/pages/resource/select_city/select_city?type=post_resource'
    })
  },
  setSelectedCity(city){
    this.setData({city:city})
  },
  onSubmit(){
    const child = this.selectComponent('#component');
    const expert = this.selectComponent('#expert');
    var list = child.__data__.list;
    var expertList = expert.__data__.list;
    console.log(child,list);
    console.log(expert,expertList);
    if(this.check(list)&&this.checkExpert(expertList)){
      var data = {
        authorId:util.local.getUser().id,
        // type:this.data.method=="线上"?1:2,
        type:this.data.method=="线上"?1:2,
        organizeId:this.data.companyPicker[this.data.companyIndex].id,
        title:this.data.title,
        cityId:this.data.city?this.data.city.cityCode:null,
        address:this.data.address,
        startTime:new Date(this.data.startDate+" "+this.data.startTime).getTime(),
        endTime:new Date(this.data.endDate+" "+this.data.endTime).getTime(),
        guests:expertList,
        article:this.data.article,
        count:this.data.count,
        contacts:list
      }
      console.log("submit",data);
      // $.post("/api/post/activity_issue",data).then(res=>{

      // }).catch(res=>{
      //   console.log("error...")
      // })
      // // 提交表单
      // wx.showToast({
      //   title: '添加成功',
      //   icon: 'success',
      //   duration: 2000
      // });

      
    }else{
      wx.showToast({
        title: '请完成数据输入',
        icon: 'none',
        duration: 2000
      });
    }

    // wx.showModal({
    //   title: '提示',
    //   content: '这是一个模态弹窗',
    //   success (res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({companyPicker:util.local.getCompany()})
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