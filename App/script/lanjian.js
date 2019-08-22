$(document).ready(function () {
    //权限是否登录
    islogin();
    var role = getuserrole();
    var datatype = $("#hddatatype").val();
    dataToUI(1, 20, datatype);
});
//绑定列表
function dataToUI(pageindex, pagenum, datatype) {
    var sendurl = global.APP_PATH + "api/submit_ajax.ashx?action=bill_QueryLanJian";

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
                loadData(rdata.data);
            } else {
                weui.alert(rdata.msg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            weui.alert("状态：" + textStatus + "；出错提示：" + errorThrown);
        }
    });
}
//加载列表数据
function loadData(data) {
    $("#dvlist").html('暂无数据');
    if (data != null) {
        var tmpl = "";
        var role = getuserrole();
        for (idx in data) {
            if (role < 2) {
                if (data[idx].ReceivedScanor == "") {

                }
            }

            tmpl += ' <div class="content clearfloat box-s">';
            tmpl += '    <div class="topsche-top box-s clearfloat">';
            tmpl += '       <p class="fl add">';
            if (data[idx].ReceivedmanID != "") {
                tmpl += '收件人:小哥,' + data[idx].Receivedman;
            }
            tmpl += '        </p>';
            tmpl += '         <p class="tit fr">';
            if (data[idx].ReceivedmanID != "") {
                if (data[idx].JFmanId == "")
                    tmpl += '收件中';
                else
                    tmpl += '已收件';
            }
            else
                tmpl += '待派中';

            //tmpl += '            待签收';
            tmpl += '         </p>';
            tmpl += '    </div>';
            tmpl += '    <div class="list clearfloat fl box-s">';
            tmpl += '         <a href="yundan.html?waybillid=' + data[idx].Number + '">';
            tmpl += '           <div class="tu clearfloat">';
            tmpl += '                <span></span>';
            tmpl += '                <img src="img/touxiang.png" />';
            tmpl += '           </div>';
            tmpl += '            <div class="right clearfloat">';
            tmpl += '              <div class="tit clearfloat">';
            tmpl += '                 <p class="fl">' + data[idx].Number + '</p>';
            tmpl += '              </div>';
            tmpl += '            <p class="recom-jianjie">地址:' + data[idx].Toaddress + '</p>';
            tmpl += '           <div class="recom-bottom clearfloat">';
            tmpl += '电话:' + data[idx].Totel;
            tmpl += '           </div>';
            tmpl += '           </div>';
            tmpl += '    </a>';
            tmpl += ' </div>';
            tmpl += ' <div class="topsche-top entrust box-s clearfloat">';
            if (role < 2) {
                if (data[idx].ReceivedmanID != "") {
                    if (data[idx].JFmanIdJFmanId == "") {
                        tmpl += '  <a href="javascript:void(0);qianshou(this);" class="tit fr entrust-btn">';
                        tmpl += '      签收';
                        tmpl += '  </a>';
                        if (role == 1) {
                            tmpl += '   <a href="javascript:void(0);tuihui(this);" class="tit fr entrust-btn rent-btn">';
                            tmpl += '       退回';
                            tmpl += '   </a>';
                        }
                    }
                }
            }
            tmpl += '  </div>';
            tmpl += ' </div>';

        }
        $("#dvlist").html(tmpl);
    }
}
//收件
function qiangdan(it) {
    
    var sendurl = global.APP_PATH + "api/submit_ajax.ashx?action=bill_Out_LanJian_QiangDan";
    //提交
    $.ajax({
        url: sendurl,
        type: "post",
        timeout: 60000,
        data: { "token": gettoken(), "usernumber": getusernumber(), "ordernumber": ordernumber },
        dataType: "json",
        success: function (rdata, type) {
           // debugger;
            if (rdata.status == 1) {
                //移除当前运单数据
            } else {
                weui.alert(rdata.msg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            weui.alert("状态：" + textStatus + "；出错提示：" + errorThrown);
        }
    });
}

//退回
function tuihui(it) {
    weui.confirm('你确认要退回当前运单['+"0000"+']嘛？', function () {
        location.href = linkurl;
    }, function () { }, {
    });
}
function ajaxtuihui(ordernumber)
{
    var sendurl = global.APP_PATH + "api/submit_ajax.ashx?action=bill_Out_LanJian_TuiHui";
    //提交
    $.ajax({
        url: sendurl,
        type: "post",
        timeout: 60000,
        data: { "token": gettoken(), "usernumber": getusernumber(), "ordernumber": ordernumber },
        dataType: "json",
        success: function (rdata, type) {
           // debugger;
            if (rdata.status == 1) {
              //移除当前运单数据
            } else {
                weui.alert(rdata.msg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            weui.alert("状态：" + textStatus + "；出错提示：" + errorThrown);
        }
    });
}

function ajaxtuihui(ordernumber) {
    var sendurl = global.APP_PATH + "api/submit_ajax.ashx?action=bill_Out_LanJian_TuiHui";

    //提交
    $.ajax({
        url: sendurl,
        type: "post",
        timeout: 60000,
        data: { "token": gettoken(), "usernumber": getusernumber(), "ordernumber": ordernumber },
        dataType: "json",
        success: function (rdata, type) {
           // debugger;
            if (rdata.status == 1) {
                //移除当前运单数据
            } else {
                weui.alert(rdata.msg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            weui.alert("状态：" + textStatus + "；出错提示：" + errorThrown);
        }
    });
}