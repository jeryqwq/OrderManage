import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Table } from '@alifd/next';
import ContainerTitle from '../../../../components/ContainerTitle';

// Random Numbers
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// MOCK 数据，实际业务按需进行替换
const getData = (Data) => {
  return Data.map((item,index) => {
    return {
      name: item.name,
      num:item.num,
      amount:item.cateName,
    };
  });
};

export default class TopOrders extends Component {
  state={
    Data:{},
    isData:false
  }
  componentWillReceiveProps(props){
    
    this.setState({
      Data:props.data.historyTop9,
      isData:true
    })
  }
  renderList(){
    const dataSource = getData(this.state.Data);
    return  <IceContainer style={{ padding: 0 }}>
    <ContainerTitle title="热销单品榜" />
    <Table dataSource={dataSource} hasBorder={false}>
      <Table.Column title="商品名称" dataIndex="name" />
      <Table.Column title="销量" dataIndex="num" />
      <Table.Column title="所属分类" dataIndex="amount" />
    </Table>
    </IceContainer>
  }
  render() {
    return (
     this.state.isData?this.renderList():"数据拼命加载中....."
    );
  }
}
