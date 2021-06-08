// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: 'dev-cloud-4gsfo39c022ee2d2'
})
const db = cloud.database()

/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含小程序端调用传入的 data
 * 
 */
exports.main = async (event) => {
  const wxContext = cloud.getWXContext()
  let res = await db.collection('user')
    .where({
      _openid: wxContext.OPENID
    })
    .get()
  if (res.data.length) {
    // --Y调出用户信息
    return {
      userInfo:res.data[0],
      status: 1
    }
  } else {
    // --N新建用户信息
    db.collection('user').add({
      data: {
        _openid: wxContext.OPENID
      }
    }).then((res) => {
      console.log(res);
    })
    return {
      userInfo: {
        _openid:wxContext.OPENID
      },
      status : 0
    }
  }
  
}