<template>
  <div class="navBar">
      <div class="left"><slot name="left"></slot></div>
      <div class="center"><slot name="center"></slot></div>
      <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
  .navBar{
    display: flex;
    line-height: 44px;
    background-color: lightpink;
  }
  .left,.right{
    width: 60px;
  }
  .center{
    flex: 1;
  }
</style>
