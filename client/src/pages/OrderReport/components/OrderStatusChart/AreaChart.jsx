import React, { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import { DataSet } from '@antv/data-set';
import DashBoard from './../../../../Controller/DashBoard'
export default class AreaChart extends Component {
  state={
    data:undefined
  }
  componentDidMount(){
    DashBoard.orderInfos().then((res)=>{
      this.setState({
        data:res.data.everyMonth
      })
    })
  }
  renderMap(){
    const dv = new DataSet.View().source(this.state.data);
    dv.transform({
      type: 'fold',
      fields: ['A'],
      key: 'type',
      value: 'value',
    });

    const scale = {
      value: {
        alias: 'The Share Price in Dollars',
        formatter: (val) => {
          return `该月份订单量${val}`;
        },
      },
      year: {
        range: [0, 1],
      },
    };
    return  <Chart
    height={400}
    data={dv}
    padding={[40, 20, 40, 50]}
    scale={scale}
    forceFit
  >
    <Tooltip crosshairs />
    <Axis />
    <Legend />
    <Geom
      type="line"
      position="year*value"
      color="type"
      shape="smooth"
      size={2}
    />
  </Chart>
  }
  render() {

    
    return (
      this.state.data?this.renderMap():"正在拼命加载中"
    );
  }
}
