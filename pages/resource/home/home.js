// pages/resource/home/home.js
// var myBehavior = require('../../behavior/my-behavior')
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
    TabCur: 0,
    scrollLeft:0,
    list:['高校','企业'],
    city:{
      cityName:"选择城市",
      cityCode:null
    },
    resourceList:[],
    lastItemDate:null,
    pageSize:null,
    type:null,
    userId:null,
    topNum:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    school(){
      console.log("school...")
      this.setData({type:1})
      var queryData={
        lastItemDate:null,
        pageSize:this.data.pageSize,
        cityId:this.data.city.cityCode,
        type:this.data.type,
        userId:this.data.userId
      }
      this.query(queryData)
    },
    company(){
      console.log("company...")
      this.setData({type:2})
      var queryData={
        lastItemDate:null,
        pageSize:this.data.pageSize,
        cityId:this.data.city.cityCode,
        type:this.data.type,
        userId:this.data.userId
      }
      this.query(queryData)
    },
    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id-1)*60
      })
    },
    setCity(city){
      console.log("this.city",this.data.city,city)
      this.setData(city)
      console.log("this.city",this.data.city)
      var queryData={
        lastItemDate:null,
        pageSize:this.data.pageSize,
        cityId:this.data.city.cityCode,
        type:this.data.type,
        userId:this.data.userId
      }
      this.query(queryData)
    },
    query(data){
      $.get("/api/post/activity_list",data).then(res=>{   
        if(res.data.code==200){
          console.log("data",res.data.data);
          this.setData({resourceList:res.data.data})
          console.log("resourceList",res.data.data)
          this.setData({
            topNum:0
          });
        }else{
          console.log("数据加载失败....");
        }
      }).catch(res=>{
        console.log("error",res);
      });
    },
    lower2(e) {
      console.log("bottom",e)
      var preData = this.data.resourceList
      var queryData={
        lastItemDate:preData[preData.length-1].gmtCreate,
        pageSize:this.data.pageSize,
        cityId:this.data.city.cityCode,
        type:this.data.type,
        userId:this.data.userId
      }
      $.get("/api/post/activity_list",
      queryData).then(res=>{   
        if(res.data.code==200){
          console.log("data",res.data.data);
          
          this.setData({resourceList:preData.concat(res.data.data)})
          console.log("resourceList",res.data.data)
        }else{
          console.log("数据加载失败....");
        }
      }).catch(res=>{
        console.log("error",res);
      });

    },
    selectCity(){
      console.log("selectCity");
      wx.navigateTo({
        url: '/pages/resource/select_city/select_city?type=resource',
      })
    }
  },  /*组件生命周期*/ 
  lifetimes: {
    created() {
      console.log("在组件实例刚刚被创建时执行")
    },
    attached() { 
      console.log("在组件实例进入页面节点树时执行")
      console.log("app",app)
    },
    ready() {
      console.log("在组件在视图层布局完成后执行");
      this.query({});
      console.log(this)
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
