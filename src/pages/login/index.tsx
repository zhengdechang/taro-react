import { FC, useState } from 'react'
import { View, Button, Input } from '@tarojs/components'
import tools from '@/utils/tools'
// import { toLogin } from '@/apis/Login'
import { debounce } from '@/utils'
import './index.scss'

const mockRequest = async ({ userPhone, password, nickName }) => {
  const res: any = {
    msg: '成功',
    data: {}
  }
  return new Promise(resolve => {
    setTimeout(() => {
      res.data = {
        id: 111,
        userPhone,
        password,
        nickName
      }
      resolve(res)
    }, 1000)
  })
}

const Index: FC = () => {
  const [nickName, setNickName] = useState<string>('')
  const [userPhone, setUserPhone] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const onLogin = async () => {
    if (!userPhone || !password || !nickName) {
      return tools.showToast('所有内容必须填写完整～')
    }
    const reg = /^1[3-9]\d{9}$/
    if (!reg.test(userPhone)) {
      return tools.showToast('请填写正确手机号～')
    }
    tools.showLoading()
    const res: any = await mockRequest({ userPhone, password, nickName })
    console.log('res', res)
    tools.hideLoading()
    tools.showToast({
      title: res.msg
    })
  }

  const handleInput = debounce((e, type) => {
    switch (type) {
      case 'nickName':
        setNickName(e.detail.value)
        break
      case 'userPhone':
        setUserPhone(e.detail.value)
        break
      case 'password':
        setPassword(e.detail.value)
        break
    }
  }, 300)

  return (
    <View className='login-container'>
      <View className='login-top'>
        <View>你好，</View>
        <View>欢迎登录</View>
      </View>
      <View className='login-box'>
        <Input
          type='text'
          className='nick-name input'
          placeholder='请输入昵称'
          placeholderClass='placeholder-class'
          onInput={(e: any) => handleInput(e, 'nickName')}></Input>
        <Input
          type='text'
          className='phone input'
          placeholder='请输入手机号'
          placeholderClass='placeholder-class'
          onInput={(e: any) => handleInput(e, 'userPhone')}></Input>
        <Input
          type='password'
          className='password input'
          placeholder='请输入密码'
          placeholderClass='placeholder-class'
          onInput={(e: any) => handleInput(e, 'password')}></Input>
      </View>
      <Button className='login-btn' onClick={onLogin}>
        登录
      </Button>
    </View>
  )
}

export default Index
