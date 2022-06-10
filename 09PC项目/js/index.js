//底部缩略图效果的实现
(function(){
    //获取元素
    var images = document.querySelector('#images')//缩略图包含元素
    var leftBtn = document.querySelector('#leftBtn')//获取左侧按钮
    var rightBtn = document.querySelector('#rightBtn')//获取右侧按钮
    var smallImage = document.querySelector('#smallImage img')//获取小图
    var bigImage = document.querySelector('#bigImage img')//获取大图

    //插入需要缩略图
    goodData.imgsrc.forEach(function(item){
        //创建一个显得img元素并
        var oneImage = new Image();
        //获取数组中的单个图片路径 赋值给新建的img元素
        oneImage.src = item.b;
        //将新建的img元素加入 包含元素中
        images.appendChild(oneImage);
    })

    //计算每次点击所需要滚动的距离  通过算数属性获取每张图片的边距 + 每个图片本身的宽度  设置每次滚动两张图片 则*2
    toLeft = (images.firstElementChild.offsetWidth + parseInt(getStyle(images.firstElementChild,'margin-right')))*2;
    
    
    //算出缩略图所能滚动中left所能到达的最小值
    var mixLeft = 5 * (images.firstElementChild.offsetWidth + parseInt(getStyle(images.firstElementChild,'margin-right'))) - images.offsetWidth;
    
    
    //点击右侧按钮实现滚动
    rightBtn.addEventListener('click',function(){
        /*
        //包含元素距离上级定位元素左侧的距离就是当前滚动的距离
        var nowleft = images.offsetLeft + toLeft;
        console.log(toLeft)
        */
        
        //获取当前的left的值
        var imagesLeft =parseInt(getStyle(images,'left'));
        
        //滚动值
        var nowleft = imagesLeft - toLeft;
        
        if(nowleft < mixLeft){
            nowleft = mixLeft;
        }
        
        //更改images left 的值
        images.style.left = nowleft + 'px';
    });

    //左侧按钮实现滚动
    leftBtn.addEventListener('click',function(){
        //获取当前的left的值
        var imagesLeft =parseInt(getStyle(images,'left'));
      
        //滚动值
        var nowleft = imagesLeft + toLeft;
        
        if(nowleft >= 0){
            nowleft = 0;
        }
        //更改images left 的值
        images.style.left = nowleft + 'px';
    });

    //点击缩略图 显示相应的放大图片
    //images.children 获取所有的缩略图的集合 HTNLcollection 数据类型没有 foreach 方法 需要借
    [].forEach.call(images.children,function(img,index){

        //给每个图片监听
        img.addEventListener('click',function(){
        
            //更改显小图显示的内容
            smallImage.src = img.src;
            //更改大图显示的内容
            bigImage.src = goodData.imgsrc[index].b;

        });
    })


})();

//实现放大镜效果
(function(){
    //获取元素
    var smallImage = document.querySelector("#smallImage");//小图
    var bigImage = document.querySelector('#bigImage');//大图
    var sb = document.querySelector('.sb');//放大镜

    //监听鼠标进入小图 则显示放大镜 和 大图 
    smallImage.addEventListener('mouseenter',function(){

        sb.style.display = 'block';
        bigImage.style.display = 'block';

    });

    //监听鼠标离开小图 则先取消显示放大镜 和 大图
    smallImage.addEventListener('mouseleave',function(){
        
        sb.style.display = 'none';
        bigImage.style.display = 'none';

    })

    smallImage.addEventListener('mousemove',function(event){
        //获取鼠标在 小图 元素上的位置
        var pointLeft = event.clientX - smallImage.getBoundingClientRect().left;
        var pointTop = event.clientY - smallImage.getBoundingClientRect().top;


        //放大镜坐标 = 鼠标到视口距离 - 小图元素到视口的距离 - 放大镜宽高的一半
        var left = pointLeft - sb.offsetWidth / 2; 
        var top = pointTop - sb.offsetHeight / 2;
        //判断 让 放大镜不会移除 小图区域
        if(left < 0){
            left = 0;
        }
        if(left > smallImage.clientWidth - sb.offsetWidth){
            left = smallImage.clientWidth - sb.offsetWidth;
        }
        if(top < 0){
            top = 0;
        }
        if(top > smallImage.clientHeight - sb.offsetHeight){
            top = smallImage.clientHeight - sb.offsetHeight;
        }

        //随鼠标移动更改放大镜的 位置  
        sb.style.left = left + 'px';
        sb.style.top = top + 'px';

        //滚动大图显示的坐标 小图坐标的两倍
        bigImage.scrollLeft = left * 2;
        bigImage.scrollTop = top * 2;
   
    })
})();

//侧边栏选项卡实现
(function(){

    //获取相关元素
    var detailTatle = document.querySelectorAll('#detailTatle span');//获取选项卡标题
    var detailContent = document.querySelectorAll('.detail-content');


    //给标题添加点击监听事件
    detailTatle.forEach(function(tatle,index){

        tatle.addEventListener('click',function(){

            //排他
            detailTatle.forEach(function(item,index){

                //移除 标题 的所有active 属性
                item.classList.remove('active');
                //移除 内容 上的所有 active 属性
                detailContent[index].classList.remove('active');

            });

            tatle.classList.add('active');
            detailContent[index].classList.add('active')

        });

    });


})();

//商品详情选项卡实现
(function(){

    //获取相关元素
    var tabs = document.querySelectorAll('#tab li');
    var items = document.querySelectorAll('#items .item')

    //监听选项卡的监听事件
    tabs.forEach(function(tab,index){
     
        tab.addEventListener('click',function(){
            //排他操作
            tabs.forEach(function(item,index){
        
                //清除选项卡的active属性
                item.classList.remove('active');
                //清除内容上的active属性
                items[index].classList.remove('active');

            });

            //给当前点击的选项卡添加active属性
            tab.classList.add('active')
            //对应的内容添加active属性
            items[index].classList.add('active')

        });


    });

})();

//商品价格区选项卡及各种内容是实现/配套商品
(function(){
    //获取怨元素
    var priceValue = document.querySelector('#priceValue');//价格显示标签
    var tabBox = document.querySelector('#tabs')//标签选项卡
    var theChoice = document.querySelector('#choice')//选中的选项卡显示区域
    var masterMoney = document.querySelector('#masterMoney')//配套商品处的主要商品价格
    var sum = document.querySelector('#sum')//数量框
    var up = document.querySelector('#up')//加号按钮
    var down = document.querySelector('#down')//减号按钮
    var checks =document.querySelectorAll('#checks input')//配套商品所有 check 选项
    var allMoney = document.querySelector('#allMoney');//算上配套商品的总金额
    var choiced = document.querySelector('#choiced');
    
    /*-------导入选项卡数据和其他数据--------------------------*/
    //定义一个数组用来存储dd选项卡的值
    var tabArr = new Array(goodData.goodsDetail.crumbData.length);
    //创建一个变量用来储存当前总价
    var goodPrice = goodData.goodsDetail.price;
    //创建一个变量来存储当选选购主要商品的个数
    var goodnNumbers = 1;
    //创建一个变量来存储选购配套商品和主要商品的价格合计
    var matchPrice = 0;
    //创建一个变量用来存储 配套上选中商品的数量
    var matchNumbers = 0;


    //获取价格
    priceValue.innerHTML = goodPrice;
    //获取配套商品处的主要商品价格
    masterMoney.innerHTML ="&yen;" + goodPrice;
    //初始化 算上配套商品的总金额
    allMoney.innerHTML ="&yen;" + goodPrice;
    //数量框的初始数量
    sum.value = goodnNumbers;

    goodData.goodsDetail.crumbData.forEach(function(item,dlIndex){

        //创建dl元素
        var elementDl = document.createElement('dl');
        //个每个dl元素添加索引属性
        elementDl.dataset.index = dlIndex;
        

        //创建 dt 元素
        var elementDt = document.createElement('dt');
        
        //给 dt 添加内容
        elementDt.innerHTML = item.title;
        
        //将 dt 元素插入对应的 dl 元素中
        elementDl.appendChild(elementDt);
        
        //遍历数组 获取 每组中的 dd 元素内容 并创建 dd 加入到dl中
        item.data.forEach(function(item,index){
            //创建 dd 元素 
            var elementDd = document.createElement('dd');
            //给创建的 dd 元素 添加 影响价格 的属性 以标记价格 从而选中与不选会影响 总价
            elementDd.dataset.price = item.changePrice;
            
            //给dd元素添加内容
            elementDd.innerHTML = item.type;

            /*-----给每组选项卡第一个选项添加默认选中状态-----*/
            if(index === 0){
                elementDd.classList.add('active');
                //同时将默认的 dd 选项卡 存入数组索引 对应的位置
                tabArr[elementDl.dataset.index] = elementDd;
            }

            //将创建的 dd 元素插入到 dl 中
            elementDl.appendChild(elementDd);

        });
        
        //将dl元素插入选项卡包含块 tabs 中
        tabBox.appendChild(elementDl);

    });
    /*--------------将默认显示内容在选择框显示出来-------------------------*/
    //获取元素
    var tabs = document.querySelectorAll('#tabs dd')//所有选项卡

    
    //函数：将 存储选中选项卡 的数组中存储的内容遍历 并插入 显示已选择的 选择器 choice
    function insert(){
        tabArr.forEach(function(item,index){
            if(item){
                //创建一个 子 div 元素
                var choiceBox = document.createElement('div');
                choiceBox.classList.add('choice-box');
                //给创建的选择框 标记 其在数组中的索引 方便通过该元素找到 其对应的选项卡
                choiceBox.dataset.index = index;
        
                
                //将数组中存储对应选项卡的值赋值给新建的 div 元素显示
                choiceBox.innerHTML = item.innerHTML;
        
                //创建一个关闭按钮用于关闭
                var close = document.createElement('span');
                //close.classList.add('close');
                close.innerHTML = 'X';
        
                //将关闭按钮 插入 到div 元素显示
                choiceBox.appendChild(close);
        
                //将div 元素显示 插入显示 区域
                theChoice.appendChild(choiceBox);
            }
        });
    }

    //函数：每次通过存储选中元素的 changePrice 的 值 对初始价格进行计算
    //每次操作倒是价格变化的事件都要调用该函数
    function getPrice(){
        goodPrice = goodData.goodsDetail.price;
        //遍历数组获取每个选中选项卡的 changePrice 的值
        tabArr.forEach(function(ddItem,index){
            //判断数组中的值不位空
            if(ddItem){
                //累加 改变默认的价格
                goodPrice += +ddItem.dataset.price;
                 
            }
        });
        goodPrice *= goodnNumbers;
        //更新 总价
        priceValue.innerHTML = goodPrice;

        //同步更改 配套商品处的主要商品价格
        masterMoney.innerHTML = '&yen' + goodPrice

        //更新 配套商品合计的价格
        allMoney.innerHTML = '&yen' + (goodPrice + matchPrice);

    }

    //先将创建选项卡时候的默认值显示
    insert();

 

    /*点击选项卡显示区域显示内容更新--------------------------- */
    tabs.forEach(function(dditem,ddindex){

        dditem.addEventListener('click',function(){
            //获取父元素所有后代集合进行排他
            var ddFather = dditem.parentElement.children;

            //排他
            [].forEach.call(ddFather,function(item){

                item.classList.remove('active');

            });
            //给当前点击的元素添加选中效果
            dditem.classList.add('active');

            //获取 被点击 dd 元素 父元素的 data-index 值 该值就是被点击元素在数组中存储的索引
            tabArr[dditem.parentElement.dataset.index] = dditem;
            
            //清空显示区域
            theChoice.innerHTML = null;

            //重新向更新选项卡显示区域显示内容
            insert();
            //总价更新函数
            getPrice();
        })

    });
    
    //委托元素监听 选项卡显示区域 判断 span 是 否是目标执行删除相应的选项卡
    theChoice.addEventListener('click',function(event){
  
        if(event.target.nodeName === 'SPAN'){
            //获取目标元素的数组索引
            var realTaget = event.target.parentElement.dataset.index;
            //通过数组获取对应的选项卡移除选中状态
            tabArr[realTaget].classList.remove('active');
            //通过数组获取对应的选项 通过父元素给第一个元素元素添加选中状态
            tabArr[realTaget].parentElement.children[1].classList.add('active');

           
            //移除相应的选项
            theChoice.removeChild(event.target.parentElement);
            

            //将 需要删除的 选项卡 对应的数组索引的值为空
            tabArr[realTaget] = null;

            //总价更新函数
            getPrice();
        }

    })

    /*实现数量框和加减按钮的效果----------------------*/
    //实现 + 按钮增加效果
    up.addEventListener('click',function(){
        goodnNumbers++;
        sum.value = goodnNumbers;
        getPrice();

    });
    //实现 - 按钮增加效果
    down.addEventListener('click',function(){
        goodnNumbers--;
        if(goodnNumbers < 1){
            goodnNumbers = 1;
        }
        sum.value = goodnNumbers;
        getPrice();

    });
    //实现修改 input 的内容价格变动
    sum.addEventListener('change',function(){
        var inputValue = + sum.value;
        //判断 用户 输入的值是否合法
        if(inputValue > 1){

            goodnNumbers = Math.floor(inputValue);

            //将 input 内容更新成合法数据
            sum.value = goodnNumbers;

        }else{

            goodnNumbers = 1;

            //将 input 内容更新成合法数据
            sum.value = goodnNumbers;

        }
        getPrice();
    })

    //给 配套 商品监听 click 事件
    checks.forEach(function(check,index){
    
        check.addEventListener('change',function(){    
   
            //判断 多选框是否被选中
            if(this.checked){
                //更新选中商品的数量
                matchNumbers++
                //计算选中商品的价格 价格存在表单的value中
                matchPrice += + this.value;

            }else{
                //更新选中商品的数量
                matchNumbers--
                //计算选中商品的价格 价格存在表单的value中
                matchPrice -= + this.value;
            }
            //显示已选中商品的数量
            choiced.innerHTML = matchNumbers;

            getPrice();
        });
    

        
        
    })

})();

//商品页侧边栏效果实现
(() => {
//获取元素
siderBar = document.querySelector('.sider-bar');//整个页面侧边栏元素
backIcon = document.querySelector('.back-top');//返回顶部那妞
listIcon = document.querySelector('.top-icon');//菜单按钮

//返回顶部按钮实习那
backIcon.onclick = () => {
    //设置滚动
    scrollTo({
        //滚动的坐标
        top:0,
        //设置滚动的状态 丝滑滚动
        behavior:'smooth'
    });
};

//菜单的打开与关闭
listIcon.onclick = () => {
    //菜单按变成关闭按钮 添加open属性
    listIcon.classList.toggle('open');
    //到开菜单内容 添加open属性
    siderBar.classList.toggle('open');
};


})();