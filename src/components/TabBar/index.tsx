import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useState, useEffect, ReactNode } from 'react'
import { AtTabBar } from 'taro-ui'
import tabBarConfig from '@/config/tabBar'

// 新增react-redux相关 使用封装好的hooks
import { useAppSelector, useAppDispatch } from '@/store'
import { setTabBar } from '@/store/tabBar'
import styles from './index.module.scss'
import { NavBar, TabBar } from 'antd-mobile'

const CustomTabBar: React.FC = () => {
  // 获取当前tabBar的current
  const tabCurrent = useAppSelector(state => state.tabBar.current)
  const dispatch = useAppDispatch() // 定义显示的current
  const [current, setCurrent] = useState('index') // 监听修改了tabBar就触发当前修改

  useEffect(() => {
    const pathname: string = tabBarConfig[tabCurrent].key as string
    setCurrent(pathname)
  }, [tabCurrent]) // 触发tabBar点击事件，修改tabBar的current

  const handleClick = (value: string) => {
    const index = tabBarConfig.findIndex(item => item.key === value)
    dispatch(setTabBar(index))
    setCurrent(value)
    const url = '/' + tabBarConfig[index].path
    // switchTab在微信上必须跳转到tabBar里设置的路径， navigateTo 在微信上打卡不能超过10个，故此用redirectTo
    Taro.redirectTo({ url })
  }
  return (
    <View className={styles['tabBar-cnt']}>
      {/* <AtTabBar
        fixed
        selectedColor='#1890ff'
        tabList={tabBarConfig}
        onClick={handleClick.bind(this)}
        current={current}
      /> */}
      <TabBar activeKey={current} onChange={value => handleClick(value)}>
        {tabBarConfig.map(item => (
          <TabBar.Item
            key={item.key}
            icon={item.iconType as unknown as ReactNode}
            title={item.title}
          />
        ))}
      </TabBar>
    </View>
  )
}
export default CustomTabBar
