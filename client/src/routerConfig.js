// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import Dashboard from './pages/Dashboard';
import OrderReport from './pages/OrderReport';
import ChargeBack from './pages/ChargeBack';
import Dispatch from './pages/Dispatch';
import Goods from './pages/Goods';

const routerConfig = [
  {
    path: '/user/login',
    component: UserLogin,
  },
  {
    path: '/user/register',
    component: UserRegister,
  },
  {
    path: '/dashboard',
    component: Dashboard,
  },
  {
    path: '/order/report',
    component: OrderReport,
  },
  {
    path: '/chargeback',
    component: ChargeBack,
  },
  {
    path: '/dispatch',
    component: Dispatch,
  },
  {
    path: '/goods',
    component: Goods,
  },
];

export default routerConfig;
