<template>
  <div class="good-item" @click="itemClick">
    <img :src="showImages" :key="showImages" alt="" @load="imagesLoad">
    <div class="good-info">
      <p>{{goodsItem.title}}</p>
      <span class="price"> {{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
name: "GoodsItem",
  props:{
    goodsItem:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  computed:{
  showImages(){
    return this.goodsItem.image || this.goodsItem.img || this.goodsItem.show.img
  }
  },
  methods:{
    imagesLoad(){
      this.$bus.$emit('imagesLoadEnd')
    },
    itemClick(){
      this.$router.push('/detail/'+ this.goodsItem.iid)
    }
  }
}
</script>

<style scoped>
.good-item{
  padding-bottom: 40px;
  position: relative;
  width: 49%;
}
.good-item img{
  width: 100%;
  border-radius: 5px;
}
.good-info{
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.good-info p{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.good-info .price{
  color: orangered;
  margin-right: 20px;
}
.good-info .collect{
  position: relative;
}
.good-info .collect::before{
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background:url("~assets/img/common/collect.svg") 0 0/14px 14px;
}

</style>
