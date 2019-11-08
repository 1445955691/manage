import React, {
  Component,
} from 'react';

import PropTypes from 'prop-types';

import {
  Table,
  Divider,
  Popconfirm,
  message
} from 'antd';

import AddProduct from './addProduct';
import EditProduct from './editProduct';

import * as categoryProductManageService from '../../../services/categoryProductManage';


class ProductManage extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };

    this.columns = [

      {
        title: '',
        dataIndex: 'logo',
        key: 'logo',
        render: ( text, record ) => (<img width={40} height={40} src={record.product_imgSrc}/>)
      },
      {
        title: '商品ID',
        dataIndex: 'product_Id',
        key: 'product_Id'
      },
      {
        title: '商品名称',
        dataIndex: 'product_name',
        key: 'product_name'
      },
      {
        title: '官方价格',
        dataIndex: 'official_price',
        key: 'official_price'
      },
      {
        title: '商品价格',
        dataIndex: 'product_price',
        key: 'product_price'
      },
      {
        title: '商品上线价格',
        dataIndex: 'product_online_price',
        key: 'product_online_price'
      },
      {
        title: '商品单位',
        dataIndex: 'unit',
        key: 'unit'
      },
      {
        title: '操作',
        key: 'Operation',
        width: '220px',
        render: (text, record) => (
          <span>
            <EditProduct Category={this.props.category}  Product={record}/>
            <Divider type="vertical" />
            <Popconfirm onConfirm={this.deleteProduct.bind( null, record.product_Id )} title = {`确认删除？`} >
              <a href="javascript:void(0);" >删除</a>
            </Popconfirm>
            <Divider type="vertical" />
            <Popconfirm onConfirm={this.setProductOnline.bind(null, record.product_Id, record.is_online === 1? 0: 1)} title = {`确认${record.is_online === 1? '取消商品上线' : '产品上线'} ？`} >
              {
                record.is_online === 1?
                <a href="javascript:void(0);" >取消商品上线</a>
                :
                <a href="javascript:void(0);" >商品上线</a>
              }
            </Popconfirm>
          </span>
        )
      }
    ];

  };



  deleteProduct = ( id ) =>{
    categoryProductManageService.deleteProductById(id).then((res) =>{

      if(res && res.code === 200){
        this.context.getProductCategoryList();
        return message.success("删除成功!");
      }
    })
  }

  setProductOnline = ( id, is_online) =>{
    categoryProductManageService.setProductOnline(id, is_online).then((res) =>{

      if(res && res.code === 200){
        this.context.getProductCategoryList();
        return message.success("操作成功!");
      }
    })
  }


  render() {

    return (
      <div style={{padding: '20px 0 50px 0'}}>
        <AddProduct  category={this.props.category}/>
        <Table
          columns={this.columns}
          dataSource={this.props.productList}
          rowKey={record => record.product_Id}
          pagination={false}
          size="middle"
        />
      </div>
    );
  }
}

ProductManage.contextTypes = {
  getProductCategoryList: PropTypes.func
}

export default ProductManage;
