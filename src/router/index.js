import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Success from '../views/Success.vue'
import Login from '../views/Login.vue'
import Welcome from '@/views/menu/Welcome.vue'
import Main from '../views/Main.vue';
// menu
import Item_sum from '../views/menu/Item_sum.vue'
import Item_category from '../views/menu/Item_category.vue'
import Item_categorySon from '../views/menu/item_categorySon.vue'
import AddItem from '../views/menu/AddItem.vue'
// order
import OrderMain from '../views/order/OrderMain.vue'
// user
import User from '../views/userManage/User.vue'
// setting
import addSlideShow from '../views/settingView/AddSlideShow.vue'
import SlideShow from '../views/settingView/SlideShow.vue'
import HomeGoods from '../views/settingView/HomeGoods.vue'
import UpdateAdmin from '../views/settingView/UpdateAdmin.vue'
// dateManger
import ItemCategoryView from '../views/dataManage/ItemCategoryView.vue'
import DateView from '../views/dataManage/DateView.vue'
// reception
import ItemOrderCar from '../views/reception/ItemOrderCar.vue'
import Car from '../views/reception/Car.vue'
import UserOrderAll from '../views/reception/User/UserOrderAll.vue'
import UserOrder from '../views/reception/User/UserOrder.vue'
import ItemOrder from '../views/reception/ItemOrder.vue'
import Commodity from '../views/reception/Commodity.vue'
import UserInfo from '../views/reception/User/UserInfo.vue'
import Main_reception from '../views/reception/Main_reception.vue'
import PersonRe from '../views/reception/PersonRe.vue'
import HeaderRe from '../views/reception/HeaderRe.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/mainRreception',
  },
  {
    path: '/admin',
    component: Home,
    redirect: '/itemCategoryView',
    children: [
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/item_sum',
        component: Item_sum
      },
      {
        path: '/item_category',
        component: Item_category
      },
      {
        path: '/item_categorySon',
        component: Item_categorySon
      },
      {
        path: '/itemCategoryView',
        component: ItemCategoryView
      },
      {
        path: '/addItem',
        component: AddItem
      },
      {
        path: '/user',
        component: User
      },
      {
        path: '/dateView',
        component: DateView
      },
      {
        path: '/updateAdmin',
        component: UpdateAdmin
      },
      {
        path: '/orderMain',
        component: OrderMain
      },
      {
        path: '/slideShow',
        component: SlideShow
      },
      {
        path: '/homeGoods',
        component: HomeGoods
      },
      {
        path: '/addSlideShow',
        component: addSlideShow
      }
    ]
  },
  // {
  //   path:'/welcome',
  //   component:Welcome,
  //   name:'welcome'
  // },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/main',
    component: Main,
  },
  {
    path: '/mainRreception',
    component: Main_reception,
    // beforeEnter: (to, from, next) => {
    //   if(to.path=='/commodity'){
    //     const token= window.sessionStorage.getItem('log');
    //     if(token){
    //       next()
    //     }else{
    //       alert('请登录！')
    //       next('/mainRreception')
    //     }
    //   }
    // }
  },
  {
    path: '/personRe/:id',
    redirect: '/userInfo',
    component: PersonRe,
    children: [
      {
        path: '/userInfo',
        component: UserInfo
      },
      {
        path: '/userOrder',
        component: UserOrder,
        redirect: '/userOrderAll',
        children: [
          {
            path: '/userOrderAll',
            component: UserOrderAll
          }
        ]
      },

    ]
  },
  {
    path: '/commodity/:id',
    component: Commodity,
  },
  {
    path: '/itemOrder',
    component: ItemOrder
  },
  {
    path: '/car',
    component: Car
  },
  {
    path: '/itemOrderCar',
    component: ItemOrderCar,
    name: 'itemOrderCar'
  },
]

const router = new VueRouter({
  routes
})
// 导航守卫
router.beforeEach(function (to, from, next) {
  if (to.path === '/') next('/mainRreception')
  // if (to.path === '/login') return next()

  // let admin = window.sessionStorage.getItem('admin')
  // console.log(admin);
  // if(admin!=='root'){
  //    next('/login')
  // }else{
  //    next('/itemCategoryView')
  // }
  if (to.path === '/itemCategoryView') {
    const token = window.sessionStorage.getItem('admin');
    console.log(token);
    if (token) {
      next()
    } else {
      alert('还未登录！')
      next('/login')
    }
  } else {
    next()
  }
})

export default router
