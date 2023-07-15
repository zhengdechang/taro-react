/* eslint-disable camelcase */
process.env.APP_ENV = process.env.APP_ENV || 'dev'

require('dotenv-flow').config({
  // node_dev表示.env.{node_env}文件
  node_env: process.env.APP_ENV
})

module.exports = {
  env: {
    NODE_ENV: '"development"',
    APP_VERSION: `"${process.env.npm_package_version}"`,
    APP_ENV: `"${process.env.APP_ENV}"`,
    APP_API: `"${process.env.APP_API}"` // 业务页面使用示例：process.env.APP_API，不然报process is not defined
  },
  defineConstants: {
    // APP_API: `"${process.env.APP_API}"`,
    // APP_NAME: `"${process.env.APP_NAME}"`,
    // APP_VERSION: `"${process.env.npm_package_version}"` // 这种配置得话直接 全局变量去使用，注意declare下
  },
  mini: {},
  h5: {}
}
