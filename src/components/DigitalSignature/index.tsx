import { FC, useLayoutEffect, useRef, useCallback } from 'react'

const Index: FC = () => {
  // 配置内容
  const config = {
    width: 400, // 宽度
    height: 200, // 高度
    lineWidth: 5, // 线宽
    strokeStyle: 'red', // 线条颜色
    lineCap: 'round', // 设置线条两端圆角
    lineJoin: 'round' // 线条交汇处圆角
  }
  const canvasRef: any = useRef<HTMLInputElement>(null)
  // 如果是原生微信小程序则使用wx.createCanvasContext进行创建（2.9.0）之后的库不支持
  // 如果是uni-app则需要使用uni.createCanvasContext进行上下文创建
  let cxtRef: any = useRef(null)
  // 保存上次绘制的 坐标及偏移量
  const clientRef = useRef({
    offsetX: 0, // 偏移量
    offsetY: 0,
    endX: 0, // 坐标
    endY: 0
  })
  // 判断是否为移动端
  const mobileStatus = /Mobile|Android|iPhone/i.test(navigator.userAgent)

  // 初始化
  const init = event => {
    // 获取偏移量及坐标
    const { offsetX, offsetY, clientX, clientY } = mobileStatus ? event.changedTouches[0] : event
    // 修改上次的偏移量及坐标
    clientRef.current.offsetX = offsetX
    clientRef.current.offsetY = offsetY
    clientRef.current.endX = clientX - canvasRef.current.offsetLeft
    clientRef.current.endY = clientY - canvasRef.current.offsetTop

    // 清除以上一次 beginPath 之后的所有路径，进行绘制
    cxtRef.beginPath()
    // 根据配置文件设置相应配置
    cxtRef.lineWidth = config.lineWidth
    cxtRef.strokeStyle = config.strokeStyle
    cxtRef.lineCap = config.lineCap
    cxtRef.lineJoin = config.lineJoin
    // 设置画线起始点位
    cxtRef.moveTo(clientRef.current.endX, clientRef.current.endY)
    // 监听 鼠标移动或手势移动
    canvasRef.current.addEventListener(mobileStatus ? 'touchmove' : 'mousemove', draw)
  }
  // 绘制
  const draw = event => {
    // 获取当前坐标点位
    const { clientX, clientY } = mobileStatus ? event.changedTouches[0] : event
    // 修改最后一次绘制的坐标点
    clientRef.current.endX = clientX - canvasRef.current.offsetLeft
    clientRef.current.endY = clientY - canvasRef.current.offsetTop

    // 根据坐标点位移动添加线条
    cxtRef.lineTo(clientX - canvasRef.current.offsetLeft, clientY - canvasRef.current.offsetTop)

    // 绘制
    cxtRef.stroke()
  }
  // 结束绘制
  const closeDraw = () => {
    // 结束绘制
    cxtRef.closePath()
    // 移除鼠标移动或手势移动监听器
    canvasRef.current.removeEventListener('mousemove', draw)
  }

  useLayoutEffect(() => {
    canvasRef.current.width = config.width
    canvasRef.current.height = config.height
    // 设置一个边框
    canvasRef.current.style.border = '1px solid #000'
    // 创建上下文
    // eslint-disable-next-line @typescript-eslint/no-shadow
    cxtRef = canvasRef.current.getContext('2d')
    // 设置填充背景色
    cxtRef.fillStyle = 'transparent'
    // 绘制填充矩形
    cxtRef.fillRect(
      0, // x 轴起始绘制位置
      0, // y 轴起始绘制位置
      config.width, // 宽度
      config.height // 高度
    )
    // 创建鼠标/手势按下监听器
    canvasRef.current.addEventListener(mobileStatus ? 'touchstart' : 'mousedown', init)
    // 创建鼠标/手势 弹起/离开 监听器
    canvasRef.current.addEventListener(mobileStatus ? 'touchend' : 'mouseup', closeDraw)
  }, [config])

  // 取消-清空画布
  const handleCancel = useCallback(() => {
    // 清空当前画布上的所有绘制内容
    cxtRef.clearRect(0, 0, config.width, config.height)
  }, [cxtRef])
  // 保存-将画布内容保存为图片
  const handleSave = () => {
    // 将canvas上的内容转成blob流
    canvasRef.current.toBlob(blob => {
      // 获取当前时间并转成字符串，用来当做文件名
      const date = Date.now().toString()
      // 创建一个 a 标签
      const a = document.createElement('a')
      // 设置 a 标签的下载文件名
      a.download = `${date}.png`
      // 设置 a 标签的跳转路径为 文件流地址
      a.href = URL.createObjectURL(blob)
      // 手动触发 a 标签的点击事件
      a.click()
      // 移除 a 标签
      a.remove()
    })
  }
  return (
    <div>
      <canvas ref={canvasRef}></canvas>
      <div>
        <button onClick={handleCancel}>取消</button>
        <button onClick={handleSave}>保存</button>
      </div>
    </div>
  )
}

export default Index
