import * as React from 'react';
import {observer} from "mobx-react";
import * as cx from 'classnames';
import '../themes/skin.less'
import Header from './layout/Header';
import Side from './layout/Side';
import * as styles from './layout/layout.less';
import {globalStore} from "../stores/GlobalStore";
// import "./MainFrame.less";

@observer
export default class MainFrame extends React.Component<any, any> {

    render() {
        const {children} = this.props;
        // Responsive Sidebar
        const sideResponsive = globalStore.sideResponsive;
        const sidebarFold = globalStore.sidebarFold;
        return (
            <div className={cx(styles.layout, {[styles.fold]: sidebarFold}, {[styles.responsive]: sideResponsive})}>
                {sideResponsive?null:<Side/>}
                <div className={styles.main} >
                    <Header  />
                    <div className={styles.container}>
                        <div className={styles.content}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
