import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'

function Index() {
  const featureList: Array<{ icon: string; feature: string; link: string }> = [
    {
      icon: 'http://cdn.algbb.cn/dashboard/forums.png',
      feature: '我的帖子',
      link: '/pages/myForums/index'
    },
    {
      icon: 'http://cdn.algbb.cn/dashboard/calender.png',
      feature: '我的日程',
      link: '/pages/mySchedule/index'
    },
    { icon: 'http://cdn.algbb.cn/dashboard/heart.png', feature: '我的订阅', link: '' },
    { icon: 'http://cdn.algbb.cn/dashboard/star.png', feature: '我的收藏', link: '' },
    { icon: 'http://cdn.algbb.cn/dashboard/setting.png', feature: '设置中心', link: '' }
  ]

  const navigateTo = (link: string, feature: string): void => {
    link && Taro.navigateTo({ url: `${link}?title=${feature}` })
  }

  return (
    <View className='feature-list-container'>
      {featureList.map((item, index) => {
        const { icon, feature, link } = item
        return (
          <View
            className='feature-list-wrap'
            key={index}
            onClick={() => {
              navigateTo(link, feature)
            }}>
            <Image className='icon' src={icon} />
            <View className='feature'>{feature}</View>
            <Image className='arrow' src='http://cdn.algbb.cn/dashboard/arrow.png' />
          </View>
        )
      })}
    </View>
  )
}

export default Index
