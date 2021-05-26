// components/swiper-screen/index.js
const START = 0
const END = 2
const SWIPER_LENGTH = 3
const NO_PREV_PAGE = -1
const NO_NEXT_PAGE = -2

Component({
  observers: {
    'current': function (index) {
      let _this = this
      let current = index % SWIPER_LENGTH
      let {
        swiperIndex,
        swiperList
      } = _this.data
      // 循环列表为空，或当前列表项没有值
      if (swiperList.length == 0 || swiperList[current] == null) {
        return
      }
      console.log("[需要改变的数据]", swiperIndex, swiperList);
      // 如果change后还是之前的那一个item，直接return
      if (current == swiperIndex && swiperList[swiperIndex].index == index) {
        return
      }
      // 
      console.log("索引改变");
      _this.init(index)
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // 组件高度
    swiperHeight: {
      type: Number,
      value: 0
    },
    // 当前显示项索引
    current: {
      type: Number,
      value: 0
    },
    // 获取循环数据
    list: {
      type: Array,
      value: []
    },
    // 值为0禁止切换动画
    swiperDuration: {
      type: String,
      value: "250"
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 滑动到的位置
    swiperIndex: 0,
    // 此值控制swiper的位置
    swiperCurrent: 0,
    // 当前swiper渲染的items
    swiperList: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    init(defaulaIndex) {
      let _this = this
      // 获取传过来的循环数据
      let list = _this.data.list
      console.log(list);
      if (list == null || list.length == 0) {
        return
      }
      // 默认显示的index
      let current = defaulaIndex % SWIPER_LENGTH
      _this.setData({
        swiperList: _this.getInitSwiperList(list, defaulaIndex),
        swiperIndex: current,
        swiperCurrent: current,
      })
    },

    clear() {
      this.setData({
        list: [],
        swiperList: []
      })
    },

    swiperChange: function (e) {
      // console.log(e);
      let _this = this
      let current = e.detail.current
      let lastIndex = _this.data.swiperIndex
      let currentItem = _this.data.swiperList[current]
      let info = {}
      console.log("[当前索引]：", current, "[上一项索引]：", lastIndex, )

      info.source = e.detail.source

      // 正向滑动，到下一个的时候
      // 是正向衔接
      let isLoopPositive = current == START && lastIndex == END
      if (current - lastIndex == 1 || isLoopPositive) {
        // 如果是滑到了左边界或者下一个还未有值，弹回去
        if (currentItem == null) {
          info.current = NO_NEXT_PAGE
          _this.triggerEvent("change", info)
          _this.setData({
            swiperCurrent: lastIndex
          })
          return
        }
        let swiperChangeItem = "swiperList[" + _this.getNextSwiperChangeIndex(current) + "]"
        _this.setData({
          [swiperChangeItem]: _this.getNextSwiperNeedItem(currentItem, _this.data.list)
        })
      }

      // 反向滑动，到上一个的时候
      // 是反向衔接
      var isLoopNegative = current == END && lastIndex == START
      if (lastIndex - current == 1 || isLoopNegative) {
        // 如果滑到了右边界或者上一个还未有值，弹回去
        if (currentItem == null) {
          info.current = NO_PREV_PAGE
          _this.triggerEvent("change", info)
          _this.setData({
            swiperCurrent: lastIndex
          })
          return
        }
        let swiperChangeItem = "swiperList[" + _this.getLastSwiperChangeIndex(current) + "]"
        _this.setData({
          [swiperChangeItem]: _this.getLastSwiperNeedItem(currentItem, _this.data.list)
        })
      }

      if (currentItem == null) return
      info.current = currentItem.index
      _this.triggerEvent("change", info)
      // 记录滑过来的位置，此值对于下一次滑动的计算很重要
      _this.data.swiperIndex = current
    },

    /**
     * 获取初始化的swiperList
     */
    getInitSwiperList: function (list, defaultIndex) {
      console.log('默认索引：', defaultIndex);
      let _this = this
      let current = defaultIndex % SWIPER_LENGTH
      let realIndex = list.findIndex(function (item) {
        return item.index == defaultIndex
      })
      console.log('真是索引：', realIndex);
      // 将当前展示项放入当前swiper渲染的items
      let currentItem = list[realIndex]
      let swiperList = []
      swiperList[current] = currentItem
      // 放入前一项
      swiperList[_this.getLastSwiperChangeIndex(current)] = _this.getLastSwiperNeedItem(currentItem, list)
      // 放入后一项
      swiperList[_this.getNextSwiperChangeIndex(current)] = _this.getNextSwiperNeedItem(currentItem, list)
      console.log("初始化swiperList", swiperList)
      return swiperList;
    },

    /**
     * 获取swiperList中current上一个的index
     */
    getLastSwiperChangeIndex: function (current) {
      return current > START ? current - 1 : END
    },
    /**
     * 获取swiperLit中current下一个的index
     */
    getNextSwiperChangeIndex: function (current) {
      return current < END ? current + 1 : START
    },
    /**
     * 获取上一个要替换的list中的item
     */
    getLastSwiperNeedItem: function (currentItem, list) {
      if (currentItem == null) return null;
      let listNeedIndex = currentItem.index - 1
      // 获取实际索引
      let realIndex = list.findIndex(function (item) {
        return item.index == listNeedIndex
      })
      if (realIndex == -1) return null
      let item = listNeedIndex == -1 ? null : list[realIndex]
      return item
    },
    /**
     * 获取下一个要替换的list中的item
     */
    getNextSwiperNeedItem: function (currentItem, list) {
      if (currentItem == null) return null;
      let listNeedIndex = currentItem.index + 1
      // 获取实际索引
      let realIndex = list.findIndex(function (item) {
        return item.index == listNeedIndex
      })
      if (realIndex == -1) return null
      let total = this.data.total != 0 ? this.data.total : list.length
      let item = listNeedIndex == total ? null : list[realIndex]
      return item
    }

  }
})