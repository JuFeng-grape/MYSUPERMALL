<template>
  <div class="recommend">
    <div v-for="item in recommend" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendComponent",
  props:{
   recommend:{
     type:Array,
     default() {
       return [];
     }
   }
  }
}
</script>

<style scoped>

.recommend{
  display:flex;
  font-size: 12px;
  text-align: center;
}
.recommend-item{
  flex:1;
  padding: 10px 0 15px;
  border-bottom: 8px solid #eee;
}
.recommend-item a{
  text-decoration: none;
}
.recommend-item img{
  width: 70px;
  height: 70px;
  margin-bottom: 5px;
}
</style>
