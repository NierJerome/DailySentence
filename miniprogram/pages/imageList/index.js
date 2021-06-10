// pages/imageList/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    masonry: null,
    modalName: "",
    currentImage: 'https://images.unsplash.com/photo-1621860088759-9027f133fc3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzQ0MDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI0NTEzODc&ixlib=rb-1.2.1&q=80&w=1080',
  },

  catch: function (params) {
    return
  },
  // 下载图片
  downloadImage: function () {
    console.log(1);
    let url = `${(this.data.currentImage).slice(0,(this.data.currentImage.indexOf('?')))}`
    wx.downloadFile({
      url: url,
      success(res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
          wx.showToast({
            title: '已下载到本地',
            icon: 'none'
          })
        }
      }
    })
  },

  // 展示图片
  showImage: function (e) {
    console.log(e);
    let imgurl = e.currentTarget.dataset.imgurl;
    this.setData({
      modalName: 'Image',
      currentImage: imgurl.replace('q=20&w=540', 'q=80&w=1080')
    })
  },
  hideModal: function (params) {
    this.setData({
      modalName: ''
    })
  },

  // 压缩图片格式
  formatImage: function (url) {
    if (!url) {
      return url
    }
    // `${(url).slice(0,(url.indexOf('?')))}`

    return url.replace('q=80&w=1080', 'q=20&w=540')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let imageList = wx.getStorageSync('dataList')

    let masonry = {}
    masonry.col_1 = []
    masonry.col_2 = []
    masonry.col_3 = []
    let i = 0
    while (i < imageList.length) {
      masonry.col_1.push(this.formatImage(imageList[i++].imageUrl));
      if (i < imageList.length) {
        masonry.col_2.push(this.formatImage(imageList[i++].imageUrl));
      }
      if (i < imageList.length) {
        masonry.col_3.push(this.formatImage(imageList[i++].imageUrl));
      }
    }
    console.log(masonry);
    this.setData({
      masonry: masonry
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})