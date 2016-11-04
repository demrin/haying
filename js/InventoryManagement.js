function chooseAdd() {
    var selectadd = $('#selectadd');
    // var posAdd = $('.posAdd')

    if (selectadd.attr('alt') == 0) {
        selectadd.attr('src', '../image/angle-down.png');
        $('.chooseAdd').fadeIn(200);
        $('.hidshow').fadeIn(200);
        selectadd.attr('alt', 1)
    } else {
        selectadd.attr('src', '../image/angle-top.png');
        $('.chooseAdd').fadeOut(200);
        $('.hidshow').fadeOut(200);
        selectadd.attr('alt', 0)
    }
}

function chooseStyle() {
    var selecttype = $('#selecttype')
        // var posAdd = $('.posAdd')

    if (selecttype.attr('alt') == 0) {
        selecttype.attr('src', '../image/angle-down.png');
        $('.chooseStyle').fadeIn(200);
        $('.hidshow').fadeIn(200);
        selecttype.attr('alt', 1)
    } else {
        selecttype.attr('src', '../image/angle-top.png');
        $('.chooseStyle').fadeOut(200);
        $('.hidshow').fadeOut(200);
        selecttype.attr('alt', 0)
    }
}

function choosePrice() {
    var choosePrice = $('#selectprice')
        // var posAdd = $('.posAdd')

    if (choosePrice.attr('alt') == 0) {
        choosePrice.attr('src', '../image/angle-down.png');
        $('.choosePrice').fadeIn(200);
        $('.hidshow').fadeIn(200);
        choosePrice.attr('alt', 1)
    } else {
        choosePrice.attr('src', '../image/angle-top.png');
        $('.choosePrice').fadeOut(200);
        $('.hidshow').fadeOut(200);
        choosePrice.attr('alt', 0)
    }
}

function chooseHouse() {
    var chooseHouse = $('#selecthousestyle');
    // var posAdd = $('.posAdd')

    if (chooseHouse.attr('alt') == 0) {
        chooseHouse.attr('src', '../image/angle-down.png');
        $('.chooseHouse').fadeIn(200);
        $('.hidshow').fadeIn(200);
        chooseHouse.attr('alt', 1);
    } else {
        chooseHouse.attr('src', '../image/angle-top.png');
        $('.chooseHouse').fadeOut(200);
        $('.hidshow').fadeOut(200);
        chooseHouse.attr('alt', 0)
    }
}

function chooseMore() {
    var chooseMore = $('#selectmore')
        // var posAdd = $('.posAdd')

    if (chooseMore.attr('alt') == 0) {
        chooseMore.attr('src', '../image/angle-down.png');
        $('.chooseMore').fadeIn(200);
        $('.hidshow').fadeIn(200);
        chooseMore.attr('alt', 1)
    } else {
        chooseMore.attr('src', '../image/angle-top.png');
        $('.chooseMore').fadeOut(200);
        $('.hidshow').fadeOut(200);
        chooseMore.attr('alt', 0);
    }
}