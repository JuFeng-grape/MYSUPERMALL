import Toast from "@/components/common/toast/Toast";

const obj={}

obj.install=function (Vue){
  console.log('++++++++++');
  const toastConstructor = Vue.extend(Toast)
  const toast=new toastConstructor()
  toast.$mount(document.createElement('div'))
  document.body.appendChild(toast.$el)
  Vue.prototype.$toast=(msg, duration=1250)=>{
    toast.msg=msg
    toast.isShow=true
    setTimeout(()=>{
        toast.msg=''
        toast.isShow=false
    },duration)
  }

}


export default obj

