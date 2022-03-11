<template>
  <div ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>

import BScroll from 'better-scroll'
export default {
  name: "Scroll",
  components:{
   BScroll
  },
  data(){
    return {
      scroll:{
        type:Object,
        default(){
          return {}
        }
      },
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad:{
        type:Boolean,
        default:false
      }
    }
  },
  mounted() {
    this.scroll=new BScroll(this.$refs.wrapper,{
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad,
      click:true,
    })
    this.scroll.on('scroll',(position)=>{
      // console.log(position);
      this.$emit('scroll',position)
    })
    this.scroll.on('pullingUp',()=>{
       this.$emit('pullingUp')
    })
    // console.log(this.scroll);
  },
  methods:{
    scrollTo(x,y,time){
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    refresh(){
      // console.log('刷新');
      this.scroll && this.scroll.refresh()
    },
    getScrollY(){
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>
