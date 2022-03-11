import {debounce} from "@/common/untils";

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
