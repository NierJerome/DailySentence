// 云函数入口文件
const cloud = require('wx-server-sdk')


cloud.init({
  env: 'dev-cloud-4gsfo39c022ee2d2'
})

const rp = require('request-promise');
const db = cloud.database();
// 云函数入口函数

// 获取图片
function getImage() {
  let options = {
    uri: 'https://api.unsplash.com/photos/random',
    qs: {
      // client_id: "JBW8EBoI6WSb4C-ijGp86f1_myYbT-Z3gdJjoovbKR8",
      count: 1,
    },
    headers: {
      "Authorization": "Client-ID JBW8EBoI6WSb4C-ijGp86f1_myYbT-Z3gdJjoovbKR8"
    },
    json: true
  }
  let imageUrl = rp(options).then((res) => {
    return res[0].urls.small
  }).catch((err) => {
    console.log(err);
  })
  return imageUrl
}

// 获取句子
function getSentence() {

}

exports.main = async (event) => {
  // 判断是否传入了必填值（_id）
  if (event.id) {
    return {
      errorInfo: "新增记录需要[id]"
    }
  }
  //根据传入的时间获取图片，句子
  const imageurl = await getImage()
  //存入数据库
  const data = {
    _id: event.id + 1,
    date: Date.now(),
    text: "",
    translation: "",
    imageUrl: imageurl,
  }
  db.collection('data')
    .add({
      data: data
    })
  //查询数据库，返回

  return {
    message: "成功添加",
    newItem: data
  }
}