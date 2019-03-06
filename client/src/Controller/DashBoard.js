import Axios from 'axios';
const api="http://localhost:8080/"+"api"
const dashboard=()=>{
    return Axios.get(api+"/dashboard")
}




const DashBoard={
    dashboard
}


export default DashBoard