/**
 * Created by FangJian on 2018/1/25.
 */

import * as React from "react";
import {observer} from "mobx-react";
import * as PDF from "../../lib/Pdf.jsx";
//import * as styles from './PdfViewer.less';


@observer
export default class PdfViewer extends React.Component<any, any> {

    render() {
        return (<PDF file="/sample/pdf.pdf" scale={1.2}/>)
    }
}