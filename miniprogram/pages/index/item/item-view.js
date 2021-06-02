// pages/index/item/item-view.js
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
    isClick: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleSign: function () {
      if (this.data.isClick) {
        return
      }
      this.setData({
        isClick: true
      })
      var that = this;
      that.setData({
        animation: 'fade'
      })
      wx.cloud.callFunction({
        name: 'signData',
        data: item,
        success: (res) => {
          console.log(res);
        },
        fail: (err) => {
          console.log(err);
        }
      })
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
      setTimeout(function () {
        that.setData({
          animation: '',
          isClick: false
        })
      }, 700)
    },


  },

})