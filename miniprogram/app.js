//app.js
App({
  onLaunch: function () {
    
    // 匹配用户id
    // if (condition) {
      
    // }
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'dev-cloud-4gsfo39c022ee2d2',
        traceUser: true,
      })
      console.log("[当前环境]：[dev]");
    }

    wx.login({
      timeout: 30000,
      success: (res) => {
        // console.log(res);
        wx.cloud.callFunction({
          name: 'login1',
          data: {
            code: res.code
          },
          success: (res) => {
            console.log('[云函数] [login] user openid: ', res)
            wx.setStorageSync('loginInfo', res.result)
          }
        })
      },
      fail: (err) => {
        console.log(err);
      }
    })

    this.globalData = {
      userInfo: null,
    }
  }
})