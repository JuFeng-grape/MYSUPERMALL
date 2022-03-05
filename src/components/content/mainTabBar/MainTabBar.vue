<template>
<div>
  <tab-bar>
    <tab-bar-item path="/home" activeColor="blue">
      <img slot="img-icon" src="~assets/img/tabbar/home.svg" alt="">
      <img slot="img-icon-x" src="~assets/img/tabbar/homex.svg" alt="">
      <div slot="text">首页</div>
    </tab-bar-item>

    <tab-bar-item path="/class" activeColor="blue">
      <img slot="img-icon" src="~assets/img/tabbar/class.svg" alt="">
      <img slot="img-icon-x" src="~assets/img/tabbar/classx.svg" alt="">
      <div slot="text">分类</div>
    </tab-bar-item>

    <tab-bar-item path="/shopcart" activeColor="blue">
      <img slot="img-icon" src="~assets/img/tabbar/shopcart.svg" alt="">
      <img slot="img-icon-x" src="~assets/img/tabbar/shopcartx.svg" alt="">
      <div slot="text">购物车</div>
    </tab-bar-item>

    <tab-bar-item path="profile" activeColor="blue">
      <img slot="img-icon" src="~assets/img/tabbar/profile.svg" alt="">
      <img slot="img-icon-x" src="~assets/img/tabbar/profilex.svg" alt="">
      <div slot="text">我的</div>
    </tab-bar-item>
  </tab-bar>
</div>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'
export default {
  name: "MainTabBar",
  components:{
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>

</style>
