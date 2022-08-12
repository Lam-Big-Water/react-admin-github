import myAxios from './myAxios';
// 登录请求
// axios的post请求默认将参数转成json进而发送给服务器，如果需要转换为urlencoded，可以使用querystring
export const reqLogin = (username,password)=>myAxios.post('http://localhost:3000/login',{username,password})








