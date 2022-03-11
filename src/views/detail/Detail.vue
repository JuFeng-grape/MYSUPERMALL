<template>
  <div class="detail" >
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @loadImgEvent="loadImgEvent"></detail-goods-info>
      <detail-params :param-info="paramInfo"></detail-params>
      <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
      <goods-list :goods="recommend"></goods-list>
    </scroll>

  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childCompoents/DetailNavBar";
import DetailSwiper from "@/views/detail/childCompoents/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childCompoents/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childCompoents/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childCompoents/DetailGoodsInfo";
import DetailCommentInfo from "@/views/detail/childCompoents/DetailCommentInfo";
import DetailParams from "@/views/detail/childCompoents/DetailParams";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
import {getDetailData,getRecommend} from "@/network/detail";
import {Goods,Shop,GoodsParam} from "@/network/detail"

import {itemListenerMixIn} from "@/common/mixin";

export default {
name: "Detail",
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParams,
    DetailCommentInfo,
    GoodsList,
    Scroll
  },
  mixins:[itemListenerMixIn],
  data(){
    return{
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommend:[],
    }
  },
  created() {
    this.iid =this.$route.params.iid
    getDetailData(this.iid).then(res=>{
      // console.log(res)
      const data=res.result;
      this.topImages=data.itemInfo.topImages
      this.goods=new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      this.shop=new Shop(data.shopInfo)
      this.detailInfo=data.detailInfo
      this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)
      if(data.rate.cRate > 0){
        this.commentInfo=data.rate.list[0]
      }
    })
    getRecommend().then(res=>{
      this.recommend=res.data.list

    })
  },
  methods:{
    loadImgEvent(){
        this.$refs.scroll.refresh()
    }
  },
  mounted() {

  },
  destroyed() {
    this.$bus.$off('imagesLoadEnd',this.itemImgListener)
  }

}
</script>

<style scoped>
.detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav{
  position: relative;
  z-index: 9;
}
.content{
  height: calc(100% - 44px);
  overflow: hidden;
}
</style>
