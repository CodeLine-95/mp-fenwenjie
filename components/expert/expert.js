// components/charge/charge.js
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
    list:[{"guestName":'',"guestIntro":''}]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onName(event){
      console.log(event);
      var index = event.currentTarget.dataset.index;
      var list2 = this.data.list;
      console.log(list2)

      for(let i=0;i<list2.length;i++){
        if(i==index) {
          list2[i].guestName = event.detail.value;
          break
        }
      }
      this.setData({"list":list2});
    },
    onInfo(event){
      console.log(event);
      var index = event.currentTarget.dataset.index;
      var list2 = this.data.list;
      console.log(list2)

      for(let i=0;i<list2.length;i++){
        if(i==index) {
          list2[i].guestIntro = event.detail.value;
          break
        }
      }
      this.setData({"list":list2});
    },
    onAdd(event){
      console.log(event);
      var index = event.currentTarget.dataset.index;
      var list2 = this.data.list;
      console.log(list2)

      if(list2[index].guestName==''){
        wx.showToast({
          title: '请输入姓名',
          icon: 'none',
          duration: 2000
        });
        return;
      }else if(list2[index].tel==''){
        wx.showToast({
          title: '请输入电话',
          icon: 'none',
          duration: 2000
        });
        return;
      }else if(list2[index].mail==''){
        wx.showToast({
          title: '请输入邮箱',
          icon: 'none',
          duration: 2000
        });
        return;
      }
      list2.push({"guestName":'',"guestIntro":''});
      this.setData({"list":list2});
    },
    onReduce(event){
      var index = event.currentTarget.dataset.index;
      var list2 = this.data.list;
      for(let i=0;i<list2.length;i++){
        if(i==index) {
          list2.splice(i,1);
          break;
        }
      }
      this.setData({"list":list2});
      console.log(list2);
      console.log("reduce");
    }
    
  }
})
