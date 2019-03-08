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
const category=()=>{
    return Axios.get(api+"/category")

}
const DashBoard={
    dashboard,
    orderInfos,
    getOrderDispatch,
    category
}
export default DashBoard