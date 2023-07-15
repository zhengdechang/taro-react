import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import { useState, useEffect } from 'react'
import './index.scss'

function Index() {
  const [searchValue, setSearchValue] = useState<string>('')
  const [articleList, setArticleList] = useState<any[]>([])

  const handleSearchChange = (value: string) => {
    setSearchValue(value)
  }
  const getArticleDetail = async (id, articleName) => {
    console.log(id, articleName)
    Taro.showLoading({
      title: '加载中...'
    })
    await Taro.navigateTo({
      url: `/pages/article/detail/index?id=${id}`
    })
    Taro.setNavigationBarTitle({
      title: articleName
    })
    Taro.hideLoading()
  }
  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: '文章列表'
    })
    setTimeout(() => {
      setArticleList([
        {
          id: 1111,
          articleName: '生活中有哪些残忍得真相 '
        },
        {
          id: 1112,
          articleName: '中国14亿人，为何还会陷入用工荒 '
        }
      ])
    }, 3000)
  }, [])
  return (
    <View className='article-list'>
      <AtSearchBar
        className='article-list__search'
        value={searchValue}
        onChange={handleSearchChange}
      />
      <View className='article-list__container'>
        {articleList.map(article => {
          const { id, articleName } = article
          return (
            <View
              className='article-list__wrap'
              key={id}
              onClick={() => {
                getArticleDetail(id, articleName)
              }}>
              <View className='cover'></View>
              <View className='name'>{articleName}</View>
            </View>
          )
        })}
      </View>
    </View>
  )
}

export default Index
