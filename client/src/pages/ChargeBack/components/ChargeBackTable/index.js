import React, { Component } from 'react';
import { Table, Button, Message,Dialog, Input } from '@alifd/next';
import IceContainer from '@icedesign/container';
import Overview from '../../../../components/Overview';
import Dashboard from './../../../../Controller/DashBoard'
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';
import UserAjax from '../../../../Controller/UserController';
import moment from 'moment';


let type=0
export default class ChargeBackTable extends Component {
  state = {
    isLoading: false,
    data: [],
    overviewData:undefined,
    renderData:undefined,
    parentId:0,
    categoryData:undefined,
    visible:false,
    cateName:''
  };

  componentDidMount() {
    this.getData()
  }
  getData(){
    Dashboard.category().then((res)=>{
      this.setState({
        overviewData:res.data.dataArr,
        renderData:res.data.categoryArr
      })
    })
    UserAjax.getChildrenCate(this.state.parentId).then((res)=>{
      if(res.data.status===0){
        this.setState({
          categoryData:res.data.data
        })
      }
    })
  }
 
 
  
  render() {
    const { isLoading, overviewData ,categoryData} = this.state;
    const that=this;
    const cols = {
      amount: { alias: '数量' },
    };
    function insertCategory (){
      UserAjax.insertCategory(that.state.parentId,that.state.cateName).then((res)=>{
        if(res.data.status===0){
          that.getData();
          Message.success("插入成功!!!")         
      }
    })
      
    }
 
    function updataCategory(){
      UserAjax.updateCategory(that.state.cateName,that.state.parentId).then((res)=>{
        if(res.data.status===0){
          Message.success("修改成功!!!");
          that.setState({
            parentId:0
          },()=>{
            that.getData()
          })
        }else{
          Message.error("更新失败!!")
        }
      })
    }
    const renderSub =val =>{
      return <span>
        <Button type='primary'
        onClick={()=>{
          UserAjax.getChildrenCate(val).then((res)=>{
            if(res.data.status===0){
              this.setState({
                parentId:val,
                categoryData:res.data.data
              })
            }else{
              Message.error("该分类无子分类")
            }
          })
        }}
      >
          查看子分类
      </Button>
      <Button type='secondary'
      onClick={()=>{
        this.setState({
          parentId:0
        },()=>{
          this.getData()
        })
      }}>
        返回
      </Button>
      </span>
    }
    const renderAction = value => {
      return <span>
        <Button type="primary"
        onClick={()=>{
          this.setState({
            visible:true
          });
          type=0;
        }}
        >插入子分类</Button>
        <Button type="normal"
        onClick={()=>{
          this.setState({
            visible:true,
            parentId:value
          })
          type=1;
        }}
        >
        修改
        </Button>
      </span>;
  };
    return (
      <div>
        {
          this.state.overviewData?<Overview data={overviewData} col="3" />:"分类数据加载中...."
        }
    <Chart
      height={300}
      forceFit
      padding={[60, 40]}
      data={this.state.renderData}
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
        position="cateName*num"
        color="#447eff"
        shape="smooth"
      />
      <Geom
        type="line"
        position="cateName*num"
        color="#447eff"
        size={2}
        shape="smooth"
      />
    </Chart>
    <Dialog title="请输入信息"
      visible={this.state.visible}
      isFullScreen={false}
      footerActions={["ok"]}
      footerAlign={"right"}
      onOk={()=>{this.setState({visible:false})
        type===0?insertCategory():updataCategory()
    }}
      onCancel={()=>{this.setState({visible:false})}}
      onClose={()=>{this.setState({visible:false})}}>
      <Input  placeholder="请输入分类名称"
      onChange={(val)=>{
        this.setState({
          cateName:val
        })
      }}
      />
    </Dialog>
        <IceContainer>
          <Table loading={isLoading} dataSource={this.state.categoryData} hasBorder={false}>
            <Table.Column title="分类ID" dataIndex="id" />
            <Table.Column title="分类名称" dataIndex="name" />
            <Table.Column title="父分类ID" dataIndex="parentId" />
            <Table.Column title="创建时间" dataIndex="createTime"
            cell={(val)=>{
             return moment(val).format("YYYY-MM-DD HH:mm:ss")
            }}
            />
          
            <Table.Column  title="查看子分类" 
            dataIndex="id"
            cell={renderSub}
            />
            <Table.Column  title="操作" 
            dataIndex="id"
            cell={renderAction}
            />
           
          </Table>
        
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
