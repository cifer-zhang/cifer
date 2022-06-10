(function(){
    //校验提交按钮
    var submit = document.querySelector('.user')
    //监听表单提交事件
    submit.addEventListener('submit',function(event){
        if(chekPassword() && chekRepassword() && chekUsermail() && chekUsermail()){

        }else{
            event.preventDefault();
        }
    })

    //校验用户名 长度为4-16位的字符-----------------

    //获取用户名文本框
    var username = document.querySelector('.username')
    var inputusername = document.querySelector('.inputusername')

    //监听用户名文本框失去焦点事件
    username.addEventListener('blur',chekUsername);



    //校验邮箱格式-------------------------------

    //获取邮箱元素
    var usermail = document.querySelector('.usermail')
    var inputusermail = document.querySelector('.inputusermail');

    usermail.addEventListener('blur',chekUsermail);



    //校验密码------------------------------------------
    var userpassword = document.querySelector('.userpassword')
    var inpuuserpassword = document.querySelector('.inpuuserpassword')

    userpassword.addEventListener('blur',chekPassword)


    //确认密码校验
    var reuserpassword = document.querySelector('.reuserpassword')
    var inputreuserpassword = document.querySelector('.inputreuserpassword')

    reuserpassword.addEventListener('blur',chekRepassword)



    //用户名校验
    function chekUsername(){
        //校验正则
        var theName =  username.value.match(/^\w{4,16}$/);
        if(theName === null){   
            inputusername.innerHTML = '请输入4-16位字母或数字';
            inputusername.style.color = 'red';
            return false;
        }else{
            inputusername.innerHTML = '用户名可用';
            inputusername.style.color = 'green';
            return true;
        }
    }

    //邮箱校验
    function chekUsermail(){
        //校验正则
        var theName =  usermail.value.match(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
        if(theName === null){   
            inputusermail.innerHTML = '邮箱格式不正确';
            inputusermail.style.color = 'red';
            return false;
        }else{
            inputusermail.innerHTML = '邮箱可用';
            inputusermail.style.color = 'green';
            return true;
        }
    }
    
    //密码校验
    function chekPassword(){
        //校验正则
        if(userpassword.value.length < 6 || userpassword.value.length > 18){   
            inpuuserpassword.innerHTML = '请设置6-18位密码';
            inpuuserpassword.style.color = 'red';
            return false;
        }else{
            inpuuserpassword.innerHTML = '密码可用';
            inpuuserpassword.style.color = 'green';
            return true;
        }
    }

    function chekRepassword(){
        //校验正则
        if(reuserpassword.value !== userpassword.value){   
            inputreuserpassword.innerHTML = '密码不一致请确认';
            inputreuserpassword.style.color = 'red';
            return false;
        }else{
            inputreuserpassword.innerHTML = '密码一致';
            inputreuserpassword.style.color = 'green';
            return true;
        }
    }

})();