//index.js
const NO_PREV_PAGE = -1
const NO_NEXT_PAGE = -2
const app = getApp()

Page({
  data: {
    list: [],
    current: 0,
    currentIndex: 0,
    swiperDuration: "0", //第一次进入页面不显示动画



  },
  async getDailyList(list) {

    let _this = this
    let dailyList = list.map((item, index, array) => {
      if (index == array.length - 1) {
        item.today = true
      } else {
        item.today = false
      }

      return {
        ...item,
        index: index,
        total: array.length
      }
    })
    // 初始化需要三步
    // 初始化setData后，需要调用swiper组件的init方法
    // 初始化真实索引
    _this.setData({
      list: dailyList,
      currentIndex: dailyList.length - 1
    })

    // 每次都将进入最新一天 当前是必须为索引，实际需要 -1
    _this.selectComponent('#swiper').init(this.data.list.length - 1);
    // 初始化后再把动画弄出来，否则初始的current不是0，界面会自动跳动到当前位置，体验不太好
    _this.setData({
      swiperDuration: '250'
    })

    // 全局记一下list, 答题卡页暂时就直接用了
    // app.globalData.dailyList = dailyList
  },

  swiperChange(e) {
    let _this = this
    let current = e.detail.current
    _this.setData({
      currentIndex: current
    })
    if (current == NO_PREV_PAGE) {
      wx.showToast({
        title: "没有了哦",
        icon: "none"
      })
      return
    }

    if (current == NO_NEXT_PAGE) {
      wx.showToast({
        title: "没有了哦",
        icon: "none"
      })
      return
    }
  },

  onClickLast: function (e) {
    let _this = this
    if (_this.data.currentIndex - 1 < 0) {
      return
    }
    _this.setData({
      current: _this.data.currentIndex - 1
    })
  },

  onClickNext: function (e) {
    let _this = this
    if (_this.data.currentIndex + 1 > _this.data.list.length - 1) {
      return
    }
    _this.setData({
      current: _this.data.currentIndex + 1
    })
  },

  onLoad: function () {
    let _this = this

    app.getSentenceData().then((res) => {
      //设置swiper组件高度
      _this.setData({
        swiperHeight: wx.getSystemInfoSync().windowHeight,
        list: wx.getStorageSync('dataList')
      })
      let list = this.data.list

      //获取后端数据
      this.getDailyList(list)

    })

  },

  onUnload: function (params) {
    app.globalData.questionList = null
  },


})