
(function(){
    //获取按钮
    var numberPoint = document.querySelectorAll('.numberPoint');
    //获取所有图片的a标签
    var imgs = document.querySelectorAll('.image-item');
    //获取两侧按钮
    var btnLeft = document.querySelector('.btn-left');
    var btnRight = document.querySelector('.btn-right');




    //遍历所有底部按钮监听点击事件
    numberPoint.forEach(function(item,index){
        //点击事件触发
        item.onclick = function(){
            //遍历所有a标签
            imgs.forEach(function(item,index){
                //清除active属性 所有图片为隐藏
                item.classList.remove('active');
                //所有按钮清楚active属性 所有按钮均为未点击状态
                numberPoint[index].classList.remove('active');
            })
            //点击对象索引所对应的a标签添加active 图片为显示
            imgs[index].classList.add('active');
            //点击对象加active 按钮状态改变
            item.classList.add('active');
        }
    }); 



    //点击左右按钮切换图片(自己的方法)
    //监听右按钮事件
    btnRight.addEventListener('click',rightClick)
    //监听左侧按钮的点击事件
    btnLeft.addEventListener('click',leftClick)


    //右测按钮点击时候触发函数
    function rightClick(){
        //获取当前对应的底部按钮和显示的图片
        var x = document.getElementsByClassName('numberPoint active')[0];//当前选择的按钮
        var y = document.getElementsByClassName('image-item active')[0];//当前显示的图片

        //当前按钮取消选择
        x.classList.remove('active');

        //隐藏当前显示的图片
        y.classList.remove('active');

        //判断是否是最后一个选项和图片如果是 再点击下一张则从头开始选择
        if(x.nextElementSibling){

            //下个按钮选择
            x.nextElementSibling.classList.add('active');

            //显示下一张土拍你
            y.nextElementSibling.classList.add('active');
        }else{

            //选择第一个底部按钮
            numberPoint[0].classList.add('active');

            //显示第一张图片
            imgs[0].classList.add('active');
        }
    }


    //左侧按钮点击时候触发的函数
    function leftClick(){
        //获取当前对应的底部按钮和显示的图片
        var x = document.getElementsByClassName('numberPoint active')[0];//当前选择的按钮
        var y = document.getElementsByClassName('image-item active')[0];//当前显示的图片

        //当前按钮取消选择
        x.classList.remove('active');

        //隐藏当前显示的图片
        y.classList.remove('active');

        //判断当前所选的是否是第一个图片和按钮，如果是 再点击上一张则跳转到最后一个按钮和图片
        if(x.previousElementSibling){

            //选择上一按钮
            x.previousElementSibling.classList.add('active');

            //显示上一张土拍你
            y.previousElementSibling.classList.add('active')
        }else{

            //选择最后一个按钮
            numberPoint[numberPoint.length - 1].classList.add('active');

            //选择最后一个图片
            imgs[imgs.length - 1].classList.add('active');

        }

    }

    //自动播放轮播图开启定时器
    setInterval(rightClick,3000);


})()


