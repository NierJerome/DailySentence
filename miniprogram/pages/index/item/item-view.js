// pages/index/item/item-view.js
const App = getApp()
Component({

  // 允许组件采用全局样式
  options: {
    addGlobalClass: true
  },

  /**
   * 组件的属性列表
   */

  properties: {
    item: {
      type: Object,
      value: null
    },
    swiperHeight: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isClick: false,
    signed: App.globalData.signed,
  },


  /**
   * 组件的方法列表
   */
  methods: {
    handleSign: async function () {
      let _this = this
      if (this.data.signed) {
        return
      }
      if (this.data.isClick) {
        return
      }
      _this.setData({
        isClick: true
      })
      _this.setData({
        animation: 'hit'
      })
      setTimeout(function () {
        _this.setData({
          animation: '',
          isClick: false,
          // signed: true
        })
      }, 700)
      let item = this.data.item
      console.log(item);
      let data = {
        id: item.id,
        time: item.time,
        imageUrl: item.imageUrl,
        text: item.text,
        translation: item.translation
      }

      await wx.cloud.callFunction({
        name: 'signData',
        data: data,
        success: (res) => {
          if (res.result.sign) {
            wx.showToast({
              title: '打卡成功',
              icon: 'none',
              duration: 1000
            })
          }
        },
        fail: (err) => {
          wx.showToast({
            title: "打卡失败了，请确认网络环境",
            icon: 'none',
            duration: 1000
          })
        }
      })
    },


  },
  /**
   * 生命周期
   */
  lifetimes:{
    ready:function (params) {
      this.setData({
        signed:App.globalData.signed || false
      })
    }
  }
})