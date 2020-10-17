// const BASE_URL = "http://localhost:80"
// const BASE_URL = "http://39.107.242.206:18541"
const BASE_URL = "https://api-gk.yshnkj.com"
// const BASE_URL = "http://10.128.131.229:18541"
const IMG_URL = "/api/upload/img"

const get = (url,data)=>{
    wx.showLoading({
        title: '加载中',
    });
    url = BASE_URL + url;
    console.log("url",url);
    console.log("data",data);
    return new Promise((resolve,reject)=>{
        wx.request({
            url:url,
            method:"GET",
            data:data,
            success:res=>{
                resolve(res);
            },
            fail:res=>{
                reject(res);
            },
            complete:()=>{
                wx.hideLoading();
            }
        })
    })
}

const post = (url,data)=>{
    wx.showLoading({
        title: '加载中',
    });
    url = BASE_URL + url;
    console.log("url",url);
    console.log("data",data);
    return new Promise((resolve,reject)=>{
        wx.request({
            url:url,
            method:"POST",
            data:data,
            success:res=>{
                resolve(res);
            },
            fail:res=>{
                reject(res);
            },
            complete:()=>{
                wx.hideLoading();
            }
        })
    })
}

const uploadFile = (uploadUrl,filePath)=>{
    wx.showLoading({
        title: '上传中',
    });
    return new Promise((resolve,reject)=>{
        wx.uploadFile({
            url: uploadUrl,//上传接口
            name: "file",
            formData:  {"subfolder": "active","type":"file","entype":"multipart/form-data"},
            filePath: filePath,
            complete: function (str) {
                resolve(str);
                wx.hideLoading();
            }
        })
    })
}

const uploadImg = (uploadUrl,filePath)=>{
    return new Promise((resolve,reject)=>{
        uploadFile(uploadUrl,filePath).then(res=>{
            resolve(JSON.parse(res.data).data)
        })
    })
}
module.exports = {
    get:get,
    post:post,
    uploadFile:uploadFile,
    uploadImg:uploadImg,
    BASE_URL:BASE_URL,
    UPLOAD_IMG_URL:BASE_URL+IMG_URL
}

