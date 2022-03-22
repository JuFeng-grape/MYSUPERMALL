import {debounce} from "@/common/untils";
import BackTop from "@/components/content/backTop/BackTop"
export const itemListenerMixIn={
  data(){
    return {
      itemImgListener:null
    }
  },
  mounted(){
      const refresh=debounce(this.$refs.scroll.refresh,300)
      this.itemImgListener= ()=>{
        refresh();
      }
      this.$bus.$on('imagesLoadEnd', this.itemImgListener)
      }
}
export const backToTop={
  components:{
    BackTop
  },
  data(){
    return {
      isShowTop:false
    }
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0,0,1000);
    },
    backIconShow(position){
      this.isShowTop = (-position.y) >1000
    }
  }
}
