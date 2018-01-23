import * as React from 'react'
import * as styles from './layout.less'
import * as config from '../../config.js'
import { Layout }  from 'antd';
import {observer} from "mobx-react";
import DataMenu from "../../components/menu/DataMenu";
import {globalStore} from "../../stores/GlobalStore";
import {ClickParam} from "antd/es/menu";


@observer
class Side extends React.Component {
  render () {
    const { sidebarFold, menukey } = this.props;
    const onMenuClick = globalStore.onMenuClick;
    const menuData=globalStore.menuData;
    const menuProps = {
        menukey,
        sidebarFold,
        onMenuClick,
        data:menuData
    };

      return (<Layout.Sider
          collapsible
          collapsed={sidebarFold}
          style={{height:"100vh",backgroundColor:"transparent"}}
          collapsedWidth={45}
          width={250}
          trigger={null}
      >
          <div className={styles.logo}>
             <img alt={'logo'} src={config.logo} />
             {sidebarFold ? <span /> : <span>{config.name}</span>}
           </div>
          <DataMenu {...menuProps} />
      </Layout.Sider>)
  }
}

export default Side
