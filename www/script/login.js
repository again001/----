/**
 * Created by Administrator on 2016/10/14 0014.
 */
$(function () {
    //提交登陆信息
    $('form').submit(function (ev) {
        ev.preventDefault();
        var data = $(this).serialize();
        $.post('user/login',data,function (res,statusTxt) {
            if(statusTxt=='success'){
                if(res.code=="success"){
                    $.cookie("name",res.data.name);
                    $.popup(res.content,function () {
                        location.href = "index.html";
                    });
                }else {
                    $.popup(res.content);
                }
            }
        });
    });
    //跳转注册
    $('.user').click(function () {
        location.href = 'register.html';
    });
});