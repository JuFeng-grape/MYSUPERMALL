import {request} from "@/network/index";

export function getMultiData(){
  return  request({
    url:'/home/multidata'
  })
}

export function getHomeGoods(type,page){
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })

}
