//app.js
const tools = require("./untils")


App({
  onLaunch: function () {
    // 初始化数据库
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        env: 'dev-cloud-4gsfo39c022ee2d2',
        traceUser: true,
      })

    }
    // wx.login({
    //   timeout: 30000,
    //   success: (res) => {
    //     // 登录后获取openid（用户唯一标识）
    //     wx.cloud.callFunction({
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
    //   },
    //   fail: (err) => {
    //     console.log(err);
    //   }
    // })


    this.getSentenceData()


  },

  // 获取数据
  async getSentenceData() {
    let list = []
    const db = wx.cloud.database()

    // 判断本地缓存是否有数据
    let dataList = wx.getStorageSync('dataList')
    if (dataList.length) {
      // if (0) {
      // 判断是否更新数据 使用缓存数据判断
      let lastItem = dataList[dataList.length - 1]
      // let lastItem = {
      //   date: 1621650972
      // }
      if (!tools.isNewDate(lastItem.date)) {
        await this.updateData(lastItem)
        // 获取
        list = await this.getData()
      } else {
        return
      }
    } else {
      // 第一次进入/清除缓存进入
      // 判断是否更新数据 使用数据库数据判断
      let ct = await db.collection('data').count()
      let row = await db.collection('data').skip(ct.total - 1).get()
      if (!tools.isNewDate(row.data[0].date)) {
        // 更新
        let a = await this.updateData(row.data[0])
        console.log(a);
        // 获取
        list = await this.getData()
      } else {
        //直接获取
        list = await this.getData()
      }

    }

    wx.setStorageSync('dataList', list)
    return list
  },

  // 更新数据
  async updateData(row) {
    // 更新数据
   return await wx.cloud.callFunction({
      name: 'addData',
      data: {
        id: row.id,
      },
    }).then((res)=>{
      return res
    })

  },

  // 获取数据
  getData() {
    // wx.cloud.callFunction({name:'getData'}) [云函数]
    // 数据库
    const db = wx.cloud.database()
    return db.collection('data')
      .orderBy('id', 'asc')
      .get()
      .then(res => {
        return res.data
      }).catch((err) => {
        console.log('获取失败', err);
      })
  },

  // 初始化数据
  initialize(userStatus) {
    // 初始化数据库
    const db = wx.cloud.database()
    console.log(userStatus);
    // 判断是否为已注册用户
    if (userStatus == 1) {
      // --Y调出用户信息
      db.collection('user').where({
          openid: this.globalData.openid
        })
        .get({
          success: (res) => {
            // 将获取的用户信息存入缓存
            wx.setStorageSync('userInfo', res.data)
          }
        })
    } else if (userStatus == 0) {
      // --N新建用户信息
      db.collection('user').add({
        openid: this.globalData.openid
      }).then((res) => {
        console.log(res);
        console.log("新建成功");
      })
    }


    // 初始化用户数据
  },


  globalData: {
    userInfo: null,
  }
})