// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'dev-cloud-4gsfo39c022ee2d2'
})

const db = cloud.database();
// 云函数入口函数
exports.main = async (event) => {
  const wxContext = cloud.getWXContext()
  //获取当前用户id，打卡项
  let data = {
    openId:wxContext.OPENID,
    ...event
  }
  //加入数据库

  return await db.collection('signrecord').add({
    data:data
  }).then((res) => {
    return {
      res,
      data
    }
  })
}