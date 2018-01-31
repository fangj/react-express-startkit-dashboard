function asciiBar(progress){
    //http://www.theasciicode.com.ar/extended-ascii-code/block-graphic-character-ascii-code-219.html
    const fill='█';
    const blank='░';
    const p=progress/5;//max length:20
    let bar='';
    for(let i=1;i<=p;i++){
        bar=bar+fill;
    }
    for(let i=(p+1);i<=20;i++){
        bar=bar+blank;
    }
    return bar;
}

function url2name(url){
    const parts=url.split("/");
    const len=parts.length;
    if(url.startsWith("vendor")||url.startsWith("https://cdn.bootcss.com")){
        return parts[len-3]+"/"+parts[len-2]+"/"+parts[len-1];
    }
    return url;
}
/**
 *
 * @param urlList 要加载的文件列表[url1,url2]
 * @param container 用于显示加载信息的容器
 */
function loadResource(urlList,container){
    return new Promise(function(resolve, reject) {

        //文件加载完成状态，{url:"ok/fail/undefined"}
        let loadStatus={};
        let loadProgress=0;

        //完成文件加载
        function markFile(url,status){
            const name=url2name(url);
            loadStatus[name]=status;
            // console.log(status+":"+url);
        }
        //显示文件加载完成状态
        function showFileLoadStatus(){
            // console.log("================");
            // console.log("loadProgress:",loadProgress);
            // console.log("loadStatus:",loadStatus);
            // console.log("================");
            const nameList=urlList.map(url2name);
            const textProgress="<div>加载进度："+loadProgress+"%"+asciiBar(loadProgress)+"</div>";
            const textStatuses=nameList.map(name=>{
                const status=loadStatus[name];
                if(status==="ok"){
                    return "<div>☑"+name+"</div>";
                }
                if(status==="fail"){
                    return "<div style='color:red'>☒"+name+"</div>";
                }
                return "<div>☐"+name+"</div>";
            });
            const textStatus=textStatuses.join("\n");
            container.innerHTML=textProgress+textStatus;
        }
        //处理单个文件加载
        function handleFileLoad(event) {
            // console.log("handleFileLoad",event.item.src);
            markFile(event.item.src,"ok");
            showFileLoadStatus();
            checkWhetherAllResourceLoadedOk();
        }

        //处理文件加载错误
        //如果是远程文件尝试重新加载本地版本
        function handLoadError(event){
            let url=event.data.src;
            markFile(url,"fail");
            showFileLoadStatus();
            if(url.startsWith("https://cdn.bootcss.com")){
                url=url.replace("https://cdn.bootcss.com","vendor");
                preload.loadFile(url);
            }
        }

        //已加载完毕进度
        function handleFileProgress(event) {
            loadProgress = preload.progress*100|0;
        }

        //全部资源加载完毕
        function loadComplete(event) {
            console.log("loadComplete")
            checkWhetherAllResourceLoadedOk();
        }

        //检查是否所有资源加载成功
        function checkWhetherAllResourceLoadedOk(){
            let ok=true;
            const nameList=urlList.map(url2name);
            nameList.forEach(name=>{
                if(loadStatus[name]!=='ok'){
                    ok=false;
                }
            });
            if(ok){
                resolve(loadStatus);
            }else{
                // reject(loadStatus); //just wait
            }
        }
        
        //创建加载器并开始加载
        const preload = new createjs.LoadQueue(true);
        preload.setMaxConnections(100);
        preload.maintainScriptOrder=true;
        preload.on("fileload", handleFileLoad);
        preload.on("progress", handleFileProgress);
        preload.on("complete", loadComplete);
        preload.on("error", handLoadError);
        preload.loadManifest(urlList);
    });
}

//外部资源
function getVendorList(){
    return ["https://cdn.bootcss.com/react/16.0.0/umd/react.production.min.js",
        "https://cdn.bootcss.com/react-dom/16.0.0/umd/react-dom.production.min.js",
        "https://cdn.bootcss.com/prop-types/15.5.2/prop-types.min.js",
        "https://cdn.bootcss.com/history/4.7.2/history.min.js",
        "https://cdn.bootcss.com/react-router/4.2.0/react-router.min.js",
        "https://cdn.bootcss.com/mobx/3.4.1/mobx.umd.min.js",
        "https://cdn.bootcss.com/mobx-react/4.3.5/index.min.js",
        "https://cdn.bootcss.com/axios/0.17.1/axios.min.js",
        "https://cdn.bootcss.com/parse/1.11.0/parse.min.js",
        "https://cdn.bootcss.com/classnames/2.2.5/index.min.js",
        "https://cdn.bootcss.com/moment.js/2.19.2/moment.min.js",
        "https://cdn.bootcss.com/antd/3.1.3/antd.min.js"];
}


//主程序文件
function getAppList(){
    return [
        "js/init_parse.js",
        "css/anticon.css",
        "build/custom_antd.css",
        "build/app.css",
        "build/app.js"];
}


function init(){
    const container=document.getElementById("info");
    container.innerHTML="准备加载资源";
    const vendorList=getVendorList();

    loadResource(vendorList,container)
        .then(()=>{
            container.innerHTML="加载主程序";
            const appList=getAppList();
            return loadResource(appList,container)
        })
        .then(()=>{
            container.remove();//删除用于显示信息的元素
        });
}

init();