/* 
项目中所有请求由该文件发出
以后每当发请求之前，都要在该文件里添加一个真正发送请求的方法
*/
import myAxios from './myAxios';
import { BASE_URL } from '../config';
// 登录请求
// axios的post请求默认将参数转成json进而发送给服务器，如果需要转换为urlencoded，可以使用querystring
export const reqLogin = (username,password)=>myAxios.post(`${BASE_URL}/login`,{username,password})








