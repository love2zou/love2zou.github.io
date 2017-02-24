//jquery倒计时按钮常用于验证码倒计
function buttonCountdown($el, msNum, timeFormat) {
    var text = $el.text(),//返回被选元素的文本内容
    	timer = 0;
    $el.prop("disabled", true).addClass("disabled")//添加disabled属性
            .on("timer.clear", function () {
                clearTime();
            });
            
	/*(function(){})()：这function() {}表示的是一个匿名函数，而()则包裹着function() {}，
	 * ()表示的是拥有最高级的优先执行权，即会优先执行function() {}这个匿名函数。最后的()，
	 * 则表示的是执行完function() {}后，立即调用这个function() {}匿名函数。
	 */
    (function countdown() {
        var time = showTime(msNum)[timeFormat];
        $el.text(time + '后失效');
        if (msNum <= 0) { 
            msNum = 0;
            clearTime();
        } else {
            msNum -= 1000;
            timer = setTimeout(arguments.callee, 1000);//打开一个定时器，1秒后执行
            console.info("aaaaaa:",timer);
            /*当函数被调用时，它的arguments.callee对象就会指向自身，也就是一个对自己的引用。
             *由于arguments在函数被调用时才有效，因此arguments.callee在函数未调用时是不存在
             * 的（即null.callee），且解引用它会产生异常。
 			*/
        }
    })();
    
    function clearTime() {
        clearTimeout(timer);//取消定时器
        $el.prop("disabled", false).removeClass("disabled").text(text);
    }

    function showTime(ms) {
    	//math.floor(x)返回小于参数x的最大整数
        var d = Math.floor(ms / 1000 / 60 / 60 / 24),
            h = Math.floor(ms / 1000 / 60 / 60 % 24),
            m = Math.floor(ms / 1000 / 60 % 60),
            s = Math.floor(ms / 1000 % 60),
            ss = Math.floor(ms / 1000);

        return {
            d: d + "天",
            h: h + "小时",
            m: m + "分",
            ss: ss + "秒",
            "d:h:m:s": d + "天" + h + "小时" + m + "分" + s + "秒",
            "h:m:s": h + "小时" + m + "分" + s + "秒",
            "m:s": m + "分" + s + "秒"
        };
    }

    return this;
}

//使用演示 显示为 秒
$("#test1").on("click",function(){//向id= test1的按钮添加click(点击)时间处理程序，并绑定一个buttonCountdown方法
    buttonCountdown($(this), 1000 * 60 * 3, "ss");
    //$(this)是jquery对象，能调用jquery的方法，例如click(), keyup()；
    //而this,则是html元素对象，能调用元素属性，例如this.id,this.value
});

//使用演示 显示为 分:秒
$("#test2").on("click",function(){
    buttonCountdown($(this), 1000 * 60 * 3, "m:s");
});

//使用演示 显示为 时:分:秒
$("#test3").on("click",function(){
    buttonCountdown($(this), 1000 * 60 * 3, "h:m:s");
});

//使用演示 显示为 天:时:分:秒
$("#test4").on("click",function(){
    buttonCountdown($(this), 1000 * 60 * 3, "d:h:m:s");
});

//清理$("#test1")的倒计时  比如请求出错或者什么原因要清理倒计时按钮
$("#test1-clear").on("click",function(){
    $("#test1").trigger("timer.clear");//触发被选元素的指定事件类型:timer.clear
});