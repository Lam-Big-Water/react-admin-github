import React, { Component } from 'react'
import {Icon,Button,Modal} from 'antd'
import screenfull from 'screenfull/dist/screenfull';
import {connect} from 'react-redux'
import dayjs from 'dayjs';
import {createDeleteUserInfoAction} from '../../../redux/action_creators/login_action'
import {reqWeather} from '../../../api'
import './header.less'
const { confirm } = Modal;

class Header extends Component {

    state = {
        isFull: false,
        date:dayjs().format('YYYY年 MM月 DD日 HH:mm:ss'),
        weatherInfo:{}
    }

    getWether = async()=>{
        let weather = await reqWeather()
        this.setState({weatherInfo:weather})
    }

    componentDidMount(){
        // 给screenfull绑定监听
        screenfull.on('change', () => {
            let isFull = !this.state.isFull
            this.setState({isFull})
        });
        this.timeID = setInterval(() => {
            this.setState({date:dayjs().format('YYYY年 MM月 DD日 HH:mm:ss')})
        }, 1000);
        this.getWether()
    }

    componentWillUnmount(){
        clearInterval(this.timeID)
    }

    // 切换全屏按钮的回调
    fullScreen = () =>{
        screenfull.toggle()
    }

    // 点击退出登录的回调
    logOut = ()=>{
        let {deleteUser} = this.props
        confirm({
            title: '确认退出？?',
            content: '若退出需要重新登录',
            cancelText: '取消',
            okText: '确认',
        onOk:() =>{
            deleteUser()
        },
        });
        // this.props.deleteUser()
        
    }
    
    render() {
        let {isFull,weatherInfo} = this.state
        let {user} = this.props.userInfo
        return (
        <header className='header'>
            <div className='header-top'>
                <Button size="small" onClick={this.fullScreen}>
                    <Icon type={isFull ? 'fullscreen-exit' : 'fullscreen' }/>
                </Button>
                <span className='username'>welcome,{user.username}</span>
                <Button type="link" size="small" onClick={this.logOut}>退出登录</Button>
            </div>
            <div className='header-bottom'>
                <div className='header-bottom-left'>
                    图
                </div>
                <div className='header-bottom-right'>
                    {this.state.date}
                    <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="天气信息" />
                    {weatherInfo.weather} 温度：{weatherInfo.temperature}
                </div>
            </div>
        </header>
        )
    }
}

export default connect(
    state => ({userInfo:state.userInfo}),
    {
        deleteUser:createDeleteUserInfoAction
    }
)(Header)