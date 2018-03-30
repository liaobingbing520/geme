/**
 * Created by Administrator on 2018/3/24.
 */
//规则的显示隐藏
$(".regulation").on("touchstart",function () {
    $(".regulation-page").fadeIn();
});
$(".btn-rule").on("touchstart",function () {
    $(".regulation-page").fadeOut();
});

//计算碰撞
function impact(obj,dobj) {
    var o = {
        x: getDefaultStyle(obj, 'left'),
        y: getDefaultStyle(obj, 'top'),
        w: getDefaultStyle(obj, 'width'),
        h: getDefaultStyle(obj, 'height')
    }
    var d = {
        x: getDefaultStyle(dobj, 'left'),
        y: getDefaultStyle(dobj, 'top'),
        w: getDefaultStyle(dobj, 'width'),
        h: getDefaultStyle(dobj, 'height')
    }
    var px, py;
    px = o.x <= d.x ? d.x : o.x;
    py = o.y <= d.y ? d.y : o.y;
    // 判断点是否都在两个对象中
    if (px >= o.x && px <= o.x + o.w && py >= o.y && py <= o.y + o.h && px >= d.x && px <= d.x + d.w && py >= d.y && py <= d.y + d.h) {
        return true;
    } else {
        return false;
    }
}
function getDefaultStyle(obj,attribute) {
    return parseInt(obj.currentStyle ? obj.currentStyle[attribute] : document.defaultView.getComputedStyle(obj,false)[attribute]);
}


/*进入游戏*/
//获取屏幕的宽高
var clientH=$(window).height();
var clientY=clientH/1.2;
var clientYY=clientH/6;
//定时器
var anim=null;
 $(".btn").on("touchstart",function () {
     var clientX=$(".game-page").width()/2;
        $(".start-page").hide();
        $(".jh-list").hide();
        $(".hiti").show();
        $(".game-page").show();
        $(".jh-page").show();
     $("body")[0].style.background='url(images/1bg2.png)';
     $("body")[0].style.backgroundSize="cover";
         //游戏区域
        $(".game-page").css("height",clientH-10+"px");
        /*人的动画*/
        $(".people-img1").css("display","block")
        $(".people").css({"top":clientY,"left":clientX-30+"px"});
        anim=setInterval(function () {
            $(".people-img1").toggle();
            $(".people-img2").toggle();
            $(".clock1").toggle();
            $(".clock2").toggle();
        },100);
        // 时钟的动画
        $(".clock1").css("display","block")
        $(".clock").css({"top":clientYY,"left":clientX-40+"px"});
        //背景移动
        bjMove();
 });

/*开始游戏*/
$(".btn-start").on("touchstart",function () {
    $(".hiti").hide();
    //滑动
    toucths();
    //奖励物品的掉落
    jianli();
    //人与奖励物品的碰撞
    crachPeople();
});

//滑动
var temp=0.3;
var item=0;
var clockStep=10;
//游戏次数
var jh=1;
//定时器
 var inst1=null;
 function toucths() {
    var step=1;
    var clocks=$(".clock")[0];
    var peoples=$(".people")[0];
    if(jh<4){
       //分数和时钟向前走的定时器
       inst1=setInterval(function () {
           item++;
           $(".clock").css({"top":"-="+clockStep});
           var clock=$(".clock")[0].offsetTop;
           //时钟走出游戏结束
           if(clock<=-10){
               $(".bf-list").show();
               clearInterval(inst1);
           }
       },1000);
   }

    //滑动开始
    $(".game-page").on("touchstart", function(e) {
           e.preventDefault();
          //人与奖励物品的碰撞
           crachPeople()
           startX = e.originalEvent.changedTouches[0].pageX,
           startY = e.originalEvent.changedTouches[0].pageY;
    });
    //开始滑动
    $(".game-page").on("touchmove", function(e) {
           //拿到人在父元素中的位置
           var clientW=$(".game-page").width()/2;
           //父元素在页面中的偏移量
           var clientL=$(".game-page")[0].offsetLeft;
           //人在父元素中最左边的偏移位置计算出以人在父元素中的0的位置
           var offseL=$(".people")[0].offsetLeft-clientL-20;
           e.preventDefault();
           moveEndX = e.originalEvent.changedTouches[0].pageX,
               moveEndY = e.originalEvent.changedTouches[0].pageY,
               X = moveEndX - startX,
               Y = moveEndY - startY;
           //判断往右化的最大距离
           if(clientW>=offseL) {
               if (Math.abs(X) > Math.abs(Y) && X > 0) {
                   //右滑动
                   $(".people").css({"left": "+=" + step});
                   //人与奖励物品的碰撞
                   crachPeople();
               }
           }
           //判断往左化在父元素最左边的位置
           if(-clientL-20<=offseL){
               if ( Math.abs(X) > Math.abs(Y) && X < 0 ) {
                   //左滑动
                   $(".people").css({"left":"-="+step});
                   //人与奖励物品的碰撞
                   crachPeople();
               }
           }
           if ( Math.abs(Y) > Math.abs(X) && Y > 0) {
               //下滑动
           }
          if ( Math.abs(Y) > Math.abs(X) && Y < 0 ) {
              //上滑动
               $(".people").css({"top":"-="+temp});
              //人与奖励物品的碰撞
               crachPeople()
               //时钟与人的碰撞
               if(impact(clocks,peoples)){
                   $(".cueess-list").show();
                   $(".sp1").html(item);
                   //清除定时器
                   clearInterval(inst1);
               };

          }
    });
    //离开滑动
    $(".game-page").on("touchend",function () {});
 }

 //不服重来和,再试一次
  bufzl(".btn1",".cueess-list");
  bufzl(".btn3",".bf-list");
 function bufzl(obj1,obj2) {
    $(obj1).on("click",function () {
        $(obj2).hide();
        var clientX=$(".game-page").width()/2;
        //人和时钟回到原位
        $(".people").css({"top":clientY,"left":clientX-30+"px"});
        $(".clock").css({"top":clientYY,"left":clientX-40+"px"});
        //用时
        item=0
        toucths();
        //次数
        jh+=1;
        if(jh>4){
            $(".jh-list").show();
            clearInterval(inst1);
        }
        //奖励物品的初始化
        $(".ice_c").css({"top":0,"display":"none"});
        $(".gw").css({"top":0,"display":"none"});
        $(".card").css({"top":0,"display":"none"});
        $(".i1").css({"display":"none"});
        //向上的步
        temp=0.3
        //奖励物品的掉落
        jianli();
    });
 }

 //奖励物品加速
 function jianli() {
    setTimeout(function () {
        var max=Math.random()*180;
        $(".gw").animate({"top":clientH},4000);
        $(".gw").css({"display":"block"});
        $(".gw").css({"left":max});
    },30)
    setTimeout(function () {
        var max=Math.random()*180;
        $(".ice_c").animate({"top":clientH},4000);
        $(".ice_c").css({"display":"block"});
        $(".ice_c").css({"left":max});
    },4000)
    setTimeout(function () {
        var max=Math.random()*180;
        $(".card").animate({"top":clientH},4000);
        $(".card").css({"display":"block"});
        $(".card").css({"left":max});
    },8000)

}
//物品与人的碰撞
  function crachPeople() {
      var gw=$(".gw")[0];
      var ice=$(".ice_c")[0];
      var card=$(".card")[0];
      var peoples=$(".people")[0];
      if(impact(gw,peoples)){
          $(".gw").css({"display":"none"});
          $(".i1").toggle();
          temp+=0.01
      }
      if(impact(ice,peoples)){
          $(".ice_c").css({"display":"none"});
          $(".i1").toggle();
          temp+=0.01
      }
      if(impact(card,peoples)){
          $(".card").css({"display":"none"});
          $(".i1").toggle();
          temp+=0.01
      }
  }

/*计算过后的样式*/
function getStyle(element) {
    return getComputedStyle(element,null);
}

/*背景移动*/
//定时器
var it=null;
function bjMove() {
    it=setInterval(function () {
        var y=parseFloat(getStyle($("body")[0]).backgroundPositionY);
        y+=2;
        $("body")[0].style.backgroundPositionY=y+"px";
    },20);

};

//返回首页
$(".btns2").on("touchstart",function () {
    //清除事件
    $(".btn")[0].removeEventListener('touchstart',false);
    $(".btn-start")[0].removeEventListener('touchstart',false);
    $(".game-page")[0].removeEventListener('touchstart',false);
    $(".game-page")[0].removeEventListener('touchstart',false);
    //把首页游戏按钮设置为不可点击
    // if($(".btn").on("touchstar")) return false;
    //隐藏元素回首页
    $(".start-page").show();
    $(".game-page").hide();
    $(".jh-list").hide();
    $(".hiti").hide();
    $("body")[0].style.background='url(images/bg.png)';
    $("body")[0].style.backgroundSize="auto";
    //在清除背景移动中和时钟和人的定时器
    if(it||anim||inst1){
        clearInterval(it);
        clearInterval(anim);
        clearInterval(inst1);
    }

})
