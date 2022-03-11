<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 class="tab-control"
                 @tabClick="tabClick"
                 ref="tabControl1"
                v-show="isTabFixed"
    ></tab-control>
    <scroll class="home-scroll"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <HomeSwiper :banner="banner" @swiperImgLoad="swiperImgLoad"></HomeSwiper>
      <recommend-component :recommend="recommend"></recommend-component>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']"

                   @tabClick="tabClick"
                    ref="tabControl2"
      ></tab-control>
      <goods-list :goods="showInfo" ></goods-list>

    </scroll>
    <back-top @click.native="backClick" v-show="isShowTop"></back-top>


  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import BackTop from "@/components/content/backTop/BackTop"
import Scroll from "@/components/common/scroll/Scroll";

import HomeSwiper from "@/views/home/childComponents/HomeSwiper";
import RecommendComponent from "@/views/home/childComponents/RecommendComponent";
import FeatureView from "@/views/home/childComponents/FeatureView";

import {getMultiData,getHomeGoods} from "@/network/home";

import {itemListenerMixIn} from "@/common/mixin";

export default {
  name: "Home",
  components:{
    NavBar,
    TabControl,
    GoodsList,
    BackTop,
    Scroll,
    HomeSwiper,
    RecommendComponent,
    FeatureView
  },
  data(){
    return{
      banner:[],
      recommend:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentType:'pop',
      isShowTop:false,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0,
    }
  },
  mixins:[itemListenerMixIn],
  created() {
     this.getMultiData(),
     this.getHomeGoods('pop'),
     this.getHomeGoods('new'),
     this.getHomeGoods('sell')
  },
  mounted() {

  },
  computed:{
    showInfo(){
      return this.goods[this.currentType].list
    }
  },
  methods:{

    tabClick(index){
      console.log(index)
      switch(index){
        case 0:
          this.currentType='pop'
          break
        case 1:
          this.currentType='new'
          break
        case 2:
          this.currentType='sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index

    },
    loadMore(){
      console.log('加载更多 ');
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.scroll.refresh()
    },
    getMultiData(){
      getMultiData().then(res=>{
        this.banner=res.data.banner.list;
        this.recommend=res.data.recommend.list;
      })
    },
    getHomeGoods(type){
      const page=this.goods[type].page + 1;
      getHomeGoods(type,page).then(res => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page  += 1;
        this.$refs.scroll.finishPullUp()
      })
    },
    backClick(){
      this.$refs.scroll.scrollTo(0,0,1000);
    },
    contentScroll(position){
      this.isShowTop = (-position.y) >1000
      this.isTabFixed = (-position.y)  > this.tabOffsetTop
    },
    swiperImgLoad(){
      // console.log(this.$refs.tabControl2.$el.offsetTop);
      this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
    }
  },
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0,this.saveY,0)
  },
  deactivated() {

    this.saveY=this.$refs.scroll.getScrollY()
  this.$bus.$off('imagesLoadEnd',  this.itemImgListener)
  }

}
</script>

<style scoped>
#home{
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}
.home-nav{
  color: white;
  text-align: center;
  box-shadow: 0px 1px 1px rgba(100,100,100,.1);
  background-color: lightPink;
}
.tab-control{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.home-scroll{

  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}

</style>
