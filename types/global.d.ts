/* eslint-disable init-declarations */
/* eslint-disable spaced-comment */
/// <reference types="@tarojs/taro" />

declare module '*.png'
declare module '*.gif'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'
declare module '*.css'
declare module '*.less'
declare module '*.scss'
declare module '*.sass'
declare module '*.styl'

declare namespace NodeJS {
  interface ProcessEnv {
    TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt' | 'quickapp' | 'qq' | 'jd'
    APP_API: string
    APP_NAME: string
    APP_VERSION: string
  }
}

// declare const APP_API: string
// declare const APP_NAME: string
// declare const APP_VERSION: string
