
import React,{Component} from 'react';
import { Upload, Icon, Modal,message } from 'antd';
import {reqDeletePicture} from '../../api'
// import {BASE_URL} from '../../config'

// 将图片变成base64编码形式
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default class PicturesWall extends Component {
    state = {
    previewVisible: false,//是否展示预览窗口
    previewImage: '',//要预览的图片的URL地址或base64编码
    fileList: [], //收集图片集合
    };
    // 从fileList提取出所有该商品对应的图片名字，构建一个数组，供新增商品使用
    getImgArr = ()=>{
        let result = []
        this.state.fileList.forEach((item)=>{
            result.push(item.name)
        })
        return result
    }
    // 关闭预览窗口
    handleCancel = () => this.setState({ previewVisible: false });
    // 展示预览窗口
    handlePreview = async file => {
        // 如果图片没有url也没有转换过base64，那么调用下面的方法把图片转成base64
        if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
        previewImage: file.url || file.preview,
        previewVisible: true,
        });
    };
    // 当图片状态发生改变的回调
    handleChange = async({ file,fileList }) => {
        if(file.status === 'done'){
            console.log(file.response.data.url);
            fileList[fileList.length-1].url = file.response.data.url
            fileList[fileList.length-1].name = file.response.data.name
        }
        if(file.status === 'removed'){
            let result = await reqDeletePicture(file.name)
            const {status,msg} = result
            if(status === 0) message.success('删除成功')
            else message.error(msg)
        }

        this.setState({ fileList });
    }

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
        <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
        </div>
        );
        return (
        <div className="clearfix">
            <Upload
            // 发生上传请求的地址
            action={'/manage/img/upload'}
            method="post"
            name="image"
            // 照片墙的展示方式
            listType="picture-card"
            // 图片列表，一个数组里面包含着多个图片对象{uid，name，status，url}
            fileList={fileList}
            // 点击预览按钮的回调
            onPreview={this.handlePreview}
            // 图片状态改变的回调（图片上传中，图片被删除，图片成功上传）
            onChange={this.handleChange}
            >
            {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </div>
        );
    }
}

