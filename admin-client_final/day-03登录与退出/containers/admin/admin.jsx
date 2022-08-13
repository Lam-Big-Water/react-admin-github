import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import {createDeleteUserInfoAction} from '../../redux/action_creators/login_action'
import { connect } from 'react-redux'
// import {createSaveUserInfoAction} from '../../redux/action_creators/login_action'


class Admin extends Component {
    componentDidMount(){
        console.log(this.props);
    }

    logout = ()=>{
        this.props.deleteUserInfo()
    }

    render() {
        const {user,isLogin} = this.props.userInfo
        if(!isLogin){
            console.log('没有登录');
            return <Redirect to="/login" />
        }else {
            console.log('登录了');
            return (
                <div>
                    <div>你的名字是：{user.username}</div>
                    <button onClick={this.logout}>退出</button>
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