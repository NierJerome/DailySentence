// pages/list/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toUp: true,
    scrollTop: 200,
    toViewid:'list3'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  upper: function (params) {
    console.log(111);
    let _this = this
    _this.setData({
      toUp: true
    })
  },

  handleScroll:function (params) {
    let _this = this
    // 获取当前滑动到的位置

    // if(this.data.toUp){
    //   _this.setData({
    //     toUp: false
    //   })
    // }
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