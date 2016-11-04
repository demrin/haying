$(function(){
    // $('#mainForm').validate({
    //     rules:{
    //         pwd:{required:true,minlength:6},
    //         repwd:{required:true}
    //     },
    //     messages:{
    //         pwd:{
    //             required:'密码不能为空',
    //             minlength:'密码不小于6位'
    //         },
    //         repwd:{
    //             required:"两次密码不正确"
    //         }
    //     }
    // })
});

var store = new Store();

var layer = function(){
    // layer.msg('申请授权成功', {
    //     time: 0 //不自动关闭
    //     ,btn: ['我知道了', '']
    //     ,yes: function(index){
    //         layer.close(index);
    //         layer.msg(' O.o', {
    //             icon: 6
    //             ,btn: ['嗷','嗷']
    //         });
    //     }
    // });
};

//个人信息
// var userInfo = {
//     accountName:'',
//     id:0,
//     password:'',
//     shopId:0
// };
// var userInfo={"accountName":"admin","password":"123456","shopId":"171"};

//设置个人信息
// store.set('userInfo');

// 选择树形图
if(localStorage.getItem('treeData')!=undefined){
    tree = localStorage.getItem('treeData')
}

var treeView = function(){
    var succeed = function(data){
        shopFlag:localStorage.getItem('firmTick');
        console.log('获取成功');
        console.log(data);
        console.log(data.data[0]);
        console.log(data.data[0].childsList[0].name);
        console.log(data.data[0].childsList[0].id);
        console.log(data.data[0].childsList[1]);
        console.log(data.data[0].childsList[1].id);
        tree = function(ret){
            localStorage.setItem('treeData','ret,data');
            tree = ret.data
        };
        companyName = data.data[0];
        localStorage.setItem('companyName',companyName);
        console.log(companyName);

        function getOrgID(data,orgID){
            // if(!data.id){
            //     return data.id
            // }else{
            //     orgID.push(data.childsList[$index].id);
            //     var compID = data.keys(data);
            //     keys.forEach(function(i){
            //         getOrgID(data[i],orgID)
            //     })
            // }
            // return data.id;
            getOrgID()
        }
    };
    var failed = function(){
        console.log('树形图上无结构！');
        return false
    };
    var datas = {
        shopFlag:localStorage.getItem('firmTick')
    };
    beginAsyncAjax('/api/shop/v1/findRegistTreeShops?',datas,'post',succeed,failed);
};

//员工列表
// var getEmployList = function(){
//     if(!goRegister){
//         return
//     };
//     staffList = [];
//     var succeed = function(ret){
//         userInfo.accountName = 'admin';
//         selectTo = tree[0]
//     }
// };

//判定是否有登陆记录
window.onload = function(){
    if(localStorage.getItem('token')){
        $('#next').css('display','none');
        $('.re3').css('display','block');
        $('.firmName').html(localStorage.getItem('firmName'));
    }else{
        $('#next').css('display','block');
        // $('.re3').css('display','none');
        $('.re3').hide()
    }
};


var demo = new Vue({
    el: '#register',
    data: {
        //第一步验证码
        code:'',
        accountName:'',
        password:'',
        // shopId:this.firmID,
        shopFlag:'',
        firmName:'',
        company:this.firmName,
        companyName:'',
        userInfo : {
            accountName:'admin',
            id:0,
            password:'',
            shopId:localStorage.getItem('firmID')
        },
        regInfo : {
            accountName:'',
            password:'',
            shopId:function(){
                localStorage.getItem('firmID');
                // $('.chooseRegOrg').val()
            }
        },
        selectFg:localStorage.getItem('firmID'),
        userPwd:'',
        showChlid:false,
        staffList:[
            {name:this.userInfo}
        ],
        cpns:[
            {cpn:this.orgid}
        ],
        forname:localStorage.getItem('datasName')
    },
    ready:function(){
        // console.log(this.code);
        // console.log(this.firmName);
        // console.log(this.userPwd);
        // console.log(this.userInfo.password);
        // console.log(this.companyName);
        // console.log(this.cpn);
        // console.log(this.staffList)
    },
    methods: {

        //第一步，验证验证码
        next:function(){
            if(this.code == ''){
                alert('请填写验证码！')
            }
            else{
                var succeed = function(infos) {
                    setTimeout(function(){
                        $('#next').fadeOut(10);
                        $('.re3').fadeIn(100);
                    },500);

                    // token = '21232f297a57a5a743894a0e4a801fc3';
                    var token = infos.token;
                    firmID = infos.data.shopId;
                    firmName = infos.data.name;
                    firmTick = '8B19CDF28DE916A6';
                    shopId = firmID;
                    password = infos.password;

                    console.log(this.token);
                    console.log(firmID);
                    console.log(firmName);
                    console.log(firmTick);
                    console.log(password);

                    localStorage.setItem('infos',infos);
                    localStorage.setItem('token',token);
                    localStorage.setItem('firmID',firmID);
                    localStorage.setItem('firmName',firmName);
                    localStorage.setItem('firmTick',firmTick);
                    localStorage.setItem('password',password);

                    console.log(infos.data.name);
                    console.log(infos);
                    // $('.firmName').html(infos.data.name);
                };
                var failed = function(data) {
                    alert(data.message);
                    alert('shopNumber值'+code);
                    return;
                };
                var requestData = {
                    shopNumber: this.code
                };
                beginAsyncAjax('/api/user/v1/getShopBasicByShopNumber?', requestData, 'get', succeed, failed);
            }
        },

        //没有账号，去注册
        goRegister:function(){
            $('.re3').fadeOut(10);
            $('.re2').fadeIn(100);
            regInfo = {};
            selectTo = treeView[0].id;
            company = treeView[0].name
        },

        //授权注册
        register:function(){
            if(this.regInfo.password == ''){
                alert('请输入密码')
            }else if(this.regInfo.password.length <6){
                alert('密码最小长度6位')
            }else if(this.repwd == ''){
                alert('请确认密码')
            }else if(this.repwd != this.regInfo.password){
                alert('两次密码不一致！')
            }else{
                var succeed = function(data){

                    password = this.regInfo.password;
                    console.log(password);
                    localStorage.setItem('password',password);

                    $('.re2').fadeOut(10);
                    $('.re3').fadeIn(100);
                    console.log(data.message);
                    alert(data.message)
                };
                var failed = function(obj){
                    alert(obj.message);
                    console.log(obj);
                    console.log(obj.message);
                    console.log('为什么shopId传递不上去？')
                    return
                };
                // var regInfo={"accountName":"铁中棠","password":"111111","shopId":"57"};
                var datas = {
                    //state为  1 ，注册；为 0 登陆。
                    state:1,
                    jsonData:JSON.stringify(this.regInfo)
                };
                console.log(this.regInfo);
                // alert(this.regInfo);
                console.log(datas);
                // alert(datas);
                beginAsyncAjax('/api/user/v1/regOrLogin',datas,'post',succeed,failed);
            }
            // var regInfo = {
            //     accountName : this.regInfo.accountName,
            //     password : this.userPwd,
            //     shopId : this.shopId
            // };

        },

        //显示公司树形结构
        showTree:function(){
            // $('.tree').toggle()
            treeView()
        },

        //显示员工列表
        showEmployer:function(){
            // $('.employerList').toggle();
            // userInfo = this.userInfo;
            // //登陆时选择用户
            // var chooseEmployer = function(item){
            //     // userInfo.accountName = item.name;
            //     selectFg2 = false
            // };
            // chooseEmployer();
            // if(this.chooseFirm()){
                var succeed = function(res){
                    console.log(res);
                    for(var i=0;i<res.data.length;i++){
                        // console.log(res.data[i].name);
                        localStorage.setItem('datasName',res.data[i].name);
                        // console.log(localStorage.getItem('datasName'));
                        var forname = [res.data[i].name];
                        forname.forEach(function(name){
                            console.log(name)
                        });
                        // alert(forname);
                        this.forname = forname;
                        $('.selectright option').html(this.forname);
                    };
                    console.log('done over');
                    // if(!res.data){
                    //     this.userInfo.accountName = 'admin';
                    //     selectTo = tree[0].id;
                    //     return false;
                    //     this.cpn = this.orgid;
                    // }
                    // staffList = res.data;
                    // this.userInfo.accountName = defaultHas(res.data,'name');
                    // console.log(res);
                    // this.cpn = cpn;
                    // console.log(this.cpn);
                    // if(opVal= orgid){
                    //     console.log('相等');
                    //     $('.a').html(cpn)
                    // }
                };
                var failed = function(err){
                    console.log(err)
                };
                var params = {
                    shopId:'214'
                };
                beginAsyncAjax('/api/employee/v2/employeeListByShopId?',params,'post',succeed,failed);
            // }
        },

        //登陆
        login:function(){
            if(this.userPwd == ''){
                alert('请输入密码')
            }else{
                var userInfo = {
                    accountName:this.userInfo.accountName,
                    password:this.userPwd,
                    // shopId:localStorage.getItem('firmID')
                    // shopId:function(){
                    //     if(shopId)
                    // }
                };
                var succeed = function(obj){
                    alert('登陆成功');
                    console.log(obj);
                    console.log(token);
                    console.log('为什么没有userInfo？');
                    treeView();
                    // openWin('../index');
                };
                var failed = function(datas){
                    alert(datas.message);
                    console.log(userInfo);
                    console.log(datas);
                    return false
                };
                // var userInfo={"accountName":"admin","password":"123456","shopId":"171"};
                var datas = {
                    state:0,
                    jsonData:JSON.stringify(userInfo)
                };
                beginAsyncAjax('/api/user/v1/regOrLogin?',datas,'post',succeed,failed);
            }
            console.log(treeView());
            console.log(tree[0])
        },

        //公司/组织选择
        chooseFirm:function(item,$event){
            this.selectFg = false;
            // company = item.name;
            // selectTo = item.id;
            // selectTo = treeView[0].id;
            // company = treeView[0].name;
            // this.getlist();
            // treeView();

            var trees = function(){
                var succeed = function(data){
                    shopFlag:localStorage.getItem('firmTick');
                    for(var i=0;i<data.data[0].childsList.length;i++){
                        orgid = data.data[0].childsList[i].id;
                        this.orgid = orgid;
                        console.log(orgid);
                        var opVal = $('.select option:selected').text();
                        console.log(opVal);
                        cpn = data.data[0].childsList[i].name;
                        this.cpn = cpn;
                        console.log(this.cpn);
                        if(opVal= orgid){
                            console.log('相等');
                            $('.a').html(cpn)
                        }
                    }

                    console.log(this.orgid);
                    var tree = function(ret){
                        localStorage.setItem('treeData','ret,data');
                        tree = ret.data
                    };
                    companyName = data.data[0].name;
                    localStorage.setItem('companyName',companyName);
                    console.log(companyName);
                };
                var failed = function(){
                    console.log('树形图上无结构！');
                    return false
                };
                var datas = {
                    shopFlag:localStorage.getItem('firmTick')
                };
                beginAsyncAjax('/api/shop/v1/findRegistTreeShops?',datas,'post',succeed,failed);
                console.log(orgid);
            };
            trees(this.data);
        },

        //员工列表以及清空员工列表
        getList:function(){
            // if(!goLogin){
            //     return
            // }
            staffList = [
                {name:1}
            ];
            var succeed = function(res){
                if(!res.data){
                    userInfo.accountName = 'admin';
                    selectTo = tree[0].id;
                    return false
                }
                staffList = res.data;
                console.log(res)
            };
            var failed = function(err){
                console.log(err)
            };
            var params = {
                // shopId : localStorage.getItem('firmName')
                shopId:214
            };
            beginAsyncAjax('/api/employee/v2/employeeListByShopId?',params,'post',succeed,failed)
        },

        //已有账号，去登陆
        goLogin:function(){
            $('.re2').fadeOut(10);
            $('.re3').fadeIn(100);
        },

        //切换门店
        cut:function(){
            alert('切换门店将清楚所有信息，是否继续？')
            $('.re3').fadeOut(10);
            $('#next').fadeIn(100);
            localStorage.removeItem('firmID');
            localStorage.removeItem('firmName');
            localStorage.removeItem('token');
            localStorage.removeItem('firmTick');
        }
    }
});


