import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Empty from './components/Empty'
import { useAppSelector } from '@/store'
import { ForumState, ForumInfo } from '@/store/forum'
import { UserState } from '@/store/user'

import './index.scss'

const mockRequest = async ({ nickName, forumId }) => {
  const res: any = {
    msg: '成功',
    data: []
  }
  return new Promise(resolve => {
    setTimeout(() => {
      for (let i = 0; i < 10; i++) {
        res.data.push({
          id: i.toString(),
          nickName,
          forumId
        })
      }
      resolve(res)
    }, 1000)
  })
}

function Index() {
  const forum: ForumState = useAppSelector(state => state.forum)
  const user: UserState = useAppSelector(state => state.user)
  const { myForumList } = forum
  const { userInfo } = user

  const handleModifyClick = (forumId: number): void => {
    Taro.navigateTo({
      url: `/pages/forumModify/index?forumId=${forumId}`
    })
  }

  const handleDeleteClick = async (forumId: number) => {
    const { nickName } = userInfo
    // await Taro.request({
    //   url: `http://localhost:3000/forums/${forumId}`,
    //   method: 'DELETE'
    // })
    // Taro.showToast({
    //   title: '删除成功',
    //   icon: 'success',
    //   duration: 1000
    // })
    // getForumList(nickName)

    mockRequest({ nickName, forumId }).then(() => {
      Taro.showToast({
        title: '删除成功',
        icon: 'success',
        duration: 1000
      })
    })
  }

  return (
    <View className='myForum-list__container'>
      {myForumList.slice().length === 0 ? (
        <Empty />
      ) : (
        myForumList.slice().map((forum: ForumInfo) => {
          const {
            forumImage,
            forumTitle,
            forumContent,
            forumLike,
            forumComment,
            forumId,
            publishTime
          } = forum
          return (
            <View className='myForum-list__wrap' key={forumId}>
              <View className='wrap__content'>
                <Image className='image' src={forumImage} mode='aspectFill' />
                <View className='info'>
                  <View className='title'>{forumTitle}</View>
                  <View className='content'>{forumContent}</View>
                  <View className='status'>
                    <View className='iconfont icon-like' />
                    {forumLike}
                    <View className='iconfont icon-comment' />
                    {forumComment}
                  </View>
                </View>
              </View>
              <View className='wrap__footer'>
                <View className='time'>{publishTime}</View>
                <View
                  className='action'
                  onClick={() => {
                    handleModifyClick(forumId)
                  }}>
                  修改
                </View>
                <View
                  className='action action--delete'
                  onClick={() => {
                    handleDeleteClick(forumId)
                  }}>
                  删除
                </View>
              </View>
            </View>
          )
        })
      )}
    </View>
  )
}

export default Index
