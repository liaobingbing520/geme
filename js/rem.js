/**
 * Created by Administrator on 2018/3/24.
 */
function getRem(pw,rw) {
    var html=document.getElementsByTagName("html")[0];
    var ow=document.body.clientWidth||document.documentElement.clientWidth;
    html.style.fontSize=ow/pw*rw+"px";
};
window.onload=function () {
    getRem(640,100);
}
window.onresize=function () {
    getRem(640,100);
}
