/**
 * Created by Hello on 2016/11/2.
 */

// window.onload = function(){
//     var succeed = function(data) {
//         console.log(data);
//
//         for(var i=0;i<data.data.length;i++){
//             console.log(data.data[i].houseName.substr(0,8));
//             console.log(data.data[i].buildingArea+'㎡');
//             console.log(data.data[i].houseSale+'万');
//             console.log(data.data[i].houseStyles);
//
//             var housedata = [
//                 {
//                     // areaName: data.data[i].areaName,
//                     // buildingArea: data.data[i].buildingArea,
//                     // buildingStructure: data.data[i].buildingStructure,
//                     // buildingType: data.data[i].buildingType,
//                     // buildingYear: data.data[i].buildingYear,
//                     // detailAddress: data.data[i].detailAddress,
//                     // employeeId: data.data[i].employeeId,
//                     // employeeName: data.data[i].employeeName,
//                     // followId: data.data[i].followId,
//                     // followLastTime: data.data[i].followLastTime,
//                     // havePic: data.data[i].havePic,
//                     // houseFloor: data.data[i].houseFloor,
//                     // houseId: data.data[i].houseId,
//                     // houseName: data.data[i].houseName,
//                     // houseNum: data.data[i].houseNum,
//                     // houseOrientation: data.data[i].houseOrientation,
//                     // housePurpose: data.data[i].housePurpose,
//                     // houseRenovation: data.data[i].houseRenovation,
//                     // houseSale: data.data[i].houseSale,
//                     // houseScope: data.data[i].houseScope,
//                     // houseSeat: data.data[i].houseSeat,
//                     // houseStatus: data.data[i].houseStatus,
//                     // houseStyles: data.data[i].houseStyles,
//                     // houseType: data.data[i].houseType,
//                     // id: data.data[i].id,
//                     // inDoorArea: data.data[i].inDoorArea,
//                     // isEffect: data.data[i].isEffect,
//                     // isExcellent: data.data[i].isExcellent,
//                     // isKey: data.data[i].isKey,
//                     // isSaveFavorite: data.data[i].isSaveFavorite,
//                     // ownerId: data.data[i].ownerId,
//                     // ownerIdCard: data.data[i].ownerIdCard,
//                     // ownerName: data.data[i].ownerName,
//                     // ownerPhone: data.data[i].ownerPhone,
//                     // phone: data.data[i].phone,
//                     // plateName: data.data[i].plateName,
//                     // propertyAddress: data.data[i].propertyAddress,
//                     // publicOrPrivate: data.data[i].publicOrPrivate,
//                     // purposeDegree: data.data[i].purposeDegree,
//                     // rentMoney: data.data[i].rentMoney,
//                     // rentMoneyLeast: data.data[i].rentMoneyLeast,
//                     // rentType: data.data[i].rentType,
//                     // roomNo: data.data[i].roomNo,
//                     // saleLeast: data.data[i].saleLeast,
//                     // shopId: data.data[i].shopId,
//                     // shopName:data.data[i].shopName,
//                     // unitPrice: data.data[i].unitPrice
//                 }
//             ];
//             localStorage.setItem('hosedata',housedata);
//             console.log(housedata)
//         }
//
//         localStorage.setItem('housedata',[data.data]);
//         console.log('查看是否执行到此');
//         console.log(localStorage.getItem('housedata'));
//         if(data){
//             var houseInfo = localStorage.getItem('housedata');
//         }
//     };
// };

var component = Vue.extend({

});

var demo = new Vue({
    el:'#IM',
    data:{
        // houseinfos:this.housedata,
        houseinfos:[
            // {
            //     houseinfo:'国贸阳光经典户型，小区中庭位置...',
            //     housetype:this.housedata.houseStyles,
            //     housearea:this.housedata.buildingArea+'㎡',
            //     houseadd:'祥店',
            //     houseloupaninfo:'国贸蓝海',
            //     housekey:'有钥匙',
            //     houseprice:'670万'
            // },
            {
                houseinfo:'',
                areaName: '',
                buildingArea: '',
                houseFloor: '',
                houseName: '',
                houseSale: '',
                houseStatus: '',
                houseStyles: '',
                isKey: ''
            }
        ]
    },
    ready:function(){
        console.log(this.houseinfos);
        console.log(this.housedata)
    },
    methods:{
        dosth:function(data){

            // housedetail();
            // console.log(data.data);
            // console.log(housedetail());
            // alert(data);
            // alert(housedetail());

            var succeed = function(res){
                console.log(res.data);
                for(var i=0;i<res.data.length;i++){
                    console.log(res.data[i].houseName);
                    console.log(res.data[i].buildingArea+'㎡');
                    console.log(res.data[i].houseSale+'万');
                    console.log(res.data[i].houseStyles);
                }
                // this.houseSale = res.data[i].houseSale;
                // this.houseStyles = res.data[i].houseStyles;
                // this.buildingArea = res.data[i].buildingArea;
                // this.houseName = res.data[i].houseName
            };
            var failed = function(err){
                console.log(err)
            };
            var requestData = {
                token:'6a09566d3e8048b696fe2225cbba6943',
                rentOrSall:1,
                pageNum:1,
                pageSize:20
            };
            beginAsyncAjax('/api/house/v1/findPageHouseInfo', requestData, 'post', succeed, failed)
        },
        tohouseDetail:function(){
            var  succeed = function(data){
                console.log(data);
                console.log(data.data)
            };
            var failed = function(err){
                console.log(err)
            };
            var postData = {
                houseId:4712,
                pageNum:1,
                pageSize:1000,
                employeeName:'',
                token:'6a09566d3e8048b696fe2225cbba6943'
            };
            beginAsyncAjax('/api/housefollow/v1/findPageHouseFollowReInfo?',postData,'post',succeed,failed);
            if(window.reload){
                console.log(this.houseinfos);
                $('.ir1').html(this.houseinfos.houseName);
                $('.ir2').html(this.houseinfos.houseStyles);
                $('.ir3').html(this.houseinfos.buildingArea);
                $('.ir4').html(this.houseinfos.houseSale);

                var houseinfos = this.houseinfos;
                localStorage.setItem('houseinfos',houseinfos);
                console.log(localstroage.getItem('houseinfos'))
            }else{
                this.tohouseDetail();
                console.log('此处数据获取完成');

                //当没有数据时，默认显示
                if(this.houseinfos.houseSale == ''){
                    houseinfos.houseSale = '--';
                }else if(this.houseinfos.buildingArea == ''){
                    alert('必要字段')
                }
                $('.ir1').html().substr(0,14);
                $('.ir2').html().substr(0,14)
            }
        },
        getArea:function(){
            var succeed = function(areaData){
                console.log(areaData);
                houeinfos.housePic
            };
            var failed = function(err){
                console.log(err);
            };
            var requestArea = {
                areaId:this.houseinfos.areaId,
                // token:'6a09566d3e8048b696fe2225cbba6943'
                token:localStorage.getItem('token')
            };
            beginAsyncAjax('/api/houseDictionary/v1/queryOpenAreaUnderHousesDictory?',requestArea,'post',succeed,failed)
        },
        getAreaDetail:function(){
            var succeed = function(areaData){
                console.log(areaData);
                houeinfos.housePic = []
            };
            var failed = function(err){
                console.log(err);
            };
            var requestArea = {
                houseDictionaryId:this.houseinfos.areaId
            };
            beginAsyncAjax('/api/houseDictionary/v1/queryHouseDictionaryDetailOne?',requestArea,'get',succeed,failed)
        }
    }
});