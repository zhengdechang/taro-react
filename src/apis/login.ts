import tools from '@/utils/tools'

const isMock = true
const API_PRE = isMock ? 'http://127.0.0.1:9527' : 'https://www.imooc.com'

// login
export const toLogin = (params: any) => {
  return tools.request({
    url: `${API_PRE}/mock/login`,
    method: 'POST',
    params
  })
}
