// my-behavior.js
module.exports = Behavior({
    data: {
      sharedText: 'This is a piece of data shared between pages.',
      resource:{
          selectedCity:{
              cityName:"选择城市Behavior",
              cityCode:"-1"
          }
      },
      total:1
    },
    methods: {
      sharedMethod: function() {
        this.data.sharedText === 'This is a piece of data shared between pages.'
      },
      add:function(){
          this.data.total = this.data.total+1
          console.log(this.data.total);
      },
      testF:function(){
          return total
      }
      
    }
})