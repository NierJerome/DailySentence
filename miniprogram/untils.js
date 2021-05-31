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

const isNewDate = (date) => {
  //检测是否传值
  if (!date) {
    return
  }
  date = new Date(Number(date));
  let currentDate = new Date()
  if (`${date.getFullYear()}${date.getMonth()}${date.getDate()}` == `${currentDate.getFullYear()}${currentDate.getMonth()}${currentDate.getDate()}`) {
    return 1
  } else {
    return 0
  }

}

module.exports = {
  formatChsTime,
  formatTime,
  formatNumber,
  isNewDate
}