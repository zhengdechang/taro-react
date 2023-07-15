import { getCurrentInstance } from '@tarojs/taro'
import { View, ScrollView, Image, Input } from '@tarojs/components'
import { AtActivityIndicator } from 'taro-ui'
import { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/store'
import { setIsReconnected, handleMessageSend, ChatRoomState, MessageItem } from '@/store/chatRoom'
import './index.scss'

function Index() {
  // 获取当前chatRoom
  const chatRoom: ChatRoomState = useAppSelector(state => state.chatRoom)
  const { isReconnected, scrollViewId, openid, messageList, socketId } = chatRoom
  const [scrollAnimation, setScrollAnimation] = useState<boolean>(false)
  const [emojiOpened, setEmojiOpened] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')
  const [roomId, setRoomId] = useState<string>('')
  const dispatch = useAppDispatch()

  const handleEmojiOpen = (): void => {
    setEmojiOpened(!emojiOpened)
  }
  const handleChange = ({ detail: { value } }: { detail: { value: string } }): void => {
    setValue(value)
  }

  const resetInput = (): void => {
    setValue('')
  }
  const onMessageSend = (): void => {
    if (value === '') return

    handleMessageSend({
      type: 'text',
      from: socketId,
      to: roomId,
      message: value
    })
    resetInput()
  }

  useEffect(() => {
    const { params }: any = getCurrentInstance().router
    setRoomId(params?.to)
    /* 添加消息发送滚动动画 */
    setScrollAnimation(true)
    dispatch(setIsReconnected(true))
    setTimeout(() => {
      setEmojiOpened(false)
      dispatch(setIsReconnected(false))
      setScrollAnimation(false)
    }, 3000)
  }, [])

  return (
    <View className='chat'>
      <View>
        <AtActivityIndicator
          isOpened={isReconnected}
          mode='center'
          content='重连中...'
          size={36}></AtActivityIndicator>
      </View>
      <ScrollView
        className={`chat-message-container ${emojiOpened ? 'emoji-open' : ''}`}
        scrollY
        scrollWithAnimation={scrollAnimation}
        scrollIntoView={scrollViewId}>
        {messageList[roomId] &&
          messageList[roomId].map((messageInfo: MessageItem) => {
            const { message, messageId, currentTime, userAvatar, isMyself } = messageInfo
            return (
              <View
                className={`message-wrap ${
                  isMyself || messageInfo.openid === openid ? 'myself' : ''
                }`}
                id={messageId}
                key={messageId}>
                <Image className='avatar' src={userAvatar} />
                <View className='info'>
                  <View className='header'>
                    <View className='username'>{messageInfo.userName}</View>
                    <View className='time'>{currentTime}</View>
                  </View>
                  <View className='content'>{message}</View>
                </View>
              </View>
            )
          })}
      </ScrollView>
      <View className={`chat-input-container ${emojiOpened ? 'emoji-open' : ''}`}>
        <View className='chat-input-wrap'>
          <Image
            className='emoji'
            src='http://cdn.algbb.cn/chatroom/emoji.png'
            onClick={handleEmojiOpen}
          />
          <Input
            className='input'
            type='text'
            value={value}
            onInput={handleChange.bind(this)}
            placeholder='来吹吹水吧~'
            cursorSpacing={10}
            confirmType='send'
          />
          <View className='button' onClick={onMessageSend.bind(this)}>
            发送
          </View>
        </View>
        <ScrollView scrollY className='emoji-container'>
          {Array.from({ length: 33 }).map((_, index) => {
            let id = index + 1 + ''
            if (id.length === 1) id = '0' + id
            const imgSrc = `http://cdn.algbb.cn/emoji/${id}.png`
            return <Image className='emoji' key={index} src={imgSrc} />
          })}
        </ScrollView>
      </View>
    </View>
  )
}

export default Index
