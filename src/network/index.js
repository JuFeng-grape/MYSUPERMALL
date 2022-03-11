import axios from "axios";

export function request(config) {
  const instance=axios.create({
    // baseURL:'http://123.207.32.32:8000',
    baseURL:'http://152.136.185.210:7878/api/hy66',
    timeout:10000

  })
  instance.interceptors.request.use(config=>{
    return config
  },error => {
    console.log(error);
  })
  instance.interceptors.response.use(res=>{
    return res.data
  },error => {
    console.log(error);
  })

  return instance(config)
}
