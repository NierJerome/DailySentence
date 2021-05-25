// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'dev-cloud-4gsfo39c022ee2d2'
})

const rp = require('request-promise');
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let res = await db.collection('user')
    .where({
      openid: wxContext.OPENID
    })
    .get()
  console.log(res);
  if (!res.data.length) {
    db.collection('user')
      .add({
        data: {
          openid: wxContext.OPENID
        }
      })
  }
  // if (isNew) {
  //   console.log("新增");
  // }
  // ?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
  let options = {
    uri: 'https://api.weixin.qq.com/sns/jscode2session',
    qs: {
      appid: "wx3357030c8ada9441",
      secret: "91101a9c895ceb00e6ad9b266a3e18ad",
      js_code: event.code,
      grant_type: "authorization_code"
    },
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
  }
  
  console.log(cloud.session_key);
  return await rp(options)
    .then((res) => {
      let loginInfo = {
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        // 环境id用作开发时查看云函数所在环境   
        // -----------------------待实现
        env: wxContext.ENV,
        ...res
      }
      db.collection('user').where({
        openid: wxContext.OPENID
      }).update({
        // data 传入需要局部更新的数据
        data: {
          session_key:loginInfo.session_key
        },
        success: function (res) {
          console.log(res.data)
        }
      })
      return loginInfo
    })
    .catch((err) => {
      return err
    })

}