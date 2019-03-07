import React, { Component } from 'react';
import { Grid, Icon } from '@alifd/next';
import IceContainer from '@icedesign/container';
import AreaChart from './AreaChart';
import OrderTable from './OrderTable';


export default class OrderStatusChart extends Component {
 
  render() {
    return (
      <IceContainer title="订单概览">
        <AreaChart />
        <OrderTable />
      </IceContainer>
    );
  }
}

const styles = {
  box: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10px',
  },
  textLabel: {
    margin: 0,
    color: '#666',
  },
  counterNum: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px',
    fontSize: '30px',
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.85)',
  },
  arrowIcon: {
    marginLeft: '10px',
  },
  arrowUp: {
    color: '#ec3f16',
  },
  arrowDown: {
    color: 'green',
  },
};
