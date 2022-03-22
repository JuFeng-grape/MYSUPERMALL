<template>
  <div class="detail" >
    <detail-nav-bar class="detail-nav" @navItemClick="navItemClick" ref="nav"></detail-nav-bar>

    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
<!--      <ul>-->
<!--        <li v-for="item in $store.state.cartList">{{item}}</li>-->
<!--      </ul>-->
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @loadImgEvent="loadImgEvent"></detail-goods-info>
      <detail-params ref="params" :param-info="paramInfo" ></detail-params>
      <detail-comment-info ref="commentInfo" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommend" ></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowTop"></back-top>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>

  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childCompoents/DetailNavBar";
import DetailSwiper from "@/views/detail/childCompoents/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childCompoents/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childCompoents/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childCompoents/DetailGoodsInfo";
import DetailCommentInfo from "@/views/detail/childCompoents/DetailCommentInfo";
import DetailBottomBar from "@/views/detail/childCompoents/DetailBottomBar";
import DetailParams from "@/views/detail/childCompoents/DetailParams";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
import {getDetailData,getRecommend} from "@/network/detail";
import {Goods,Shop,GoodsParam} from "@/network/detail"

import {itemListenerMixIn,backToTop} from "@/common/mixin";
import {debounce} from "@/common/untils";
import {ADD_TO_CART} from "@/store/mutation-types";

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
    Scroll,
    DetailBottomBar
  },
  mixins:[itemListenerMixIn,backToTop],
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
      themeTopYs:[],
      getThemeTopY:null,
      currentIndex:0
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


    // this.$nextTick(() => {
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
        this.themeTopYs.push(this.$refs.commentInfo.$el.offsetTop - 44);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
        this.themeTopYs.push(Number.MAX_VALUE); // 存入最大值，用于边界条件判断
        // console.log(this.themeTopYs);
      }, 200);
    // })
  },
  methods:{

    loadImgEvent(){
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    navItemClick(index){
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
    },
    contentScroll(position){
      const positionY = -position.y;
      const length = this.themeTopYs.length;
      for(let i=0;i<length-1;i++){
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i; // 用于避免重复记录i的次数
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      this.backIconShow(position)
    },
    addToCart(){
      const product={}
      product.title=this.goods.title
      product.realPrice=this.goods.realPrice
      product.desc=this.goods.desc
      product.images=this.topImages[0]
      product.iid=this.iid

      this.$store.dispatch('addToCart',product).then(res=>{
        console.log('---------');
        console.log(this.$toast);

        console.log(res);
        // this.$toast.methods.showOthers()
        this.$toast(res,1500)

      })
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
  height: calc(100% - 44px - 58px);
  overflow: hidden;
}
</style>
