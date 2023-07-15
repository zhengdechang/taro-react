import Taro from '@tarojs/taro'
import { FC, useState, useEffect, useRef } from 'react'

import { View } from '@tarojs/components'
import { SkeletonProps } from './data.d'
import './index.scss'

const Skeleton: FC<SkeletonProps> = props => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { selector = 'skeleton', loading = true } = props
  const [radiusList, setRadiusList] = useState([])
  const [rectList, setRectList] = useState([])
  const [loadingTest, setLoadingTest] = useState(true)
  const time = useRef(new Date().getTime())

  /**
   * 选择器获取节点
   */
  const getGraphList = (ancestor, descendant) => {
    return new Promise((resolve, _reject) => {
      if (process.env.TARO_ENV === 'weapp') {
        Taro.createSelectorQuery()
          .selectAll(`.${ancestor} >>> .${descendant}`)
          .boundingClientRect()
          .exec(rect => {
            resolve(rect[0])
          })
      } else {
        Taro.createSelectorQuery()
          .selectAll(`.${ancestor} .${descendant}`)
          .boundingClientRect()
          .exec(rect => {
            resolve(rect[0])
          })
      }
    })
  }

  /**
   * 初始化请求
   */
  const initSkeleton = () => {
    console.log('process.env.TARO_ENV', process.env.APP_API)
    getGraphList(selector, `${selector}-radius`).then((res: any) => {
      setRadiusList(res)
    })
    getGraphList(selector, `${selector}-rect`).then((res: any) => {
      setRectList(res)
    })
  }

  /**
   * 本地延迟模拟
   */
  useEffect(() => {
    setTimeout(() => {
      setLoadingTest(false)
    }, 3000)
  }, [])

  /**
   * 等待父页面渲染后获取生成骨架屏
   */
  Taro.eventCenter.once(Taro?.Current?.router?.onReady as any, () => {
    initSkeleton()
  })

  return (
    <View>
      {loadingTest && (
        <View className='SkeletonCmpt'>
          {radiusList.map((radiusItem: any, index: number) => (
            <View
              className='skeleton skeleton-radius skeleton-animate-gradient'
              key={`${time}-${index}`}
              style={{
                width: `${radiusItem.width}px`,
                height: `${radiusItem.height}px`,
                top: `${radiusItem.top}px`,
                left: `${radiusItem.left}px`
              }}
            />
          ))}
          {rectList.map((rectItem: any, index: number) => (
            <View
              className='skeleton skeleton-animate-gradient'
              key={`${time}-${index}`}
              style={{
                width: `${rectItem.width}px`,
                height: `${rectItem.height}px`,
                top: `${rectItem.top}px`,
                left: `${rectItem.left}px`
              }}
            />
          ))}
        </View>
      )}
    </View>
  )
}
export default Skeleton
