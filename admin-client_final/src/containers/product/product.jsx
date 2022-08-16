import React, { Component } from 'react'
import { Card,Button,Icon,Select,Input,Table } from 'antd';
const { Option } = Select;

export default class Product extends Component {
    render() {
        const dataSource = [
            {
                key: '1',
                name: '大血蛤',
                desc: '海鲜',
                price: '10',
                status: '在售'
            },
            {
                key: '2',
                name: '丁螺',
                desc: '海鲜',
                price: '8',
                status: '在售'
            },
          ];
          
          const columns = [
            {
              title: '商品名称',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '商品描述',
              dataIndex: 'desc',
              key: 'desc',
            },
            {
              title: '价格',
              dataIndex: 'price',
              align: 'center',
              key: 'price',
              render: price=> '$' + price
            },
            {
                title: '状态',
                dataIndex: 'status',
                align: 'center',
                key: 'status',
                render: status=>{
                    return (
                        <div>
                            <Button type="primary">下架</Button><br/>
                            <span>{status}</span>
                        </div>
                    )
                }
              },
              {
                title: '操作',
                dataIndex: 'opera',
                align: 'center',
                key: 'opera',
                render: ()=>{
                    return (
                        <div>
                            <Button type="link">详情</Button><br/>
                            <Button type="link">修改</Button>
                        </div>
                    )
                }
              },
          ];
        return (
        <div>
            <Card 
            title={
                <div>
                    <Select defaultValue="name">
                        <Option value="name">按名称搜索</Option>
                        <Option value="decs">按描述搜索</Option>
                    </Select>
                    <Input
                    style={{margin:'0px 10px',width:'20%'}}
                    placeholder="请输入搜索关键字"
                    allowClear
                    />
                    <Button type='primary'><Icon type="search"/>搜索</Button>
                </div>
            } 
            extra={<Button type='primary'><Icon type="plus-circle"/>添加商品</Button>}
            >
                <Table 
                dataSource={dataSource} 
                columns={columns} 
                bordered
                />
            </Card>
        </div>
        )
    }
}
