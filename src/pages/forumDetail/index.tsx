import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Image, Input } from '@tarojs/components'
import { useState, useEffect } from 'react'
import { ForumInfo } from '@/store/forum'
import './index.scss'

function Index() {
  const [forumId, setForumId] = useState<string>('')
  const [forumDetail, setForumDetail] = useState<ForumInfo>({
    forumId: 0,
    forumAvatar: '',
    forumAuthor: '',
    publishTime: '',
    timeAgo: 0,
    forumImage: '',
    forumTitle: '',
    forumContent: '',
    forumLike: 0,
    forumComment: 0
  })

  useEffect(() => {
    Taro.showLoading({
      title: '加载中'
    })
    const { params }: any = getCurrentInstance().router
    Taro.setNavigationBarTitle({ title: params?.forumTitle })
    setForumId(params?.forumId)
    setTimeout(() => {
      setForumDetail({
        forumId: 1309,
        forumAvatar: require('@/assets/images/login/default_header.png'),
        forumAuthor: 'shawn',
        publishTime: '18:09',
        timeAgo: 1,
        forumImage: require('@/assets/images/sky.jpg'),
        forumTitle: '接口调用失败的回调函数',
        forumContent: '接口调用结束的回调函数（调用成功、失败都会执行）',
        forumLike: 24,
        forumComment: 12
      })
      Taro.hideLoading()
    }, 3000)
  }, [])

  return (
    <View className='forum-detail__container'>
      <View className='forum-detail__header'>
        <Image className='avatar' src={forumDetail.forumAvatar} mode='aspectFill' />
        <View className='author'>{forumDetail.forumAuthor}</View>
        <View className='iconfont icon-star star' />
      </View>
      <Image className='forum-detail__image' src={forumDetail.forumImage} />
      <View className='forum-detail__wrap'>
        <View className='title'>
          {forumDetail.forumTitle}
          <View className='time'>{forumDetail.publishTime}</View>
        </View>
        <View className='time'></View>
        <View className='content'>{forumDetail.forumContent}</View>
      </View>
      <View className='forum-detail__footer'>
        <View className='iconfont icon-like' />
        {forumDetail.forumLike}
        <View className='iconfont icon-comment' />
        {forumDetail.forumComment}
        <Input className='input' type='text' placeholder='请输入你的评论...' confirmType='send' />
      </View>
    </View>
  )
}

export default Index
