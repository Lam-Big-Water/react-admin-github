import React, { Component } from 'react'
import { Card,Button,Icon,Table,message,Modal,Form,Input} from 'antd';
import { reqCategoryList,reqAddCategory,reqUpdateCategory } from '../../api';
import { PAGE_SIZE } from '../../config';
const {Item} = Form;

class Category extends Component {
    

    state = {
        categoryList:[],//商品分类列表
        visible:false,//控制弹窗的展示或隐藏
        operType:'', //操作类型
        isLoading: true,//是否处于加载中
        modalCurrentValue: '',//弹窗显示的值--用于数据回显
        modalCurrentId: ''//
    }

    componentDidMount(){
        // 一上来，就请求商品分类列表
        this.getCategoryList()
    }

    // 获取商品分类列表
    getCategoryList = async()=>{
        let result = await reqCategoryList()
        this.setState({isLoading: false})
        const {status,data,msg} = result
        if(status === 0) this.setState({categoryList:data.reverse()})
        else message.error(msg,1)
    }
    
    // 展示弹窗--新增
    showAdd = () => {
        this.setState({
            operType:'add',
            modalCurrentValue: '',
            modalCurrentId: '',
            visible: true,
            });
        };
    // 展示弹窗--修改
    showUpdate = (item) => {
        const {_id,name} = item
        this.setState({
            modalCurrentValue:name,
            modalCurrentId:_id,
            operType:'update',
            visible: true,
            });
        };

        toAdd = async (values)=>{
            let result = await reqAddCategory(values)
            console.log(result)
            const {status,data,msg} = result
            if(status === 0){
                message.success('新增商品分类成功')
                let categoryList = [...this.state.categoryList]
                categoryList.unshift(data)
                this.setState({categoryList})
                this.setState({visible: false});//隐藏弹窗
                this.props.form.resetFields()//重置表单
            }
            if(status === 1) message.error(msg,1)
        }

        toUpdate = async (categoryObj)=>{
            let result = await reqUpdateCategory(categoryObj)
            const {status,msg} = result
            if(status === 0) {
                message.success('更新分类成功',1)
                this.getCategoryList()
                this.setState({visible: false});//隐藏弹窗
                this.props.form.resetFields()//重置表单
            }else{
                message.error(msg,1)
            }
        }

        // 点击弹窗ok的回调
        handleOk = () => {
            const {operType} = this.state

            this.props.form.validateFields(async(err, values) => {
                if(err) {
                    message.warning('表单输入有误，请检查',1)
                    return
                }
                if(operType === 'add') this.toAdd(values)
                if(operType === 'update') {
                    const categoryId = this.state.modalCurrentId
                    const categoryName = values.categoryName
                    const categoryObj = {categoryId,categoryName}
                    this.toUpdate(categoryObj)
                }
                
            });
        };
        // 点击弹窗cancel的回调
        handleCancel = () => {
            this.setState({
            visible: false,
            });
            this.props.form.resetFields()
        };

    render() {
        const dataSource = this.state.categoryList
        const { getFieldDecorator } = this.props.form;
        let {operType,visible} = this.state
            
            const columns = [
            {
                title: '分类名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '操作',
                // dataIndex: 'age',
                key: 'age',
                render: (item)=>{return <Button type='link' onClick={()=>{this.showUpdate(item)}}>修改分类</Button>},
                width: '25%',
                align: 'center'
            },
            ];
        return (
        <div>
            <Card 
            extra={<Button type='primary' onClick={this.showAdd}><Icon type="plus-circle"/>添加</Button>}
            >
                <Table dataSource={dataSource} 
                columns={columns} 
                bordered 
                rowKey="_id"
                pagination={{pageSize:PAGE_SIZE,showQuickJumper:true}}
                loading={this.state.isLoading}
                />
            </Card>
            <Modal
            title={operType === 'add' ? '新增分类' : '修改分类'}
            visible={visible}
            okText = '确定'
            cancelText = '取消'
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            >
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
                        {getFieldDecorator('categoryName', { // 配置对象: 属性名是特定的一些名称
                        // 声明式验证: 直接使用别人定义好的验证规则进行验证
                        initialValue:this.state.modalCurrentValue,
                        rules: [
                            { required: true, whitespace: true, message: '分类名必须输入' },
                                ],
                            })(
                            <Input
                                placeholder="请输入分类名"
                            />
                        )}
                    </Item>
                </Form>
            </Modal>
        </div>
        )
    }
}
export default Form.create()(Category)


