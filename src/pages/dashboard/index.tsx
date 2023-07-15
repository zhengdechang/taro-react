import TabBar from '@/components/TabBar'
import { View } from '@tarojs/components'
import { setTabBar } from '@/store/tabBar'
import { useEffect } from 'react'
import PersonalInfo from './components/PersonalInfo'
import Recommend from './components/Recommend'
import FeatureList from './components/FeatureList'
import { useAppSelector, useAppDispatch } from '@/store'
import { UserState } from '@/store/user'
import './index.scss'

function Index() {
  const user: UserState = useAppSelector(state => state.user)
  const { userInfo } = user
  const { nickName, avatarUrl } = userInfo
  const dispatch = useAppDispatch()
  // 通过useDispatch 派发事件
  // 修改current为对应tabBar值
  dispatch(setTabBar(3))
  useEffect(() => {
    setTimeout(() => {}, 3000)
  }, [])
  return (
    <View className='dashboard-container'>
      <PersonalInfo nickName={nickName} avatarUrl={avatarUrl} />
      <Recommend></Recommend>
      <FeatureList></FeatureList>
      <TabBar></TabBar>
    </View>
  )
}

export default Index
