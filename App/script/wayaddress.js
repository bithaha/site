//常用地址
$(document).ready(function () {
    //权限是否登录
    islogin();
    loadUI(1, 20, 1);
    /**/
    $('#tab li').click(function(){
        var datatype = $(this).data('type');
        $(this).addClass('on').siblings().removeClass('on');
        loadUI(1,20,datatype)
    })
});

function loadUI(pageindex, pagenum, datatype)
{
    console.log('global',global)
    var sendurl = global.APP_PATH + "api/submit_ajax.ashx?action=app_queryMyAddress";
    //提交
    $.ajax({
        url: sendurl,
        type: "post",
        timeout: 60000,
        data: { "token": gettoken(), "usernumber": getusernumber(), "pageindex": pageindex, "pagenum": pagenum, "datatype": datatype },
        dataType: "json",
        success: function (rdata, type) {
           // debugger;
            if (rdata.status == 1) {
                loadDataToUI(rdata.data);
            } else {
                weui.alert(rdata.msg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            weui.alert("状态：" + textStatus + "；出错提示：" + errorThrown);
        }
    });
}

//绑定数据e
function  loadDataToUI(data)
 {
     $('#list').empty();
     data.forEach(item=>{
         $('#list').append(`<dl class="list clearfloat box-s fl">
                            <dt>
                                <p class="fl">${item.ProvinceName}${item.CityName}${item.AreaName}${item.MyAddress}</p>
                                <span class="fr">${item.Nick}</span>
                            </dt>
                            <dd>${item.MyTel}</dd>
                        </dl>`)
     })
 }