<template>
  <div class="cart-list">
      <scroll class="content" ref="scroll">
        <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item"></cart-list-item>
      </scroll>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Scroll from "@/components/common/scroll/Scroll";
import CartListItem from "@/views/shopcart/childComponets/CartListItem";
export default {
name: "CartList",
components:{
  Scroll,
  CartListItem
},
  computed:{
      ...mapGetters(['cartList'])
  },
  activated() {
   this.$refs.scroll.refresh()
    // console.log(this.cartList);
  }
}
</script>

<style scoped>
/*.cart-list {*/
/*  height: calc(100% - 133px);*/
/*}*/
/*.content {*/
/*  height: 100%;*/
/*  overflow: hidden;*/
/*}*/

.cart-list {
  height: 100vh;
}
.content {
  overflow: hidden;
  /*margin-top: 44px;*/
  height: calc(100% - 133px);
}
</style>
