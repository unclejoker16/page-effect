/**
 * Created by qiaokeshushu on 2016/11/18.
 */
$(window).on("load",function () {
    waterfall();
    var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'},{'src':'5.jpg'},{'src':'6.jpg'},{'src':'7.jpg'},{'src':'8.jpg'}]};
    window.onscroll = function () {
        if(checkscrollside()){
            $.each(dataInt.data, function (index, value) {
                var $oPin = $("<div>").addClass("pin").appendTo($("#main"));
                var $oBox = $("<div>").addClass("box").appendTo($oPin);
                $("<img>").attr("src","images/"+value.src).appendTo($oBox);
            })
            waterfall();
        }
    }
})

function waterfall() {
    // 设置列数
    var $oPins = $("#main>div");
    var w = $oPins.eq(0).outerWidth();
    var cols = Math.floor($(window).width()/w);
    // 设置main的宽度及样式
    $("#main").css({
        "width": cols*w +"px",
        "margin": "0 auto"
    });
    // 设置第六张之后的图片位置
    var arrH = [];
    $oPins.each(function (index, value) {
        if (index < cols){
            //arrH.push(value.offsetHeight);
            arrH.push($(value).outerHeight(true));
        }else{
            var minH = Math.min.apply(null, arrH);
            var minHIndex = $.inArray(minH, arrH);
            $(value).css({
               "position": "absolute",
                "top": minH,
                "left": w*minHIndex
            });
            arrH[minHIndex] += $(value).outerHeight(true);
        }
    })
}

function checkscrollside() {
    var $top = $("#main>div").last();
    var top = $top.get(0).offsetTop+ $top.height();
    var scrollTop = $(window).scrollTop();
    var height = $(window).height();
    if(top < height + scrollTop + 20){
        return true;
    }else{
        return false;
    }
}