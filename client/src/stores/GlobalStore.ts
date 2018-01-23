/**
 * Created by FangJian on 2017/10/24.
 */
import {computed, observable} from "mobx";
import {notification } from 'antd';
import hashHistory from "../helpers/hashHistory";

import * as demoMenu from "./menu/demo.js";
import * as adminMenu from "./menu/admin.js";
import * as studentMenu from "./menu/student.js";
import * as teacherMenu from "./menu/teacher.js";

import UserService from "../services/UserService";


export default class GlobalStore {
    @observable menukey = "";
    @observable sidebarFold = false;
    @observable siderRespons=document.body.clientWidth < 1201;
    @observable menuResponsVisible=false;
    @observable fullScreen = false;
    @observable sidebarBgColor = 'red';
    @observable sidebarBgImg = 'seu';
    @observable isShowSidebarBgImg = true;
    @observable loginLoading = false;
    @observable msgs=[];

    get user(){
        return Parse.User.current();
    }

    get username(){
        if(this.user && this.user.get){
            return this.user.get("showName");
        }else{
            return "username";
        }
    }

    @computed get isLogin(){
        return !!Parse.User.current();
    }

    get isAdmin(){
        return this.user && !!this.user.get("isAdmin");
    }

    get isTeacher(){
        return this.user && !!this.user.get("isTeacher");
    }

    get isStudent(){
        return !this.isAdmin && !this.isTeacher;
    }

    showLoginLoading() {
        this.loginLoading=true;
    }

    hideLoginLoading(){
        this.loginLoading=false;
    }

    login=(username,password)=>{
        this.showLoginLoading();
        UserService.login(username,password).then(user=>{
            hashHistory.push('/');
        },error=>{
            notification.warn({message:"登录失败",description:error.message})
        }).then(()=>{
            this.hideLoginLoading();
        });
    };

    logout(){
        UserService.logout().then(()=>{
            hashHistory.push('/login')
        });
    }

    @computed get menuData(){
        if(this.isAdmin){
            return adminMenu;
        }
        if(this.isTeacher){
            return teacherMenu;
        }
        if(this.isStudent){
            return studentMenu;
        }
        return demoMenu;
    }
}

export const globalStore=new GlobalStore();


//当窗口大小改变时修改菜单栏大小
require("../helpers/optimizedResize.js");
window.addEventListener("optimizedResize", function() {
    globalStore.siderRespons=document.body.clientWidth < 1201;
});