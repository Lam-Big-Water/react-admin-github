import React, { Component } from 'react'
import { Card,Button,Icon,List,message } from 'antd'
import { connect } from 'react-redux'
import './detail.less'
import pic from './upload/pro1.webp'
import {reqProdById,reqCategoryList} from '../../api'
const {Item} = List

class Detail extends Component {

    state = {
        categoryId: '',
        categoryName: '',
        desc: '',
        detail: '',
        imgs: [],
        name: '',
        price: '',
        isLoading: true
    }

    componentDidMount(){
        const {id} = this.props.match.params
        const reduxProdList = this.props.productList
        const reduxCateList = this.props.categoryList
        if(reduxProdList.length){
            let result = reduxProdList.find((item)=>item._id === id)
            if(result) {
                this.categoryId = result.pCategoryId

                this.setState({...result})
            }
        }
        else this.getProdById(id)
        if(reduxCateList.length){
            let result = reduxCateList.find((item)=>{
                return item._id === this.categoryId
            })
            console.log(result)
            this.setState({categoryName:result.name,isLoading:false})
        }
        else this.getCategoryList()
    }

    getProdById = async(id)=>{
        let result = await reqProdById(id)
        console.log(result)
        const {status,data,msg} = result
        if(status === 0) {
            this.categoryId = data.pCategoryId
            this.setState({...data})
        }
        else message.error(msg)
    }
    getCategoryList = async()=>{
        let result = await reqCategoryList()
        const {status,data,msg} = result
        if(status === 0){
            let result = data.find((item)=>{
                return item._id === this.categoryId
            })
            if(result) this.setState({categoryName:result.name,isLoading:false})
        }
        else message.error(msg)
    }
    render() {
        return (
        <div>
            <Card 
            title={
                <div className='left-top'>
                    <Button type="link" size="small" onClick={()=>{this.props.history.goBack()}}>
                        <Icon type="left-circle" style={{fontSize:'20px'}}/>
                        <span>商品详情</span>
                    </Button>
                </div>
            }
            loading={this.state.isLoading}
            >
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
                        <span>{this.state.categoryName}</span>
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
    state => ({productList:state.productList,categoryList:state.categoryList})
)(Detail)