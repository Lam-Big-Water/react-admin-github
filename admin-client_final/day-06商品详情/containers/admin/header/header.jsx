import React, { Component } from 'react'
import {Icon,Button,Modal} from 'antd'
import {withRouter} from 'react-router-dom'
import screenfull from 'screenfull/dist/screenfull';
import {connect} from 'react-redux'
import dayjs from 'dayjs';
import {createDeleteUserInfoAction} from '../../../redux/action_creators/login_action'
import menu_List from '../../../config/menu_config'
import {reqWeather} from '../../../api'
import './header.less'
const { confirm } = Modal;

class Header extends Component {

    state = {
        isFull: false,
        date:dayjs().format('YYYY年 MM月 DD日 HH:mm:ss'),
        weatherInfo:{},
        title: ''
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
        // 请求天气数据
        this.getWether()
        // 展示当前菜单名称
        this.getTitle()
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
    
    getTitle = ()=>{
        let {pathname} = this.props.location
        let pathKey = pathname.split('/').pop()
        if(pathname.indexOf('product') !== -1) pathKey = 'product'
        console.log(pathKey)
        let title = ''
        menu_List.forEach((item)=>{
            if(item.children instanceof Array){
                let tmp = item.children.find((citem)=>{
                    return citem.key === pathKey
                })
                if(tmp) title = tmp.title
            }else{
                if(pathKey === item.key) title = item.title
            }
        })
        this.setState({title})
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
                    {this.props.title || this.state.title}
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
    state => ({userInfo:state.userInfo,title:state.title}),
    {
        deleteUser:createDeleteUserInfoAction
    }
)(withRouter(Header))