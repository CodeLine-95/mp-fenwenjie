const $ = require("../../utils/request")
const util = require("../../utils/util")
Page({
	data:{
		radioTiems: [
			{value: '2', name: '学生', checked: true},
			{value: '1', name: '企业', checked: false},
		],
		radioValue: 2,
		userInfo: null,
		isShow: false,
		
		imgList: [],
		certificateUrls: [],
		
		schoolListOld: [],
		schoolIndex: 0,
		schoolList: [],
		
		collegeListOld: [],
		collegeIndex: 0,
		collegeList: [],
		
		teacherListOld: [],
		teacherList: [],
		teacherIndex: 0,
		// avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
	},
	
	BackPage(){
		wx.navigateBack({
			delta:2,
		})
	},
	
	onLoad(){
		let that = this
		//获取用户信息
		wx.getUserInfo({
			lang:'zh_CN',
			success: function(res) {
				that.setData({
					userInfo: res.userInfo
				})
			}
		})
		
		//获取学校
		$.get("/api/common/schoolList").then(res=>{
			if(res.data.code == 200){
				var schoolList = res.data.data;
				var new_schoolList = [];
				schoolList.forEach(function(item,index){
					new_schoolList.push(item.schoolName);
				})
				that.setData({
					schoolList: new_schoolList,
					schoolListOld: schoolList
				})
			}
		}).catch(res=>{
			console.log("error",res);
		});
	},
	//单选
	RadioChange(e){
		var value = e.detail.value;
		if(value == 1){
			this.setData({
				isShow: true,
			})
		}else{
			this.setData({
				isShow: false
			})
		}
		const radioTiems = this.data.radioTiems
		for (let i = 0, len = radioTiems.length; i < len; ++i) {
			radioTiems[i].checked = radioTiems[i].value === value
		}
		this.setData({
			radioTiems,
			radioValue: value,
		})
	},
	//学校
	SchoolChange(e){
		let that = this
		that.setData({
			schoolIndex: e.detail.value
		});
		var schoolId = 0;
		var checkedName = that.data.schoolList[that.data.schoolIndex];
		that.data.schoolListOld.forEach(function(item,index){
			if(item.schoolName == checkedName){
				schoolId = that.data.schoolListOld[index].schoolId;
			}
		})
		//获取学院
		$.get("/api/common/collegeList",{schoolId:schoolId}).then(res=>{
			if(res.data.code == 200){
				var collegeList = res.data.data;
				var new_collegeList = [];
				collegeList.forEach(function(item,index){
					new_collegeList.push(item.collegeName);
				})
				that.setData({
					collegeList: new_collegeList,
					collegeListOld: collegeList,
					teacherList: [],
				})
			}else{
				console.log("数据加载失败....");
			}
		}).catch(res=>{
			console.log("error",res);
		});
	},
	//学院
	CollegeChange(e){
		let that = this
		that.setData({
			collegeIndex: e.detail.value
		});
		var schoolId = 0;
		var checkedName = that.data.schoolList[that.data.schoolIndex];
		that.data.schoolListOld.forEach(function(item,index){
			if(item.schoolName == checkedName){
				schoolId = that.data.schoolListOld[index].schoolId;
			}
		})
		
		var collegeId = 0;
		var collegeCheckedName = that.data.collegeList[that.data.collegeIndex];
		that.data.collegeListOld.forEach(function(item,index){
			if(item.collegeName == collegeCheckedName){
				collegeId = that.data.collegeListOld[index].collegeId;
			}
		})
		
		//获取老师
		$.get("/api/common/teacherList",{schoolId:schoolId,collegeId:collegeId}).then(res=>{
			if(res.data.code == 200){
				var teacherList = res.data.data;
				var new_teacherList = [];
				teacherList.forEach(function(item,index){
					new_teacherList.push(item.teacherName);
				})
				that.setData({
					teacherList: new_teacherList,
					teacherListOld: teacherList,
				})
			}else{
				console.log("数据加载失败....");
			}
		}).catch(res=>{
			console.log("error",res);
		});
	},
	//教师
	TeacherChange(e){
		let that = this
		that.setData({
			teacherIndex: e.detail.value
		});
	},
	
	//提交
	bindsubmit(e){
		let that = this
		var formData = e.detail.value;
		//真实姓名
		if(formData.realName == ''){
			wx.showModal({
				title: '警告',
				content: '请填写真实姓名',
				showCancel: false,
				confirmText: '确定',
				complete: res => {
					return false;
				}
			})
		}
		//专业判断
		if(that.data.collegeList.length <= 0){
			wx.showModal({
				title: '警告',
				content: '请选择专业',
				showCancel: false,
				confirmText: '确定',
				complete: res => {
					return false;
				}
			})
		}
		//老师判断
		if(that.data.collegeList.length > 0 && that.data.teacherList.length <= 0){
			wx.showModal({
				title: '警告',
				content: '请选择老师',
				showCancel: false,
				confirmText: '确定',
				complete: res => {
					return false;
				}
			})
		}
		//证件照判断
		if(that.data.imgList.length <= 0){
			wx.showModal({
				title: '警告',
				content: '请上传证件照，最少一张',
				showCancel: false,
				confirmText: '确定',
				complete: res => {
					return false;
				}
			})
		}
		//密码判断
		if(formData.password == ''){
			wx.showModal({
				title: '警告',
				content: '请输入密码',
				showCancel: false,
				confirmText: '确定',
				complete: res => {
					return false;
				}
			})
		}
		//确认密码判断
		if(formData.valid_password != formData.password){
			wx.showModal({
				title: '警告',
				content: '两次密码输入不一致',
				showCancel: false,
				confirmText: '确定',
				complete: res => {
					return false;
				}
			})
		}
		//手机号判断
		if(formData.phoneNumber == ''){
			wx.showModal({
				title: '警告',
				content: '请输入手机号',
				showCancel: false,
				confirmText: '确定',
				complete: res => {
					return false;
				}
			})
		}
		if(formData.phoneNumber.length != 11){
			wx.showModal({
				title: '警告',
				content: '手机号长度不正确',
				showCancel: false,
				confirmText: '确定',
				complete: res => {
					return false;
				}
			})
		}
		var phonetel = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
		if(!phonetel.test(formData.phoneNumber)){
			wx.showModal({
				title: '警告',
				content: '手机号格式不正确',
				showCancel: false,
				confirmText: '确定',
				complete: res => {
					return false;
				}
			})
		}
		//学校
		var schoolId = 0;
		var checkedName = that.data.schoolList[that.data.schoolIndex];
		that.data.schoolListOld.forEach(function(item,index){
			if(item.schoolName == checkedName){
				schoolId = that.data.schoolListOld[index].schoolId;
			}
		})
		//专业
		var collegeId = 0;
		var collegeCheckedName = that.data.collegeList[that.data.collegeIndex];
		that.data.collegeListOld.forEach(function(item,index){
			if(item.collegeName == collegeCheckedName){
				collegeId = that.data.collegeListOld[index].collegeId;
			}
		})
		//老师
		var teacherId = 0;
		var teacherCheckedName = that.data.teacherList[that.data.teacherIndex];
		that.data.teacherListOld.forEach(function(item,index){
			if(item.teacherName == teacherCheckedName){
				teacherId = that.data.teacherListOld[index].teacherId;
			}
		})
		
		formData['userIdentity'] = that.data.radioValue;
		formData['schoolId'] = schoolId;
		formData['collegeId'] = collegeId;
		formData['teacherId'] = teacherId;
		
		var imgList = that.data.imgList;
		formData['certificateUrls'] = imgList;  //图片集合
		formData['wxId'] = wx.getStorageSync('openId');
		console.log(JSON.stringify(formData))
		//提交认证
		$.post("/api/user/approve",JSON.stringify(formData)).then(res=>{
			console.log("res",res);
			if(res.data.code == 200){
				wx.showModal({
					title: '提示',
					content: '提交认证成功，等待审核中...',
					showCancel: false,
					confirmText: '确定',
					success: res => {
						wx.navigateTo({
							url: '/pages/index/index'
						});
					},
					fail: (res) => {
						return true;
					}
				})
			}else{
				wx.showModal({
					title: '警告',
					content: '提交认证失败，请重试...',
					showCancel: false,
					confirmText: '确定',
					complete: res => {
						return true;
					}
				})
			}
		}).catch(res=>{
			console.log("error",res);
		});
	},
	//调起相机
	ChooseImage() {
		let that = this
		wx.chooseImage({
			count: 1, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: (res) => {
				console.log(res.tempFilePaths)
				$.uploadImg($.UPLOAD_IMG_URL,res.tempFilePaths[0]).then(resImg=>{
					that.setData({
						imgList: that.data.imgList.concat(resImg)
					})
				}).catch(resImg=>{
					console.log("error",resImg);
				});
			}
		});
	},
	//删除预览图片
	DelImg(e) {
		let that = this
		wx.showModal({
			title: '警告',
			content: '确定要删除这张图片吗？',
			cancelText: '取消',
			confirmText: '确定',
			success: res => {
				if (res.confirm) {
					that.setData({
						imgList: that.data.imgList.remove()(e.currentTarget.dataset.index, 1)
					})
				}
			}
		})
	},
})