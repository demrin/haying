/**
 * Created by Hello on 2016/10/12.
 */
mui.init({
    swipeBack: false
});
(function($) {
    $('.mui-scroll-wrapper').scroll({
        indicators: true //是否显示滚动条
    });

    <!--选择获取贷款面板 -->

    var html2 = '<div class="calculator" style="margin-top: 50px">' +
        '<div class="calcu"><span class="be-in si">贷款总额：</span><span class="span-input si"><input type="text" placeholder="200万元"></span></div>' +
        '<div class="calcu"><span class="be-in si">贷款年限：</span><span class="span-input si"><input type="text" placeholder="30年"></span></div>' +
        '<div class="calcu"><span class="be-in si">贷款方式：</span><span class="span-input si"><input type="text" placeholder="等额本息"></span></div>' +
        '<div class="calcu"><span class="be-in si">贷款利率：</span><span class="span-input si"><input type="text" placeholder="公积金贷款利率4.9%"></span></div>' +
        '<div class="calcu"><span class="total">计算</span></div>' +
        '<div style="height: 20px;background-color: #F2F2F2"></div>' +
        '<div class="shoucal">' +
        '<span class="be-in mortgage">' +
        '贷款总额' +
        '<h3>3141357.50元</h3>' +
        '</span>' +
        '<span class="be-in mortgage">' +
        '支付利息' +
        '<h3>1141357.50元</h3>' +
        '</span>' +
        '</div>' +
        '<div class="shoucal">' +
        '<span class="be-in mortgage averagemonth">' +
        '月均还款' +
        '<h3>3141357.50元</h3>' +
        '</span>' +
        '</div>' +
        '</div>';
    var html3 = '<div class="calculator" style="margin-top: 50px">' +
        '<div class="calcu"><span class="be-in si">商业贷款：</span><span class="span-input si"><input type="text" placeholder="150万元"></span></div>' +
        '<div class="calcu"><span class="be-in si">公积金贷款：</span><span class="span-input si"><input type="text" placeholder="100万元"></span></div>' +
        '<div class="calcu"><span class="be-in si">贷款年限：</span><span class="span-input si"><input type="text" placeholder="30年"></span></div>' +
        '<div class="calcu"><span class="be-in si">贷款方式：</span><span class="span-input si"><input type="text" placeholder="等额本息"></span></div>' +
        '<div class="calcu">' +
        '<span class="be-in si">利率：</span><span class="span-input si"><input type="text" placeholder="商业贷款基准利率4.9%"></span>' +
        '<span class="be-in si"></span><span class="span-input si"><input type="text" placeholder="公积金贷款利率4.9%"></span>' +
        '</div>' +
        '<div class="calcu"><span class="total">计算</span></div>' +
        '<div style="height: 20px;background-color: #F2F2F2"></div>' +
        '<div class="shoucal">' +
        '<span class="be-in mortgage" style="width:45%">' +
        '贷款总额' +
        '<h3>1141357.50元</h3>' +
        '</span>' +
        '<span class="be-in mortgage">' +
        '<span class="be-in mortgage averagemonth">' +
        '支付利息' +
        '<h3>1141357.50元</h3>' +
        '</span>' +
        '</div>' +
        '<div class="shoucal" >' +
        '<span class="be-in mortgage averagemonth">' +
        '月均还款' +
        '<h3>3141357.50元</h3>' +
        '</span>' +
        '</div>' +
        '</div>';
    var item2 = document.getElementById('item2mobile');
    var item3 = document.getElementById('item3mobile');
    document.getElementById('slider').addEventListener('slide', function(e) {
        if (e.detail.slideNumber === 1) {
            if (item2.querySelector('.mui-loading')) {
                setTimeout(function() {
                    item2.querySelector('.mui-scroll').innerHTML = html2;
                }, 500);
            }
        } else if (e.detail.slideNumber === 2) {
            if (item3.querySelector('.mui-loading')) {
                setTimeout(function() {
                    item3.querySelector('.mui-scroll').innerHTML = html3;
                }, 500);
            }
        }
    });

})(mui);