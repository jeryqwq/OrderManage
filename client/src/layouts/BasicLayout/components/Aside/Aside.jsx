/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import React, { Component } from 'react';
import { Nav } from '@alifd/next';
import { withRouter, Link,Redirect } from 'react-router-dom';
import FoundationSymbol from '@icedesign/foundation-symbol';
import IceImg from '@icedesign/img';
import Logo from '../Logo';
import Notify from '../../../../components/Notify';
import { asideMenuConfig } from '../../../../menuConfig';
import UserState from './../../../../mobx/UserState';
import UserAjax from './../../../../Controller/UserController'
import './Aside.scss';

@withRouter
export default class BasicLayout extends Component {
  componentDidMount(){
    this.autoLogin();
  }
  autoLogin(){
    UserAjax.autoLogin().then((res)=>{
    })
  }
  render() {
    const { location } = this.props;
    const { pathname } = location;

    return (
      <div className="aside-custom-menu">
        <Logo
          style={{
            height: '62px',
            fontSize: '30px',
            marginRight: '0',
            background: '#fff',
            justifyContent: 'center',
            borderBottom: '1px solid #f5f5f5',
          }}
        />
 
        {
             UserState.user.isLogin?<div className="user-info">
             <IceImg
               height={40}
               width={40}
               src={require("./../Header/images/avatar.png")}
               className="user-avatar"
             />
             <Notify
               style={{ position: 'relative', left: ' -4px', top: '-12px' }}
             />
             <div className="user-profile">
               <span className="user-name" style={{ fontSize: '13px' }}>
                 {UserState.user.username}
               </span>
               <br />
               <span className="user-department"> {UserState.user.email}</span>
             </div>
           </div>:undefined
          //  <Redirect to="/user/login"/>
        }

        <Nav
          mode="inline"
          selectedKeys={[pathname]}
          className="ice-menu-custom"
          activeDirection="right"
        >
          {Array.isArray(asideMenuConfig) &&
            asideMenuConfig.length > 0 &&
            asideMenuConfig.map((nav) => {
              return (
                <Nav.Item key={nav.path}>
                  <Link to={nav.path} className="ice-menu-link">
                    {nav.icon ? (
                      <FoundationSymbol size="small" type={nav.icon} />
                    ) : null}
                    <span className="ice-menu-item-text">{nav.name}</span>
                  </Link>
                </Nav.Item>
              );
            })}
        </Nav>
      </div>
    );
  }
}
