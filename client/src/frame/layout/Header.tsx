import * as React from 'react'
import * as classnames from 'classnames'
import {Icon, Popover, Avatar, Input} from 'antd'
import DataMenu from "../menu/DataMenu";
import {globalStore} from "../../stores/GlobalStore";
import * as styles from "./layout.less";
import {observer} from "mobx-react";
import {requestFullscreen,exitFullscreen} from "../../helpers/fullscreen";

@observer
class Header extends React.Component {

    render() {
        const fullScreen = globalStore.fullScreen;
        // Responsive Sidebar
        const sidebarFold = globalStore.sidebarFold;
        const siderRespons = globalStore.sideResponsive;

        const msgs = globalStore.msgs;
        const msgContent = (
            <div>
                {msgs.map((msg, idx) => <p key={idx}><a>{msg}</a></p>)}
            </div>
        );

        const searchStyle = {
            width: 150,
            background: '0 0',
            borderTop: 0,
            borderLeft: 0,
            borderRight: 0,
            borderRadius: '2px'
        };

        const {menukey, menuData} = globalStore;
        const menuProps = {
            menukey,
            onMenuClick() {
                if (siderRespons) {
                    globalStore.onSwitchMenuPopover();
                }
            },
            data: menuData,
            sidebarFold
        };

        const popoverStyle = {
            fontSize: 12
        };

        const avatarStyle = {
            backgroundColor: '#555555'
        };

        const onFull=()=> {
            requestFullscreen();
            globalStore.switchFullScreen();
        };

        const onExitFull=()=> {
            exitFullscreen();
            globalStore.switchFullScreen();
        };

        return (
            <navbar-cmp>
                <nav className={classnames(styles.navbar, styles['navbar-transparent'], styles['navbar-absolute'])}>
                    <div className={styles['navbar-container']}>
                        {
                            // Responsive Sidebar
                            siderRespons
                                ? <Popover
                                    placement='bottomLeft'
                                    onVisibleChange={globalStore.onSwitchMenuPopover}
                                    visible={globalStore.menuResponsVisible}
                                    trigger='click'
                                    content={<DataMenu {...menuProps} />}
                                    overlayClassName={styles.popmenu}>
                                    <div className={styles.btn}><Icon type='bars'/></div>
                                </Popover>
                                : <div className={styles.btn} onClick={globalStore.onSwitchSidebar}>
                                    <Icon type={sidebarFold ? 'menu-unfold' : 'menu-fold'} style={{lineHeight: 1.5}}/>
                                </div>
                        }
                        <ul className={styles['navbar-right']}>
                            <li>
                                <Input placeholder='Search' style={searchStyle}/>
                            </li>
                            <li>
                                <a onClick={fullScreen ?onExitFull:onFull}>
                                    <Avatar size='small' icon={fullScreen ? 'shrink' : 'arrows-alt'}
                                            style={avatarStyle}/>
                                </a>
                            </li>
                            {/*<li>*/}
                            {/*<a>*/}
                            {/*<Popover overlayStyle={popoverStyle} content={msgContent} placement='bottomRight' title={msgs.length+" unread message"}>*/}
                            {/*<Badge count={msgs.length}>*/}
                            {/*<Avatar size='small' icon='notification' style={avatarStyle} />*/}
                            {/*</Badge>*/}
                            {/*</Popover>*/}
                            {/*</a>*/}
                            {/*</li>*/}
                            <li>
                                <a>
                                    <Popover overlayStyle={popoverStyle}
                                             content={<div><a onClick={globalStore.logout}>退出</a></div>}
                                             placement='bottomRight'
                                             trigger='click'>
                                        <Avatar size='small' icon='user' style={avatarStyle}/>
                                    </Popover>
                                </a>
                            </li>
                            <li>
                                {globalStore.username}
                            </li>
                            <li>
                                <a onClick={globalStore.lock}>
                                    <Avatar size='small' icon='unlock' style={avatarStyle}/>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </navbar-cmp>
        )
    }
}

export default Header
