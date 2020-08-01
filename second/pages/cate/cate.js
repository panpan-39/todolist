// pages/cate/cate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 正在进行的数组
    pendding:[],
    finished:[],
    val:''
  },
  // 跳转到详情页
  jump(){
    // 能返回上一页
    wx.navigateTo({
      url: '/pages/detail/detail',
    })
    // 不能返回上一页
    // wx.reLaunch({
    //   url: '/pages/detail/detail',
    // })
  },
  // input框
  getValue(e){
    // console.log(e)
    this.setData({val:e.detail.value})
  },
  save(){
    wx:wx.setStorage({
      data: this.data.pendding,
      key: 'pendding',
    })
    wx:wx.setStorage({
      data: this.data.finished,
      key: 'finished',
    })
  },
  // 点击添加按钮
  add(){
    this.data.pendding.push({
      val:this.data.val,
      checked:false,
      edit:false
    })
    this.setData({
      pendding:this.data.pendding,
      finished:this.data.finished,
      val:''
    })
    this.save()
    // console.log(this.data.finished)
  },
  // 正在进行checkbox事件
  check(e){
    // console.log(e)
    this.data.pendding[e.currentTarget.dataset.i].checked = !this.data.pendding[e.currentTarget.dataset.i].checked
    var finish = this.data.pendding.splice(e.currentTarget.dataset.i,1)[0].val
    this.data.finished.push({
      val:finish,  
      checked:true,
      edit:false,
    })

    this.setData({
      pendding:this.data.pendding,
      finished:this.data.finished
    })
    this.save()

  },
  // 已经完成事件
  finishCheck(e){
    console.log(e)
    this.data.finished[e.currentTarget.dataset.i].checked = !this.data.finished[e.currentTarget.dataset.i].checked
    var pend = this.data.finished.splice(e.currentTarget.dataset.i,1)[0].val
    this.data.pendding.push({
      val:pend,  
      checked:false,
      edit:false,
    })
    this.setData({
      pendding:this.data.pendding,
      finished:this.data.finished
    })
      this.save()
    console.log(pend)
  },
  // 删除
  del(e){
    console.log(e)
    if(e.currentTarget.dataset.checked){
      this.data.finished.splice(e.currentTarget.dataset.i,1)
    }else{
      this.data.pendding.splice(e.currentTarget.dataset.i,1)
    }
    this.setData({
      pendding:this.data.pendding,
      finished:this.data.finished
    })
      this.save()
  },
  // 修改
  edit(e){
    let i = e.currentTarget.dataset.i
    if(e.currentTarget.dataset.checked){
      this.data.finished[i].edit = true
    }else{
      this.data.pendding[i].edit = true
    }

    this.setData({
      pendding:this.data.pendding,
      finished:this.data.finished
    })
      this.save()
    // console.log(this.data.pendding[i].edit)
  },
  // 编辑input框进行改变时
  editValue(e){
    console.log(e)
    let i = e.currentTarget.dataset.i
    if(e.currentTarget.dataset.checked){
      this.data.finished[i].val = e.detail.value
    }else{
      this.data.pendding[i].val = e.detail.value
    }

    this.setData({
      pendding:this.data.pendding,
      finished:this.data.finished
    })
      this.save()
  },
  // 退出修改
  exitEdit(e){
    let i = e.currentTarget.dataset.i
    if(e.currentTarget.dataset.checked){
      this.data.finished[i].edit = false
    }else{
      this.data.pendding[i].edit = false
    }
    
    this.setData({
      pendding:this.data.pendding,
      finished:this.data.finished
    })
      this.save()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx:wx.getStorage({
      key: 'pendding',
      success: (res) => {
        this.setData({
          pendding:res.data
        })
      },
    })
    wx:wx.getStorage({
      key: 'finished',
      success: (res) => {
        this.setData({
          finished:res.data
        })
      },
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
