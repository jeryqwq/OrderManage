import Axios from 'axios';
const api="http://localhost:8080/"+"api"
const dashboard=()=>{
    return Axios.get(api+"/dashboard")
}
const orderInfos=()=>{
    return Axios.get(api+"/orderInfos")
}



const DashBoard={
    dashboard,
    orderInfos
}


export default DashBoard