//index.js

// 获取显示区域长宽
const device = wx.getSystemInfoSync()
const W = device.windowWidth
// const H = device.windowHeight - 50
const H = 480

let cropper = require('../../welCropper/welCropper.js');
Page({
    data: {
    },
    onLoad: function () {
        var that = this
        // 初始化组件数据和绑定事件
        cropper.init.apply(that, [W, H]);
    },
    selectTap(e) {
        let that = this
        let mode = e.currentTarget.dataset.mode
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success(res) {
                const tempFilePath = res.tempFilePaths[0]
                that.showCropper({
                    src: tempFilePath,
                    mode: mode,
                    sizeType: ['original', 'compressed'],  
                    maxLength: 1000, //默认2000，允许最大长宽，避免分辨率过大导致崩溃
                    callback: (res) => {
                        if (mode == 'rectangle') {
                            console.log("crop callback:" + res)
                        }
                        else {
                            wx.showModal({
                                title: '',
                                content: JSON.stringify(res),
                            })
                        }
                    }
                })
            }
        })
    }
})
