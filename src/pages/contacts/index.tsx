import Taro from '@tarojs/taro'
import TabBar from '@/components/TabBar'
import { View, Image } from '@tarojs/components'
import { setTabBar } from '@/store/tabBar'
import Skeleton from '@/components/Skeleton'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import logoImg from '@/assets/images/logo.png'
import './index.scss'

type LatestMessage = {
  userName: string
  currentTime: string
  message: string
}
type ContactsItem = {
  title: string
  avatar: string
  contactsId: string | number
  latestMessage: LatestMessage
}

function Index() {
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useDispatch()
  // 通过useDispatch 派发事件
  // 修改current为对应tabBar值
  dispatch(setTabBar(1))

  const [contactsList, setContactsList] = useState<ContactsItem[]>([])

  const handleGroupClick = (contactsId: string, title: string): void => {
    Taro.navigateTo({
      url: `/pages/chatroom/index?to=${contactsId}&title=${title}`
    })
  }

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setContactsList([
        {
          contactsId: 11,
          avatar: logoImg,
          title: 'node交流群',
          latestMessage: {
            userName: 'Tom Mark',
            currentTime: '17:05',
            message: 'hello node'
          }
        },
        {
          contactsId: 12,
          avatar: logoImg,
          title: 'nest交流群',
          latestMessage: {
            userName: 'Bruce Alex',
            currentTime: '17:15',
            message: 'hello node'
          }
        },
        {
          contactsId: 13,
          avatar: logoImg,
          title: 'java交流群',
          latestMessage: {
            userName: 'Chirs Ford',
            currentTime: '18:15',
            message: 'hello node'
          }
        },
        {
          contactsId: 14,
          avatar: logoImg,
          title: 'php交流群',
          latestMessage: {
            userName: 'Ben Dick',
            currentTime: '17:25',
            message: 'hello node'
          }
        },
        {
          contactsId: 15,
          avatar: logoImg,
          title: '前端交流群',
          latestMessage: {
            userName: 'Martin Hugo',
            currentTime: '17:15',
            message: 'hello node'
          }
        },
        {
          contactsId: 16,
          avatar: logoImg,
          title: '水库交流群',
          latestMessage: {
            userName: 'Lee Oliver',
            currentTime: '17:15',
            message: 'hello node'
          }
        },
        {
          contactsId: 17,
          avatar: logoImg,
          title: '重庆交流群',
          latestMessage: {
            userName: 'Mark Rex',
            currentTime: '17:15',
            message: 'hello node'
          }
        }
      ])
      setLoading(false)
    }, 3000)
  }, [])

  return (
    <View className='index'>
      <Skeleton selector='skeleton' loading={loading} />
      <View className='skeleton'>
        <View className='contacts-container'>
          {contactsList.map((contactsInfo, index) => {
            const { title, avatar, contactsId, latestMessage } = contactsInfo
            const { userName, currentTime, message } = latestMessage
            return (
              <View
                className='contacts-wrap'
                key={index}
                onClick={handleGroupClick.bind(this, contactsId, title)}>
                <Image className='avatar' src={avatar} />
                <View className='info'>
                  <View className='header'>
                    <View className='title'>{title}</View>
                    <View className='time'>{currentTime}</View>
                  </View>
                  <View className='content'>
                    {userName}: {message}
                  </View>
                </View>
              </View>
            )
          })}
        </View>
      </View>
      <TabBar></TabBar>
    </View>
  )
}

export default Index
