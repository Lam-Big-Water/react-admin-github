/* 
项目中所有请求由该文件发出
以后每当发请求之前，都要在该文件里添加一个真正发送请求的方法
*/
import myAxios from './myAxios';
import jsonp from 'jsonp';
import {message} from 'antd'
import { BASE_URL,WEATHER_KEY,CITY } from '../config';
// 登录请求
// axios的post请求默认将参数转成json进而发送给服务器，如果需要转换为urlencoded，可以使用querystring
export const reqLogin = (username,password)=>myAxios.post(`${BASE_URL}/login`,{username,password})
// 发起获取商品列表
export const reqCategoryList = ()=>myAxios.get(`${BASE_URL}/manage/category/list`)

// 获取天气信息
export const reqWeather = ()=>{
    return new Promise((resolve,reject)=>{
        jsonp(`http://restapi.amap.com/v3/weather/weatherInfo?key=${WEATHER_KEY}&city=${CITY}`,(err,data)=>{
        if(err) {
            message.error('请求错误')
            return new Promise(()=>{})
        }else{
            const {temperature,weather} = data.lives[0]
            let weatherObj = {temperature,weather}
            resolve(weatherObj)
        }
    })
    })
}

// 新增商品分类
export const reqAddCategory = ({categoryName})=>myAxios.post(`${BASE_URL}/manage/category/add`,{categoryName})

// 更新商品分类
export const reqUpdateCategory = ({categoryName,categoryId})=>myAxios.post(`${BASE_URL}/manage/category/update`,{categoryName,categoryId})







