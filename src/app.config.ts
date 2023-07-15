export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/contacts/index', // 群组
    'pages/chatroom/index', // 聊天室内=
    'pages/forumList/index', // 论坛列表
    'pages/forumDetail/index', // 帖子详情
    'pages/forumPublish/index', // 发布帖子
    'pages/forumModify/index', // 修改帖子
    'pages/myForums/index', // 我的帖子
    'pages/dashboard/index' // 个人中心
  ],
  subPackages: [
    {
      root: 'pages/login',
      pages: ['index', 'register/register', 'realNameAuthentication/index']
    },
    {
      root: 'pages/article', // 文章
      pages: ['list/index', 'detail/index']
    },
    {
      root: 'pages/exchange', // 问答
      pages: ['list/index', 'detail/index']
    },
    {
      root: 'pages/rankList', // 排行榜
      pages: ['index']
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    backgroundColorTop: '#F5F6F7',
    backgroundColorBottom: '#F5F6F7',
    navigationBarTitleText: 'taro3 react',
    navigationBarTextStyle: 'black'
  },
  // 页面切换动画
  animation: {
    duration: 196, // 动画切换时间，单位毫秒
    delay: 50 // 切换延迟时间，单位毫秒
  }
})
