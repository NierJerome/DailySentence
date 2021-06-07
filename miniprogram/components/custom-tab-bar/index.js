// components/c-tab-bar/index.js
Component({
  properties: {
    innerSelected: {
      type: Number,
      value: -1,
    }
  },

  data: {
    color: '#fff',
    list: [{
      pagePath: "/pages/index/index",
      text: "",
      iconPath: "/assets/images/index.png",
      selectedIconPath: "/assets/images/index.png"
    }, {
      pagePath: "/pages/message/index",
      text: "",
      iconPath: "/assets/images/list.png",
      selectedIconPath: "/assets/images/list.png"
    }, {
      pagePath: "/pages/mine/index",
      text: "",
      iconPath: "/assets/images/mine.png",
      selectedIconPath: "/assets/images/mine.png"
    }]
  },
  pageLifetimes: {
    show: function (params) {
      this.setData({
        selected: this.properties.innerSelected
      })
    },

    hide: function (params) {
      this.setData({
        selected: -1
      })
    }
  },

  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({
        url
      })

    }
  }
})