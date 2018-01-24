function initParse(){
    Parse.initialize("APPLICATION_ID");
    let serverHost=location.host.split(':')[0];
    Parse.serverURL = 'http://' + serverHost + ':1337/parse';
}

/**
 *
 * @param fileList 要加载的文件列表[url1,url2]
 * @param container 用于显示加载信息的容器
 */
function loadResource(fileList,container){
    return new Promise(function(resolve, reject) {

        //文件加载完成状态，{url:"ok/fail/undefined"}
        let loadStatus={};
        let loadProgress="0%";

        //完成文件加载
        function markFile(url,status){
            loadStatus[url]=status;
            console.log(status+":"+url);
        }
        //显示文件加载完成状态
        function showFileLoadStatus(){
            console.log("================");
            console.log("loadProgress:",loadProgress);
            console.log("loadStatus:",loadStatus);
            console.log("================");
            const textProgress="<div>加载进度："+loadProgress+"</div>";
            const textStatuses=fileList.map(url=>{
                const status=loadStatus[url];
                if(status==="ok"){
                    return "<div>☑"+url+"</div>";
                }
                if(status==="fail"){
                    return "<div style='color:red'>☒"+url+"</div>";
                }
                return "<div>☐"+url+"</div>";
            });
            const textStatus=textStatuses.join("\n");
            container.innerHTML=textProgress+textStatus;
        }
        //处理单个文件加载
        function handleFileLoad(event) {
            markFile(event.item.src,"ok");
            showFileLoadStatus();
        }

        //处理加载错误：大家可以修改成错误的文件地址，可在控制台看到此方法调用
        function loadError(event) {
            markFile(event.data.src,"fail");
            showFileLoadStatus();
        }

        //已加载完毕进度
        function handleFileProgress(event) {
            loadProgress = ""+ (preload.progress*100|0) + " %";
        }

        //全部资源加载完毕
        function loadComplete(event) {
            resolve();
        }
        
        //创建加载器并开始加载
        const preload = new createjs.LoadQueue(true);
        preload.setMaxConnections(100);
        preload.maintainScriptOrder=true;
        preload.on("fileload", handleFileLoad);
        preload.on("progress", handleFileProgress);
        preload.on("complete", loadComplete);
        preload.on("error", loadError);
        preload.loadManifest(fileList);
    });
}

function loadVendor(container){
    const fileList=["https://cdn.bootcss.com/react/16.0.0/umd/react.production.min.js",
        "https://cdn.bootcss.com/react-dom/16.0.0/umd/react-dom.production.min.js",
        "https://cdn.bootcss.com/prop-types/15.5.2/prop-types.min.js",
        "https://cdn.bootcss.com/history/4.7.2/history.min.js",
        "https://cdn.bootcss.com/react-router/4.2.0/react-router.min.js",
        "https://cdn.bootcss.com/mobx/3.4.1/mobx.umd.min.js",
        "https://cdn.bootcss.com/mobx-react/4.3.5/index.min.js",
        "https://cdn.bootcss.com/parse/1.11.0/parse.min.js",
        "https://cdn.bootcss.com/classnames/2.2.5/index.min.js",
        "https://cdn.bootcss.com/moment.js/2.19.2/moment.min.js",
        "https://cdn.bootcss.com/antd/3.1.3/antd.min.js"];
    return loadResource(fileList,container);
}


function loadApp(container){
    const fileList=["build/app.css",
        "build/app.js"];
    return loadResource(fileList,container);
}

function init(){
    const container=document.getElementById("info");
    container.innerHTML="准备加载资源";
    loadVendor(container).then(()=>{
        container.innerHTML="准备初始化parse";
        initParse();
        container.innerHTML="准备加载主程序";
        loadApp(container).then(()=>{
            container.remove();
        });
    });
}

init();