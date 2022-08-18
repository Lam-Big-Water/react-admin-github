import React, {PureComponent} from 'react'
import {Card,Icon,Form,Input,Button,Select,message} from 'antd'
import {connect} from 'react-redux'
import {reqCategoryList} from '../../api'
import PicturesWall from './picture_wall'

const {Item} = Form
const { Option } = Select

/*
Product的添加和更新的子路由组件
 */
class ProductAddUpdate extends PureComponent {

    state = {
        categoryList:[]
    }

    pw = React.createRef()


    componentDidMount(){
        const {categoryList} = this.props
        if(categoryList.length)this.setState({categoryList})
        else{
            this.getCategoryList()
        }
    }

    getCategoryList = async()=>{
        let result = await reqCategoryList()
        const {status,data,msg} = result
        if(status === 0) this.setState({categoryList:data})
        else message.error(msg)
    }

    handleSubmit = (event)=>{
        event.preventDefault()
        // 从picture——wall组件中取已经上传的图片数组
        // console.log(this.pw.current.getImgArr())
        let imgs = this.pw.current.getImgArr()
        this.props.form.validateFields(async(err, values) =>{
            if(err) return
            console.log('对象',{...values,imgs});
        });
    }

    render() {
    const {getFieldDecorator} = this.props.form
    // 创建用来保存ref标识的标签对象的容器
    
    
    return (
        <Card
        title = {
            <span>
            <Button onClick={() => this.props.history.goBack()}>
                <Icon type='arrow-left' style={{fontSize: 20}}/>
            </Button>
            <span>{}</span>
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
            initialValue: '',
            rules: [
                {required: true, message: '必须输入商品名称'}
            ]
            })(<Input placeholder='请输入商品名称'/>)
            }
            </Item>
            <Item label="商品描述">
                {
                getFieldDecorator('desc', {
                    initialValue: '',
                    rules: [
                    {required: true, message: '必须输入商品描述'}
                    ]
                })(<Input placeholder="请输入商品描述" autosize={{ minRows: 2, maxRows: 6 }} />)
                }

            </Item>
            <Item label="商品价格">

                {
                getFieldDecorator('price', {
                    initialValue: '',
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
                    initialValue: '',
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
            <Item label="商品图片" wrapperCol={{md:12}}>
            <PicturesWall ref={this.pw}/>
            </Item>
            <Item label="商品详情">
            此处为富文本编辑器
            </Item>
            <Button type='primary' htmlType='submit'>提交</Button>
        </Form>
        </Card>
        )
    }
}

export default connect(
    state =>({categoryList:state.categoryList}),
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