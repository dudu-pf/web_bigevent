$(function() {
    var form = layui.form
    form.verify({
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            samePwd: function(value) {
                if (value === ('[name=oldPwd]').val()) {
                    return '新旧密码不能相同！'

                }
            },
            rePwd: function(value) {
                if (value !== $('[name =rePwd]').val()) {
                    return '两次密码不一致！'

                }
            }

        })
        //提交修改的密码
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status === 0) {
                    console.log(res.data);

                    return layui.layer.msg('更新密码失败！')

                }
                layui.layer.msg('更新密码成功！')
                console.log(res.data);

                // 重置表单
                //('.layui-form') 拿到jquery对象    $('.layui-form')[0]将jquery对象转换为dom对象，因为重置表单的方法reset()时原生dom的
                $('.layui-form')[0].reset()

            }
        })
    })

})