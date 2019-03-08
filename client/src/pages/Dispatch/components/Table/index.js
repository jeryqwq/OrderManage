import React, { Component } from 'react';
import { Table, Pagination, Button, Dialog, Message } from '@alifd/next';
import IceContainer from '@icedesign/container';
import Overview from '../Overview';
import DashBoard from './../../../../Controller/DashBoard'
import UserAjax from './../../../../Controller/UserController'
// Random Numbers
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};


export default class ReserveTable extends Component {
  state = {
    current: 1,
    isLoading: false,
    data: [],
    isLoading: true,
    data: undefined,
    pageSize:8,
    total:0,
    overviewData:undefined,
    currentItem:undefined,
    visible:false,
  };

  componentDidMount() {
    this.getData();
  }
  getData(){
    this.setState({
      isLoading: true
    })
    DashBoard.getOrderDispatch().then((res)=>{
      console.log(res);
      this.setState({
        overviewData:res.data
      })
    })
    UserAjax.orderList(this.state.pageSize,this.state.current).then((res)=>{
      if(res.data.status===0){
        this.setState({
          data:res.data.data.list,
          isLoading:false,
          total:res.data.data.total
        })
      }
    })
  }
  setCurrentItem(orderNo){
    for (const key in this.state.data) {
      const el=this.state.data[key];
      if(el.orderNo===orderNo){
        this.setState({
          currentItem:el
        })
        return;
      }
    }
  }
  handleDispatch(val) {
    Dialog.confirm({
      title: '提示',
      content: '确认订单以及发货信息已处理完成?',
      onOk: () => {
       UserAjax.sendGood(val).then((res)=>{
         if(res.data.status===0){
           Message.success("操作成功！！");
           this.getData();
         }
       })

      },
    });
  };
  handleDetail = (val) => {
    this.setState({
      visible:true
    },()=>{
      this.setCurrentItem(val);
    })
  };

  renderOper =val => {
 
    return (
      <div>
        {
            this.state.data.map((item,index)=>
              <span key={index}>
                {
                  item.orderNo===val&&item.status===20?
                  <Button
                  type="primary"
                  style={{ marginRight: '5px' }}
                  onClick={()=>{
                    this.handleDispatch(val)
                  }}
                >
                发货
                </Button>:undefined
                }
              </span>
            )
        }
        
        <Button type="normal" warning onClick={()=>{
          this.handleDetail(val)
        }}>
          查看详情
        </Button>
      </div>
    );
  };
  renderOrderTable(){
    const { isLoading, current } = this.state;
    const getTableData = () => {
      return this.state.data.map((item,index) => {
        return {
          orderNo:item.orderNo,
          payment: item.payment,
          paymentTime:item.paymentTime,
          paymentTypeDesc:item.paymentTypeDesc,
          receiverZip: item.shippingVo==undefined?"用户已删除":item.shippingVo.receiverZip,
          receiverAddress: item.shippingVo==undefined?"用户已删除":item.shippingVo.receiverAddress,
          orderItemVoList: item.orderItemVoList.length,
          statusDesc:item.statusDesc,
          receverName: item.statusDesc,
        };
      });
    };
    return (
      this.state.data?<div style={styles.container}>
      <Table loading={isLoading} dataSource={getTableData()} hasBorder={false}>
        <Table.Column title="流水号" dataIndex="orderNo" />
        <Table.Column title="订单金额" dataIndex="payment" />
        <Table.Column title="付款时间" dataIndex="paymentTime" />
        <Table.Column title="付款方式" dataIndex="paymentTypeDesc" />
        <Table.Column title="邮政编码" dataIndex="receiverZip" />
        <Table.Column title="收货地址" dataIndex="receiverAddress" />
        <Table.Column title="商品数量" dataIndex="orderItemVoList" />
        <Table.Column title="订单状态" dataIndex="statusDesc" />
        <Table.Column title="收货人姓名" dataIndex="receverName" />
        <Table.Column
              title="操作"
              width={200}
              dataIndex="orderNo"
              cell={this.renderOper}
            />
          
      </Table>
      <Pagination
        style={styles.pagination}
        current={current}
        total={this.state.total}
        onChange={(val)=>{
            this.setState({
              current:val
            },()=>{
              this.getData()
            })
        }}
      />
          <Dialog title="订单详情"
                    visible={this.state.visible}
                    isFullScreen={false}
                    footerActions={["ok"]}
                    footerAlign={"right"}
                    onOk={()=>{this.setState({visible:false})}}
                    onCancel={()=>{this.setState({visible:false})}}
                    onClose={()=>{this.setState({visible:false})}}>
                    <div style={{width:1000,height:500,margin:'0 auto',position:'relative',overflowY:'scroll'}}>
                      {
                        this.state.currentItem?<div>
                          <div style={{position:'absolute',width:500,right:0}}>
                              {
                                this.state.currentItem?this.state.currentItem.orderItemVoList.map((item,index)=>
                                  <div key={index} style={{position:"relative"}}>
                                    <img src={item.productImage} style={{width:50,height:50}}/>
                                    <p style={{position:"absolute",width:350,right:60,top:-14}}>商品名称:{item.productName}</p>
                                   <div> 
                                     <span>产品ID:{item.productId}</span>{"     "}
                                     <span>购买单价:<span style={{color:'red'}}>{item.currentUnitPrice}</span></span>{"     "}
                                     <span>数量：{item.quantity}</span>
                                    <br/>总价:<span style={{color:'red'}}>{item.totalPrice}</span></div>
                                  </div>
                                ):undefined
                              }
                          </div>
                          <p>订单号:{this.state.currentItem.orderNo}</p>
                          <p>付款方式:{this.state.currentItem.paymentTypeDesc}</p>
                          <p>订单金额:{this.state.currentItem.payment}</p>
                          {
                            this.state.shippingVo?<span><p>收获地址:{this.state.currentItem.shippingVo.receiverAddress}</p>
                            <p>电话：{this.state.currentItem.shippingVo.receiverMobile}</p></span>:<span style={{color:'red'}}>用户已删除地址信息</span>
                          }
                          <p>订单状态码：{this.state.currentItem.status}</p>
                          <p>发货状态:{this.state.currentItem.statusDesc}</p>
                        </div>:undefined
                      }
                    </div>
                </Dialog>
    </div>:"数据拼命加载中..."
    )
   }
   
  render() {
    const {  overviewData } = this.state;

    return (
      <div style={styles.container}>
      {
        this.state.overviewData?<Overview data={overviewData} />:"订单总览数据加载中..."
      }
       
       {this.renderOrderTable()}
        {/* <Overview data={overviewData} />
        <IceContainer>
          <Table loading={isLoading} dataSource={data} hasBorder={false}>
            <Table.Column title="流水号" dataIndex="serialNumber" />
            <Table.Column title="订单号" dataIndex="orderNumber" />
            <Table.Column title="商品名称" dataIndex="name" />
            <Table.Column title="商品规格" dataIndex="spec" />
            <Table.Column title="发货时间" dataIndex="dispatchTime" />
            <Table.Column title="下单时间" dataIndex="orderTime" />
            <Table.Column title="订购数量" dataIndex="quantity" />
            <Table.Column title="已发货数量" dataIndex="delivery" />
            <Table.Column title="已发货商品金额" dataIndex="amount" />
            <Table.Column
              title="操作"
              width={200}
              dataIndex="oper"
              cell={this.renderOper}
            />
          </Table>
          <Pagination
            style={styles.pagination}
            current={current}
            onChange={this.handlePaginationChange}
          />
        </IceContainer> */}
      </div>
    );
  }
}

const styles = {
  pagination: {
    marginTop: '20px',
    textAlign: 'right',
  },
};
