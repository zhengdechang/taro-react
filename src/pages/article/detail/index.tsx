import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtRate } from 'taro-ui'
import { useEffect, useState } from 'react'
import './index.scss'

type Steps = {
  title: string
  content: string
}
type ArticleDetail = {
  author: string
  publishDate: string
  views: number
  description: string
  steps: Steps[]
  rate: any
}

function Index() {
  const [articleDetail, setArticleDetail] = useState<ArticleDetail>({
    author: '',
    publishDate: '',
    views: 0,
    description: '',
    steps: [],
    rate: null
  })
  const { author, publishDate, views, description, steps, rate } = articleDetail

  useEffect(() => {
    Taro.showLoading({
      title: '加载中...'
    })
    setTimeout(() => {
      setArticleDetail({
        author: 'shawn',
        publishDate: 'ddd',
        views: 10,
        description: 'xxxxxx',
        steps: [
          {
            title: 'yyy',
            content: 'ccccc'
          }
        ],
        rate: null
      })
      Taro.hideLoading()
    }, 2000)
  }, [])

  return (
    <View className='article-detail'>
      <View className='article-detail-background' />
      <View className='article-detail-container'>
        <View className='article-detail-container__header' />
        <View className='article-detail-container__info'>
          <Image
            className='info__avatar'
            src='https://wx.qlogo.cn/mmopen/vi_32/Ef99ySqq9bh56PoyZUsfg6jJcDpqJN0lKLCPyn305erwSl89U0W85BOsq7uRcrS8J3P5Y9fkst16wK0I92uLibw/132'
          />
          <View className='info__wrap'>
            <View className='info__header'>
              <View>by {author}</View>
              <AtRate value={rate} />
            </View>
            <View className='info__footer'>
              <View>{publishDate}</View>
              <View>Reviews {views}</View>
            </View>
          </View>
        </View>
        <View className='article-detail-container__description'>
          <View className='description__title'>文章描述</View>
          <View className='description__content'>{description}</View>
        </View>
        <View className='article-detail-container__path'>
          <View className='path__title'>文章步骤</View>
          <View className='path__container'>
            {steps.map((item: any, index: number) => {
              let step = index + 1 + ''
              if (step.length === 1) step = '0' + step
              return (
                <View className='path__wrap' key={index}>
                  <Image src='http://cdn.algbb.cn/course/read.png' className='path__icon' />
                  <View className='path__info'>
                    <View className='path__name'>{item.title}</View>
                    <View className='path__description'>{item.content}</View>
                  </View>
                  <View className='path__decoration'>{step}</View>
                </View>
              )
            })}
          </View>
        </View>
      </View>
    </View>
  )
}

export default Index
