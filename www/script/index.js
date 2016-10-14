/**
 * Created by Administrator on 2016/10/14 0014.
 */
$(function () {
    //判断是否登陆
    var name = $.cookie('name');
    if (name) {
        //已登陆用户处添加个人信息类
        $('.user_name').html('<span class="glyphicon glyphicon-user"></span>' + name).addClass("online");
        //已登陆提问跳转提问
        $('.toAsk').click(function () {
            location.href = 'ask.html'
        });
        //已登陆回答跳转回答
        $(".messages").on("click", ".ask", function (e) {
            var question = $(this).attr("data-time");
            $.cookie("question", question);
            location.href = "/answer.html?question=" + question;
        });
    } else {
        //未登陆登录跳转登录
        $('.user_name').html('<span class="glyphicon glyphicon-user"></span>登录');
        //未登陆提问跳转登录
        $('.toAsk').click(function () {
            $.popup('请您先登录！', function () {
                location.href = 'login.html';
            })
        });
        //未登陆回答跳转登录
        $(".messages").on("click", ".ask", function (e) {
            $.popup('请您先登录！', function () {
                location.href = 'login.html';
            })
        });
    }
    //下拉个人详情
    $('body').on('click', '.user_name', function () {
        if ($(this).hasClass('online')) {
            $('.user_info').css({
                top: 50 + 'px',
                right: -10 + 'px'
            }).slideToggle();
        } else {
            location.href = "login.html"
        }
    });
    //退出登录
    $('.user_info a:last-child').click(function (event) {
        $.cookie('name', name, {expires: -1});
        $.popup('退出成功', function () {
            location.href = '/index.html'
        })
    });
    //跳转个人信息
    $('.user_info a:first-child').click(function () {
        location.href = 'upload.html'
    });

    //显示问答列表
    $.getJSON('/question', function (res, status) {
        if (status == 'success') {
            //所有问题的数据（包括问答）
            var allAsks = res.data;
            var html = '';
            allAsks.forEach(function (askObj, index) {
                html = html + "<li class=\"ask\" data-time=\"" + askObj.time + "\">"
                    + "<img src=\"uploads/" + askObj.name + ".jpg\" alt=\"\" class=\"user_photo fl\" width=\"64\" height=\"64\" onerror=\"this.src=\'/images/photo_default.jpg\'\"/>"
                    + "<h4 class=\"h2_title\">" + askObj.name + "</h4>"
                    + "<p class=\"p_text\">" + askObj.content + "</p>"
                    + "<p class=\"p_time\">" + formatTime(askObj.time) + "</p>"
                    + "</li>";
                if (askObj.answer instanceof Array) {
                    askObj.answer.forEach(function (answerObj) {
                        html = html + "<li class=\"answer\" data-time=\"" + answerObj.time + "\">"
                            + "<img src=\"uploads/" + answerObj.name + ".jpg\" alt=\"\" class=\"user_photo fl\" width=\"64\" height=\"64\" onerror=\"this.src=\'/images/photo_default.jpg\'\"/>"
                            + "<h4 class=\"h2_title\">" + answerObj.name + "</h4>"
                            + "<p class=\"p_text\">" + answerObj.content + "</p>"
                            + "<p class=\"p_time\">" + formatTime(answerObj.time) + "</p>"
                            + "</li>";
                    });
                }
            });
            $('.messages').append(html);
        }
    });
});
