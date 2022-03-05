import {request} from "@/network/index";

export function getMultiData(){
  return  request({
    url:'/home/multidata'
  })
}

export function getHomeGoods(){
  return request({
    url:'/home/data'
  })
}
