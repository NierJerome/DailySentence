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
    return res[0].urls.regular
  }).catch((err) => {
    console.log(err);
  })
  return imageUrl
}

// 获取农历日期
function getLunar(date) {
  let options = {
    uri: `https://www.mxnzp.com/api/holiday/single/${date}`,
    method: 'POST',
    headers: {
      "app_id": "biyzvpetmlnrjdbh",
      "app_secret": "MWV6eDdEV2sxQmoyUThvemI0NlRadz09",
      "Authorization": "Client-ID JBW8EBoI6WSb4C-ijGp86f1_myYbT-Z3gdJjoovbKR8"
    },
    json: true
  }
  let lunarCalendar = rp(options).then((res) => {
    return res.data.lunarCalendar
  }).catch((err) => {
    console.log(err);
  })

  return lunarCalendar
}

// 获取句子
function getSentence(date) {
  let options = {
    uri: "http://open.iciba.com/dsapi/",
    method: 'POST',
    form: {
      "date": date
    },
    json: true
  }
  let record = rp(options).then((res) => {
    return {
      text: res.content,
      translation: res.note
    }
  }).catch((err) => {
    console.log(err);
  })

  return record
}
const getTime = time => {
  const year = time.getFullYear()
  const month = time.getMonth() + 1
  const date = time.getDate()
  let day
  switch (time.getDay()) {
    case 1:
      day = "星期一"
      break;
    case 2:
      day = "星期二"
      break;
    case 3:
      day = "星期三"
      break;
    case 4:
      day = "星期四"
      break;
    case 5:
      day = "星期五"
      break;
    case 6:
      day = "星期六"
      break;
    case 0:
      day = "星期日"
      break;
  }

  return {
    yearAndMonth: `${year}.${month}`,
    day: day,
    fullDate: `${year}${month>9?month:'0'+month}${date>9?date:'0'+date}`,
    fullDate_2: `${year}-${month>9?month:'0'+month}-${date>9?date:'0'+date}`,
    date: date
  }
  // return `${[year, month, day].map(formatNumber).join('-')}`
}


exports.main = async (event) => {
  const time = new Date()
  const cTime = await getTime(time)
  // 判断是否传入了必填值（_id）
  if (!event.id) {
    return {
      errorInfo: "新增记录需要[id]"
    }
  }



  //根据传入的时间获取图片，句子
  const imageurl = await getImage()
  const lunarcalendar = await getLunar(cTime.fullDate)
  const record = await getSentence(cTime.fullDate_2)
  //存入数据库
  const data = {
    id: event.id + 1,
    time: Date.now(),
    yearAndMonth: cTime.yearAndMonth,
    day: cTime.day,
    text: record.text,
    lunar: lunarcalendar,
    translation: record.translation,
    imageUrl: imageurl,
    date: cTime.date
  }
  return await db.collection('data')
    .add({
      data: data
    }).then((res) => {
      return {
        res,
        data
      }
    })
}