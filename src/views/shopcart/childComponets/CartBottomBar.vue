<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll" class="check-button" @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计: {{totalPrice}}
    </div>
    <div class="right">
      去结算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
import {mapGetters} from "vuex"
export default {
name: "CartBottomBar",
  components:{
    CheckButton
  },
  computed:{
  ...mapGetters(['cartList']),
    totalPrice(){
      return this.cartList.filter(item=>{
        return item.checked
      }).reduce((preValue,item)=>{
        return  preValue + item.count * item.realPrice
      },0)
    },
    checkLength(){
      return  this.cartList.filter(item => item.checked).length
    },
    isSelectAll(){
        // return !(this.cartList.filter(item=>!item.checked).length)
        if(this.cartList.length === 0){ return  false}
        return !(this.cartList.find(item=>!item.checked))
     }
  },
  methods:{
    checkClick(){
      if(this.isSelectAll){
        this.cartList.forEach(item=>item.checked=false)
      }else{
        this.cartList.forEach(item=>item.checked=true)
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #eee;
  position: fixed;
  bottom: 50px;
  left: 0;
  right: 0;
  display: flex;
  font-size: 14px;
  line-height: 40px;
}
.check-content {
  height: 20px;
  display: flex;
  width: 80px;
}
.check-content span {
  padding-left: 40px;
}
.check-button {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 10px;
  height: 20px;
  width: 20px;
}
.price {
  flex: 1;
}
.right {
  text-align: center;
  background-color: #d43e2e;
  width: 100px;
}
</style>
