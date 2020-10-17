// var myBehavior = require('../../behavior/my-behavior')
const util =require("../../../utils/util")
const $ =require("../../../utils/request")
var app = getApp()
Page({
  // behaviors: [myBehavior],
  data: {
    scrollIntoId: '',
    hotCitys: [{
        "cityCode": "130600",
        "cityName": "保定市"
      },
      {
        "cityCode": "140100",
        "cityName": "太原市"
      },
      {
        "cityCode": "150300",
        "cityName": "乌海市"
      },
      {
        "cityCode": "140400",
        "cityName": "长治市"
      },
      {
        "cityCode": "320100",
        "cityName": "南京市"
      },
      {
        "cityCode": "310000",
        "cityName": "上海市"
      }
    ],
    citys: [{
        "name": "A",
        "list": [{
            "cityCode": "320001",
            "cityName": "阿坝"
          },
          {
            "cityCode": "320002",
            "cityName": "阿拉善"
          },
          {
            "cityCode": "320003",
            "cityName": "阿里"
          },
          {
            "cityCode": "320004",
            "cityName": "安康"
          },
        ]
      },

      {
        "name": "B",
        "list": [{
          "cityCode": "130600",
          "cityName": "保定市"
        }]
      },
      {
        "name": "C",
        "list": [{
          "cityCode": "130800",
          "cityName": "承德市"
        }]
      },
      {
        "name": "H",
        "list": [{
            "cityCode": "131100",
            "cityName": "衡水市"
          },
          {
            "cityCode": "320800",
            "cityName": "淮安市"
          }
        ]
      },
      {
        "name": "M",
        "list": [{
          "cityCode": "231000",
          "cityName": "牡丹江市"
        }]
      },
      {
        "name": "N",
        "list": [{
          "cityCode": "320100",
          "cityName": "南京市"
        }]
      },
      {
        "name": "Q",
        "list": [{
          "cityCode": "130300",
          "cityName": "秦皇岛市"
        }]
      },
      {
        "name": "S",
        "list": [{
            "cityCode": "310000",
            "cityName": "上海市"
          },
          {
            "cityCode": "130100",
            "cityName": "石家庄市"
          },
          {
            "cityCode": "320500",
            "cityName": "苏州市"
          }
        ]
      },
      {
        "name": "T",
        "list": [{
            "cityCode": "140100",
            "cityName": "太原市"
          },
          {
            "cityCode": "130200",
            "cityName": "唐山市"
          }
        ]
      },
      {
        "name": "W",
        "list": [{
          "cityCode": "150300",
          "cityName": "乌海市"
        }]
      },
      {
        "name": "X",
        "list": [{
          "cityCode": "320300",
          "cityName": "徐州市"
        }]
      },
      {
        "name": "Y",
        "list": [{
            "cityCode": "320900",
            "cityName": "盐城市"
          },
          {
            "cityCode": "321000",
            "cityName": "扬州市"
          },
          {
            "cityCode": "140300",
            "cityName": "阳泉市"
          }
        ]
      },
      {
        "name": "Z",
        "list": [{
            "cityCode": "140400",
            "cityName": "长治市"
          },
          {
            "cityCode": "321100",
            "cityName": "镇江市"
          }
        ]
      }
    ],
  },

  onShow: function() {

  },
  /**
   * 右侧字母索引的触发
   */
  touchstartfn: function (e) {
    //console.log(e.target.id)
    console.log(e);
    var letter = e.target.dataset.id
    var index = e.target.dataset.bigindex
    var letter = this.data.citys[index].name
    this.setData({
      scrollIntoId: letter
    })
    wx.showToast({
      icon: 'none',
      title: letter
    })
  },

  // 选择热门城市
  selectHotCity: function(e) {
    var that = this
    console.log(e.currentTarget.dataset.index)   //获取点击事件列表的索引
    var index = e.currentTarget.dataset.index
    var cityName = that.data.hotCitys[index].cityName   //根据索引找到热门城市的名称
    var cityCode = that.data.hotCitys[index].cityId    //根据索引找到热门城市的code编码
    
    this.setSelectedCity({"cityCode":cityCode,"cityName":cityName})
    wx.showToast({
      title: cityName,
    })
    
  },
  onLoad: function (options) {
    this.setData(options);
    $.get("/api/common/cityList").then(res=>{
      
      this.setData({hotCitys:res.data.data.hotCityList,
        citys:res.data.data.cityList
      })
      
    }).catch(res=>{
      console.log("error...")
      
    })
    // var citty
    console.log("options",options,"select_city_options",this.data);
  },

  setSelectedCity(city){
    /**
     *   {
        "cityCode": "150300",
        "cityName": "乌海市"
      }
     */

    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];
    switch(this.data.type){
      case "resource":
        prevPage.setResourceSelectedCity(city);
        break;
      case "internship":
        console.log("setSelectedCity internship")
        prevPage.setInternshipSelectedCity(city);
        break;
      case "post_practice":
        console.log("post_practice")
        prevPage.setSelectedCity(city);
        break;
      case "post_resource":
        console.log("post_resource")
        prevPage.setSelectedCity(city);
        break;
    }
    
    console.log(prevPage,city)
    wx.navigateBack();
    // wx.backTo({
    //   url:"/pages/index/index?PageCur=resource"
    // })
  },
  //选择城市
  selectCity: function(e) {
    console.log(e)
    var bigIndex = e.target.dataset.bigindex     //嵌套循环找出外部的索引
    var index = e.target.dataset.index               //嵌套循环找出子索引
    var zimu = this.data.citys[bigIndex].name   //找到对应的字母
    console.log(index)
    console.log(zimu)
    if (index == undefined) {         //如果子索引为未定义，即点击了列表中的字母
      wx.showToast({
        title: zimu,
      })
    } else {                        //如果自索引有值，即点击了列表中的城市项
      var cityName = this.data.citys[bigIndex].cityData[index].cityName   //双重索引找到城市名称
      var cityCode = this.data.citys[bigIndex].cityData[index].cityId     //双重索引找到城市编码
      this.setSelectedCity({"cityCode":cityCode,"cityName":cityName})
      wx.showToast({
        title: cityName,
      })
    }
  },
})