// 云函数入口文件
const cloud = require('wx-server-sdk')


cloud.init({
  env: 'dev-cloud-4gsfo39c022ee2d2'
})

const db = cloud.database()

function getData(params) {
  return db.collection('data')
    .orderBy('_id', 'asc')
    .get()
    .then(res => {
      if (res.data) {
        return res.data
      }
    }).catch((err) => {
      console.log(err);
    })
}

// 云函数入口函数
exports.main = async (event, context) => {
  let data = await getData()
  return {
    data
  }
}