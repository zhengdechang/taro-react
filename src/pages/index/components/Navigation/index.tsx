import React, { ComponentType } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import indexNavigator from '@/config/indexNavigator'
import './index.scss'

const Index: React.FC = () => {
  const navigator: Array<{ title: string; icon: string; path: string }> = indexNavigator
  return (
    <View className='navigation'>
      <View className='navigation-container'>
        {navigator.length &&
          navigator.map((item, index) => {
            const { title, icon, path } = item
            return (
              <View
                className='link-wrap'
                key={index}
                onClick={() => {
                  Taro.navigateTo({ url: path })
                }}>
                <View className='link-icon'>
                  <View className={`iconfont ${icon}`}></View>
                </View>
                <View>{title}</View>
              </View>
            )
          })}
      </View>
    </View>
  )
}

export default Index as ComponentType
