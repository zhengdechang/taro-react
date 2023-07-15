import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SendMessageInfo {
  type: string
  from: string
  to: string
  message: string
}

/* 联系人部分 */
export interface ContactsInfo {
  title: string
  avatar: string
  latestMessage: {
    userName: string
    message: string
    currentTime: string
  }
  contactsId: string
}

export type MessageItem = {
  from: string
  to: string
  currentTime: string
  message: string
  messageId: string
  userName: string
  userAvatar: string
  isMyself: boolean
  openid?: string
}
export interface MessageList {
  [key: string]: MessageItem[]
}
export interface ChatRoomState {
  /* socket部分 */
  socketId: string
  reConnectTimer: any
  heartCheckTimer: any
  timeoutTimer: any
  reConnectCount: number

  openid: string
  socketTask: any
  userName: string
  userAvatar: string
  isReconnected: boolean

  /* 消息部分 */
  messageList: MessageList
  scrollViewId: string

  /* 联系人部分 */
  contactsList: ContactsInfo[]
}
// Define the initial state using that type
const initialState: ChatRoomState = {
  /* socket部分 */
  socketId: '',
  reConnectTimer: null,
  heartCheckTimer: null,
  timeoutTimer: null,
  reConnectCount: 3,

  openid: '',
  socketTask: null,
  userName: '',
  userAvatar: '',
  isReconnected: false,
  /* 消息部分 */
  messageList: {
    '12': [
      {
        openid: '242',
        userName: 'shawn',
        message: 'hello world',
        messageId: 'jglelg',
        currentTime: '13:09',
        userAvatar: '',
        isMyself: true,
        from: 'string',
        to: 'string'
      },
      {
        openid: '243',
        userName: 'liLy',
        message: '你好',
        messageId: 'frrhjj',
        currentTime: '13:19',
        userAvatar: '',
        isMyself: false,
        from: 'string',
        to: 'string'
      },
      {
        openid: '245',
        userName: 'taotao',
        message: '杨康了吗',
        messageId: 'hrehe',
        currentTime: '13:39',
        userAvatar: '',
        isMyself: false,
        from: 'string',
        to: 'string'
      }
    ]
  },
  scrollViewId: '',
  /* 联系人部分 */
  contactsList: []
}
export const chatRoomSlice = createSlice({
  name: 'chatRoom',
  initialState,
  reducers: {
    setIsReconnected: (state, action: PayloadAction<boolean>) => {
      state.isReconnected = action.payload
    },
    setScrollViewId: (state, action: PayloadAction<string>) => {
      state.scrollViewId = action.payload
    },
    setOpenid: (state, action: PayloadAction<string>) => {
      state.openid = action.payload
    },
    setMessageList: (state, action: PayloadAction<MessageList>) => {
      state.messageList = action.payload
    },
    handleMessageSend: (state, action: PayloadAction<SendMessageInfo>): void => {
      state.socketTask.send({ data: JSON.stringify(action.payload) })
    }
  }
})
// 导出方法
export const { setIsReconnected, setScrollViewId, setOpenid, setMessageList, handleMessageSend } =
  chatRoomSlice.actions
export default chatRoomSlice.reducer
