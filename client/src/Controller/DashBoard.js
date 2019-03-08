import Axios from 'axios';
const api="http://localhost:8080/"+"api"
const dashboard=()=>{
    return Axios.get(api+"/dashboard")
}
const orderInfos=()=>{
    return Axios.get(api+"/orderInfos")
}
const getOrderDispatch=()=>{
    return Axios.get(api+"/disPatch")
}


const DashBoard={
    dashboard,
    orderInfos,
    getOrderDispatch
}


export default DashBoard