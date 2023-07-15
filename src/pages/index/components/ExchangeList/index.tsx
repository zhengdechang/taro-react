import { View } from '@tarojs/components'
import { AtActivityIndicator } from 'taro-ui'
import './index.scss'

function Index() {
  const hotExchangeList = []
  const getHotExchangeDetail = id => {
    console.log(id)
  }
  return (
    <>
      {hotExchangeList && hotExchangeList.slice().length !== 0 ? (
        <View className='list-container'>
          {hotExchangeList.map(item => {
            const { id, exerciseName, exerciseContent } = item
            return (
              <View
                className='list-wrap'
                key={id}
                onClick={() => {
                  getHotExchangeDetail(id)
                }}>
                <View className='list-preview'>
                  <View className='iconfont icon-tiku'></View>
                </View>
                <View className='list-info'>
                  <View className='title'>{exerciseName}</View>
                  <View className='content'>{exerciseContent}</View>
                </View>
              </View>
            )
          })}
        </View>
      ) : (
        <View className='list-loading'>
          <AtActivityIndicator size={40} content='加载中' mode='center'></AtActivityIndicator>
        </View>
      )}
    </>
  )
}

export default Index
