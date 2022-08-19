import axios from 'axios'
import {message} from 'antd'
import NProgress from 'nprogress';
import store from '../redux/store';
import {createDeleteUserInfoAction} from '../redux/action_creators/login_action'
import 'nprogress/nprogress.css'
import qs from 'querystring'

const instance = axios.create({
    timeout: 4000,//配置超时时间
});

// 请求拦截器
instance.interceptors.request.use((config) =>{
    NProgress.start()
    const {method,data} = config
    // 若是post请求
    if(method.toLowerCase() === 'post') {
        // 若传递过来的参数是对象
        if(data instanceof Object){
            config.data = qs.stringify(data)
        }
    }
    return config
})

// 响应拦截器
instance.interceptors.response.use(
    (response)=>{
        NProgress.done()
        // 请求若成功，走这里
        return response.data;
    },
    (error) => {
        NProgress.done()
        if(error.response.status === 401) {
            message.error('身份校验失败，请重新登录',1)
            // this.props.deleteUserInfo()
            // 分发一个删除用户信息的action
            store.dispatch(createDeleteUserInfoAction())
        } else {// 请求若失败，走这里
            message.error(error.message,1)
        }
        // 中断Promise链
        return new Promise(()=>{})
    }
);

export default instance