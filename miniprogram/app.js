//app.js
const tools = require("./untils")
App({
  onLaunch: function () {
    this.globalData.wHeight = wx.getSystemInfoSync().windowHeight
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

    wx.cloud.callFunction({
      name: 'login',
      success: (res) => {
        this.globalData.openid = res.result.userInfo._openid
        wx.setStorageSync('userInfo', res.result.userInfo)
      },
      fail: (err) => {
        wx.showToast({
          title: '网络错误',
          icon: "none",
          duration: 1000
        })
      }
    })


  },



  // 获取数据
  async getSentenceData() {
    let _this = this
    let list = []

    // 判断本地缓存是否有数据
    let dataList = wx.getStorageSync('dataList')
    if (dataList.length) {
      // if (0) {
      // 判断是否更新数据 使用缓存数据判断
      let lastItem = dataList[dataList.length - 1]

      if (!tools.isToday(lastItem.time)) {
        list = await _this.getData()
      } else {
        // 有缓存时查询签到
        await this.querySign(lastItem.id)
        return
      }
    } else {
      // 第一次进入/清除缓存进入
      list = await _this.getData()
    }

    // 查询用户签到信息
    await this.querySign(list[list.length - 1].id)
    wx.setStorageSync('dataList', list)
    return list

  },

  querySign: function (id) {
    const db = wx.cloud.database()
    return db.collection('signrecord').where({
      id: id
    }).get().then(res => {
      if (res.data.length) {
        this.globalData.signed = true
      }
    })
  },

  // 获取数据
  getData: async function () {
    let list = []
    // 数据库
    const db = wx.cloud.database()
    let count = await db.collection('data').where({
      "id": db.command.gt(0)
    }).count();
    for (let i = 0; i < count.total; i += 20) {
      list = list.concat(await this.queryData(i))
      console.log(i, list);
    }
    return list
  },

  // 请求数据
  queryData: function (skip) {
    const db = wx.cloud.database()
    return db.collection('data')
      .where({
        "id": db.command.gt(0)
      })
      .orderBy('id', 'asc')
      .skip(skip)
      .get()
      .then(res => {
        console.log(res);
        return res.data
      }).catch((err) => {
        console.log('获取失败', err);
      })
  },

  globalData: {
    openid: '',
    userInfo: null,
    signed: false
  }
})