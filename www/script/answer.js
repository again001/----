/**
 * Created by Administrator on 2016/10/14 0014.
 */
$(function () {
    //提交回答
    $('form').submit(function (ev) {
        ev.preventDefault();
        //判断是否登陆
        if ($.cookie('name')){
            //已登录提交回答
            var data = $(this).serialize();
            data = data + "&question=" + $.cookie("question");
            console.log(data);
            $.post('/user/answer',data,function (res,statusTxt,xhr) {
                if(statusTxt=="success"){
                    if (statusTxt=='success'){
                        if(res.code=='success'){
                            $.popup(res.content,function () {
                                location.href = 'index.html'
                            })
                        }else {
                            $.popup(res.content);
                        }

                    }

                }
            })
        }else {
            //未登录跳转登陆
            $.popup('请您先登录！',function () {
                location.href = 'login.html';
            })
        }
    });
});