import {ADD_COUNT,ADD_TO_CART} from "@/store/mutation-types";

export default {
  addToCart(context,payload){
     return new Promise(resolve => {
       let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
       if(oldProduct){
         context.commit(ADD_COUNT,oldProduct)
         resolve('该产品数量加1')
       }else {
         payload.count=1
         context.commit(ADD_TO_CART,payload)
         resolve('添加购物车成功')
       }
     }
     )
  }
}
