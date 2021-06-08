// pages/list/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toUp: true,
    scrollTop: 200,
    toViewid: 'list3',
    page: 0, // 控制当前获取的页数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  upper: function (params) {

  },

  handleScroll: function (params) {
    let _this = this

    const query = wx.createSelectorQuery()
    query.select('#scroll').boundingClientRect()
    query.select('#list0').boundingClientRect()
    query.exec((res) => {
      let scrollH = res[0].top
      let itemH = res[1].top
      if ((itemH - scrollH) < -80) {
        _this.setData({
          toUp: false
        })
      } else {
        _this.setData({
          toUp: true
        })
      }
    })


  },

  getSignedData: function () {
    const db = wx.cloud.database()
    return db.collection('signrecord')
      .limit(10)
      .orderBy('time', 'desc')
      .skip(10 * this.data.page)
      .get()
      .then(res => {
        console.log(res);
        return res.data
      })
      .catch(err => {
        console.log(err);
      })
  },

  onLoad: async function (options) {

    const _this = this

    // 获取签到记录
    let list = await _this.getSignedData()
    console.log(list);
    let renderList = list.map((item) => {
      let time = new Date(item.time * 1000)
      let date = time.getDate() > 9 ? time.getDate() : `0${time.getDate()}`
      let year = time.getFullYear()
      let month
      switch (time.getMonth()) {
        case 0:
          month = '一'
          break;
        case 1:
          month = '二'
          break;
        case 2:
          month = '三'
          break;
        case 3:
          month = '四'
          break;
        case 4:
          month = '五'
          break;
        case 5:
          month = '六'
          break;
        case 6:
          month = '七'
          break;
        case 7:
          month = '八'
          break;
        case 8:
          month = '九'
          break;
        case 9:
          month = '十'
          break;
        case 10:
          month = '十一'
          break;
        case 11:
          month = '十二'
          break;
      }
      let tempUrl = item.imageUrl
      // https://images.unsplash.com/photo-1621478492435-a6153fec2926?crop=top&w=1080&h=300&fit=crop

      let imageUrl = `${(tempUrl).slice(0,(tempUrl.indexOf('?')))}?crop=center&w=720&h=300&fit=crop`
      return {
        text: item.text,
        date: date,
        month: month,
        year: year,
        translation: item.translation,
        imageUrl: imageUrl
      }
    })
    // 造一个列表数据

    _this.setData({
      mainHeight: app.globalData.wHeight,
      list: renderList
    })
  },

})