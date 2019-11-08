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
  InputNumber
} from 'antd';



import * as categoryProductManageService from '../../../services/categoryProductManage';

class EditProduct extends Component {

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

        values.productId = this.props.Product.product_Id;

        if(values.product_imgSrc !== undefined){
          values.product_imgSrc = values.product_imgSrc.replace(/(^\s*)|(\s*$)/g, "");
        }
        categoryProductManageService.editProduct(values).then( (res) => {
          if(res && res.code === 200){
            this.setState({visible: false});
            this.context.getProductCategoryList();
            return message.success("更新成功!");
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
    const { Product, Category } = this.props;

    return (
      <span>
        <a onClick = {this.showHandleVisible} href="javascript:void(0);" >编辑</a>
        <Drawer
            title="编辑商品"
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

                    <Input disabled value={Category.categoryTitle || ""} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="商品名称">
                    {getFieldDecorator('product_name', {
                      initialValue: Product.product_name,
                      rules: [{ required: true, message: '请输入商品名称！' }],
                    })(<Input placeholder="" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="官方价格">
                      {getFieldDecorator('official_price', {
                        initialValue: Product.official_price,
                        rules: [{ required: true, message: '请输入官方价格!' }],
                      })(<InputNumber min={0}  style={{width: "60%"}} />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="商品价格">
                      {getFieldDecorator('product_price', {
                        initialValue: Product.product_price,
                        rules: [{ required: true, message: '请输入商品价格！' }],
                      })(<InputNumber min={0}  style={{width: "60%"}} />)}
                    </Form.Item>
                  </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="商品上线价格">
                    {getFieldDecorator('product_online_price', {
                      initialValue: Product.product_online_price,
                      rules: [{ required: true, message: '请输入商品上线价格!' }],
                    })(<InputNumber min={0}  style={{width: "60%"}} />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="商品单位">
                    {getFieldDecorator('unit', {
                      initialValue: Product.unit,
                      rules: [{ required: true, message: '请输入商品单位!' }],
                    })(<Input placeholder="例如：元/杯、份"  style={{width: "60%"}} />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item label="商品图标地址">
                    {getFieldDecorator('product_imgSrc', {
                      initialValue: Product.product_imgSrc,
                      rules: [{ required: false, message: '请输入商品图标对应url！' }],
                    })(<Input placeholder="请输入产品图标对应url" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item label="使用提示">
                    {getFieldDecorator('remind', {
                      initialValue: Product.remind,
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
                  <Form.Item label="商品使用说明">
                    {getFieldDecorator('category_instructions', {
                      initialValue: Product.category_instructions,
                      rules: [
                        {
                          required: false,
                          message: '商品使用说明',
                        },
                      ],
                    })(<Input.TextArea rows={4} placeholder="" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item label="商品描述">
                    {getFieldDecorator('category_describe', {
                      initialValue: Product.category_describe,
                      rules: [
                        {
                          required: false,
                          message: '商品描述',
                        },
                      ],
                    })(<Input placeholder="" />)}
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
      </span>
    );
  }
}


EditProduct.contextTypes = {
  getProductCategoryList: PropTypes.func
}



export default Form.create()(EditProduct);
