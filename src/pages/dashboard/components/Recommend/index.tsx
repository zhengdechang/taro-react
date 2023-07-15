import { View, Image } from '@tarojs/components'
import './index.scss'

function Index() {
  return (
    <View className='recommend-link-container'>
      <View className='wrap'>
        <Image className='img' src='http://cdn.algbb.cn/dashboard/recommend1.png' />
        <View className='slogan'>xxx学堂</View>
      </View>
      <View className='wrap'>
        <Image className='img' src='http://cdn.algbb.cn/dashboard/recommend2.png' />
        <View className='slogan'>xx社区</View>
      </View>
    </View>
  )
}

export default Index
