import React, { Component } from 'react'
import { Redirect,Route,Switch } from 'react-router-dom';
import {createDeleteUserInfoAction} from '../../redux/action_creators/login_action'
import {Layout} from 'antd'
import { connect } from 'react-redux'
//import {reqCategoryList} from '../../api/index'
import Header from './header/header'
import './css/admin.less'
import Home from '../../components/home/home'
import Category from '../category/category'
import Product from '../product/product'
import User from '../user/user'
import Role from '../role/role'
import Bar from '../bar/bar'
import Line from '../line/line'
import Pie from '../pie/pie'
const { Footer, Sider, Content } = Layout;
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

    
    // 在render里，若想实现跳转，最后用<Redirect>
    render() {
        // 从redux中获取user和isLogin
        const {isLogin} = this.props.userInfo
        // 判断用户是否登录，若未登录跳转login页面
        if(!isLogin) return <Redirect to="/login" />
        else {
            console.log('登录了');
            return (
                <Layout className='admin'>
                <Sider className='sider'>Sider</Sider>
                    <Layout>
                        <Header className='header'>Header</Header>
                        <Content className='content'>
                            <Switch>
                            <Route path="/admin/home" component={Home}/>
                            <Route path="/admin/prod_about/category" component={Category}/>
                            <Route path="/admin/prod_about/product" component={Product}/>
                            <Route path="/admin/user" component={User}/>
                            <Route path="/admin/role" component={Role}/>
                            <Route path="/admin/charts/bar" component={Bar}/>
                            <Route path="/admin/charts/line" component={Line}/>
                            <Route path="/admin/charts/pie" component={Pie}/>
                            <Redirect to='/admin/home'/>
                            </Switch>
                        </Content>
                        <Footer className='footer'>推荐使用google，获取最佳用户体验</Footer>
                    </Layout>
                </Layout>
                
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