/*
 * @Author: limin
 * @Date: 2018-06-25 10:29:33
 * @Last Modified by: limin
 * @Last Modified time: 2018-06-30 16:22:35
 */
const getters = {
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  errorLogs: state => state.errorLog.logs,
  theme: state => state.app.theme,
  language: state => state.app.language,
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  clientHeight: state => state.app.clientHeight,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters
}
export default getters
