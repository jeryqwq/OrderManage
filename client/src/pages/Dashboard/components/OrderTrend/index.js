import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';
import ContainerTitle from '../../../../components/ContainerTitle';

export default class OrderTrend extends Component {
 state={
   Data:{},
   isData:true
 }
  componentWillReceiveProps(props){
    this.setState({
      Data:props.data.lastYearEveryMonth
    },()=>{
     this.setState({
      isData:true
     })
     console.log(this.state.Data)

    })
  }
  renderList(){
    let data=[]
    for (const key in this.state.Data) {
      let el=this.state.Data[key];
      let a={}
      a.value=el.s;
      a.year=el.mon;
      a.country="2018"
      data[key]=a;
    }
    const ds = new DataSet();
    const dv = ds
      .createView()
      .source(data)
      .transform({
        type: 'percent',
        field: 'value',
        dimension: 'country',
        groupBy: ['year'],
        as: 'percent',
      });
    const cols = {
      percent: {
        min: 0,

        formatter(val) {
          return `${val}`;
        },
      },
    };
    return <IceContainer style={{ padding: 0 }}>
    <ContainerTitle title="去年每销售额(排除无数据月份)" />
    <Chart
      height={300}
      data={dv}
      scale={cols}
      forceFit
      padding={[40, 40, 80, 80]}
    >
      <Legend />
      <Axis name="year" />
      <Axis name="percent" />
      <Tooltip />
      <Geom type="intervalStack" position="year*percent" color="country" />
    </Chart>
  </IceContainer>
  }
  render() {
    return (
     this.state.isData?this.renderList():undefined
    );
  }
}
