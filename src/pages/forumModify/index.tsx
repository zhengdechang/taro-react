import Taro, { useDidShow, getCurrentInstance } from '@tarojs/taro'
import { View, Form, Textarea, Button, Input } from '@tarojs/components'
import { useState } from 'react'
import { useAppSelector } from '@/store'
import { UserState } from '@/store/user'

import './index.scss'

const mockRequest = async ({ forumId }) => {
  const res: any = {
    msg: '成功',
    data: {}
  }
  return new Promise(resolve => {
    setTimeout(() => {
      res.data = {
        id: 111,
        forumTitle: 'forumTitle test 帖子标题',
        forumContent: 'forumTitle test 帖子内容',
        forumId
      }
      resolve(res)
    }, 1000)
  })
}
const mockRequestPut = async ({ nickName, forumId, forumTitle, forumContent }) => {
  const res: any = {
    msg: '成功',
    data: {}
  }
  return new Promise(resolve => {
    setTimeout(() => {
      res.data = {
        id: 111,
        nickName,
        forumTitle,
        forumContent,
        forumId
      }
      resolve(res)
    }, 1000)
  })
}

function Index() {
  const user: UserState = useAppSelector(state => state.user)
  const { userInfo } = user

  const [forumId, setForumId] = useState<string>('')
  const [forumTitle, setForumTitle] = useState<string>('')
  const [forumContent, setForumContent] = useState<string>('')

  useDidShow(async () => {
    Taro.setNavigationBarTitle({ title: '修改帖子' })
    Taro.showLoading({
      title: '加载中'
    })

    const { params }: any = getCurrentInstance().router
    setForumId(params?.forumId)

    // 根据id获取帖子标题和内容
    const { data }: any = await mockRequest({ forumId: params?.forumId })
    setForumTitle(data?.forumTitle)
    setForumContent(data.forumContent)
    Taro.hideLoading()
  })

  const handleSubmit = async (e: any) => {
    const {
      detail: { value }
    } = e
    const { forumTitle, forumContent } = value

    const { nickName } = userInfo

    // const { data } = await Taro.request({
    //   url: `http://localhost:3000/forums/${forumId}`,
    //   method: 'PUT',
    //   data: {
    //     forumTitle,
    //     forumContent
    //   }
    // })

    // Taro.showToast({
    //   title: data.msg
    // })

    // getForumList(nickName)
    Taro.showLoading({
      title: '加载中'
    })
    const res: any = await mockRequestPut({ nickName, forumId, forumTitle, forumContent })
    Taro.hideLoading()
    Taro.showToast({
      title: res.msg
    })

    Taro.navigateBack({ delta: 1 })
  }

  return (
    <View className='forum-publish__container'>
      <Form onSubmit={handleSubmit}>
        <View className='title__wrap'>
          <View className='label'>帖子标题:</View>
          <Input
            className='input'
            name='forumTitle'
            placeholder='请输入标题...'
            value={forumTitle}
          />
        </View>
        <View className='content__wrap'>
          <View className='label'>帖子内容:</View>
          <Textarea
            className='content'
            name='forumContent'
            value={forumContent}
            placeholder='请输入内容...'
          />
        </View>
        <Button className='submit' formType='submit'>
          立 即 修 改
        </Button>
      </Form>
    </View>
  )
}

export default Index
