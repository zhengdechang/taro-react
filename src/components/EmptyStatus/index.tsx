import { View } from '@tarojs/components'
import './index.scss'

export default () => {
  return (
    <View className='empty-content'>
      <View style={{ display: 'flex', justifyContent: 'center', marginTop: '30%' }}>
        <View className='empty'></View>
      </View>
      <View className='info'>无数据</View>
    </View>
  )
}
