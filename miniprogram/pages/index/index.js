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

    allList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }],

  },
  getDailyList() {
    let _this = this
    let dailyList = []
    for (let i = 0; i < 6; i++) {
      let item = {}
      item.index = i
      item.total = 6
      dailyList.push(item)
    }

    // 初始化需要三步
    // 初始化setData后，需要调用swiper组件的init方法
    // 初始化真实索引
    _this.setData({
      list: dailyList,
      currentIndex: dailyList.length - 1
    })

    // 每次都将进入最新一天 当前是必须为索引，实际需要 -1
    _this.selectComponent('#swiper').init(5);
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
        title: "已经是第一题了",
        icon: "none"
      })
      return
    }

    if (current == NO_NEXT_PAGE) {
      wx.showModal({
        title: "提示",
        content: "您已经答完所有题，是否退出？",
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
    //设置swiper组件高度
    _this.setData({
      swiperHeight: wx.getSystemInfoSync().windowHeight,
    })

    //获取后端数据
    this.getDailyList()
  },

  onUnload: function (params) {
    app.globalData.questionList = null
  },


})