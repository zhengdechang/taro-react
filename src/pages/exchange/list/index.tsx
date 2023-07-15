import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSearchBar, AtIcon } from 'taro-ui'
import { useState, useEffect } from 'react'
import './index.scss'

function Index() {
  const [searchValue, setSearchValue] = useState<string>('')
  const [exchangeList, setExchangeList] = useState<any[]>([])

  const handleSearchChange = (value: string) => {
    setSearchValue(value)
  }

  const getExchangeDetail = async (id, exchangeName) => {
    console.log(id, exchangeName)
    Taro.showLoading({
      title: '加载中...'
    })
    await Taro.navigateTo({
      url: `/pages/exchange/detail/index?id=${id}`
    })
    Taro.setNavigationBarTitle({
      title: exchangeName
    })
    Taro.hideLoading()
  }

  const generateType = (exerciseType: number): string => {
    const typeList = {
      1: '免费',
      2: '会员'
    }
    return typeList[exerciseType]
  }

  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: '文章列表'
    })
    setTimeout(() => {
      setExchangeList([
        {
          id: 2111,
          exchangeName: '生活中有哪些残忍得真相 ',
          exchangeType: 1,
          views: 1000
        },
        {
          id: 2112,
          exchangeName: '中国14亿人，为何还会陷入用工荒 ',
          exchangeType: 2,
          views: 12000
        }
      ])
    }, 3000)
  }, [])

  return (
    <View className='exchange-list'>
      <AtSearchBar
        className='exchange-list__search'
        value={searchValue}
        onChange={handleSearchChange}
      />
      <View className='exchange-list__container'>
        {exchangeList.map(exchange => {
          const { id, exchangeName, exchangeType, views } = exchange
          return (
            <View
              className='exchange-list__wrap'
              key={id}
              onClick={() => {
                getExchangeDetail(id, exchangeName)
              }}>
              <View className='name'>{exchangeName}</View>
              <View className='status-bar'>
                浏览：{views}&emsp;
                <View className={`type ${exchangeType === 2 ? 'type--charge' : ''}`}>
                  {generateType(exchangeType)}
                </View>
              </View>
              <AtIcon className='icon' value='edit' />
            </View>
          )
        })}
      </View>
    </View>
  )
}

export default Index
