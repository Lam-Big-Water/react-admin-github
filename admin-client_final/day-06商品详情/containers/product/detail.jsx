import React, { Component } from 'react'
import { Card,Button,Icon,List } from 'antd'
import { connect } from 'react-redux'
import './detail.less'
import pic from './upload/pro1.webp'
import {reqProdById} from '../../api'
const {Item} = List

class Detail extends Component {

    state = {
        categoryId: '',
        desc: '',
        detail: '',
        imgs: [],
        name: '',
        price: ''
    }

    componentDidMount(){
        const {id} = this.props.match.params
        console.log(id)
        const reduxProdList = this.props.productList
        if(reduxProdList.length !== 0){
            let result = reduxProdList.find((item)=>{
                return item._id === id
            })
            if(result){
                console.log(result)
                const {categoryId,desc,detail,imgs,name,price} = result
                this.setState({categoryId,desc,detail,imgs,name,price})
            }
        }
        else this.getProdById(id)
    }

    getProdById = async(id)=>{
        let result = await reqProdById(id)
        console.log(result)
        // const {status,data,msg} = result
        // if(status === 0) {
        //     const {categoryId,desc,detail,imgs,name,price} = data
        //     this.setState({categoryId,desc,detail,imgs,name,price})
        // }
    }

    render() {
        return (
        <div>
            <Card title={
                <div className='left-top'>
                    <Button type="link" size="small" onClick={()=>{this.props.history.goBack()}}>
                        <Icon type="left-circle" style={{fontSize:'20px'}}/>
                        <span>商品详情</span>
                    </Button>
                </div>
            }>
                <List>
                    <Item>
                        <span className='prod-name'>商品名称</span>
                        <span>{this.state.name}</span>
                    </Item>
                    <Item>
                        <span className='prod-name'>商品描述</span>
                        <span>{this.state.desc}</span>
                    </Item>
                    <Item>
                        <span className='prod-name'>商品价格</span>
                        <span>{this.state.price}</span>
                    </Item>
                    <Item>
                        <span className='prod-name'>所属分类</span>
                        <span>{this.state.name}</span>
                    </Item>
                    <Item>
                        <span className='prod-name'>商品图片</span>
                        {
                            this.state.imgs.map((item,index)=>{
                                return <img key={index} src={pic} alt="商品图片"/>
                            })
                        }
                    </Item>
                    <Item>
                        <span className='prod-name'>商品详情</span>
                        <span dangerouslySetInnerHTML={{__html:this.state.detail}}></span>
                    </Item>
                </List>
            </Card>
        </div>
        )
    }
}


export default connect(
    state => ({productList:state.productList})
)(Detail)