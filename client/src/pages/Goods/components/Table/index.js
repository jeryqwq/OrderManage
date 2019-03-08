import React, { Component } from 'react';
import { Table, Pagination, Button, Dialog,Loading,Card} from '@alifd/next';
import IceContainer from '@icedesign/container';
import UserAjax from '../../../../Controller/UserController';



export default class GoodsTable extends Component {
  state = {
    current: 1,
    isLoading: true,
    data:undefined,
    keyWord:'',
    pageNum:1,
    pageSize:8,
    total:0
  };

  componentDidMount() {
    this.fetchData();
  }

 

  fetchData (){
    this.setState({
      isLoading:true
    })
    UserAjax.adminProductList(this.state.pageNum,this.state.pageSize).then((res)=>{
      if(res.data.status===0){
        this.setState({
          data:res.data.data.list,
          total:res.data.data.total,
          isLoading:false
        })
      }
    })
  };




  handleDelete = (id) => {
    Dialog.confirm({
      title: '提示',
      content: '确认删除吗',
      onOk: () => {
        console.log(id)
      },
    });
  };

  handleStatus = (id,status) => {
    
  };

 

  render() {
    const { isLoading, data, current } = this.state;

    return (
      <div style={styles.container}>
        <Loading visible={this.state.isLoading} fullScreen shape="fusion-reactor"/>
        <IceContainer>
          {
            this.state.data?
            this.state.data.map((item,index)=>
            <Card key={index} style={{width:"25%",display:'inline-block',margin:'5px 0'}} contentHeight="auto">
            <img src={item.mainImage} alt={item.name}  style={{height:350,width:'100%'}}/>
            <div className="custom-card">
                <h3>{item.name}</h3>
                <p>{item.subtitle}</p>
            </div>
            <Button type="primary"
            onClick={()=>{
              this.handleStatus(item.id,status)
            }}
            >
              上架
            </Button>
            <Button type="primary"
            style={{float:"right"}}
            onClick={()=>{
              this.handleDelete(item.id)
            }}
            >
              编辑
            </Button>
        </Card>
            )
            :"数据拼命加载中...."
          }
          <Pagination
            style={styles.pagination}
            current={current}
            total={this.state.total}
            onChange={(val)=>{
              this.setState({
                pageNum:val,
                current:val
              },()=>{
                this.fetchData();
              })
            }}
          />
        </IceContainer>
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
