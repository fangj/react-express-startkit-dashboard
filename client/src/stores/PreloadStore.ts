/**
 * Created by FangJian on 2018/1/25.
 */
import {computed, observable} from "mobx";
import * as Libs from "../config/libs.js";
import * as createjs from "createjs";

export default class PreloadStore{

    //加载的状态:ok,fail,undefined
    @observable loadStatusMap = new Map();

    //是否正在加载
    @observable loadingMap = new Map();


    preload:createjs.LoadQueue;

    constructor(){
        this.preload = new createjs.LoadQueue(true);
        this.preload.setMaxConnections(100);
        this.preload.maintainScriptOrder=true;
        this.preload.on("fileload", this.handleFileLoad,this);
        this.preload.on("error", this.handLoadError,this);
    }

    handleFileLoad(event){
        console.log('load',event.item.id,event.item.src);
        let name=event.item.id;
        this.loadingMap.set(name,false);//loadingmap区分远程和本地资源。
        //处理本地资源加载成功事件
        if(name.startsWith("local-")){
            name=name.substr("local-".length);
        }
        this.loadStatusMap.set(name,"ok");//loadStatusMap不区分远程和本地资源。
    }

    handLoadError(event){
        console.log('error',event.data.id,event.data.src);
        const name=event.data.id;
        this.loadingMap.set(name,false);
        this.loadStatusMap.set(name,"fail");
        if(!name.startsWith("local-")){
            //如果远程加载失败，切换为本地资源再试一次
            const localName="local-"+name;
            if(!this.loadingMap.get(localName)){
                const url=Libs[name];
                const localUrl=url.replace("https://cdn.bootcss.com","vendor");
                const fileInfo={id:localName,src:localUrl};
                this.preload.loadFile(fileInfo);
                this.loadingMap.set(localName,true); //loadingmap区分远程和本地资源。
            }
        }
    }


    //libs是否已经全部加载
    isLoaded(libs:string[]) {
        for(let i in libs){
            if(this.loadStatusMap.get(libs[i])!=='ok'){
                return false;
            }
        }
        return true;
    }

    //libs的加载状态{lib:"ok/fail/none"}
    getLoadStatus(libs) {
        const loadStatus={};
        libs.forEach(lib=>{
            loadStatus[lib]=this.loadStatusMap.get(lib);
        });
        return loadStatus;
    }

    //加载libs
    load(libs:string[]){
        libs.forEach(name=>{
            if(!this.loadStatusMap.get(name) && !this.loadingMap.get(name)){
                //如果没有加载过也不在加载中，则开始加载
                const fileInfo={id:name,src:Libs[name]};
                this.preload.loadFile(fileInfo);
                //设置加载中标志
                this.loadingMap.set(name,true);
            }
        })
    }
}

export const preloadStore=new PreloadStore();