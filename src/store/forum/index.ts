import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ForumInfo = {
  forumId: number
  forumAvatar: string
  forumAuthor: string
  publishTime: string
  timeAgo: number
  forumImage: string
  forumTitle: string
  forumContent: string
  forumLike: number
  forumComment: number
}

export interface ForumState {
  forumList: Array<ForumInfo>
  myForumList: Array<ForumInfo>
}
// Define the initial state using that type
const initialState: ForumState = {
  forumList: [],
  myForumList: [
    {
      forumId: 1312,
      forumAvatar: require('@/assets/images/login/default_header.png'),
      forumAuthor: 'test',
      publishTime: '2023-01-02 22:50:23',
      timeAgo: 1,
      forumImage: require('@/assets/images/sky.jpg'),
      forumTitle: 'test title标题',
      forumContent: 'test 内容test 内容test 内容test 内容',
      forumLike: 234,
      forumComment: 5756
    }
  ]
}
export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    setForumList: (state, action: PayloadAction<Array<ForumInfo>>) => {
      state.forumList = action.payload
    },
    setMyForumList: (state, action: PayloadAction<Array<ForumInfo>>) => {
      state.myForumList = action.payload
    }
  }
})
// 导出方法
export const { setForumList, setMyForumList } = forumSlice.actions
export default forumSlice.reducer
