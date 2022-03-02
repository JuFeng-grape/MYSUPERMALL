<template>
  <div class="tab-bar-item" @click="itemClick">
      <div v-if="!isActive"><slot name="img-icon"></slot></div>
      <div v-else><slot name="img-icon-x"></slot></div>
      <div :style="activeStyle"><slot name="text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props:{
    path: String,
    activeColor:{
      type: String,
      default:'red'
    }
  },
  computed:{
    isActive(){
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle(){
      return this.isActive ? {color:this.activeColor}:{}
    }
  },
  methods:{
    itemClick() {
      this.$router.replace(this.path)
    }
  }
}
</script>

<style scoped>
.tab-bar-item{
  flex: 1;
  text-align: center;
  font-size: 14px;
  height: 49px;
}

.tab-bar-item img{
  height: 24px;
  width: 24px;
  vertical-align: middle;
  margin-bottom: 2px;
}

</style>
