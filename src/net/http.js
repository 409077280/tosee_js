import axios from 'axios'
// 每次请求携带cookies信息
axios.defaults.withCredentials = true

const Axios = axios.create({
  //baseURL: 'http://s.sztosee.cn:9088', // api的base_url
  baseURL: 'http://192.168.0.121:8888', // api的base_url 
  timeout: 15000, // 请求超时时间
})

// 在发送请求之前做某件事
Axios.interceptors.request.use(config => {
  var headstr = { 'Content-Type': 'application/json, multipart/form-data; charset=UTF-8', };
  Object.assign(config.headers, headstr);
  if (localStorage.token && localStorage.token != "") {
    //config.headers.Authorization = localStorage.token
    var headstr = {
      'Content-Type': 'application/json, multipart/form-data; charset=UTF-8',
      'Authorization': localStorage.token,
    };
    //console.log(headstr);
    Object.assign(config.headers, headstr);
  }
  return config
}, error => {
  // Do something with request error
  console.log('请求错误：')
  console.log(error) // for debug
  Promise.reject(error)
})

//返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
  // 若返回状态成功
  res => {
    // TODO:: token expire response code, return null
    //return null;
    return res;
  }, error => {
    console.log('当前服务错误信息：');
    console.log(error);
    // Server end setting HTTP CODE when token expire
    if (error.response.status === 401) {
      // 401 说明 token 验证失败
      // 可以直接跳转到登录页面，重新登录获取 token
      try {
        delete localStorage.token;
        delete localStorage.manager;
      } catch (err) {
        console.log(err)
      }
      location.href = '/index/passport/login';
    } else if (error.response.status === 500) {
      // 服务器错误
      // do something
      return Promise.reject(error.response.data)
    }
    // 返回 response 里的错误信息
    return Promise.reject(error.response.data)
  })


export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$http', { value: Axios })
  }
}