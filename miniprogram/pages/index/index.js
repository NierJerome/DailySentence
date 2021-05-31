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
      let time = new Date(item.date)
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
        case 7:
          day = "星期七"
          break;
      }
      return {
        month: `${time.getFullYear()}.${time.getMonth() + 1}`,
        day: day,
        date: time.getDate(),
        imageUrl: item.imageUrl,
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
    app.globalData.dailyList = dailyList
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
        title: "期待明天吗？",
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
      let list = wx.getStorageSync('dataList')
      //获取后端数据
      this.getDailyList(list)

    })

  },

  onUnload: function (params) {
    app.globalData.questionList = null
  },


})