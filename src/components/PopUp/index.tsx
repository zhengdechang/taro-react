import { View } from '@tarojs/components'
import styles from './index.module.scss'
import { AtFloatLayout } from 'taro-ui'

export default props => {
  const { title = 'title', handleClose, children, popupVisible } = props
  return (
    <View className={styles.content}>
      <AtFloatLayout title={title} onClose={handleClose} isOpened={popupVisible}>
        <View
          style={{
            overflowY: 'auto'
          }}>
          {children}
        </View>
      </AtFloatLayout>
    </View>
  )
}
