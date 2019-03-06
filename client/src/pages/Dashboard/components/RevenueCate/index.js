import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Chart, Geom, Axis, Tooltip, Coord, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';
import ContainerTitle from '../../../../components/ContainerTitle';

export default class RevenueCate extends Component {
  state={
    Data:undefined
  }
  componentWillReceiveProps(props){
    this.setState({
      Data:props.data.categorySaleDate
    })
  }
  renderList(){
    const { DataView } = DataSet;
    const data = [
      {
        item: '服装',
        count: 60,
      },
      {
        item: '酒水',
        count: 30,
      },
      {
        item: '家居',
        count: 10,
      },
    ];
    const dv = new DataView();
    dv.source(this.state.Data).transform({
      type: 'percent',
      field: 'total',
      dimension: 'name',
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
    return<IceContainer style={{ padding: 0 }}>
    <ContainerTitle title="各分类销售数量" />
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
        color="name"
        tooltip={[
          'name*percent',
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
}
  render() {
    return (
      this.state.Data?this.renderList():"数据正在加载中..."
    );
  }
}
