const $ =require("request")
const formatTime = (date,split='-') => {
  if(Number.isFinite(date)){
    date = new Date(date);
  }
  console.log(date,split);
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  
  return [year, month, day].map(formatNumber).join(split) + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getPerson = () => {
  return [{
    "id":0,
    "name":"王丽丽"
  }]
}

const getSchool = () => {
  return [{
    "id":0,
    "name":"中国农业大学"
  }]
}

const getCompany = () => {
  return [{
    "id":0,
    "name":"百度"
  }]
}

const getDayWage = () =>{
  return [
    {id:100, name:"100元"},
    {id:200, name:"200元"},
    {id:300, name:"300元"},
    {id:400, name:"400元"},
    {id:500, name:"500元"},
    {id:600, name:"600元"},
    {id:700, name:"700元"},
    {id:800, name:"800元"},
    {id:900, name:"900元"},
    {id:1000, name:"1000元"}
  ]
}

const getUser = () => {
  return {
    "id":0,
    "name":"用户名",
    "collegeId":0
  }
}

const getLearningStages = () =>{
  return [
    {id:1, name:"大一在读"},
    {id:2, name:"大二在读"},
    {id:3, name:"大三在读"},
    {id:4, name:"大四在读"},
    {id:5, name:"研一在读"},
    {id:6, name:"研二在读"},
    {id:7, name:"研三在读"},
    {id:8, name:"博一在读"},
    {id:9, name:"博二在读"},
    {id:10, name:"博三在读"}
  ]
}

const getDegree = () =>{
  return [
    {id:0, name:"高中"},
    {id:1, name:"本科"},
    {id:2, name:"硕士"},
    {id:3, name:"博士"}
  ]
}

const getJobPeriod = () =>{
  return [
    {id:1, name:"1个月"},
    {id:2, name:"2个月"},
    {id:3, name:"3个月"},
    {id:4, name:"4个月"},
    {id:5, name:"5个月"},
    {id:6, name:"6个月"},
    {id:7, name:"7个月"},
    {id:8, name:"8个月"},
    {id:9, name:"9个月"},
    {id:10, name:"10个月"},
    {id:11, name:"11个月"},
    {id:12, name:"12个月"},
    {id:18, name:"18个月"},
    {id:24, name:"24个月"},
    {id:36, name:"36个月"}
  ]
}
// /api/common/cityList
const getobDayNum = () =>{
  return [
    {id:1, name:"1日"},
    {id:2, name:"2日"},
    {id:3, name:"3日"},
    {id:4, name:"4日"},
    {id:5, name:"5日"},
    {id:6, name:"6日"},
    {id:7, name:"7日"}
  ]
}


module.exports = {
  formatTime: formatTime,
  local:{
    getPerson,
    getSchool,
    getCompany,
    getUser,
    getLearningStages,
    getJobPeriod,
    getobDayNum,
    getDegree,
    getDayWage
  }
}
