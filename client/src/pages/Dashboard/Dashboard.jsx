import React, { Component } from 'react';
import { Grid } from '@alifd/next';
import PageHead from '../../components/PageHead';
import SalesChart from './components/SalesChart';
import OrderTrend from './components/OrderTrend';
import OrderCate from './components/OrderCate';
import CustomerTrend from './components/CustomerTrend';
import RecentOrders from './components/RecentOrders';
import TopOrders from './components/TopOrders';
import TotalRevenue from './components/TotalRevenue';
import RevenueCate from './components/RevenueCate';
import DashBoard from './../../Controller/DashBoard'
const { Row, Col } = Grid;

export default class Dashboard extends Component {
  constructor(){
    super();
    this.state={
      Data:{}
    }
  }
  componentDidMount(){
    DashBoard.dashboard().then((res)=>{
      this.setState({
        Data:res.data
      })
    })
  }

  render() {
    return (
      <div>
        <PageHead title="工作台" />
        <SalesChart data={this.state.Data}/>
        <Row gutter="20" wrap>
          <Col l="12">
            <OrderTrend  data={this.state.Data}/>
          </Col>
          <Col l="6">
            <OrderCate data={this.state.Data}/>
          </Col>
          <Col l="6">
            <CustomerTrend  data={this.state.Data}/>
          </Col>
          <Col l="16">
            <RecentOrders  data={this.state.Data}/>
          </Col>
          <Col l="8">
            <TopOrders  data={this.state.Data}/>
          </Col>
          <Col l="16">
            <TotalRevenue data={this.state.Data}/>
          </Col>
          <Col l="8">
            <RevenueCate data={this.state.Data}/>
          </Col>
        </Row>
      </div>
    );
  }
}
