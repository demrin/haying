Vue.directive({

});

var reSet = new Vue({
    el: '#reset',
    data: {
        password : '',
        reNewPwd : '',
        requestData : [
            phone = '',
            pwd = '',
            smsCode = ''
        ]
    },
    methods: {
        updatePwd:function(){
            if(this.reset.password == ''){
                alert('请输入初始密码')
            }else if(this.reset.newPwd == ''){
                alert('请输入新密码')
            }else if(this.reset.reNewPwd){
                alert('请确认新密码')
            }else if(this.reset.newPwd != this.reset.reNewPwd){
                alert('两次密码输入不一致')
            }else{
                var succeed = function(data) {
                    alert('保存成功');
                    console.log(data);
                };
                var failed = function(data) {
                    alert(data);
                    console.log(data);
                    console.log(data.message);
                    alert('更新失败');
                };
                var updatePwd = {
                    phone:this.accountName,
                    pwd:this.newPwd,
                    smsCode:[]
                };
                beginAsyncAjax('/apiw/user/v1/updatePwd',updatePwd,'post',succeed,failed )
            }
        },
        getPwdBefore:function(){
            var succeed = function(pwd){
                console.log(pwd)
            };
            var failed = function(){
                console.log(err)
            };
            var beforePwd = {

            };
            beginAsyncAjax()
        }
    }
});
