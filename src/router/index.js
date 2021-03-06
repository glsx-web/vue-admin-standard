import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;

Vue.use(Router)

const views = 'views'

/* Layout */
import Layout from '@/views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import(`@/${views}/login/index`), hidden: true },
  { path: '/404', component: () => import(`@/${views}/errorPage/404`), hidden: true },
  { path: '/401', component: () => import(`@/${views}/errorPage/401`), hidden: true },
  { path: '/lockscreen', component: () => import(`@/${views}/lockScreen/index`), hidden: true },
  {
    path: '',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import(`@/${views}/dashboard/index`),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'form', keepAlive: true }
    }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/example',
    component: Layout,
    redirect: 'noredirect',
    name: 'example',
    meta: { title: 'example', icon: 'example', permission: '/example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import(`@/${views}/table/index`),
        meta: { title: 'table', icon: 'table', permission: '/example/table', keepAlive: false }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import(`@/${views}/tree/index`),
        meta: { title: 'tree', icon: 'tree', permission: '/example/tree', keepAlive: false }
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'gl-form',
        component: () => import(`@/${views}/form/index`),
        meta: { title: 'form', icon: 'form', permission: '/form/index', keepAlive: true }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
