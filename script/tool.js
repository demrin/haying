/**
 * Created by brus on 15-11-15.
 */
var isInApi=false;
var isIos=false;
var pageNum=10;//每一页的加载个数；
var reset=0;//分页用
function deviceReady(){

}
$(document).ready(function(){
//    window.location.reload();
//         如果在app里面就把这个注释掉
    FastClick.attach(document.body);
    //打包的时候注释
//      deviceReady();
});

apiready=function(){
    isInApi=true;
    isinApi=1;
    if(api.systemType==='ios'){
        isIos=true;
    }
    deviceReady();
};

//打开加载中。。。
function openLoading() {

//    s超过6秒后就自动关闭加载中；
    setTimeout(function(){ $("#loading").hide(200);},6000);
}

//关闭加载中。。。
function closeLoading() {
    setTimeout(function() {

    }, 500)
}
//我的alert
function myAlert(text, delaytime) {

    if (delaytime != undefined) {
        setTimeout(function() {

        }, delaytime);
    } else {
        setTimeout(function() {

        }, 1500);
    }
}

//打开frame的方式，通过区分是否在apicloud去调用不同的打开frame方式；
//previous page id, current page id
var prevPid = '', curPid = '';
//save opened frame name
var frameArr = [];
//frame whether open
function isOpened(frmName){
    var i = 0, len = frameArr.length;
    var mark = false;
    for(i; i<len; i++){
        if(frameArr[i] === frmName){
            mark = true;
            return mark;
        }
    }
    return mark;
}

function openFrame(type){
    if(isInApi){
        //record page id
        prevPid = curPid;
        curPid = type;
        if(prevPid !== curPid){
            // alert(type+':'+isOpened(type));
            if(isOpened(type)){
                api.setFrameAttr({
                    name: type,
                    hidden: false
                });
            }else{
                var width = api.winWidth;
                var height = api.winHeight;
                if(isIos){
                    api.openFrame({
                        name: type,
                        url: type +'.html',
                        bounces: false,
                        opaque: true,
                        vScrollBarEnabled: false,
                        rect: {
                            x: 0,
                            y:64,
                            w: width,
                            h: height-64-50
                        }
                    });
                }else{
                    api.openFrame({
                        name: type,
                        url: type +'.html',
                        bounces: false,
                        opaque: true,
                        vScrollBarEnabled: false,
                        rect: {
                            x: 0,
                            y:44,
                            w: width,
                            h: height-44-50
                        }
                    });
                }

            }
            if(prevPid){
                api.setFrameAttr({
                    name: prevPid,
                    hidden: true
                });
            }
            if(!isOpened(type)){
                //save frame name
                frameArr.push(type);
            }
        }
    }else{
        location.href=type+'.html';
    }
}

//跳转到下一个页面--商品详情页面
function openWin(type,param) {
    if(isInApi){
	    api.parseTapmode();
	    var nowtime=new Date().getTime();
	    api.openWin({
		    name : type,
		    url : type+'.html',
		    opaque: true,
		    bounces : false,
		    slidBackEnabled : true,
		    vScrollBarEnabled:true,
		    hScrollBarEnabled:true,
		    allowEdit:true,
		    softInputMode:"auto",//当键盘弹出时，输入框被盖住时，当前页面的调整方式，
		    pageParam:param,
		    animation : {
			    type : "push", //动画类型（详见动画类型常量）
			    subType : "from_right", //动画子类型（详见动画子类型常量）
			    duration : 300 //动画过渡时间，默认300毫秒
		    }
	    });
    }else{
        var pageParam='';
        for (var key in param)
        {
            pageParam+=(key+"="+param[key]+"&");
        }
        location.href=type+'.html?'+pageParam;
    }
}

//返回到。html并且刷新
function goBackToRef(win,frame){
    if(isInApi){
        api.execScript({
            name:win,
            frameName:frame,
            script: 'deviceReady();'
        });
    }
    goBack();
}
//返回方式
function goBack(){
    if(isInApi){
//            当在app中时level参数指的是当前win的名称
//关闭指定window，使用指定动画，若待关闭的window不在最上面，则动画无效
        api.closeWin({
            animation: {
                type: 'movein',
                subType: 'from_left',
                duration: 300
            }
        });
    }else{
        history.go(-1);
    }
}

//获得url参数，或者是app传来的参数
function getArgumentsFromPageURL(){
    var param='';
    if(isInApi){
        param=api.pageParam;
    }else
    {
        //构造参数对象并初始化
        var argumentsObj = new Object();
        var strURL = location.href.toString();
        var strArgumentsPartInURL = null;

        if ((strURL != undefined) && (strURL != null)) {
            var indexOfSeperator = strURL.indexOf("?");
            if (indexOfSeperator > 0) {
                //截取“?”后面的参数串
                strArgumentsPartInURL = strURL.substr(indexOfSeperator + 1);
                var indexKao = strArgumentsPartInURL.indexOf("?");
                if (indexKao > 0) {
                    //截取“?”后面的参数串
                    strArgumentsPartInURL = strArgumentsPartInURL.substr(indexKao + 1);
                }
            }
        }

        if ((strArgumentsPartInURL != undefined) && (strArgumentsPartInURL != null) && (strArgumentsPartInURL.length > 0)) {
            //将各参数分离形成参数数组
            var arrKeyValueOfArguments = strArgumentsPartInURL.split("&");
            for (var start = 0; start < arrKeyValueOfArguments.length; start++) {
                var strKeyValueOfArgument = arrKeyValueOfArguments[start];
                if ((strKeyValueOfArgument != undefined) && (strKeyValueOfArgument != null) && (strKeyValueOfArgument.length > 0)) {
                    var indexOfKeyValueSeperator = strKeyValueOfArgument.indexOf("=");
                    if (indexOfKeyValueSeperator > 0) {
                        //取得参数名称
                        var keyWithURLEncode = strKeyValueOfArgument.substring(0, indexOfKeyValueSeperator);
                        var key = decodeURI(keyWithURLEncode);
                        //取得参数值
                        var valueWithURLEncode = strKeyValueOfArgument.substr(indexOfKeyValueSeperator + 1);
                        var value = decodeURI(valueWithURLEncode);
                        //定义对象属性并初始化
                        argumentsObj[key] = value;
                    }
                }
            }
        }
        param= argumentsObj;
    }
    return param;
}

//滑倒最下面，加载更多适配app和html
function loadmore(cb){
    if(isInApi){
        api.addEventListener({
            name: 'scrolltobottom'
        }, function (ret, err) {
            cb(true);
        });
    }else{
//        documen
        reset=0;
        //滚动方法
        function cardbagMainListC_scrollFun(){
            var surplusHeight = screen.height; //差值(窗口的高度)
            //控制滚动条次数以及判断是否到达底部
            if (reset == 0) {
                var topAll = document.getElementById("main").scrollHeight; //body的高度
                var top_top = document.getElementById("main").scrollTop ; //卷上去的高度
                var result = topAll - top_top;
                if (result<=surplusHeight) {//到底了
                    cb(true);
                }else if(result==topAll){//到顶部

                }
            } else {
                setTimeout(function () { reset = 0; }, 1000);
            }
        }
        document.getElementById("main").onscroll =cardbagMainListC_scrollFun;
    }
}
//顶部的下拉刷新只在app中使用
function setReFlesh(cb){
    if(isInApi){
        api.setRefreshHeaderInfo({
            visible: true,
            // loadingImgae: 'wgt://image/refresh-white.png',
            bgColor: '#f2f2f2',
            textColor: '#4d4d4d',
            textDown: '下拉刷新...',
            textUp: '松开刷新...',
            showTime: true
        }, function (ret, err) {
            cb();
            api.refreshHeaderLoadDone();
        });
    }
}

//sessionStorage操作
function sessionStorageset(key, value) {
    if(isInApi){
        localStorage.setItem(key, value);
    }else{
        if(key=='loginkey'){
            localStorage.setItem(key, value);
        }else{
            sessionStorage.setItem(key, value);
        }
    }
}
function sessionStorageget(key) {
    if(isInApi){
        return localStorage.getItem(key);
    }else{
        if(key=='loginkey'){
            return  localStorage.getItem(key);
        }else{
            return sessionStorage.getItem(key);
        }
    }
}

function sessionStorageremove(key) {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
}

function sessionStorageclear() {
    localStorage.clear();
    sessionStorage.clear();
}

// 执行异步Ajax
// var httpUrl = "http://app.2yuanyou.cn/";
// var httpUrl = "http://139.224.43.52:8080/v2/";
//房鹰app地址
// var httpUrl = 'http://139.224.45.98:8080';
var isinApi=0;

function beginAsyncAjax(url, requestData, type, succeed, failed) {
    //    alert("11"+requestData.t_msg);
	openLoading();
    if (type == 'get' || type == 'GET') {
        var temstrings = '&';
        for (var i in requestData) {
            if (requestData[i] == 'undefined' || typeof (requestData[i]) == 'undefined')
                temstrings = temstrings + i + "=&";
            else
                temstrings = temstrings + i + "=" + requestData[i] + "&";
        }
        if (url.indexOf('?'))
            url = url + temstrings;
        else
            url = url + "?" + temstrings;
    } else if (type == 'post' || type == 'POST') {
        var temstrings = new Array();
        if ( typeof (requestData) == 'string') {
            var strs = requestData.split("&");
            for ( i = 0; i < strs.length; i++) {
                var tempsobject = strs[i].split("=");
                temstrings[i] = '"' + tempsobject[0] + '":"' + tempsobject[1] + '"';
            }
            var tempstweffwef = temstrings.join(",");
            var tettt = "{" + tempstweffwef + "}";
            requestData = JSON.parse(tettt);
        }
    }
    //httpUrl+
    if (isinApi == 1) {//原生的
        ajaxNavite(type, httpUrl + url, requestData, succeed, failed);
    } else {
        ajax(type, url, requestData, succeed, failed);
    }
}

/*ajax封装方法*/
function ajax(method, url, datas, cb, errf) {

    $.ajax({
        url : url,
        //        contentType: "application/json",
        data : datas,
        type : method,
        //        async:true,
        dataType : "json",
        success : function(data) {
            closeLoading();
            var responseObj = data;
            if (!responseObj.datas.error) {
                cb(JSON.stringify(data));
            } else {
                errf(JSON.stringify(data));
            }
        },
        error : function(err) {
            closeLoading();
            errf(JSON.stringify(err));
        }
    });
}

/*ajax封装方法*/
var isFirstInAjax = false;
function ajaxNavite(method, url, datas, cb, errf) {
    //	alert(url);
    if (method == 'post' || method == 'POST') {
        datas = {
            values : datas
        }
    }
    if (isFirstInAjax == false) {
        //		alert("firstin");
        setTimeout(function() {
            api.ajax({
                url : url,
                method : method,
                timeout : 30,
                dataType : 'json',
                returnAll : false,
//                cache:true,
                data : datas
            }, function(ret, err) {
                closeLoading();
                if (ret) {
                    var responseObj = ret;
                    if (!responseObj.datas.error) {
                        cb(JSON.stringify(ret));
                    } else {
                        errf(JSON.stringify(ret));
                    }
                } else {
                    if(sessionStorageget('isAlertNetError')==1){
                        setTimeout(function(){
                            "use strict";
                            sessionStorageset('isAlertNetError',0);
                        },30000);
                    }else{
                        sessionStorageset('isAlertNetError',1);
                        api.alert({
                            msg : "没有网络，请检查您的网络连接！"
                            //						msg : ('错误码：' + err.code + '；错误信息：' + err.msg + '网络状态码：' + err.statusCode)
                        });
                    }
                }
            });
        }, 0);
        isFirstInAjax = true;
    } else {
        //		alert("not_firstin");
        setTimeout(function() {
            api.ajax({
                url : url,
                method : method,
                timeout : 30,
                dataType : 'json',
                returnAll : false,
//                cache:true,
                data : datas
            }, function(ret, err) {
                closeLoading();
                if (ret) {
                    //		    alert(JSON.stringify(ret));
                    var responseObj = ret;
                    if (!responseObj.datas.error) {
                        cb(JSON.stringify(ret));
                    } else {
                        errf(JSON.stringify(ret));
                    }
                } else {
                    if(sessionStorageget('isAlertNetError')==1){
                        setTimeout(function(){
                            "use strict";
                            sessionStorageset('isAlertNetError',0);
                        },30000);
                    }else{
                        sessionStorageset('isAlertNetError',1);
                        api.alert({
                            msg : "没有网络，请检查您的网络连接！"
                            //						msg : ('错误码：' + err.code + '；错误信息：' + err.msg + '网络状态码：' + err.statusCode)
                        });
                    }
                }
            });
        }, 0);
    }
}

/*文件上传的ajax*/
function beginFileAjax(url, fileId, param, success) {
    //	httpUrl+
    var urlL = '';
    if (isinApi == 1) {//原生的
        urlL = httpUrl + url;
    } else {
        urlL = url;
    }
    $.ajaxFileUpload({
        url : urlL,
        secureuri : false,
        fileElementId : fileId,
        dataType : 'json',
        data : param,
        success : function(data) {
            //			var datas=data;
            //			alert("ssss"+datas.datas.file_insert);
            success(data);
        }
    });
}
var ydlext = "";
//原声文件上传接口
function nativeUploadFile(path, cb, errf) {
    openLoading();
    api.ajax({
        url : httpUrl + 'mobile/index.php?act=index&op=uploadFile&ext='+ydlext,
        method : 'post',
        timeout : 90,
        dataType : 'json',
        returnAll : false,
        data : {
            files : {
                "pic" : path
            }
        }
    }, function(ret, err) {
        closeLoading();
        if (ret) {
            var responseObj = ret;
            if (!responseObj.datas.error) {
                cb(JSON.stringify(ret));
            } else {
                errf(JSON.stringify(ret));
            }
        } else {
            api.alert({
                msg : "没有网络，请检查您的网络连接！"
            });
        }
    });
}
//表情初始化；

//正则去掉东西
function removeHTMLTag(str) {
    str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
    //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
    str=str.replace(/ /ig,'');//去掉
    return str;
}

//微信分享
function weixinShare() {"use strict";
    var record = JSON.parse(sessionStorageget('shareinfo'));
    var wx = api.require('wx');
    wx.shareWebpage({
        apiKey : 'wxc24cc56bd3c53a61',
        scene : 'timeline',
        title : record.title,
        description : record.content,
        thumb : localStorage.getItem('shareimg'),
//        thumb : 'widget://icon/ylf.png',
        contentUrl : record.shareurl
    }, function(ret, err) {
        if (ret.status) {
            myAlert('分享成功');
        } else {
	        myAlert('分享失败');

        }
    });
}

//分享到微信会话
function weixinShare_session() {
    var record = JSON.parse(sessionStorageget('shareinfo'));
    var wx = api.require('wx');
    wx.shareWebpage({
        apiKey : 'wxc24cc56bd3c53a61',
        scene : 'session',
        title : record.title,
        description :  record.content,
        thumb : localStorage.getItem('shareimg'),
//        thumb : 'widget://icon/ylf.png',
        contentUrl : record.shareurl
    }, function(ret, err) {
        if (ret.status) {
	        myAlert('分享成功');
        } else {
	        myAlert('分享失败');
        }
    });
}

//QQ分享
function qqShare() {
    var record = JSON.parse(sessionStorageget('shareinfo'));
    var obj = api.require('qq');
    obj.shareNews({
        url : record.shareurl,
        title : record.title,
        description :  record.content,
        imgUrl :  record.imgurl,
//        imgUrl : localStorage.getItem('shareimg'),
//        imgUrl : 'widget://icon/ylf.png',
        type : "QFriend"
    }, function(ret, err) {
        if (ret.status) {
	        myAlert('分享成功');
        } else {
	        myAlert('分享失败！');
        }
    });
}

//微博分享
function wbShare() {
    var record = JSON.parse(sessionStorageget('shareinfo'));
    var weibo = api.require('weibo');
    weibo.shareWebPage({
        text : record.content,
        title : record.title,
        description :  record.content,
        thumb :  localStorage.getItem('shareimg'),
//        thumb : 'widget://icon/ylf.png',
        contentUrl : record.shareurl
    }, function(ret, err) {
        if (ret.status) {
	        myAlert('分享成功');
            afterShare();
        } else {
	        myAlert('分享失败');
        }
    });
}


var token = '78b16c8c5f6ba6233916902e04fa716a'




