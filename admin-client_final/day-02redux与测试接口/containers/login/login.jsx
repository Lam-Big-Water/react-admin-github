import React, { Component } from 'react'
import { Form, Icon, Input, Button,} from 'antd'
import { connect } from 'react-redux'
import {createDemo1Action,createDemo2Action} from '../../redux/action_creators/test_action'
import './css/login.less'
import logo from './imgs/logo2.png'
const {Item} = Form // 不能写在import之前


class Login extends Component {
    componentDidMount(){
        console.log(this.props.test);
    }

    // 点击登录按钮的回调
    handleSubmit = (event) =>{
        event.preventDefault();//阻止默认事件--禁止form表单提交--通过ajax发送
        this.props.form.validateFields((err, values) => {
            if(!err){
                alert('向服务器发送登录请求')
            }
        });
    }
    // 密码的验证器
    validatePwd = (rule, value, callback) =>{
        if(!value) {
            callback('密码必须输入')
            } else if (value.length<4) {
            callback('密码长度不能小于4位')
            } else if (value.length>12) {
            callback('密码长度不能大于12位')
            } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback('密码必须是英文、数字或下划线组成')
            } else {
            callback() // 验证通过
            }
          // callback('xxxx') // 验证失败, 并指定提示的文本
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='login'>
                <header>
                    <img src={logo} alt="logo" />
                    <h1>商品管理系统{this.props.test}</h1>
                </header>
                    <section>
                        <h1>用户登录</h1>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Item>
                                {
                                    /*
                                用户名/密码的的合法性要求
                                    1). 必须输入
                                    2). 必须大于等于4位
                                    3). 必须小于等于12位
                                    4). 必须是英文、数字或下划线组成
                                */
                                }
                                {getFieldDecorator('username', { // 配置对象: 属性名是特定的一些名称
                                // 声明式验证: 直接使用别人定义好的验证规则进行验证
                                rules: [
                                    { required: true, whitespace: true, message: '用户名必须输入' },
                                    { min: 4, message: '用户名至少4位' },
                                    { max: 12, message: '用户名最多12位' },
                                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
                                        ],
                                    })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="用户名"
                                    />
                                )}
                            </Item>
                            <Item>
                            {
                                getFieldDecorator('password', {
                                rules: [
                                    {
                                    validator: this.validatePwd
                                    }
                                ]
                                })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="密码"
                                />
                                )
                            }
                        </Item>
                        <Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登陆
                        </Button>
                        </Item>
                        </Form>
                </section>
            </div>
        )
    }
}

export default connect(
    state => ({test:state.test}),
    {
        demo1:createDemo1Action,
        demo2:createDemo2Action
    }
)(Form.create()(Login))