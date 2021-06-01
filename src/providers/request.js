import axios from 'axios';
import { Loading, Message } from 'element-ui'

axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://ufile.vip/api/public/index.php'; //填写域名

const myWrongToa = (msg) => {
  Message({
    message: msg,
    type: 'error',
    duration: 3000,
    offset:100
  })
}

const loading = { //loading加载对象
  loadingInstance: null,
  //打开加载
  open() {
    if (this.loadingInstance === null) { // 如果实例 为空，则创建
      this.loadingInstance = Loading.service({
        text: '加载中...', //加载图标下的文字
        spinner: 'el-icon-loading', //加载图标
        background: 'rgba(0, 0, 0, 0.8)', //背景色
        customClass: 'loading' //自定义样式的类名
      })
    }
  },
  //关闭加载
  close() {
    // 不为空时, 则关闭加载窗口
    if (this.loadingInstance !== null) {
      this.loadingInstance.close()
    }
    this.loadingInstance = null
  }
}

//http request 拦截器
axios.interceptors.request.use(
  config => {
    loading.open();
    config.data.token = '111111';
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);

//响应拦截器即异常处理
axios.interceptors.response.use(response => {
  loading.close();
  let resdata = response.data;
  if (resdata.code === 0) {
    myWrongToa(resdata.data);
  }
  return resdata;
}, err => {
  loading.close();
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        myWrongToa('错误请求')
        break;
      case 401:
        myWrongToa('未授权，请重新登录')
        break;
      case 403:
        myWrongToa('拒绝访问')
        break;
      case 404:
        myWrongToa('请求错误,未找到该资源')
        break;
      case 405:
        myWrongToa('请求方法未允许')
        break;
      case 408:
        myWrongToa('请求超时')
        break;
      case 500:
        myWrongToa('服务器端出错')
        break;
      case 501:
        myWrongToa('网络未实现')
        break;
      case 502:
        myWrongToa('网络错误')
        break;
      case 503:
        myWrongToa('服务不可用')
        break;
      case 504:
        myWrongToa('网络超时')
        break;
      case 505:
        myWrongToa('http版本不支持该请求')
        break;
      default:
        myWrongToa(`连接错误${err.response.status}`)
    }
  } else {
    myWrongToa('连接到服务器失败')
  }
  return Promise.resolve(err.response)
})

export default axios;