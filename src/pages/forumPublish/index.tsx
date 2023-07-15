import Taro from '@tarojs/taro'
import { View, Form, Textarea, Button, Input } from '@tarojs/components'
import { useEffect } from 'react'
import { useAppSelector } from '@/store'
import { UserState } from '@/store/user'

import './index.scss'

function Index() {
  const user: UserState = useAppSelector(state => state.user)
  const { userInfo } = user
  const { nickName, avatarUrl } = userInfo

  const mockRequest = async ({ nickName, avatarUrl, forumTitle, forumContent }) => {
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
            avatarUrl,
            forumTitle,
            forumContent
          })
        }
        resolve(res)
      }, 1000)
    })
  }

  const handleSubmit = async (e: any) => {
    const {
      detail: { value }
    } = e
    const { forumTitle, forumContent } = value

    // const { data } = await Taro.request({
    //   url: 'http://localhost:3000/forums',
    //   method: 'PUT',
    //   data: {
    //     forumTitle,
    //     forumContent,
    //     forumAuthor: nickName,
    //     forumAvatar: avatarUrl
    //   }
    // })
    const res: any = await mockRequest({ nickName, avatarUrl, forumTitle, forumContent })
    Taro.showToast({
      title: res.msg
    })

    Taro.navigateBack({ delta: 1 })
  }

  useEffect(() => {
    Taro.setNavigationBarTitle({ title: '发布帖子' })
  }, [])

  return (
    <View className='forum-publish__container'>
      <Form onSubmit={handleSubmit}>
        <View className='title__wrap'>
          <View className='label'>帖子标题:</View>
          <Input className='input' name='forumTitle' placeholder='请输入标题...' />
        </View>
        <View className='content__wrap'>
          <View className='label'>帖子内容:</View>
          <Textarea className='content' name='forumContent' value='' placeholder='请输入内容...' />
        </View>
        <Button className='submit' formType='submit'>
          立 即 发 送
        </Button>
      </Form>
    </View>
  )
}

export default Index
