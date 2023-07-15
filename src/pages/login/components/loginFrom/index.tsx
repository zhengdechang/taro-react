import { View, Image, Button, Input } from '@tarojs/components'
import { useState } from 'react'

import Styles from './login.module.scss'

function index() {
  return (
    <View className={Styles.login}>
      <View className={Styles.login_form}>
        {/* 用户名 */}
        <View className={`${Styles.login_form_acount} flex-box-start`}>
          <Image mode='widthFix' src={acount}></Image>
          <View className={`${Styles.login_form_acount_box} flex-box-start border_bottom`}>
            <Input
              type='text'
              placeholder='请输入登录帐号'
              maxlength={11}
              value={acountVal}
              onInput={ele => setacountVal(ele.detail.value)}
              placeholderStyle='color:#BEBEBE;'></Input>
            {acountVal.length !== 0 && (
              <Image
                mode='widthFix'
                src={clearIcon}
                onClick={() => {
                  console.log('清空')
                  setacountVal('')
                }}></Image>
            )}
          </View>
        </View>

        {/* 密码 */}
        <View className={`${Styles.login_form_password} flex-box-start`}>
          <Image mode='widthFix' src={password}></Image>
          <View className={`${Styles.login_form_password_box} flex-box-start border_bottom`}>
            <Input
              type={changeSee}
              placeholder='请输入登录密码'
              maxlength={20}
              value={passwordVal}
              onInput={ele => setpasswordVal(ele.detail.value)}
              placeholderStyle='color:#BEBEBE;'></Input>
            {passwordVal.length !== 0 ? (
              changeSee === 'password' ? (
                <Image mode='widthFix' src={noSee} onClick={() => setchangeSee('text')}></Image>
              ) : (
                <Image mode='widthFix' src={see} onClick={() => setchangeSee('password')}></Image>
              )
            ) : null}
          </View>
        </View>

        {/* 登录按钮 */}
        <View className={Styles.login_btn}>
          <Button loading={loginLoading} onClick={login}>
            登 录
          </Button>
        </View>

        {/* 记住密码和忘记密码 */}
        <View className={`${Styles.login_password} flex-box-between`}>
          <View
            className={`${Styles.login_password_remeber} flex-box-start`}
            onClick={remeberPassFun}>
            {remePass ? (
              <Image src={remeberPass} mode='widthFix'></Image>
            ) : (
              <View className={Styles.login_password_remeber_unimg}></View>
            )}
            <View
              className={`${Styles.login_password_remeber_text} ${
                remePass ? Styles.remeberPass_color : Styles.unremeberPass_color
              }`}>
              记住密码
            </View>
          </View>
          <View className={Styles.login_password_forget} onClick={forgetPass}>
            忘记密码 ？
          </View>
        </View>

        {/* 华丽分割线 */}
        <View className={`${Styles.login_line} flex-box-between`}>
          <View className={Styles.login_line_1}></View>
          <View className={`${Styles.login_line_text} flex-box-center`}>or</View>
          <View className={Styles.login_line_1}></View>
        </View>

        {/* 登录按钮 */}
        <View className={Styles.login_regbtn}>
          <Button onClick={register} plain>
            注 册
          </Button>
        </View>
      </View>
    </View>
  )
}

export default index
