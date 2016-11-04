/**
 * Created by brus on 15-11-15.
 */
//	我的弹出框测试用
function myAlert(text){
	alert(text);
}
function myLog(text){
	console.log(text);
}
//ip拨打
function ipPhone(tel) {
	myAlertShow('功能开发中，敬请期待！！！');
}
//获得当前日期
function getNowDate(){
	var now=new Date();
	return now.getFullYear()+'-'+parseInt(now.getMonth()+1)+'-'+now.getDate();
}
// 打开窗口的记录
var layerAry = [];
function openMyModal(target, title, appointSize) {
	// 设置大小
	var applySize  = (!is_Empty(appointSize))?appointSize:'800px';
	// 获取目标对象
	var selector = null;
	switch(typeof(target)) {
		case 'string':
			selector = $(target);
			break;
		case 'object':
			selector = target;
			break;
	}
	if(!selector) return;
	// 设置配置---不可打开多个
	if(layerAry.length==0){
		layerAry[layerAry.length] = layer.open({
			type: 1,
			title: title,
			skin: '',
			area: [applySize, 'auto'],
			content: selector,
		});
		$(".layui-layer-close").click(
			function(){
				//alert('sss');
				closeMyModal();
			}
		);
	}else {
		layerAry[layerAry.length] = layer.open({
			type: 1,
			title: title,
			skin: '',
			area: [applySize, 'auto'],
			content: selector,
		});
		$(".layui-layer-close").click(
			function(){
				//alert('sss');
				closeMyModal();
			}
		);
	}
}

function closeMyModal(fg) {
	if(!fg) {
		layer.close(layerAry[layerAry.length-1]);
		layerAry.pop();
	}
	else {
		layer.closeAll();
		layerAry = [];
	}
}

// 判断数据是否存在空值或为空
function is_Empty(data, type) {
	if(type == 'object') {
		for(var i in data) {
			if(typeof(data[i]) == 'object') {
				if(is_Empty(data[i], 'object')) {
					return true;
				}
			}
			else{
				if(data[i] === '') {
					return true
				}
			}
		}
		return false;
	}
	else {
		return (data == null || data == '')?true:false;
	}
}

$(document).ready(function(){
	//            定义输入框的点击事件
	//storageRemove('userInfo');
	if(window.location.href.indexOf('login.html')>-1){

	}
	else {
		if(storageGet('userInfo')==null||storageGet('userInfo')=='null'){
			myAlertShow('请登录',3000);
			setTimeout(function(){
				if(window.location.href.indexOf('login.html')!=-1){
				}else {
					location.href='login.html';
				}
			},3000);
		}
	}
});
var token='21232f297a57a5a743894a0e4a801fc3';
//var dictionary='';
var genJinPageSize=1000;//跟进的一页数量；
var pageSize=10;
var isRepeat=0;//isRepeat(1重复房源，0不重复。默认为0)
var myPrivate=0;//myPrivate(1只查看自己的私盘+自己的公盘，0查看自己的和别人的公盘+自己的私盘。默认为0)
// 执行异步Ajax
// var httpUrl = "http://192.168.1.100:8080";//chaohong
//var httpUrl = "http://192.168.0.134:8080";//fuzhou
//   var httpUrl = 'http://139.224.43.151:80';//正式库；
// var httpUrl = 'http://139.224.45.98:8080';//开发测试库；
 //var httpUrl = 'http://192.168.10.37:8080';//永超；
// var httpUrl = 'http://192.168.0.105:8080';//王超jb
// var httpUrl = 'http://192.168.0.105:8080';
 // var httpUrl = '';
var httpUrl = 'http://139.224.45.98:8080';
var httpUrl_release='http://139.224.45.98:8082';//发布地址；
var httpUrl_detailImport='http://139.224.45.98:8083';//数据导入；
//模态框的列表请求个数（分页）

//获得url参数，或者是app传来的参数
function getArgumentsFromPageURL(){
    var param='';
    if(isInApi){
        param=api.pageParam;
    }else{
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

//显示弹出框
function myAlertShow(text,time){
	// parent.layer.alert(text);
	// var $box = parent.$("#myalertT");
	// var $mask = parent.$("#myalertF");
	// $box.find("#myalertText").html(text);
    //
    // $box.show();
    // $mask.show();
    //
	//var boxH = $box.height();
	//var boxW = $box.width();
	//var menu = parent.$('.navbar-default').width();
	//
	////设置位置
	//parent.$('.myalert').css({
	//	'top': ($(window).height() - boxH)/2 + 'px',
	//	'left': ($(window).width() - boxW - 40)/2 + menu + 'px'
	//});
	//if(time!=undefined){
	//	setTimeout(function(){
	//		$box.hide();
	//		$mask.hide();
	//	},time);
	//}else {
	//	setTimeout(function(){
	//		$box.hide();
	//		$mask.hide();
	//	},2000);
	//}
}

//关闭首页的弹出框
function closeMyalert(){
	parent.$("#myalertF").hide();
	parent.$("#myalertT").hide();
}
//显示加载中
function openLoad(){
	// alert('loading');
	// layer.load();
	parent.$("#myalertF").show();
	parent.$("#myloading").show();
}
//关闭加载中
function closeLoad(){
	// layer.closeAll('loading');
	// setTimeout(function () {
	// 	layer.closeAll('loading');
	// },300);
    //
    setTimeout(function(){
		parent.$("#myalertF").hide();
		parent.$("#myloading").hide();
    },1000);
}

//本地存储的方法
function storageGet(key){
	if(localStorage.getItem(key)!=undefined&&localStorage.getItem(key)!='undefined'){
		return $.parseJSON(localStorage.getItem(key));
	}else {
		return '';
	}
}
function storageSet(key,value){
	value = typeof value == 'object' ? JSON.stringify(value) : value;
	localStorage.setItem(key,value);
}
function storageRemove(key){
	localStorage.removeItem(key);
}
//一般的ajax
function beginAsyncAjax(url, requestData, type, succeed, failed) {
	// alert(testCount);
	openLoad();
    if (type == 'get' || type == 'GET') {
        var temstrings = '&';
	    //alert(JSON.stringify(requestData));
	    //alert(typeof(requestData));
	    if(requestData==''){
			//alert('sss');
		    temstrings = '';
	    }else {
		    for (var i in requestData) {
			    if (requestData[i] == 'undefined' || typeof (requestData[i]) == 'undefined')
				    temstrings = temstrings + i + "=&";
			    else
				    temstrings = temstrings + i + "=" + requestData[i] + "&";
		    }
	    }
        if (url.indexOf('?'))
            url = url + temstrings;
        else
            url = url + "?" + temstrings;
	    requestData='';
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
	if(url.indexOf('/v1/gotoRelease')!=-1||url.indexOf('/v1/validationAccount')!=-1){
		ajax(type, httpUrl_release+url, requestData, succeed, failed);
	}else {
		ajax(type, httpUrl+url, requestData, succeed, failed);
	}

}
//数据导入
function beginAsyncAjax_important(url, requestData, type, succeed, failed) {
	// alert(testCount);
	openLoad();
	if (type == 'get' || type == 'GET') {
		var temstrings = '&';
		//alert(JSON.stringify(requestData));
		//alert(typeof(requestData));
		if(requestData==''){
			//alert('sss');
			temstrings = '';
		}else {
			for (var i in requestData) {
				if (requestData[i] == 'undefined' || typeof (requestData[i]) == 'undefined')
					temstrings = temstrings + i + "=&";
				else
					temstrings = temstrings + i + "=" + requestData[i] + "&";
			}
		}
		if (url.indexOf('?'))
			url = url + temstrings;
		else
			url = url + "?" + temstrings;
		requestData='';
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
	if(url.indexOf('/v1/gotoRelease')!=-1||url.indexOf('/v1/validationAccount')!=-1){
		ajax(type, httpUrl_release+url, requestData, succeed, failed);
	}else {
		ajax(type, httpUrl_detailImport+url, requestData, succeed, failed);
	}

}

/*ajax封装方法*/
function ajax(method, url, datas, cb, errf) {
    $.ajax({
        url : url,
	    //contentType: "application/json",
	    timeout:3000,
        data : datas,
        type : method,
	    cache : false,
	    //同步
	    async : false,
	    dataType : "json",
        success : function(data) {
	        closeLoad();
            var responseObj = data;
            if (responseObj.result=='success') {
                cb((data));
            } else {
	            if(data.code=='1018'){
	            	//closeMyModal(true);
					myAlertShow('权限不够！');
	            }else if(data.code=='1014'){
	            	//closeMyModal(true);
		            myAlertShow('请重新登录！');
					setTimeout(function(){
						parent.location.href='login.html';
					},1000);
	            }
	            else {
		            errf((data));
	            }
            }
        },
        error : function(err) {
	        closeLoad();
	        //errf((err));
	        myAlertShow('服务器繁忙，请稍后再试！');
        }
    });
}
//打开新的页面；
function openWin(url){
	location.href=url+'.html';
}

/*文件上传的ajax*/
function beginFileAjax(url, fileId, param, success) {
    //	httpUrl+
    var urlL = '';
    if (false) {//原生的
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
            //		var datas=data;
            //		alert("ssss"+datas.datas.file_insert);
            success(data);
        }
    });
}


//正则去掉东西
function removeHTMLTag(str) {
    str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
    //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
    str=str.replace(/ /ig,'');//去掉
    return str;
}
//检查是否登录
function checkLogin(){
	if(storageGet('userInfo')==''||storageGet('userInfo')==null){
		//parent.location.href='login.html';
	}
}

//图片开始拖拽
var startindex=0;//记录开始拖拽的下标；
var startTar='';
function myDStart(ev,tar,index) {
	startindex=index;
	startTar=tar;
}
//接受拖拽的东西
function myDrop(ev,tar,index) {
	ev.preventDefault();
	if(startTar==tar){
		if(startindex<index){
			fileInfoAry[tar].splice(index+1,0,fileInfoAry[tar][startindex]);
			fileInfoAry[tar].splice(startindex,1);
			// fileInfoAry[tar].splice(startindex,0,fileInfoAry[tar][index+1]);
			// fileInfoAry[tar].splice(startindex+1,1);
			// fileInfoAry[tar].splice(index+1,1);
		}else {
			fileInfoAry[tar].splice(index,0,fileInfoAry[tar][startindex]);
			fileInfoAry[tar].splice(startindex+1,1);
		}
		showImgList(tar);
	}
}
//
function allowDrop(ev,tar,index)
{
	ev.preventDefault();
}

//设置封面图片
function setMainPic(ev,tar2,index) {
    ev.preventDefault();
    ev.stopPropagation();
	fileInfoAry['companyLogo']=[];
	fileInfoAry['companyLogo'].push(fileInfoAry[tar2][index]);
	var tar='companyLogo';
	showImgList(tar);
    //发布列表里面的数据
	fileInfoAry['companyLogo2']=[];
	fileInfoAry['companyLogo2'].push(fileInfoAry[tar2][index]);
	var tar='companyLogo2';
	showImgList(tar);
}

//填充图片
function showImgList(tar) {
	//按钮对象
	var btnObj = 'selectfiles-' + tar;
	//容器对象
	var conObj = $('#' + btnObj).parents('.uploadWrap');
	conObj.find('.add-picList').empty();
	for(var i in fileInfoAry[tar]){
		var title='';
		var setTitle='<div class="setMain" onclick="setMainPic(event,\''+tar+'\','+i+');">设为封面</div>';
		if(tar.indexOf('indoor')!=-1){
			title='室内图片';
		}else if(tar.indexOf('outdoor')!=-1){
			title='户型图片';
		}else if(tar.indexOf('plotPics')!=-1){
			title='小区图片';
		}else if(tar.indexOf('companyLogo')!=-1){
			title='封面';
			setTitle='';
		}

		var imgUrl=fileInfoAry[tar][i].fileName;
		var $wrap = conObj.find('.add-picList');
		var len = $wrap.find('.inner-img').length - 1;
		var html = '';
		// html += '	 <div class=" pad10 uploadImg positionR" draggable="true" alt="'+tar+'" ondragstart="myDStart(event,\''+tar+'\','+i+');" ondrop="myDrop(event,\''+tar+'\','+i+')" ' +
		// 	'ondragover="allowDrop(event,\''+tar+'\','+i+')">';
		// html += '        <i class="fa fa-remove cursorP imgDel" style="font-size: 20px;" onclick="removeFileAry(this,' + len + ',\'' + tar + '\')"></i>';
		// html += '        <a class="col-sm-12" href="' + imgUrl + '" title="'+title+'" data-gallery="\''+tar+'\'">';
		// html += '            <img alt="image" src="' + imgUrl + '" style="width: 100%;">';
		// html += '        </a>' +setTitle;
        //
		// html += '    </div>';

        html += '        <a class=" pad10 uploadImg positionR" href="' + imgUrl + '" title="'+title+'" data-gallery="'+tar+'" ' +
            'draggable="true" ondragstart="myDStart(event,\''+tar+'\','+i+');" ondrop="myDrop(event,\''+tar+'\','+i+')" ' +
            'ondragover="allowDrop(event,\''+tar+'\','+i+')">' +
            '<i class="fa fa-remove cursorP imgDel" style="font-size: 20px;" onclick="removeFileAry(this,' + len + ',\'' + tar + '\')"></i>';
        html += '            <img alt="image" src="' + imgUrl + '" style="width: 100%;">';
        html += setTitle+'        </a>';
		$(html).appendTo($wrap);
	}
}

