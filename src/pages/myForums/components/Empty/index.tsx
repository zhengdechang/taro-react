import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './index.scss'

function Index() {
  return (
    <View className='empty__container'>
      <Image className='image' src={require('@/assets/images/empty.png')} />
      <View className='title'>No Forums Here</View>
      <View className='content'>赶快前往论坛社区中发表新的贴子吧</View>
      <AtIcon
        className='add'
        value='add'
        onClick={() => {
          Taro.navigateTo({ url: '/pages/forumPublish/index' })
        }}
      />
      {/* <Image
        className='add'
        src='http://cdn.algbb.cn/forum/add.png'
        mode='aspectFill'
        onClick={() => {
          Taro.navigateTo({ url: '/pages/forumPublish/index' })
        }}
      /> */}
    </View>
  )
}

export default Index
