// 查看事件文档https://developers.weixin.qq.com/miniprogram/dev/api/media/editor/EditorContext.html
const app = getApp();
Page({
  data: {
    formats: {},
    bottom: 0,
    readOnly: false,
    placeholder: '支持文字和图片...',
    _focus: false,
    title:'',
    htmlList:['htmlResource','htmlPractice','htmlPostPractice']
  },
  readOnlyChange() {
    this.setData({
      readOnly: !this.data.readOnly
    })
  },
  onLoad(options) {
    // this.editorCtx.setContents(app.globalData.html);
    console.log("onLoad....")
    console.log("options",options)
    this.setData({title:options.title,id:Number(options.id)})

  },
  // 编辑器初始化完成时触发
  onEditorReady() {
    console.log("onEditorReady....")
    const that = this;
    wx.createSelectorQuery().select('#editor').context(function(res) {
      that.editorCtx = res.context;
      switch(that.data.id){
        case 1:
          that.editorCtx.setContents({html:app.globalData.htmlResource})
          break;
        case 2:
          that.editorCtx.setContents({html:app.globalData.htmlPractice})
          break;
        case 3:
          that.editorCtx.setContents({html:app.globalData.htmlPostPractice})
          break;
      }
      
      console.log("editor res",res)
    }).exec();
    
  },
  undo() {
    this.editorCtx.undo();
  },
  redo() {
    this.editorCtx.redo();
  },
  format(e) {
    let {
      name,
      value
    } = e.target.dataset;
    if (!name) return;
    // console.log('format', name, value)
    this.editorCtx.format(name, value);
  },
  // 通过 Context 方法改变编辑器内样式时触发，返回选区已设置的样式
  onStatusChange(e) {
    const formats = e.detail;
    this.setData({
      formats
    });
  },
  // 插入分割线
  insertDivider() {
    this.editorCtx.insertDivider({
      success: function() {
        console.log('insert divider success')
      }
    });
  },
  // 清除
  clear() {
    this.editorCtx.clear({
      success: function(res) {
        console.log("clear success")
      }
    });
  },
  // 移除样式
  removeFormat() {
    this.editorCtx.removeFormat();
  },
  // 插入当前日期
  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    });
  },
  // 插入图片
  insertImage() {
    console.log("insertImage");
    wx.chooseImage({
      count: 1,
      success: () => {
        console.log("success...");
        this.editorCtx.insertImage({
          src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597685520207&di=303510cec1ddcf234a048cdd619038d7&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn20115%2F521%2Fw1056h1065%2F20181211%2Feb2b-hqackaa2812377.jpg',
          width:'100%',
          data: {
            id: 'abcd',
            role: 'god'
          },
          success: () => {
            console.log('insert image success')
          }
        })
      }
    });
  },
  //选择图片
  chooseImage(e) {
    wx.chooseImage({
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        const images = this.data.images.concat(res.tempFilePaths);
        this.data.images = images.length <= 3 ? images : images.slice(0, 3);
      }
    })
  },
  //查看详细页面
  toDeatil() {
    this.editorCtx.getContents({
      success: (res) => {
        console.log(res.html)
        console.log(app.globalData)
        
        switch(this.data.id){
          case 1:
            app.globalData.htmlResource = res.html
            break;
          case 2:
            app.globalData.htmlPractice = res.html
            break;
          case 3:
            app.globalData.htmlPostPractice = res.html
            break;
        }

        console.log(app.globalData)
        wx.navigateTo({
          url: '/pages/talent/preview/preview?name='+this.data.htmlList[this.data.id-1]
        })
     
      },
      fail: (res) => {
        console.log("fail：" , res);
      }
    });
  },
  submit(){
    this.editorCtx.getContents({
      success: (res) => {
        console.log(res.html) 
        // app.globalData.html = res.html
        switch(this.data.id){
          case 1:
            app.globalData.htmlResource = res.html
            break;
          case 2:
            app.globalData.htmlPractice = res.html
            break;
          case 3:
            app.globalData.htmlPostPractice = res.html
            break;
        }
        

        this.setHtml(res.html);


        wx.navigateBack()
      },
      fail: (res) => {
        console.log("fail：" , res);
      }
    });
  },
  setHtml(html){
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  
    prevPage.setHtml(html);
  }
})