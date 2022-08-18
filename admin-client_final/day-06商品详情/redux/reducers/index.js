import { combineReducers } from "redux";
import loginReducer from './login_recuder';
import menuReducer from './menu_recuder';
import productRecuder from './product_recuder'
// 整合所有reducer汇总所有状态
export default combineReducers({
    // 该对象里面的key决定着store里保存该状态的key
    // 该对象里的value决定着store里保存该状态的value
    userInfo:loginReducer,
    title:menuReducer,
    productList:productRecuder
})