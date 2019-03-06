import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Table } from '@alifd/next';
import ContainerTitle from '../../../../components/ContainerTitle';
import moment from 'moment'
// Random Numbers
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const IMAGES = [
  'https://img.alicdn.com/tfs/TB10QvzDhjaK1RjSZKzXXXVwXXa-80-80.png',
  'https://img.alicdn.com/tfs/TB1YK97DlLoK1RjSZFuXXXn0XXa-80-80.png',
  'https://img.alicdn.com/tfs/TB1sFHcDmzqK1RjSZFpXXakSXXa-80-80.png',
  'https://img.alicdn.com/tfs/TB19c_XDmzqK1RjSZFjXXblCFXa-80-80.png',
];

// MOCK 数据，实际业务按需进行替换
const getData = (data) => {
  return data.map((item, index) => {
    return {
      id: item.id,
      productImage: item.product_image,
      productName: item.product_name,
      productId: item.user_id,
      productNum: item.quantity,
      productAmount:item.total_price,
      productTime:moment(item.create_time).format("YYYY-MM-DD HH-mm-ss"),
      productStatus: ['已完成', '未付款','未付款','已付款','已发货','交易完成'][item.status/10],
    };
  });
}; 


const STATUS = {
  已取消: '#ee706d',
  未付款: '#ee706d',
  未付款:'#ee706d',
  已付款:'#ee706d',
  已发货:'#ee706d',
  交易完成:'#447eff',
};

export default class OrderTrend extends Component {
  state={
    Data:{},
    isData:false
  }
  componentWillReceiveProps(props){
    this.setState({
      Data:props.data.newOrder,
      isData:true
    })
  }
 
  renderProductImage = (image) => {
    return <img src={image} alt="" style={{ maxWidth: '48px' }} />;
  };

  renderProductStatus = (status) => {
    return (
      <div style={styles.status}>
        <span style={{ ...styles.dot, background: STATUS[status] }} />
        {status}
      </div>
    );
  };

  renderList(){
    const dataSource = getData(this.state.Data);
return <IceContainer style={{ padding: 0 }}>
<ContainerTitle title="最近的订单" />
<Table dataSource={dataSource} hasBorder={false}>
  <Table.Column title="产品id" dataIndex="id" />
  <Table.Column
    title="产品图片"
    dataIndex="productImage"
    cell={this.renderProductImage}
  />
  <Table.Column title="产品名称" dataIndex="productName" />
  <Table.Column title="用户ID" dataIndex="productId" />
  <Table.Column title="订单数量" dataIndex="productNum" />
  <Table.Column title="订单金额" dataIndex="productAmount" />
  <Table.Column title="订单时间" dataIndex="productTime" />
  <Table.Column
    title="订单状态"
    dataIndex="productStatus"
    cell={this.renderProductStatus}
  />
</Table>
</IceContainer>
  }
  render() {
    return (
      this.state.isData?this.renderList():"数据拼命加载中"
    );
  }
}

const styles = {
  status: {
    position: 'relative',
    paddingLeft: '20px',
  },
  dot: {
    width: '10px',
    height: '10px',
    position: 'absolute',
    left: '0',
    top: '2px',
    borderRadius: '50%',
  },
};
