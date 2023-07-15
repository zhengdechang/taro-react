// export default [
//   { key: 'index', title: '首页', iconType: 'bullet-list', path: 'pages/index/index' },
//   { key: 'contacts', title: '聊天室', iconType: 'message', path: 'pages/contacts/index' },
//   { key: 'forumList', title: '论坛', iconType: 'bookmark', path: 'pages/forumList/index' },
//   { key: 'dashboard', title: '个人中心', iconType: 'user', path: 'pages/dashboard/index' }
// ]
import { AppOutline, MessageOutline, UnorderedListOutline, UserOutline } from 'antd-mobile-icons'

export default [
  { key: 'index', title: '首页', iconType: AppOutline, path: 'pages/index/index' },
  {
    key: 'contacts',
    title: '聊天室',
    iconType: UnorderedListOutline,
    path: 'pages/contacts/index'
  },
  { key: 'forumList', title: '论坛', iconType: MessageOutline, path: 'pages/forumList/index' },
  { key: 'dashboard', title: '个人中心', iconType: UserOutline, path: 'pages/dashboard/index' }
]
