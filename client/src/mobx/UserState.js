import {observable} from 'mobx';

let UserState=observable({
    user:{isLogin:false},
    login(user){
        this.user={
            ...user,
            isLogin:true
        }
    },
    logoutOut(){
        this.user={isLogin:false};
    }
})
export default UserState