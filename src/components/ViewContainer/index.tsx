import React from 'react'
import { View } from '@tarojs/components'

type Props = {
  className?: string
  columnCenter?: string
  noPadding?: string
  children: React.ReactNode
}
function ViewContainer(props: Props) {
  let className = 'columnLeft'
  // 预设一个布局： column center
  if (props.columnCenter) {
    className = 'columnCenter'
  }
  if (props.noPadding) {
    className = 'noPadding'
  }
  return <View className={className}>{props.children}</View>
}

export default ViewContainer
