import { View, Image } from '@tarojs/components'
import './index.scss'

type Props = {
  avatarUrl: string
  nickName: string
}
function Index({ avatarUrl, nickName }: Props) {
  return (
    <View className='information-container'>
      <View className='information-wrap'>
        <Image className='avatar' src={avatarUrl} lazyLoad></Image>
        <View className='nickname'>
          <View>{nickName}</View>
          <View className='tag'>自我摸索的老程序</View>
        </View>
        <View className='status'>
          <View className='status-wrap'>
            <View className='amount'>4</View>
            <View>阅读文章</View>
          </View>
          <View className='status-wrap'>
            <View className='amount'>3</View>
            <View>问答数</View>
          </View>
          <View className='status-wrap'>
            <View className='amount'>12</View>
            <View>收藏</View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Index
