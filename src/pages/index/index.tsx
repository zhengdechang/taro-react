// 1.使用taro自带的生命周期函数
import Taro, { useDidShow } from '@tarojs/taro'
import { useEffect } from 'react'
import { View } from '@tarojs/components'
import { useAppDispatch } from '@/store'
import TabBar from '@/components/TabBar'
import { setTabBar } from '@/store/tabBar'
import Navigation from './components/Navigation'
import Title from './components/Title'
import HotBanner from './components/HotBanner'
import ExchangeList from './components/ExchangeList'
import styles from './index.module.scss'

// 注意函数命名得为首字母大写
const Index = () => {
  const dispatch = useAppDispatch()
  // 通过useDispatch 派发事件
  // 修改current为对应tabBar值
  dispatch(setTabBar(0))
  Taro.showLoading({
    title: '加载中'
  })
  useDidShow(() => {
    console.log('页面展示时的回调 ')
    Taro.hideLoading()
  })

  useEffect(() => {
    setTimeout(() => {}, 3000)
  }, [])

  return (
    <>
      <View className={styles['study-container']}>
        <View className={styles['study-banner']}>
          <View className={styles['slogan']}>
            <View>
              <View className={styles['title']}>Hey Guys</View>come to reading !
            </View>
            <View className={styles['button']}>Let's start</View>
          </View>
        </View>
        <Navigation />
        <Title link='/pages/article/list/index'>热门文章</Title>
        <HotBanner></HotBanner>
        <Title link='/pages/exchange/list/index'>热门问答</Title>
        <ExchangeList></ExchangeList>
      </View>
      <TabBar></TabBar>
    </>
  )
}

export default Index
