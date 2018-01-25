/**
 * Created by FangJian on 2018/1/25.
 */

import * as React from "react";
import {observer} from "mobx-react";
import createjs from "createjs";
import {preloadStore} from "../../stores/PreloadStore";
//import * as styles from './Preload.less';


@observer
export default class Preload extends React.Component<any, any> {

    render() {
        const {libs,children}=this.props;
        if(preloadStore.isLoaded(libs)){
            return children;
        }else{
            preloadStore.load(libs);
            const loadStatus=preloadStore.getLoadStatus(libs);
            const symbols={
                ok:'☑',
                fail:'☒',
                none:'☐'
            };
            return (<div>
                <div>正在加载...</div>
                {
                libs.map(lib=>{
                    const status=loadStatus[lib];
                    const symbol=symbols[status]||'☐';
                    return <div key={lib}>{symbol+lib}</div>;
                })
            }</div>)
        }

    }
}