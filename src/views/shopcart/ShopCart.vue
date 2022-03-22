<template>
  <div>
    <div class="nav-bar">
      <nav-bar>
        <div slot="center">购物车({{length}})</div>
      </nav-bar>
    </div>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import CartList from "@/views/shopcart/childComponets/CartList";
import CartBottomBar from "@/views/shopcart/childComponets/CartBottomBar";
import {mapGetters} from 'vuex'
export default {
  name: "ShopCart",
  components:{
    NavBar,
    CartList,
    CartBottomBar
  },
  computed:{
      ...mapGetters({
        length:'cartLength',
        cartList:'cartList'
      })
  }
}
</script>

<style scoped>
.nav-bar{
  background-color: lightPink;
  color: #fff;
  text-align: center;
  font-size: 18px;
}
</style>
