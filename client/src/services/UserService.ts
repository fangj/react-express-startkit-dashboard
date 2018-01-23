/**
 * Created by FangJian on 2017/6/7.
 */


export default class UserService{
    static login(username,password) {
        return Promise.resolve({username:"user"});
    }
    static logout(){
        return Promise.resolve();
    }
}

