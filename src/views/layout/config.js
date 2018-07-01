/*
 * @Author: limin
 * @Date: 2018-07-01 15:59:47
 * @Last Modified by: limin
 * @Last Modified time: 2018-07-01 18:04:43
 */
export default {
  data() {
    return {
      Header: {

      },
      /**
       * 侧边栏
       */
      Aside: {
        /**
         * 侧边栏 -导航菜单
         */
        show: true, // --------------------------------------------------------------------------------------状态 true : 显示  false  不显示
        Sidebar: {
          show: true, // ------------------------------------------------------------------------------------状态 true : 显示  false  不显示
          width_max: 200, // --------------------------------------------------------------------------------初始宽度(最大值)
          width_min: 36, // ---------------------------------------------------------------------------------初始宽度(最小值)
          text_color: '#fff',
          active_text_color: '#ffd04b',
          background_color: '#304156'
        },
        /**
         * 侧边栏 -Logo
         */
        Logo: {
          show: true, // 状态 true : 显示  false  不显示
          height: 100, // 高度
          image: '../../static/logo.png', // Logo 背景图片
          backgroundColor: 'transparent' // logo背景颜色
        }
      },
      theme_color: '#409EFF' // default color
    }
  }
}
