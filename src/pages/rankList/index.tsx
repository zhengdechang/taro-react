import { View, Image, Text } from '@tarojs/components'
import { useState, useEffect } from 'react'

import './index.scss'

type IRankItem = {
  score: number
  total?: number
  id: number
  name?: string
  avatar: string
  nickName: string
  correctRate?: string
}

function Index() {
  const [rankList, setRankList] = useState<IRankItem[]>([])

  useEffect(() => {
    setTimeout(() => {
      setRankList([
        { id: 11, avatar: 'http://cdn.algbb.cn/emoji/32.png', nickName: 'Tom Mark', score: 13122 },
        {
          id: 12,
          avatar: 'http://cdn.algbb.cn/emoji/31.png',
          nickName: 'Bruce Alex',
          score: 23124
        },
        {
          id: 13,
          avatar: 'http://cdn.algbb.cn/emoji/30.png',
          nickName: 'Chirs Ford',
          score: 45631
        },
        { id: 14, avatar: 'http://cdn.algbb.cn/emoji/29.png', nickName: 'Ben Dick', score: 16341 },
        {
          id: 15,
          avatar: 'http://cdn.algbb.cn/emoji/28.png',
          nickName: 'Martin Hugo',
          score: 23145
        },
        {
          id: 16,
          avatar: 'http://cdn.algbb.cn/emoji/27.png',
          nickName: 'Lee Oliver',
          score: 34123
        },
        { id: 17, avatar: 'http://cdn.algbb.cn/emoji/26.png', nickName: 'Mark Rex', score: 56142 }
      ])
    }, 3000)
  }, [])

  return (
    <View className='rank-list__container'>
      <View className='rank-list__background' />
      <View className='rank-list__wrap--champion'>
        {rankList.length ? (
          <>
            <Image className='decoration' src='http://cdn.algbb.cn/rank/crown.png' />
            <Image className='avatar' src={rankList[0]?.avatar} />
            <View>
              <View className='name'>{rankList[0].nickName}</View>
              <View className='realname'>
                <Text>({rankList[0].name})</Text>
                <View className='score'>{rankList[0].score}</View>
              </View>
            </View>
          </>
        ) : null}
        {rankList.length > 1 &&
          rankList.slice(1).map((rank, index) => {
            const { avatar, nickName, name, score } = rank
            return (
              <View className='rank-list__wrap' key={index}>
                <View className='number'>{index + 2}</View>
                <Image className='avatar' src={avatar} />
                <View className='name'>
                  {nickName}
                  <View className='realname'>{name}</View>
                </View>
                <View className='score'>{score}</View>
              </View>
            )
          })}
      </View>
    </View>
  )
}

export default Index
