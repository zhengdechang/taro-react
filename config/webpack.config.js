/* eslint-disable */
/*
 * 自动生成 Webpack alias
 */

const fs = require('fs')
const path = require('path')

const srcAlias = {}

const srcPath = '../src'

fs.readdirSync(path.resolve(__dirname, srcPath)).forEach(f => {
  const alias = `@/${f}`
  srcAlias[alias] = path.resolve(__dirname, `${srcPath}/${f}`)
  if (f.endsWith('.ts') || f.endsWith('.js')) {
    srcAlias[alias.substring(0, alias.lastIndexOf('.'))] = path.resolve(
      __dirname,
      `${srcPath}/${f}`
    )
  }
})

module.exports = {
  resolve: {
    alias: srcAlias
  }
}
