import React, { Component } from 'react';
import { Table, Pagination, Button, Dialog } from '@alifd/next';
import IceContainer from '@icedesign/container';
import Overview from '../Overview';
import UserAjax from './../../../../Controller/UserController'
// Random Numbers
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// MOCK 数据，实际业务按需进行替换

const getOverviewData = () => {
  return [
    {
      title: '发货单数',
      value: random(1000, 3000),
      background: '#58ca9a',
    },
    {
      title: '发货商品数',
      value: random(3000, 6000),
      background: '#f7da47',
    },
    {
      title: '总金额',
      value: `￥ ${random(5000, 10000)}`,
      background: '#ee706d',
    },
  ];
};


export default class ReserveTable extends Component {
  state = {
    current: 1,
    isLoading: false,
    data: [],
    isLoading: true,
    data: undefined,
    pageSize:8,
    total:0,
    overviewData: getOverviewData(),
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
  
  handleDelete(val) {
    console.log(val)
    Dialog.confirm({
      title: '提示',
      content: '确认删除吗',
      onOk: () => {
        this.fetchData(10);
      },
    });
  };
  handleDetail = () => {
    Dialog.confirm({
      title: '提示',
      content: '暂不支持查看详情',
    });
  };

  renderOper =val => {
    return (
      <div>
        <Button
          type="primary"
          style={{ marginRight: '5px' }}
          onClick={()=>{
            console.log(val)
          }}
        >
          详情
        </Button>
        <Button type="normal" warning onClick={()=>{
          this.handleDelete(val)
        }}>
          删除
        </Button>
      </div>
    );
  };
  renderOrderTable(){
    const { isLoading, current } = this.state;
    const getTableData = () => {
      return this.state.data.map((item,index) => {
        return {
          orderNo:item.orderNo,
          payment: item.payment,
          paymentTime:item.paymentTime,
          paymentTypeDesc:item.paymentTypeDesc,
          receiverProvince: item.shippingVo==undefined?"用户已删除":item.shippingVo.receiverProvince,
          receiverAddress: item.shippingVo==undefined?"用户已删除":item.shippingVo.receiverAddress,
          orderItemVoList: item.orderItemVoList.length,
          statusDesc:item.statusDesc,
          receverName: item.statusDesc,
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
        <Table.Column
              title="操作"
              width={200}
              dataIndex="orderNo"
              cell={this.renderOper}
            />
          
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
    const { isLoading, data, current, overviewData } = this.state;

    return (
      <div style={styles.container}>
       <Overview data={overviewData} />
       {this.renderOrderTable()}
        {/* <Overview data={overviewData} />
        <IceContainer>
          <Table loading={isLoading} dataSource={data} hasBorder={false}>
            <Table.Column title="流水号" dataIndex="serialNumber" />
            <Table.Column title="订单号" dataIndex="orderNumber" />
            <Table.Column title="商品名称" dataIndex="name" />
            <Table.Column title="商品规格" dataIndex="spec" />
            <Table.Column title="发货时间" dataIndex="dispatchTime" />
            <Table.Column title="下单时间" dataIndex="orderTime" />
            <Table.Column title="订购数量" dataIndex="quantity" />
            <Table.Column title="已发货数量" dataIndex="delivery" />
            <Table.Column title="已发货商品金额" dataIndex="amount" />
            <Table.Column
              title="操作"
              width={200}
              dataIndex="oper"
              cell={this.renderOper}
            />
          </Table>
          <Pagination
            style={styles.pagination}
            current={current}
            onChange={this.handlePaginationChange}
          />
        </IceContainer> */}
      </div>
    );
  }
}

const styles = {
  pagination: {
    marginTop: '20px',
    textAlign: 'right',
  },
};
