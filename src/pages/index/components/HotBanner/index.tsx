import { AtActivityIndicator } from 'taro-ui'
import { View, ScrollView, Image } from '@tarojs/components'
import './index.scss'

function Index() {
  const hotArticleList = []
  const getArticleDetail = (id, articleName) => {
    console.log(id, articleName)
  }
  return (
    <>
      {hotArticleList && hotArticleList.slice().length !== 0 ? (
        <ScrollView className='banner-container' scrollX scrollWithAnimation>
          {hotArticleList.map((item, index) => {
            const { id, articleName } = item
            return (
              <View
                className='banner-item'
                key={id}
                onClick={() => {
                  getArticleDetail(id, articleName)
                }}>
                <View className='title'>{articleName}</View>
                <Image
                  className='bg'
                  src={`http://cdn.algbb.cn/study/banner/${(index + 1).toString()}.svg`}
                  lazyLoad
                />
              </View>
            )
          })}
        </ScrollView>
      ) : (
        <View className='banner-loading'>
          <AtActivityIndicator size={40} content='加载中' mode='center'></AtActivityIndicator>
        </View>
      )}
    </>
  )
}

export default Index
