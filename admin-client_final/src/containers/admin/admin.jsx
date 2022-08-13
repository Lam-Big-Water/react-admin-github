import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import {createDeleteUserInfoAction} from '../../redux/action_creators/login_action'
import {reqCategoryList} from '../../api/index'
import { connect } from 'react-redux'
// import {createSaveUserInfoAction} from '../../redux/action_creators/login_action'


class Admin extends Component {
    componentDidMount(){
        console.log(this.props);
    }
    // 退出登录的回调
    logout = ()=>{
        // 触发redux删除所保存的用户信息
        this.props.deleteUserInfo()
    }

    demo = async()=>{
        let result = await reqCategoryList()
        console.log(result);
    }
    // 在render里，若想实现跳转，最后用<Redirect>
    render() {
        // 从redux中获取user和isLogin
        const {user,isLogin} = this.props.userInfo
        // 判断用户是否登录，若未登录跳转login页面
        if(!isLogin) return <Redirect to="/login" />
        else {
            console.log('登录了');
            return (
                <div>
                    <div>你的名字是：{user.username}</div>
                    <button onClick={this.logout}>退出</button>
                    <button onClick={this.demo}>测试获取商品列表</button>
                </div>
                
            )
        }
    }
}

// 如下代码中所有key是控制容器组件传递给UI组件的key
// 如下代码中所有value是控制容器组件传递给UI组件的value
export default connect(
    state => ({userInfo:state.userInfo}),
    {
        deleteUserInfo:createDeleteUserInfoAction
    }
)(Admin)