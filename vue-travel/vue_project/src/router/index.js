import Vue from 'vue'
import Router from 'vue-router'
import Alltype from '@/components/Alltype'
import buy from '@/views/buy'
import index from '@/views/index'
import PageMy from '@/views/PageMy'
import ServerPage from '@/views/ServerPage'
import find from '@/views/find'
import FindDetail from '@/views/FindDetail'
import login from '@/views/login'
import Register from '@/views/register'
import IssueFind from '@/views/IssueFind'
import Collection from '@/views/Collection'
import HistoryList from '@/components/HistoryList'
import GoodsDetail from '@/components/GoodsDetail'
import OrderDetail from '@/components/OrderDetail'
import publishPro from '@/views/publishPro'
import orderMan from '@/views/orderMan'
import editUser from '@/views/editUser'
import addressMan from '@/views/addressMan'
import addAddress from '@/views/addAddress'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/',
      name: 'index',
      component: index,
      redirect: '/buy',
      children: [
        {
          path: 'buy',
          name: 'buy',
          component: buy
        },
        {
          path: 'PageMy',
          name: 'PageMy',
          component: PageMy
        },
        {
          path: 'find',
          name: 'find',
          component: find
        },
        {
          path: 'ServerPage',
          name: 'ServerPage',
          component: ServerPage
        }
      ]
    },
    {
      path: '/GoodsDetail/:id',
      name: 'GoodsDetail',
      component: GoodsDetail
    },
    {
      path: '/Alltype',
      name: 'Alltype',
      component: Alltype
    },
    {
      path: '/FindDetail/:id',
      name: 'FindDetail',
      component: FindDetail
    },
    {
      path: '/HistoryList',
      name: 'HistoryList',
      component: HistoryList
    },
    {
      path: '/orderMan',
      name: 'orderMan',
      component: orderMan
    },
    {
      path: '/editUser',
      name: 'editUser',
      component: editUser
    },
    {
      path: '/addressMan',
      name: 'addressMan',
      component: addressMan
    },
    {
      path: '/addAddress',
      name: 'addAddress',
      component: addAddress
    },
    {
      path: '/Collection',
      name: 'Collection',
      component: Collection
    },
    {
      path: '/OrderDetail',
      name: 'OrderDetail',
      component: OrderDetail
    },
    {
      path: '/IssueFind',
      name: 'IssueFind',
      component: IssueFind
    },
    {
      path: '/publishPro',
      name: 'publishPro',
      component: publishPro
    }
  ]
})
