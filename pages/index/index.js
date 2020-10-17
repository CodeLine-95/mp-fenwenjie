
Page({
  data: {
    // PageCur: 'talent',
    // PageCur: 'practice',
    PageCur: 'talent',
    tabs:[
      {"name":"觅人才"},
      {"name":"找实践"},
      {"name":"享资源"},
      {"name":"晒收获"},
      {"name":"我的"}
    ]
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
  setResourceSelectedCity(city){
    let resource = this.selectComponent("#resource")
    console.log("setResourceSelectedCity",resource);
    resource.setCity({city:city})
  },
  setPracSelectedCity(city){
    let practice = this.selectComponent("#practice")
    console.log("setPracSelectedCity",practice);
    practice.setCity({city:city})
  },
  onLoad(options) {
    console.log(options)
    this.setData(options)
  },
  onShareAppMessage() {
    return {
      title: 'ColorUI-高颜值的小程序UI组件库',
      imageUrl: '/images/share.jpg',
      path: '/pages/index/index'
    }
  },
})