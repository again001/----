/**
 * Created by Administrator on 2016/10/14 0014.
 */
$(function () {
    //提交注册
    //拦截form表单的提交事件
    $('form').submit(function (ev) {
        ev.preventDefault();
        //把表单里的所有内容都读出来形成一个字符串
//                console.log($(this).serialize());
        //把表单里的所有内容读出来放在一个数组里
//                console.dir($(this).serializeArray());
        var data = $(this).serialize();
        //ajax向服务器发送请求
        $.post('user/register', data, function (res, statusTxt, xhr) {
            if (statusTxt == "success") {
                if (res.code == "success") {
                    $.popup(res.content, function () {
                        location.href = "login.html"
                    })
                } else {
                    $.popup(res.content);
                }
            }
        })
    })
});