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

import AddCategory from './addCategory';
import EditCategory from './editCategory';
import ProductManage from './productManage/productManage';

import * as categoryProductManageService from '../../services/categoryProductManage';
import Utils from '../../utils/utils';


class CategoryManage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      productCategoryList: []
    };

    this.columns = [
      {
        title: '',
        dataIndex: 'logo',
        key: 'logo',
        render: ( text, record ) => (<img width={50} height={50} src={record.imgSrc}/>)
      },
      {
        title: '产品名称',
        dataIndex: 'categoryTitle',
        key: 'categoryTitle'
      },
      {
        title: '产品类型',
        dataIndex: 'categoryTagName',
        key: 'categoryTagName'
      },
      {
        title: '产品描述',
        dataIndex: 'category_describe',
        key: 'category_describe',
        render: ( text ) => Utils.strFilterNew(text, 30)
      },
      {
        title: '操作',
        key: 'Operation',
        width: '220px',
        render: (text, record) => (
          <span>
            <EditCategory  category={record}/>
            <Divider type="vertical" />
            <Popconfirm onConfirm={this.deleteCategory.bind( null, record.categoryId )} title = {`确认删除？`} >
              <a href="javascript:void(0);" >删除</a>
            </Popconfirm>
            <Divider type="vertical" />
            <Popconfirm onConfirm={this.setCategoryOnline.bind(null, record.categoryId, record.is_online === 1? 0: 1)} title = {`确认${record.is_online === 1? '取消产品上线' : '产品上线'} ？`} >
              {
                record.is_online === 1?
                <a href="javascript:void(0);" >取消产品上线</a>
                :
                <a href="javascript:void(0);" >产品上线</a>
              }
            </Popconfirm>
          </span>
        )
      },
    ];


  };

  getChildContext () {
    return {
      getProductCategoryList: this.getProductCategoryList,
    };
  }

  componentDidMount(){
    this.getProductCategoryList();
  }

  deleteCategory = ( id ) =>{
    categoryProductManageService.deleteCategoryById(id).then((res) =>{

      if(res && res.code === 200){
        this.getProductCategoryList();
        return message.success("删除成功!");
      }
    })
  }

  setCategoryOnline = ( id, is_online) =>{
    categoryProductManageService.setCategoryOnline(id, is_online).then((res) =>{

      if(res && res.code === 200){
        this.getProductCategoryList();
        return message.success("操作成功!");
      }
    })
  }


  //获取产品类别列表
  getProductCategoryList = () =>{

    this.setState({
      loading: true
    });
    categoryProductManageService.getProductCategoryList().then(( res ) => {
      this.setState({ loading: false });

      if( res && res.code === 200 ){
        this.setState({
          productCategoryList: res.data
        })
      }

    })
  }


  render() {

    return (
      <div>
        <AddCategory/>
        <Table
          columns={this.columns}
          dataSource={this.state.productCategoryList}
          expandedRowRender={record => (<ProductManage  productList={record.productList} category={record} />)}
          rowKey={record => record.categoryId}
          pagination={false}
          loading={this.state.loading}
          size="larger"
        />
      </div>
    );
  }
}

CategoryManage.childContextTypes = {
  getProductCategoryList: PropTypes.func
};

export default CategoryManage;
