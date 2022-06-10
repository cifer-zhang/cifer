$(function(){
    //给img添加父元素并设置宽高 前面忘记添加div了
    $('.news>img').wrap('<div>').parent().width(100).height(90); 
    
    //开启定时器
    setInterval(function(){
        //将最后一个news 元素 自定义隐藏 方便 自定义显示（所以不用hide（））
        $('.news:last').animate({
            'height':'0px',
            'padding':'0px',
            'opacity':'0'
        },0).prependTo($('.news-list')).animate({ //将最后一个news 插入到第一条消息，并显示高度
            'height':'90px',
            'padding':'5px',
        },600).animate({ //显示高度后执行显示透明度
            'opacity':'1'
        },600);     
    },3000)
});