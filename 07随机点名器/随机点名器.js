(function(){
    //定义一个点名用数组
    var names = ['左慈','张辽','貂蝉','毋丘俭','刘赞','巨兽','孙子','流放','关银屏','张星彩','步练师','刘封','孟达','甄姬','王异']

    //定义一个全局变量用于检测程序是否在运行
    var index = null;

    //获取事件元素
    var robt = document.querySelector('.robt');
    var action = document.querySelector('.action');

    //监听按钮点击事件
    action.addEventListener('click',function(){

        if(index){
            //清除定时器
            clearInterval(index);

            //修改按钮的文字
            action.innerHTML = '继续';

            //修改index的状态
            index = null;

        }else{
            //开启定时器
            index = setInterval(function(){
                //获取随机数 用来获取数组中随机索引对应的值
                var choiceName =Math.floor(Math.random() * names.length);

                //将数组中获取的值显示
                robt.innerHTML = names[choiceName];

            },10)

            //修改按钮的文字
            action.innerHTML = '停止';

            

        }

    });

})();