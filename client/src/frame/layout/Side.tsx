import * as React from 'react'
import * as styles from './layout.less'
import * as config from '../../config.js'
import {Layout} from 'antd';
import {observer} from "mobx-react";
import DataMenu from "../menu/DataMenu";
import {globalStore} from "../../stores/GlobalStore";
import * as cx from 'classnames';


@observer
class Side extends React.Component {
    render() {
        const sidebarFold = globalStore.sidebarFold;
        const sidebarBgColor = globalStore.sidebarBgColor;
        const sidebarBgImg = globalStore.sidebarBgImg;
        const isShowSidebarBgImg = globalStore.isShowSidebarBgImg;
        return (<aside
            className={cx(styles.siderbar, styles[`siderbar-bg-${sidebarBgColor}`])}>
            {!isShowSidebarBgImg ? null :
                (<div className={styles['siderbar-bg-img']}
                      style={{backgroundImage: `url(${require(`../../assets/img/sidebar-${sidebarBgImg}.jpg`)})`}}/>)
            }
            <Layout.Sider
                collapsible
                collapsed={sidebarFold}
                style={{height: "100vh", backgroundColor: "transparent"}}
                collapsedWidth={45}
                width={250}
                trigger={null}>
                <div className={styles.logo}>
                    <img alt={'logo'} src={config.logo}/>
                    {sidebarFold ? "" : <span>{config.name}</span>}
                </div>
                <DataMenu menukey={globalStore.menukey}
                          sidebarFold={sidebarFold}
                          onMenuClick={globalStore.onMenuClick}
                          data={globalStore.menuData}/>
            </Layout.Sider></aside>)
    }
}

export default Side
