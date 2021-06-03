const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  // const hour = date.getHours()
  // const minute = date.getMinutes()
  // const second = date.getSeconds()

  // return `${[year, month, day].map(formatNumber).join('-')} ${[hour, minute, second].map(formatNumber).join(':')}`
  return `${[year, month, day].map(formatNumber).join('-')}`
}

const formatChsTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${year}年${month}月${day}日 ${hour}时${minute}分`
}

// const getDateUnix = date => {
//   const year = date.getFullYear()
//   const month = date.getMonth() + 1
//   const day = date.getDate()

//   return new Date(`${year}-${month}-${day}`)

// }

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const isToday = (date) => {
  //检测是否传值
  if (!date) {
    return
  }
  const time = new Date()

  if (Math.round(time.getTime() / 1000) - date < 86400) {
    console.log("今日已获取");
    return 1
  } else {
    console.log("今日未获取");
    return 0
  }

}

// 节流函数

function throttle(func, gapTime) {
  if (gapTime == null || gapTime == undefined) {
    gapTime == 1500
  }

  let _lastTime = null
  return function () {
    let _nowTime = +new Date()
    if (_nowTime - _lastTime > gapTime || _lastTime) {
      func()
      _lastTime = _nowTime
    }
  }
}

module.exports = {
  formatChsTime,
  formatTime,
  formatNumber,
  isToday,
  throttle
}