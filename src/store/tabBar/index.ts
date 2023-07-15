import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// Define a type for the slice state
interface TabBarState {
  current: number
}
// Define the initial state using that type
const initialState: TabBarState = {
  current: 0
}
export const tabBarSlice = createSlice({
  name: 'tabBar',
  initialState,
  reducers: {
    setTabBar: (state, action: PayloadAction<number>) => {
      state.current = action.payload
    }
  }
})
// 导出方法
export const { setTabBar } = tabBarSlice.actions
export default tabBarSlice.reducer
