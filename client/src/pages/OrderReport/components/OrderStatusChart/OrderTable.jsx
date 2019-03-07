import React, { Component } from 'react';
import { Table, Pagination } from '@alifd/next';
import UserAjax from './../../../../Controller/UserController'


export default class OrderTable extends Component {
  state = {
    current: 1,
    isLoading: true,
    data: undefined,
    pageSize:8,
    total:0
  };

  componentDidMount() {
    this.getData()
  }

getData(){
  this.setState({
    isLoading: true
  })
  UserAjax.orderList(this.state.pageSize,this.state.current).then((res)=>{
    if(res.data.status===0){
      this.setState({
        data:res.data.data.list,
        isLoading:false,
        total:res.data.data.total
      })
    }
  })
}
 renderOrderTable(){
  const { isLoading, current } = this.state;
  const getTableData = () => {
    return this.state.data.map((item,index) => {
      return {
        orderNo:item.orderNo,
        payment: item.payment,
        paymentTime:item.paymentTime,
        paymentTypeDesc:item.paymentTypeDesc,
        receiverProvince: item.shippingVo==undefined?"用户已删除该地址信息":item.shippingVo.receiverProvince,
        receiverAddress: item.shippingVo==undefined?"用户已删除该地址信息":item.shippingVo.receiverAddress,
        orderItemVoList: item.orderItemVoList.length,
        statusDesc:item.statusDesc,
        receverName: item.statusDesc,
        amount: item.amount,
      };
    });
  };
  return (
    this.state.data?<div style={styles.container}>
    <Table loading={isLoading} dataSource={getTableData()} hasBorder={false}>
      <Table.Column title="流水号" dataIndex="orderNo" />
      <Table.Column title="订单金额" dataIndex="payment" />
      <Table.Column title="付款时间" dataIndex="paymentTime" />
      <Table.Column title="付款方式" dataIndex="paymentTypeDesc" />
      <Table.Column title="收货省市" dataIndex="receiverProvince" />
      <Table.Column title="收货地址" dataIndex="receiverAddress" />
      <Table.Column title="商品数量" dataIndex="orderItemVoList" />
      <Table.Column title="订单状态" dataIndex="statusDesc" />
      <Table.Column title="收货人姓名" dataIndex="receverName" />
    </Table>
    <Pagination
      style={styles.pagination}
      current={current}
      total={this.state.total}
      onChange={(val)=>{
          this.setState({
            current:val
          },()=>{
            this.getData()
          })
      }}
    />
  </div>:"数据拼命加载中..."
  )
 }
 

  render() {

    return (
      this.renderOrderTable()
    );
  }
}

const styles = {
  container: {
    marginTop: '20px',
  },
  pagination: {
    marginTop: '20px',
    textAlign: 'right',
  },
};
