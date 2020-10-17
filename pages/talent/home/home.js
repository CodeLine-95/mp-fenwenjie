const $ =require("../../../utils/request")
const util =require("../../../utils/util")
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    cardCur: 0,
    swiperList: [],
    display_company_list:[],
    practiceList:[],
    searchInfo:'',
    toView: 'green',
    releaseShow:false,
    userType:2
  },

  /**
   * 组件的方法列表
   */
  methods: {
    search(){

      // 
      var data = "{'lastItemDate':1,'pageSize':10,'searchInfo':"+this.data.searchInfo+"}"
      console.log(this.data.searchInfo);
      $.get("/api/post/search_list",data).then(res=>{
        
        console.log("res",res);

        res.data.data.map(v=> {
          return v.gmtCreate = util.formatTime(v.gmtCreate);
        })

        if(res.data.code==200){
          console.log("data",res.data.data);
          this.setData({practiceList:res.data.data})
          console.log("practiceList",res.data.data)
        }else{
          console.log("数据加载失败....");
        }
      }).catch(res=>{
        console.log("error",res);
      });
    },
    company(event){
      var companyId=event.currentTarget.dataset['id'];
      console.log(companyId);
      wx.navigateTo({
        url: '/pages/talent/company_info/company_info?companyId='+companyId,
      })
    },
    release:function(){
      this.setData({"releaseShow":!this.data.releaseShow});
    },
    upper(e) {
      console.log(e)
    },
    lower(e){
      console.log(e)
    } ,
    lower2(e) {
      console.log("bottom",e)

      // 3.加载实习列表
      // var data = "{'lastItemDate':,'pageSize':10}"
      $.post("/api/post/company_list",{lastItemDate:this.data.practiceList[this.data.practiceList.length-1]}).then(res=>{
        
        console.log("res",res);

        res.data.data.map(v=> {
          return v.gmtCreate = util.formatTime(v.gmtCreate);
        })

        if(res.data.code==200){
          console.log("data",res.data.data);
          var preData = this.data.practiceList
          this.setData({practiceList:preData.concat(res.data.data)})
          console.log("practiceList",res.data.data)
        }else{
          console.log("数据加载失败....");
        }
      }).catch(res=>{
        console.log("error",res);
      });
    },
  
    scroll(e) {
      console.log(e)
    },
  
    scrollToTop() {
      this.setAction({
        scrollTop: 0
      })
    },
  
    tap() {
      for (let i = 0; i < order.length; ++i) {
        if (order[i] === this.data.toView) {
          this.setData({
            toView: order[i + 1],
            scrollTop: (i + 1) * 200
          })
          break
        }
      }
    },
  
    tapMove() {
      this.setData({
        scrollTop: this.data.scrollTop + 10
      })
    },
    DotStyle(e) {
      console.log(e.detail)
      this.setData({
        DotStyle: e.detail.value
      })
    },
    // cardSwiper
    cardSwiper(e) {
      this.setData({
        cardCur: e.detail.current
      })
    }
  },
  /*组件生命周期*/ 
  lifetimes: {
    created() {
      console.log("在组件实例刚刚被创建时执行")
    },
    attached() { 
      console.log("在组件实例进入页面节点树时执行")
    },
    ready() {
      console.log("在组件在视图层布局完成后执行");
      //1.加载轮播图
      var data = "{'type':0,'currentPage':10}"
      $.get("/api/carousel_list",data).then(res=>{   
        console.log("1.加载轮播图",res);
        if(res.data.code==200){
          console.log("data",res.data.data);
          this.setData({swiperList:res.data.data})
          console.log("swiperList",res.data.data)
        }else{
          console.log("数据加载失败....");
        }
      }).catch(res=>{
        console.log("error",res);
      });
      //2.加载公司列表
      var data = "{'type':0,'currentPage':10}"
      $.get("/api/display_company_list",data).then(res=>{   
        console.log("2.加载公司列表",res);
        if(res.data.code==200){
          this.setData({display_company_list:res.data.data})
          console.log("display_company_list",res.data.data)
        }else{
          console.log("数据加载失败....");
        }
      }).catch(res=>{
        console.log("error",res);
      });
      // 3.加载实习列表
      var data = "{'lastItemDate':1,'pageSize':10}"
      $.post("/api/post/company_list",data).then(res=>{
        
        console.log("res",res);

        res.data.data.map(v=> {
          return v.gmtCreate = util.formatTime(v.gmtCreate);
        })

        if(res.data.code==200){
          console.log("data",res.data.data);
          this.setData({practiceList:res.data.data})
          console.log("practiceList",res.data.data)
        }else{
          console.log("数据加载失败....");
        }
      }).catch(res=>{
        console.log("error",res);
      });
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
