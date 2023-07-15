import Taro from '@tarojs/taro'
import TabBar from '@/components/TabBar'
import { View, Image } from '@tarojs/components'
import { setTabBar } from '@/store/tabBar'
import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/store'
import { setForumList, ForumState, ForumInfo } from '@/store/forum'
import { AtIcon } from 'taro-ui'
import './index.scss'

function Index() {
  const forum: ForumState = useAppSelector(state => state.forum)
  const { forumList } = forum
  const dispatch = useAppDispatch()
  dispatch(setTabBar(2))

  const navigateTo = (forumId: number, forumTitle: string): void => {
    Taro.navigateTo({
      url: `/pages/forumDetail/index?forumId=${forumId}&forumTitle=${forumTitle}`
    })
  }

  const getForumList = () => {
    const data = [
      {
        forumId: '1322',
        forumAvatar: require('@/assets/images/login/default_header.png'),
        forumAuthor: 'shawn',
        timeAgo: '2',
        forumImage: require('@/assets/images/sky.jpg'),
        forumTitle: '接口调用失败的回调函数',
        forumContent: '接口调用结束的回调函数（调用成功、失败都会执行）',
        forumLike: '24',
        forumComment: '12'
      },
      {
        forumId: '1342',
        forumAvatar: require('@/assets/images/logo.png'),
        forumAuthor: 'dva',
        timeAgo: '1',
        forumImage: require('@/assets/images/sky.jpg'),
        forumTitle: '接口调用失败的回调函数',
        forumContent: '接口调用结束的回调函数（调用成功、失败都会执行）',
        forumLike: '74',
        forumComment: '562'
      }
    ]
    dispatch(setForumList(data))
  }

  useEffect(() => {
    Taro.showLoading({
      title: '加载中'
    })
    setTimeout(() => {
      getForumList()
      Taro.hideLoading()
    }, 3000)
  }, [])
  return (
    <View className='forum__container'>
      <View className='forum__publish'>
        <View className='forum__publish--background'></View>
        <AtIcon
          className='icon'
          value='add'
          onClick={() => {
            Taro.navigateTo({ url: '/pages/forumPublish/index' })
          }}
        />
        {/* <Image
          className='icon'
          src='http://cdn.algbb.cn/forum/add.png'
          mode='aspectFill'
          onClick={() => {
            Taro.navigateTo({ url: '/pages/forumPublish/index' })
          }}
        /> */}
      </View>
      {!!forumList?.length &&
        forumList.map((forum: ForumInfo) => {
          const {
            forumId,
            forumAvatar,
            forumAuthor,
            timeAgo,
            forumImage,
            forumTitle,
            forumContent,
            forumLike,
            forumComment
          } = forum
          return (
            <View className='forum__wrap' key={forumId}>
              <View className='header'>
                <Image className='avatar' src={forumAvatar} mode='aspectFill' />
                <View className='author'>
                  {forumAuthor}
                  <View className='time'>{timeAgo === 0 ? 'today' : `${timeAgo} days ago`}</View>
                </View>
                <View className='iconfont icon-more more' />
              </View>
              <Image
                className='image'
                src={forumImage}
                mode='aspectFill'
                onClick={() => {
                  navigateTo(forumId, forumTitle)
                }}
              />
              <View
                className='content__wrap'
                onClick={() => {
                  navigateTo(forumId, forumTitle)
                }}>
                <View className='title'>{forumTitle}</View>
                <View className='content'>{forumContent}</View>
              </View>
              <View className='status'>
                <View className='iconfont icon-like' />
                {forumLike}
                <View className='iconfont icon-comment' />
                {forumComment}
              </View>
            </View>
          )
        })}
      <TabBar></TabBar>
    </View>
  )
}

export default Index
