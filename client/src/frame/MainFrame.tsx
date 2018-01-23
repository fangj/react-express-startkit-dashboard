import * as React from 'react';
import {observer} from "mobx-react";
import * as classnames from 'classnames'
import '../themes/skin.less'
// import "./MainFrame.less";
import Header from './layout/Header';
import Side from './layout/Side';
import * as LayoutStyles from './layout/layout.less';
import {globalStore} from "../stores/GlobalStore";
import hashHistory from "../helpers/hashHistory";

@observer
export default class MainFrame extends React.Component<any, any> {

    render() {
        const {children} = this.props;

        const menukey = globalStore.menukey;
        const menuResponsVisible = globalStore.menuResponsVisible;
        const fullScreen = globalStore.fullScreen;
        const sidebarBgColor = globalStore.sidebarBgColor;
        const sidebarBgImg = globalStore.sidebarBgImg;
        const isShowSidebarBgImg = globalStore.isShowSidebarBgImg;
        // Responsive Sidebar
        const sidebarFold = globalStore.sidebarFold;
        const siderRespons = globalStore.siderRespons;

        const siderbarProps = {
            sidebarFold,
            menukey
        };
        const headerProps = {
            fullScreen,
            sidebarFold,
            siderRespons,
            menuResponsVisible,
            onLock() {
                globalStore.lock();
            },
            onFull(element) {
                if (element.requestFullscreen) {
                    element.requestFullscreen()
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen()
                } else if (element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen()
                } else if (element.msRequestFullscreen) {
                    element.msRequestFullscreen()
                }
                globalStore.switchFullScreen();
            },
            onExitFull() {
                if (document.exitFullscreen) {
                    document.exitFullscreen()
                } else if (document["mozCancelFullScreen"]) {
                    document["mozCancelFullScreen"]()
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen()
                }
                globalStore.switchFullScreen();
            },
            onLogout() {
                globalStore.logout();
            },
            onSwitchSidebar() {
                globalStore.onSwitchSidebar();
            },
            onSwitchMenuPopover() {
                globalStore.onSwitchMenuPopover();
            }
        };
        return (
            <div
                className={classnames(LayoutStyles.layout, {[LayoutStyles.fold]: siderRespons ? false : sidebarFold}, {[LayoutStyles.responsive]: siderRespons})}>
                {
                    !siderRespons
                        ? <aside
                            className={classnames(LayoutStyles.siderbar, LayoutStyles[`siderbar-bg-${sidebarBgColor}`])}>
                            {
                                isShowSidebarBgImg
                                    ? <div className={LayoutStyles['siderbar-bg-img']}
                                           style={{backgroundImage: `url(${require(`../assets/img/sidebar-${sidebarBgImg}.jpg`)})`}}/>
                                    : ''
                            }
                            <Side {...siderbarProps} />
                        </aside>
                        : ''
                }
                <div className={LayoutStyles.main} >
                    <Header {...headerProps} />
                    <div className={LayoutStyles.container}>
                        <div className={LayoutStyles.content}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
