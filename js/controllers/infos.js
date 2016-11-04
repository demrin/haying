/**
 * Created by Hello on 2016/11/1.
 */
window.onload = function(){
    if(localStorage){
        alert('本地存有数据');
        console.log('本地有数据')
    }
};

var perinfos = new Vue({
    el:'#perinfos',
    data:{
        firmName:'房鹰科技'
    },
    ready:{

    },
    methods:{

    }
});
