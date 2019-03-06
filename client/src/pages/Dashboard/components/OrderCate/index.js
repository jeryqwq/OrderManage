import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Chart, Geom, Axis, Tooltip, Coord, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';
import ContainerTitle from '../../../../components/ContainerTitle';

export default class OrderCate extends Component {  
  state={
    Data:0,
    isData:false
  }
  componentWillReceiveProps(props){
    this.setState({
      Data:props.data.aLiPayNum[0].val,
      isData:true
    })
  }
  renderList(){
    const { DataView } = DataSet;
    const data = [
      {
        item: '支付宝支付',
        count: this.state.Data,
      },
      {
        item: '微信支付',
        count:0,
      }
    ];
    const dv = new DataView();
    dv.source(data).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent',
    });
    const cols = {
      percent: {
        formatter: (val) => {
          val = `${val * 100}%`;
          return val;
        },
      },
    };
    return (
      <IceContainer style={{ padding: 0 }}>
    <ContainerTitle title="支付方式(目前只支持支付宝,后续支持更多支付方式)" />
    <Chart height={300} data={dv} scale={cols} padding={[40]} forceFit>
      <Coord type="theta" radius={0.75} innerRadius={0.6} />
      <Axis name="percent" />
      <Legend position="bottom" offsetY={-30} />
      <Tooltip
        showTitle={false}
        itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
      />

      <Geom
        type="intervalStack"
        position="percent"
        color="item"
        tooltip={[
          'item*percent',
          (item, percent) => {
            percent = `${percent * 100}%`;
            return {
              name: item,
              value: percent,
            };
          },
        ]}
        style={{
          lineWidth: 1,
          stroke: '#fff',
        }}
      />
    </Chart>
  </IceContainer>
    )
  }
  render() {
   

    return (
     this.state.isData?this.renderList():"数据加载中"
    );
  }
}
