import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const Home =  () => import('../views/home/Home')
const Class= () =>import('../views/class/Class')
const ShopCart= () =>import('../views/shopcart/ShopCart')
const Profile= () =>import('../views/profile/Profile')


const routes=[
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/class',
    component:Class
  },
  {
    path:'/shopcart',
    component:ShopCart
  },
  {
    path:'/profile',
    component:Profile
  }
]
const router = new Router({
  routes,
  mode:'history'
})

export default router
