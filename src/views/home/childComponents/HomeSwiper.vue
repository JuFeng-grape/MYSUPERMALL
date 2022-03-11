<template>
  <div>
      <swiper>
        <swiper-item v-for="item in banner">
          <a :href="item.link">
            <img :src="item.image" alt="" @load="showImgLoad">
          </a>
        </swiper-item>
      </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from "@/components/common/swiper"
  export default {
    name: "HomeSwiper",
    components:{
      Swiper,
      SwiperItem
    },
    props:{
      banner:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{
        loadEnd:false
      }
    },
    methods:{
      showImgLoad(){
        if(!this.loadEnd){
          this.$emit('swiperImgLoad')
          this.loadEnd=true
        }

      }
    }
}
</script>

<style scoped>

</style>
