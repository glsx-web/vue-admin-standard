// const themeArray = require('./themeArray');
import themeArray from './themeArray'
// 封装一些全局元素。如全站通用功能函数和http请求等

export const global = {
  /**
         * 切换主题函数
         */
  changeTheme(themeValue) {
    // console.log('切换主题颜色值：',themeValue,that.staticPath,JSON.stringify(themeArray) );
    // 需要移到单独的文件存放
    var cssArray = themeArray
    for (let i = 0, len = cssArray.length; i < len; i++) {
      var itemPath = `@/static/theme/${themeValue}/${cssArray[i].toLowerCase()}.css`
      loadCss(itemPath)
    }

    localStorage.setItem('themeValue', themeValue)

    function loadCss(path) {
      var head = document.getElementsByTagName('head')[0]
      var link = document.createElement('link')
      link.href = path
      link.rel = 'stylesheet'
      link.type = 'text/css'
      head.appendChild(link)
    }
  }
}

// export default global
