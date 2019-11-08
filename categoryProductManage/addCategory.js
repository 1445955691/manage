import React, {
  Component,
} from 'react';

import PropTypes from 'prop-types';

import {
  Button,
  Drawer,
  Form,
  Col,
  Row,
  Input,
  message,

} from 'antd';



import * as categoryProductManageService from '../../services/categoryProductManage';

class AddCategory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      newKey: 1
    };
  };



  addHandle = () => {

    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.is_delete = 0;
        values.is_online = 0;
        if(values.imgSrc !== undefined){
          values.imgSrc = values.imgSrc.replace(/(^\s*)|(\s*$)/g, "");
        }
        categoryProductManageService.createCategory(values).then( (res) => {
          if(res && res.code === 200){
            this.setState({visible: false});
            this.context.getProductCategoryList();
            return message.success("添加成功!");
          }
        })
      }
    })
  }

  showHandleVisible = () => {
    this.setState({
      visible: true,
      newKey: this.state.newKey + 1
    })
  }

  handleVisible = () =>{
    this.setState({
      visible: false
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Button type="primary" onClick = {this.showHandleVisible} style={{marginBottom: "12px"}}>新增产品</Button>
        <Drawer
            title="新增产品"
            width={580}
            placement="right"
            onClose={this.handleVisible}
            maskClosable={true}
            visible={this.state.visible}
            destroyOnClose={true}
            style={{
              height: 'calc(100% - 55px)',
              overflow: 'auto',
              paddingBottom: 53,
            }}
          >
            <Form layout="vertical" >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="产品名称">
                    {getFieldDecorator('categoryTitle', {

                      rules: [{ required: true, message: '请输入产品名称！' }],
                    })(<Input placeholder="" />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="产品类型">
                    {getFieldDecorator('categoryTagName', {

                      rules: [{ required: true, message: '请输入产品类型！' }],
                    })(<Input placeholder="" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item label="产品图标地址">
                    {getFieldDecorator('imgSrc', {

                      rules: [{ required: false, message: '请输入产品图标对应url！' }],
                    })(<Input placeholder="请输入产品图标对应url" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item label="使用提示">
                    {getFieldDecorator('remind', {
                      rules: [
                        {
                          required: false,
                          message: '使用提示',
                        },
                      ],
                    })(<Input  placeholder="" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item label="产品使用说明">
                    {getFieldDecorator('category_instructions', {
                      rules: [
                        {
                          required: false,
                          message: '产品使用说明',
                        },
                      ],
                    })(<Input.TextArea rows={8} placeholder="" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item label="产品描述">
                    {getFieldDecorator('category_describe', {
                      rules: [
                        {
                          required: false,
                          message: '产品描述',
                        },
                      ],
                    })(<Input.TextArea rows={4} placeholder="" />)}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                borderTop: '1px solid #e8e8e8',
                padding: '10px 16px',
                textAlign: 'right',
                left: 0,
                background: '#fff',
                borderRadius: '0 0 4px 4px',
              }}
            >
              <Button
                style={{
                  marginRight: 8,
                }}
                onClick={this.handleVisible}
              >
                取消
              </Button>
              <Button onClick={this.addHandle} type="primary">提交</Button>
            </div>
          </Drawer>
      </div>
    );
  }
}


AddCategory.contextTypes = {
  getProductCategoryList: PropTypes.func
}



export default Form.create()(AddCategory);
