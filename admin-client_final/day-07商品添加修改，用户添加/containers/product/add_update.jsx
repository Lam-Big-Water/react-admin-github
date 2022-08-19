import React, {PureComponent} from 'react'
import {Card,Icon,Form,Input,Button,Select,message} from 'antd'
import {connect} from 'react-redux'
import {reqCategoryList,reqAddProduct,reqProdById,reqUpdateProduct} from '../../api'
import PicturesWall from './picture_wall'
import RichTextEditor from './rich_text_editor'
const {Item} = Form
const { Option } = Select

/*
Product的添加和更新的子路由组件
 */
class ProductAddUpdate extends PureComponent {

    state = {
        categoryList:[],
        operaType: 'add',
        categoryId: '',
        name: '',
        desc: '',
        price: '',
        detail: '',
        imgs: [],
        _id: ''
    }

    pw = React.createRef()
    fw = React.createRef()


    componentDidMount(){
        const {categoryList,productList} = this.props
        const {id} = this.props.match.params
        if(categoryList.length)this.setState({categoryList})
        else this.getCategoryList()
        if(id) {
            this.setState({operaType:'update'})
            if(productList.length){
                let result = productList.find((item)=>{
                    return item._id === id
                })
                if(result) {
                    this.setState({...result})
                    this.pw.current.setFileList(result.imgs)
                    this.fw.current.setRichText(result.detail)
                }
            }
            else this.getProductList(id)
        }
    }

    getCategoryList = async()=>{
        let result = await reqCategoryList()
        const {status,data,msg} = result
        if(status === 0) this.setState({categoryList:data})
        else message.error(msg)
    }

    getProductList = async(id)=>{
        let result = await reqProdById(id)
        console.log(result)
        const {status,data} = result
        if(status === 0){
            this.setState({...data})
            this.pw.current.setFileList(data.imgs)
            this.fw.current.setRichText(data.detail)
        }
    }

    handleSubmit = (event)=>{
        event.preventDefault()
        // 从picture——wall组件中取已经上传的图片数组
        let imgs = this.pw.current.getImgArr()
        // 从富文本组件中获取用户输入的文字转换为富文本的字符串
        let detail = this.fw.current.getRichText()
        const {operaType,_id} = this.state
        this.props.form.validateFields(async(err, values) =>{
            if(err) return
            let result
            if(operaType === 'add'){
                result = await reqAddProduct({...values,imgs,detail})
            }else{
                return await reqUpdateProduct({...values,imgs,detail,_id})
            }
            const {status,msg} = result
            if(status === 0){
                message.success('操作成功')
                this.props.history.replace('/admin/prod_about/product')
            }
            else message.error(msg)
        });
    }

    render() {
    const {getFieldDecorator} = this.props.form
    const {operaType} = this.state
    // 创建用来保存ref标识的标签对象的容器
    
    
    return (
        <Card
        title = {
            <span>
            <Button onClick={() => this.props.history.goBack()}>
                <Icon type='arrow-left' style={{fontSize: 20}}/>
            </Button>
            <span>{operaType === 'update' ? '商品修改' : '商品添加'}</span>
            </span>
        }
        >
        <Form
        onSubmit={this.handleSubmit}
        labelCol={{md:2}}
        wrapperCol={{md:7}}
        >
            <Item label="商品名称">
        {
            getFieldDecorator('name', {
            initialValue:this.state.name ||  '',
            rules: [
                {required: true, message: '必须输入商品名称'}
            ]
            })(<Input placeholder='请输入商品名称'/>)
            }
            </Item>
            <Item label="商品描述">
                {
                getFieldDecorator('desc', {
                    initialValue: this.state.desc ||  '',
                    rules: [
                    {required: true, message: '必须输入商品描述'}
                    ]
                })(<Input placeholder="请输入商品描述" autosize={{ minRows: 2, maxRows: 6 }} />)
                }

            </Item>
            <Item label="商品价格">

                {
                getFieldDecorator('price', {
                    initialValue: this.state.price ||  '',
                    rules: [
                    {required: true, message: '必须输入商品价格'},
                    {validator: this.validatePrice}
                    ]
                })(<Input type='number' placeholder='请输入商品价格' addonAfter='元'/>)
                }
            </Item>
            <Item label="商品分类">
                {
                getFieldDecorator('categoryIds', {
                    initialValue: this.state.categoryId ||  '',
                    rules: [
                    {required: true, message: '必须指定商品分类'},
                    ]
                })(
                    <Select>
                        <Option value="">请选择分类</Option>
                        {
                            this.state.categoryList.map((item)=>{
                                return <Option key={item._id} value={item._id}>{item.name}</Option>
                            })
                        }
                    </Select>
                )
                }
            </Item>
            {/* <Item label="分类">
                {
                getFieldDecorator('pCategoryIds', {
                    initialValue: '',
                    rules: [
                    {required: true, message: '必须指定商品分类'},
                    ]
                })(
                    <Select>
                        <Option value="">请选择分类</Option>
                        {
                            this.state.categoryList.map((item)=>{
                                return <Option key={item.pCategoryId} value={item.pCategoryId}>{item.name}</Option>
                            })
                        }
                    </Select>
                )
                }
            </Item> */}
            <Item label="商品图片" wrapperCol={{md:12}}>
            <PicturesWall ref={this.pw}/>
            </Item>
            <Item label="商品详情" wrapperCol={{md:16}}>
            <RichTextEditor ref={this.fw}/>
            </Item>
            <Button type='primary' htmlType='submit'>提交</Button>
        </Form>
        </Card>
        )
    }
}

export default connect(
    state =>({categoryList:state.categoryList,productList:state.productList}),
        {

        }
    )(Form.create()(ProductAddUpdate))

/*
1. 子组件调用父组件的方法: 将父组件的方法以函数属性的形式传递给子组件, 子组件就可以调用
2. 父组件调用子组件的方法: 在父组件中通过ref得到子组件标签对象(也就是组件对象), 调用其方法
 */

/*
使用ref
1. 创建ref容器: thi.pw = React.createRef()
2. 将ref容器交给需要获取的标签元素: <PictureWall ref={this.pw} />
3. 通过ref容器读取标签元素: this.pw.current
 */