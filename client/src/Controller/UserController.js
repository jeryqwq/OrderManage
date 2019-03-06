import Axios from 'axios';
import url from './urlConfig'

const api=url+"user"

const login=(username,password)=>{
    return Axios.get(api+"/appUserLogin.do",{
        params:{
            username,
            password
        }
    })
}
const autoLogin=()=>{
    return Axios.post(api+"/get_info.do");
}

const logout=()=>{
    return Axios.post(api+"/logout.do");
}



const UserAjax={
        login,
        autoLogin,
        logout,
        
}


export default UserAjax