// 云函数入口文件
const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: 'dev-cloud-4gsfo39c022ee2d2'
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event) => {
  const wxContext = cloud.getWXContext()
  console.log(event);
  await db.collection('user').where({
      '_openid': wxContext.OPENID
    })
    .update({
      data: {
        nickName: event.nickName,
        gender: event.gender,
        avatarUrl: event.avatarUrl
      }
    })

  return {
    _openid:wxContext.OPENID,
    ...event
  }
}