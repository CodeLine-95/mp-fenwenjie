const $ =require("../../../utils/request")
const util =require("../../../utils/util")
var app = getApp()
Page({
	data:{
		tabList: [
			{id: 0,name:'找实践'},
			{id: 1,name:'享资源'},
			{id: 2,name:'晒收获'},
		],
		TabCur: 0,
		scrollLeft: 0,
		openId: null,
		lastItemDate:null,
		pageSize:null,
		type:null,
		topNum: 0,
		userId:null,
		companyList: [],   // 觅人才
		practiceList: [],  // 找实践
		resourceList: [],  // 享资源
		harvestList: [],   // 晒收获
	},
	tabSelect(e) {
		this.setData({
			TabCur: e.currentTarget.dataset.id,
			scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
		})
		var userInfo = this.data.userInfo;
		if(userInfo.userIdentity == 1){ //企业用户
			if(e.currentTarget.dataset.id == 0){  //觅人才
				var queryData={
					lastItemDate:null,
					pageSize:this.data.pageSize,
					userId:userInfo.id
				}
				console.log(e.currentTarget.dataset.id)
				$.post("/api/post/company_list",queryData).then(res=>{
					// res.data.data.map(v=> {
					// 	return v.gmtCreate = util.formatTime(v.gmtCreate);
					// })
					if(res.data.code==200){
						this.setData({
							topNum: 0,
							companyList: res.data.data,
							practiceList: [],  // 找实践
							resourceList: [],  // 享资源
							harvestList: [],   // 晒收获
						})
						console.log("companyList",res.data.data)
					}else{
						console.log("数据加载失败....");
					}
				}).catch(res=>{
					console.log("error",res);
				});
			}else if(e.currentTarget.dataset.id == 1){ //享资源
			    var queryData={
			    	lastItemDate:null,
			    	pageSize:this.data.pageSize,
			    	userId:userInfo.id
			    }
				$.post("/api/post/activity_list",queryData).then(res=>{
					if(res.data.code==200){
						this.setData({
							topNum: 0,
							resourceList:res.data.data,
							companyList: [],   // 觅人才
							practiceList: [],  // 找实践
							harvestList: [],   // 晒收获
						})
						console.log("resourceList",res.data.data)
					}else{
						console.log("数据加载失败....");
					}
				}).catch(res=>{
					console.log("error",res);
				});
			}else if(e.currentTarget.dataset.id == 2){ //晒收获
				var queryData={
					lastItemDate:null,
					pageSize:this.data.pageSize,
					searchWord:'',
					userId:userInfo.id
				}
				$.post("/api/post/achievement_list",queryData).then(res=>{
				  if(res.data.code==200){
				    this.setData({
						harvestList: res.data.data,
						topNum: 0,
						resourceList: [],  // 享资源
						companyList: [],   // 觅人才
						practiceList: [],  // 找实践
					})
				    console.log("harvestList",res.data.data)
				  }else{
				    console.log("数据加载失败....");
				  }
				}).catch(res=>{
				  console.log("error",res);
				});
			}
		}else{
			if(e.currentTarget.dataset.id == 0){  //找实践
				var queryData={
					lastItemDate:null,
					pageSize:this.data.pageSize,
					userId:userInfo.id
				}
				$.post("/api/post/school_list",queryData).then(res=>{
				  if(res.data.code==200){
					this.setData({
						practiceList: res.data.data,
						harvestList: [],    // 晒收获
						topNum: 0,
						resourceList: [],  // 享资源
						companyList: [],   // 觅人才
					})
					console.log("practiceList",res.data.data)
				  }else{
					console.log("数据加载失败....");
				  }
				}).catch(res=>{
				  console.log("error",res);
				});
			}else if(e.currentTarget.dataset.id == 1){ //享资源
			    var queryData={
			    	lastItemDate:null,
			    	pageSize:this.data.pageSize,
			    	userId:userInfo.id
			    }
				$.post("/api/post/activity_list",queryData).then(res=>{
					if(res.data.code==200){
						this.setData({
							resourceList:res.data.data,
							harvestList: [],    // 晒收获
							topNum: 0,
							companyList: [],   // 觅人才
							practiceList: [],
						})
						console.log("resourceList",res.data.data)
					}else{
						console.log("数据加载失败....");
					}
				}).catch(res=>{
					console.log("error",res);
				});
			}else if(e.currentTarget.dataset.id == 2){  //晒收获
				var queryData={
					lastItemDate:null,
					pageSize:this.data.pageSize,
					userId:userInfo.id
				}
				$.post("/api/post/achievement_list",queryData).then(res=>{
				  if(res.data.code==200){
				    this.setData({
						harvestList: res.data.data,
						topNum: 0,
						resourceList: [],  // 享资源
						companyList: [],   // 觅人才
						practiceList: [],  // 找实践
					})
				    console.log("harvestList",res.data.data)
				  }else{
				    console.log("数据加载失败....");
				  }
				}).catch(res=>{
				  console.log("error",res);
				});
			}
		}
	},
	//觅人才滚动加载
	companyListLower(e){
		console.log("bottom",e)
		var preData = this.data.companyList
		var userInfo = this.data.userInfo;
		var queryData={
			lastItemDate:preData[preData.length-1].gmtCreate,
			pageSize:this.data.pageSize,
			searchWord: '',
			userId:userInfo.id
		}
		$.post("/api/post/company_list",queryData).then(res=>{
			if(res.data.code==200){
				this.setData({
					companyList: preData.concat(res.data.data),
					practiceList: [],  // 找实践
					resourceList: [],  // 享资源
					harvestList: [],   // 晒收获
				})
				console.log("companyList",res.data.data)
			}else{
				console.log("数据加载失败....");
			}
		}).catch(res=>{
			console.log("error",res);
		});
	},
	//找实践滚动加载
	practiceListLower(e) {
		console.log("bottom",e)
		var preData = this.data.practiceList
		var userInfo = this.data.userInfo;
		var queryData={
			lastItemDate:preData[preData.length-1].gmtCreate,
			pageSize:this.data.pageSize,
			userId:userInfo.id
		}
		$.post("/api/post/school_list",queryData).then(res=>{   
			if(res.data.code==200){
				this.setData({
					practiceList: preData.concat(res.data.data),
					harvestList: [],    // 晒收获
					resourceList: [],  // 享资源
					companyList: [],   // 觅人才
				})
				console.log("practiceList",res.data.data)
			}else{
				console.log("数据加载失败....");
			}
		}).catch(res=>{
			console.log("error",res);
		});
	},
	//享资源滚动加载
	resourceListLower(e){
		console.log("bottom",e)
		var preData = this.data.resourceList
		var userInfo = this.data.userInfo;
		var queryData={
			lastItemDate:preData[preData.length-1].gmtCreate,
			pageSize:this.data.pageSize,
			userId:userInfo.id
		}
		$.post("/api/post/activity_list",queryData).then(res=>{
			if(res.data.code==200){
				this.setData({
					resourceList: preData.concat(res.data.data),
					harvestList: [],    // 晒收获
					companyList: [],   // 觅人才
					practiceList: [],
				})
				console.log("resourceList",res.data.data)
			}else{
				console.log("数据加载失败....");
			}
		}).catch(res=>{
			console.log("error",res);
		});
	},
	//晒收获
	harvestListLower(e){
		console.log("bottom",e)
		var preData = this.data.harvestList
		var userInfo = this.data.userInfo;
		var queryData={
			lastItemDate:preData[preData.length-1].gmtCreate,
			pageSize:this.data.pageSize,
			userId:userInfo.id
		}
		$.post("/api/post/achievement_list",queryData).then(res=>{
		  if(res.data.code==200){
		    this.setData({
				harvestList: preData.concat(res.data.data),
				resourceList: [],  // 享资源
				companyList: [],   // 觅人才
				practiceList: [],  // 找实践
			})
		    console.log("harvestList",res.data.data)
		  }else{
		    console.log("数据加载失败....");
		  }
		}).catch(res=>{
		  console.log("error",res);
		});
	},
	onLoad(){
		var openId = wx.getStorageSync('openId');
		if(!openId){
			wx.navigateTo({
				url: '/pages/login/list/list'
			})
		}
		
		var userInfo = wx.getStorageSync('userInfo');
		this.setData({
			userInfo: userInfo,
		})
		if(userInfo.userIdentity == 1){  //企业用户
			this.setData({
				tabList: [
					{id: 0,name:'觅人才'},
					{id: 1,name:'享资源'},
					{id: 2,name:'晒收获'},
				],
			})
			
			var queryData={
				lastItemDate:null,
				pageSize:this.data.pageSize,
				userId:userInfo.id
			}
			$.post("/api/post/company_list",queryData).then(res=>{
				// res.data.data.map(v=> {
				// 	return v.gmtCreate = util.formatTime(v.gmtCreate);
				// })
				if(res.data.code==200){
					this.setData({
						topNum: 0,
						companyList: res.data.data,
						practiceList: [],  // 找实践
						resourceList: [],  // 享资源
						harvestList: [],   // 晒收获
					})
					console.log("companyList",res.data.data)
				}else{
					console.log("数据加载失败....");
				}
			}).catch(res=>{
				console.log("error",res);
			});
		}else{
			var queryData={
				lastItemDate:null,
				pageSize:this.data.pageSize,
				userId:userInfo.id
			}
			$.post("/api/post/school_list",queryData).then(res=>{
			  if(res.data.code==200){
			    console.log("data",res.data.data);
			    this.setData({
					practiceList: res.data.data,
					topNum: 0,
					companyList: [],
					resourceList: [],  // 享资源
					harvestList: [],   // 晒收获
				})
			    console.log("practiceList",res.data.data)
			  }else{
			    console.log("数据加载失败....");
			  }
			}).catch(res=>{
			  console.log("error",res);
			});
		}
	},
})