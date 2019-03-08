import Axios from 'axios';

const api="user"

const login=(username,password)=>{
    return Axios.get(api+"/appUserLogin.do",{
        params:{
            username,
            password
        }
    })
}
const autoLogin=()=>{
    return Axios.post(api+"/get_user_info.do");
}
const logout=()=>{
    return Axios.post(api+"/logout.do");
}
const orderList=(pageSize,pageNum)=>{
    return Axios.post(`/manage/order/list.do?pageSize=${pageSize}&pageNum=${pageNum}`)
}
const sendGood=(orderNo)=>{
    return Axios.post(`/manage/order/sendGoods.do?orderNo=${orderNo}`)
}
const adminProductList=(pageNum,pageSize)=>{
    return Axios.post(`/manage/product/list.do?pageSize=${pageSize}&pageNum=${pageNum}`) 
}
const adminSearch=(productName,pageNum,pageSize)=>{
    return Axios.post(`/manage/product/search.do?pageSize=${pageSize}&pageNum=${pageNum}&productName=${productName}`) 
}
const UserAjax={
        login,
        autoLogin,
        logout,
        orderList,
        sendGood,
        adminProductList,
        adminSearch
    }


export default UserAjax