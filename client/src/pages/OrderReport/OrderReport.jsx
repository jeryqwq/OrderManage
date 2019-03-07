import React, { Component } from 'react';
import PageHead from '../../components/PageHead';
import Overview from '../../components/Overview';
import OrderStatusChart from './components/OrderStatusChart';
import DashBoard from './../../Controller/DashBoard'
export default class OrderReport extends Component {
  state={
    data:undefined
  }
  componentDidMount(){
    this.getData()
  }
  getData(){
    DashBoard.orderInfos().then((res)=>{
      this.setState({
      data:res.data
      })
    })
  }
  render() {
    return (
     this.state.data? <div>
     <PageHead title="订单报表" />
     <Overview data={this.state.data.orderNum} col="6" />
     <OrderStatusChart data={this.state.everyMonth} />
   </div>:"拼命加载中......"
    );
  }
}
