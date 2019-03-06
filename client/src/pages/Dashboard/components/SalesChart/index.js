import React, { Component } from 'react';
import { Grid, Icon } from '@alifd/next';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

const { Row, Col } = Grid;

export default class SalesChart extends Component {
  constructor(props){
    super(props);
    this.state={
      Data : [],
  }
}
componentWillReceiveProps(props){
  console.log(props)
  let arr=[
      {
        title: '年度总收入',
        amount: props.data.toYearSum[0].val,
        percent: Math.abs(((props.data.toYearSum[0].val-props.data.lastSum[0].val))/props.data.lastSum[0].val).toFixed(2)*100+"%",
        increase: !(props.data.toYearSum[0].val-props.data.lastSum[0].val)>=0?true:false,
      },
      {
        title: '年度总订单',
        amount: props.data.toYearOrderNum[0].val,
        percent:Math.abs(((props.data.toYearOrderNum[0].val-props.data.lastYearOrderNum[0].val))/props.data.lastYearOrderNum[0].val).toFixed(2)*100+"%",
        increase: !(props.data.toYearOrderNum[0].val-props.data.lastYearOrderNum[0].val)>=0?true:false,
      },{
        title: '未付款订单',
        amount: props.data.toYearNoPayOrderNum[0].val,
        percent: Math.abs(((props.data.toYearNoPayOrderNum[0].val-props.data.lastYearNoPayOrderNum[0].val))/props.data.lastYearNoPayOrderNum[0].val).toFixed(2)*100+"%",
        increase: !(props.data.toYearNoPayOrderNum[0].val-props.data.lastYearNoPayOrderNum[0].val)>=0?true:false,
      },
      {
        title: '本月新增用户数',
        amount: props.data.toMonthNewUser[0].val,
        percent: "",
        increase:! true,
      },
    ]
    this.setState({
      Data:arr
    })
}

  render() {
   

    return (
      <Row wrap gutter={20} style={{ marginBottom: '20px' }}>
        {this.state.Data.map((item, index) => {
          return (
            <Col xxs="24" l="6" key={index}>
              <IceContainer className={styles.container}>
                <div className={styles.content}>
                  <p className={styles.title}>{item.title}</p>
                  <div className={styles.data}>
                    <h2 className={styles.amount}>{item.amount}</h2>
                    <div
                      className={styles.percent}
                      style={{
                        color: item.increase ? 'red' : 'green',
                      }}
                    >
                      {item.percent}{' '}
                      <Icon
                        type={`arrow-${item.increase ? 'up' : 'down'}-filling`}
                        size="xs"
                        className={styles.arrowIcon}
                      />
                    </div>
                  </div>
                </div>
              </IceContainer>
            </Col>
          );
        })}
      </Row>
    );
  }
}
