Component({

    options: {
  
      multipleSlots: true // 在组件定义时的选项中启用多slot支持
  
    },
  
    properties: {
  
      maxlength:{
  
        type:Number,
  
        value:150,
  
      },
  
      placeholder:{
  
        type:String,
  
        value:'请输入评论内容'
  
      },
  
      isCollect:{//是否已收藏
  
        type:Number,
  
        value:false
  
      },
  
      showCollect:{//是否显示收藏
  
        type:Boolean,
  
        value:true
  
      }
  
    },
  
    //
  
    data:{
  
      sendComment: true,
  
      content:'',//评论内容
      reContent:'',//回复评论内容
      activty:false,

      total:10,
      showModal:false
  
    },
  
  
  
    methods:{
    showModal() {
      this.setData({showModal:true})
    },
    hideModal(){
      this.setData({showModal:false})
    },
      reply(event){
        var data = event.currentTarget.dataset
        console.log(data);
      },
    //评论
      comment(){
        console.log("评论",this.data.content);

      },
      //回复评论
      comment(){
        console.log("回复",this.data.reContent);

      },
      commentClick:function(e){
  
        this.setData({
  
          sendComment:false,
  
        });
  
      },
  
      bindTextAreaBlur:function(e){
  
        this.setData({
  
          sendComment: true,
  
        });
  
      },
  
      bindinput:function(e){
  
        this.setData({
  
          content: e.detail.value,
  
          activty: e.detail.cursor>0?true:false
  
        })
  
      },
  
      //发送评论
  
      sendPull:function(e){
  
        this.triggerEvent("sendPull",{content:this.data.content,obj:this});
  
      },
  
      //清空内容
  
      clearContent:function(e){
  
        this.setData({
  
          content: '',
  
        })
  
      },
  
      //评论按钮
  
      commentNuber:function(e){
  
        this.triggerEvent("commentNumber");
  
      },
  
      //分享
  
      shareClick:function(e){
  
        this.triggerEvent("shareClick");
  
      },
  
      //收藏
  
      collect:function(e){
  
        this.triggerEvent("collectClick");
  
      },
  
      //是否收藏，亮灯
  
      isCollect:function(e){
  
        this.setData({
  
          isCollect: !this.data.isCollect,
  
        })
  
      }
  
    }
  
  });