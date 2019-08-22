//初始化菜单

$(document).ready(function () {
    //权限是否登录
    islogin();
    var role = getuserrole();
    switch (role) {
        case 0:
            initMember();
            break;
        case 1:
            initEmployee();
            break;
        case 2:
            initWaySite();
            break;
    }
});

function initMember()
{
    initUse();
}
function  initEmployee()
{
    initUse();
}
function initWaySite()
{
    initUse();
}

function initUse()
{
    var use = getUser();
    var role = getuserrole();
    //dvUserinfo
    var html = "";
    html += '<a href="#">';
    html += '<div class="tu fl">';
    html += '<span></span>';
    html += '<img src="img/touxiang.png" />';
    html += '</div>';
    switch (role) {
        case 0:
            html += '<p class="tit fl">欢迎' + use.Name + '</p>';
            break;
        case 1:
            html += '<p class="tit fl">欢迎快递小哥,' + use.Name + '</p>';
            break;
        case 2:
            html += '<p class="tit fl">欢迎运营中心工作人员,' + use.Name + '</p>';
            break;
    }

     
    html += '<i class="iconfont icon-arrowright fr"></i>';
    html += '</a>';
    //html += '';
    $("#dvUserinfo").html(html);

   // dvdefaddress
    var dhtml = "";
    dhtml += '<p class="tit">广东省广州市越秀区中科大院</p>';
    $("#dvdefaddress").html(dhtml);
}