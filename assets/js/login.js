$(function() {
    // 点击"去注册账号"的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    // 点击"去登录"的链接
    $('#link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    });

    // 自定义校验规则
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,16}$/,
            "密码必须6到16位，且不能出现空格"
        ],
        // 检验两次输入的密码是否一致
        repwd: function(value) {
            // 通过形参拿到确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 进行一次判断
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致!';
            }
        }
    });

    // 注册功能 监听提交事件
    $('#form_reg').on('submit', function(e) {
        // 阻止表单默认提交事件
        e.preventDefault();
        // 发送ajax 请求
        $.ajax({
            method: 'POST',
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val()
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功!');
                // 模拟手动登录事件
                $('#link_login').click();
            }
        });
    });
    // 登录功能
    $('#form_login').on('submit', function(e) {
        // 阻止表单默认提交事件
        e.preventDefault();
        // 发送ajax 请求
        $.ajax({
            method: 'POST',
            url: 'http://ajax.frontend.itheima.net/api/login',
            // 快速获取表单中的内容
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('登录成功!');
                // token保存到本地,后面的接口会用到
                localStorage.setItem('token', res.token);
                // 自动跳转
                location.href = '/index.html';
            }
        })
    })
})