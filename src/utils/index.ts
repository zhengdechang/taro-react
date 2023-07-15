import Taro from '@tarojs/taro'
/**
 * 图片上传
 * @param filePath 图片缓存路径
 * @param {string} url 上传接口地址
 * @param {object} header 上传接口header头
 * @returns {string} 文件上传地址
 */
export const uploadImage = (filePath: string, url?: string, header?: any) => {
  const Authorization = Taro.getStorageSync('token')
  const memberId = Taro.getStorageSync('member_id')
  return new Promise<string>((resolve, reject) => {
    Taro.uploadFile({
      url: url || '/api/member/upload', // 仅为示例，非真实的接口地址
      filePath,
      name: 'image_file',
      header: header || {
        'app-type': Taro.getEnv(),
        'auth-token': Authorization || '',
        'member-id': memberId || ''
      },
      success: (response: any) => {
        const { data, code, message } = JSON.parse(response.data)
        if (code === '2000') {
          resolve(data[0].url)
        } else {
          Taro.showToast({ title: message, icon: 'none' })
          reject()
        }
      },
      fail: () => {
        Taro.showToast({ title: '网络故障，请稍后再试', icon: 'none' })
        reject()
      }
    })
  })
}

export const downloadHttpImg = (httpImg: string) => {
  return new Promise(resolve => {
    Taro.downloadFile({
      url: httpImg,
      success: (res: { statusCode: number; tempFilePath: unknown }) => {
        if (res.statusCode === 200) {
          resolve(res.tempFilePath)
        } else {
          Taro.showToast({
            title: '图片下载失败！',
            icon: 'none',
            duration: 1000
          })
        }
      },
      fail: () => {
        Taro.showToast({
          title: '图片下载失败！',
          icon: 'none',
          duration: 1000
        })
      }
    })
  })
}

export const sharePosteCanvas = (imgUrl: string) => {
  Taro.saveImageToPhotosAlbum({
    filePath: imgUrl,
    success() {
      Taro.showToast({
        title: '图片已保存到相册',
        icon: 'none',
        duration: 1000
      })
    },
    fail() {
      Taro.showToast({
        title: '图片保存失败',
        icon: 'none',
        duration: 1000
      })
    }
  })
}

export const downloadImgToAlbum = (qrCodePath: string) => {
  Taro.showToast({
    title: '正在保存，请稍等',
    icon: 'none',
    duration: 2000
  })

  // 下载图片
  downloadHttpImg(qrCodePath).then((res: any) => {
    sharePosteCanvas(res)
  })
}

/**
 * 小程序保存图片到相册
 * @param url 图片地址
 */
export const DownloadImage = (url: string) => {
  const qrCodePath = url
  Taro.getSetting({
    success(res) {
      if (!res.authSetting['scope.writePhotosAlbum']) {
        // 没有授权
        Taro.authorize({
          scope: 'scope.writePhotosAlbum',
          success: () => {
            downloadImgToAlbum(qrCodePath)
          },
          fail: () => {
            if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
              Taro.openSetting({
                success: ({ authSetting }: any) => {
                  if (authSetting['scope.writePhotosAlbum']) {
                    downloadImgToAlbum(qrCodePath)
                  }
                }
              })
            }
          }
        })
      } else {
        // 已授权
        downloadImgToAlbum(qrCodePath)
      }
    }
  })
}

/**
 * @description H5 保存图片到相册
 * @author BaiHuaYang
 * @param {string} image 图片地址
 */
export const H5DownloadImage = (image: string) => {
  const blob = new Blob([''], { type: 'application/octet-stream' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = image
  const [href] = image.replace(/(.*\/)*([^.]+.*)/gi, '$2').split('?')
  a.download = href
  const e = document.createEvent('MouseEvents')
  e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
  a.dispatchEvent(e)
  URL.revokeObjectURL(url)
}

/**
 * @description 获取小程序APPId
 * @author BaiHuaYang
 * @export
 * @return {string} appid
 */
export const getAppid = (): string => {
  const appid = Taro.getStorageSync('appid')
  if (appid) return appid

  if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
    const { miniProgram } = Taro.getAccountInfoSync()
    Taro.setStorageSync('appid', miniProgram.appId)
    return miniProgram.appId
  }
  // if (Taro.getEnv() === Taro.ENV_TYPE.ALIPAY) {
  //   Taro.setStorageSync('appid', (my.getAppIdSync() as any).appId)
  //   return (my.getAppIdSync() as any).appId
  // }

  if (Taro.getEnv() === Taro.ENV_TYPE.WEB) return ''

  return ''
}

/**
 * @description 将一维数组拆分成多个二维数组
 * @author BaiHuaYang
 * @export Function
 * @param {any[]} array 源一维数组
 * @param {number} subGroupLength 单数组长度
 * @returns []
 */
export const arrGroup = (array: any[], subGroupLength: number) => {
  let index = 0
  const newArray: any[] = []
  while (index < array.length) {
    newArray.push(array.slice(index, (index += subGroupLength)))
  }
  return newArray
}
/**
 * 将对象解析成url参数
 * @param {*} obj
 * @returns
 */
export const objectToString = (obj: any) => {
  const searchKeys: string[] = []
  if (Object.prototype.toString.call(obj) === '[object Object]' && Object.keys(obj).length) {
    for (const key in obj) {
      searchKeys.push(`${key}=${obj[key]}`)
    }
  }
  return searchKeys.join('&')
}
/**
 * 前17位校验系数
 */
const COEFFICIENTS = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]

/**
 * 尾数校验
 */
const CAPTCHA = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']

/**
 * 身份证号校验
 * @param idCardNum
 * @return 校验结果
 */
export const validateIdCardNum: (string) => boolean = (idCardNum: string) => {
  if (!idCardNum.match(/^[0-9]{17}([0-9X])$/gi)) {
    return false
  }
  const total = idCardNum
    .substring(0, 17)
    .split('')
    .reduce((preVal, current, index) => {
      return (preVal += +current * COEFFICIENTS[index])
    }, 0)
  const last = idCardNum.toUpperCase().charAt(17)
  return last === CAPTCHA[total % 11]
}
// 转换时间格式
export function formatTimeZh(date, flag) {
  if (!date) {
    return
  }
  date = new Date(date)

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  // var formatNumber = function(n) {
  //   n = n.toString();
  //   return n[1] ? n : '0' + n;
  // };
  const dateList = [year, month, day].map(formatNumber)
  return (
    dateList[0] +
    (flag || '年') +
    dateList[1] +
    (flag || '月') +
    dateList[2] +
    (flag ? '' : '日') +
    ' ' +
    [hour, minute].map(formatNumber).join(':')
  )
}
// 转化日期格式
export function formatTimeDate(date) {
  if (!date) {
    return
  }
  date = new Date(date)

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const dateList = [year, month, day].map(formatNumber)
  return dateList[0] + '-' + dateList[1] + '-' + dateList[2]
}
// 转化月份格式
export function formatTimeMoth(date) {
  if (!date) {
    return
  }
  date = new Date(date)

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const dateList = [year, month, day].map(formatNumber)
  return dateList[0] + '-' + dateList[1]
}
// 转化时间格式
export function formatTimeTime(date) {
  if (!date || date < 0) {
    return
  }
  date = new Date(date)

  const hour = date.getHours()
  const minute = date.getMinutes()
  const seconds = date.getSeconds()

  return [hour, minute, seconds].map(formatNumber).join(':')
}
// 转换单位数为双位数：9 -> 09
export function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
export const deadlineTime = time => {
  let diff = time - new Date().getTime()
  if (!diff || diff < 0) {
    return '0天0时0分'
  }
  let baseTime = 24 * 60 * 60 * 1000 // 天
  const day = Math.floor(diff / baseTime)
  diff = diff % baseTime
  baseTime = baseTime / 24
  const hour = Math.floor(diff / baseTime)
  diff = diff % baseTime
  baseTime = baseTime / 60
  const minute = Math.floor(diff / baseTime)

  return `${day}天${hour}时${minute}分`
}

// 计算倒计时
export function countdownTime(time, mode) {
  let diff = time - new Date().getTime()
  if (!diff || diff < 0 || (mode === 1 && diff >= 3 * 24 * 60 * 60 * 1000)) {
    return
  }
  let baseTime = 24 * 60 * 60 * 1000 // 天基数
  const day = Math.floor(diff / baseTime)
  diff = diff % baseTime
  baseTime = baseTime / 24
  let hour = Math.floor(diff / baseTime)
  diff = diff % baseTime
  baseTime = baseTime / 60
  const minute = Math.floor(diff / baseTime)
  diff = diff % baseTime
  baseTime = baseTime / 60
  const seconds = Math.floor(diff / baseTime)

  if (mode === 1) {
    hour += day * 24

    return [hour, minute, seconds].map(formatNumber).join('').split('')
  }
  return `${day}天${hour}时${minute}分`
}

// 已经过去多长时间
export function pastTime(time) {
  return diffTime(new Date().getTime(), time)
}

export function diffTime(startTime = new Date().getTime(), endTime) {
  let diff = startTime - endTime
  // if (!diff || diff < 0 || (mode === 1 && diff >= 3 * 24 * 60 * 60 * 1000)) {
  //   return;
  // }
  let baseTime = 24 * 60 * 60 * 1000 // 天基数
  const day = Math.floor(diff / baseTime)
  diff = diff % baseTime
  baseTime = baseTime / 24
  let hour = Math.floor(diff / baseTime)
  diff = diff % baseTime
  baseTime = baseTime / 60
  const minute = Math.floor(diff / baseTime)
  diff = diff % baseTime
  baseTime = baseTime / 60
  const seconds = Math.floor(diff / baseTime)

  hour += day * 24
  return [hour, minute, seconds].map(formatNumber).join(':').split('')
  // return `${day}天${hour}时${minute}分`;
}

/**
 * 防抖函数
 * @param {Function} fn 要防抖的方法
 * @param {number} delay 延迟毫秒数
 * @returns {Function} 防抖函数
 */
export const debounce = (fn, delay) => {
  let timer: any = null
  return (...args) => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
