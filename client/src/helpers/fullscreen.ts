/**
 * Created by FangJian on 2018/1/24.
 */

export function requestFullscreen() {
    const element:any=document.documentElement;
    if (element.requestFullscreen) {
        element.requestFullscreen()
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen()
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen()
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen()
    }
}

export function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen()
    } else if (document["mozCancelFullScreen"]) {
        document["mozCancelFullScreen"]()
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
    }
}