import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import styles from './index.module.scss'

interface Props {
  link: string
  children?: any
}

function Index({ children, link }: Props) {
  return (
    <View className={styles['title']}>
      <View>{children}</View>
      <View className={styles['link']} onClick={() => Taro.navigateTo({ url: `${link}` })}>
        更多
      </View>
    </View>
  )
}

export default Index
