import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type UserInfo = {
  avatarUrl: string
  city: string
  country: string
  gender: number
  language: string
  nickName: string
  province: string
}
export interface UserState {
  openid: string
  isLogin: boolean
  token: string
  userInfo: UserInfo
}
// Define the initial state using that type
const initialState: UserState = {
  openid: '',
  isLogin: false,
  token: '',
  userInfo: {
    avatarUrl: '',
    city: '',
    country: '',
    gender: 0,
    language: '',
    nickName: '',
    province: ''
  }
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    setIsLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload
    },
    setOpenid: (state, action: PayloadAction<string>) => {
      state.openid = action.payload
    }
  }
})
// 导出方法
export const { setUserInfo, setToken, setIsLogin, setOpenid } = userSlice.actions
export default userSlice.reducer
