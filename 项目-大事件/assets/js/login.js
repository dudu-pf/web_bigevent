$(function() {
    // 点击去注册账号的链接
    $('#link_reg').on('click', function() {
            $('.login-box').hide()
            $('.reg-box').show()
        })
        //点击去登录的链接
    $('#link_login').on('click', function() {
            $('.reg-box').hide()
            $('.login-box').show()
        })
        //从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
        // 通过form.verify自定义校验规则
    form.verify({
        //自定义了一个pwd的校验规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //校验两次密码是否一致
        repwd: function(value) {
            // 通过形参value拿到确认密码框中的内容，然后拿到密码框中的内容，判断是否相等，不相等retun一个错误消息
            var pwd = $('.reg-box [name =password]').val()
            if (pwd !== value) {
                return '确认密码一致'
            }
        }

    })


    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
            // 1. 阻止默认的提交行为
            e.preventDefault()
            var data = {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            }
            $.post('/api/reguser', data,
                function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message);
                    }
                    layer.msg('注册成功，请登录')
                        // 模拟人的点击行为
                    $('#link_login').click()
                })
        })
        //监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                console.log(res.token);
                //将登陆成功等到的token保存到localStorage中
                localStorage.setItem('token', res.token)
                    // 跳转到后台主页
                location.href = '/项目-大事件/index.html'
            }
        })
    })
})