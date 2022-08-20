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

// 请求商品分页列表
export const reqProductList = (pageNum,pageSize)=>myAxios.get(`${BASE_URL}/manage/product/list`,{params:{pageNum,pageSize}})

// 请求更新商品状态
export const reqUpdateProdStatus = (productId,status)=>myAxios.post(`${BASE_URL}/manage/product/updateStatus`,{productId,status})

// 搜索商品
export const reqSearchProduct = (pageNum,pageSize,searchType,keyWord)=>myAxios.get(`${BASE_URL}/manage/product/search`,{params:{pageNum,pageSize,[searchType]:keyWord}})

// 按id获取商品信息
export const reqProdById = (productId)=>myAxios.get(`${BASE_URL}/manage/category/info`,{params:{productId}})

// 请求删除图片 （根据图片唯一名字删除）
export const reqDeletePicture = (name)=>myAxios.post(`${BASE_URL}/manage/img/delete`,{name})

// 请求添加商品
export const reqAddProduct = (productObj)=>myAxios.post(`${BASE_URL}/manage/product/add`,{...productObj})

// 请求更新商品
export const reqUpdateProduct = (productObj)=>myAxios.post(`${BASE_URL}/manage/product/update`,{...productObj})

// 请求所有角色列表
export const reqRoleList = ()=> myAxios.get(`${BASE_URL}/manage/role/list`)

//添加角色
export const reqAddRole = ({roleName}) => myAxios.post(`${BASE_URL}/manage/role/add`, {roleName});

//  请求给角色授权
export const reqAuthRole = (roleObj) => myAxios.post(`${BASE_URL}/manage/role/update`, {...roleObj,auth_time:Date.now()});

// 请求获取所有用户列表 （同时携带着角色列表）
export const reqUserList = ()=> myAxios.get(`${BASE_URL}/manage/user/list`)

// 请求新增用户
export const reqAddUser = (userObj) => myAxios.post(`${BASE_URL}/manage/user/add`, {...userObj});
