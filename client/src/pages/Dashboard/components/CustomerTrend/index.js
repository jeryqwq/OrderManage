import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';
import ContainerTitle from '../../../../components/ContainerTitle';

export default class OrderCate extends Component {
  state={
    Data:undefined
  }
  componentWillReceiveProps(props){
    this.setState({
      Data:props.data.monthSaleInfos
    })
  }
  renderList(){
   
    const cols = {
      num: {  alias: '订单数量' },
    };
    return  <IceContainer style={{ padding: 0 }}>
    <ContainerTitle title="订单变化趋势" />
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
        position="val*num"
        color="#447eff"
        shape="smooth"
      />
      <Geom
        type="line"
        position="val*num"
        color="#447eff"
        size={2}
        shape="smooth"
      />
    </Chart>
  </IceContainer>
  }
  render() {
  
   

    return (
    this.state.Data?this.renderList():"拼命加载中..."
    );
  }
}
