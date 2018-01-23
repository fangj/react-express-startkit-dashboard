/**
 * Created by FangJian on 2017/6/7.
 */
import * as Parse from "parse";

export default class UserService{
    static login(username,password) {
        return Parse.User.logIn(username,password);
    }
    static logout(){
        return Parse.User.logOut();
    }
}

