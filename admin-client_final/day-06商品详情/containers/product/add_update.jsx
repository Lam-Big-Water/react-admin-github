import React, { Component } from 'react'
import { Button } from 'antd'
export default class AddUpdate extends Component {
    render() {
        return (
        <div>
            {this.props.match.params.id}
            <Button onClick={()=>{this.props.history.goBack()}}>返回</Button>
        </div>
        )
    }
}
