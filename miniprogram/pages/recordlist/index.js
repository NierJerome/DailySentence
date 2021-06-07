// pages/list/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toUp: true,
    scrollTop: 200,
    toViewid: 'list3'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  upper: function (params) {
    console.log(1);

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

  onLoad: function (options) {

    let _this = this
    // 造一个列表数据
    let list = []
    for (let i = 0; i < 30; i++) {
      list.push(`这是第${i+1}条数据。`)
    }
    this.setData({
      mainHeight: app.globalData.wHeight,
      list: list
    })
  },

})