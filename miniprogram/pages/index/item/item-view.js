// pages/index/item/item-view.js
Component({
  observers: {
    "item": function (obj) {
      if (obj && obj.today) {
        this.setData({
          signed: wx.getStorageSync('sign').signed || false
        })
      }
    }
  },

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
    signed: false,
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
      this.setData({
        isClick: true
      })
      _this.setData({
        animation: 'hit'
      })
      let item = this.data.item
      let data = {
        id: item.id,
        time: item.time,
        imageUrl: item.imageUrl,
        text: item.text,
        translation: item.translation
      }
      setTimeout(function () {
        _this.setData({
          animation: '',
          isClick: false,
          signed: true
        })
        wx.setStorageSync('sign', {
          signed: true
        })
      }, 700)

      //  wx.cloud.callFunction({
      //       name: 'login',
      //       success: (res) => {
      //         console.log(res);
      //         console.log('[云函数] [login] user openid: ', res.result.openid, '是否已存在用户？',
      //           res.result.status == 1 ? '[是]' : '[否]')
      //         this.globalData.openid = res.result.openid
      //         this.initialize(res.result.status)
      //       },
      //       fail: (err) => {
      //         wx.showToast({
      //           title: '网络错误',
      //           icon: "none",
      //           duration: 1000
      //         })
      //       }
      //     })

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

})