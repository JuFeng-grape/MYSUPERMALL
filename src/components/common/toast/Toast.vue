<template>
<div class="toast" v-show="isShow">
  {{msg}}
</div>
</template>

<script>
export default {
name: "Toast",
  data(){
    return {
      msg:"",
      isShow:false
    }
  },
  methods:{
    // showTips(message,duration){
    //   console.log('0000000');
    //   this.isShow=true
    //   this.mess=message
    //   console.log(this.isShow,this.mess);
    //
    //   // setTimeout(()=>{
    //   //   this.isShow=false
    //   //   this.mess=''
    //   //   console.log('ppppppp');
    //   // },duration)
    // },

  }
}
</script>

<style scoped>
.toast{

  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 9999;
  transform: translate(-50%,50%);
  padding: 8px 10px;
  color: #fff;
  background-color: rgba(0,0,0,.7);
}

</style>
