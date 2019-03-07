import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';
import ContainerTitle from '../../../../components/ContainerTitle';

export default class TotalRevenue extends Component {
  state={
    Data:undefined
  }
  componentWillReceiveProps(props){
    this.setState({
      Data:props.data.everyMonthSale
    })
  }
  renderList(){
 
    const cols = {
      amount: {  alias: '总营收' },
    };
    return  <IceContainer style={{ padding: 0 }}>
    <ContainerTitle title="历史总营收" />
    <Chart
      height={300}
      forceFit
      padding={[60, 40]}
      data={this.state.Data}
      scale={cols}
    >
      <Tooltip
        crosshairs={{
          type: 'y',
        }}
      />
      <Axis />
      <Geom
        type="area"
        position="month*amount"
        color="#447eff"
        shape="smooth"
      />
      <Geom
        type="line"
        position="month*amount"
        color="#447eff"
        size={2}
        shape="smooth"
      />
    </Chart>
  </IceContainer>
  }
  render() {
   
    return (
     this.state.Data?this.renderList():"数据加载中。。。"
    );
  }
}
