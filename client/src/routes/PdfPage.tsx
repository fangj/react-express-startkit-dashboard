/**
 * Created by FangJian on 2018/1/25.
 */
import * as React from "react";
import PdfViewer from "../components/pdf/PdfViewer";
import Preload from "../components/preload/Preload";
// require ("./PdfPage.less");

export default () => {
    return (<Preload libs={['pdf']}><PdfViewer/></Preload>)
}