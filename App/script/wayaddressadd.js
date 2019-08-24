
var postData = {
	usernumber:'',
	AreaCode:'',
	AreaName:'',
	ProvinceCode:'',
	ProvinceName:'',
	datatype: 1,
	MyAddress:'',
	MyTel:'',
	Nick:'',
	usernumber:'',
	CityCode:'',
	CityName:''
}
var provinceList = [],cityList=[],areaList=[];
$(document).ready(function () {
    //权限是否登录
    islogin();
    GetProvinceList();

    postData.usernumber = getusernumber();

    //监听省份切换
    $('#provinceSelect').on('change',function(){
    	var provinceCode = $(this).val();
    	// console.log('provice',province)
    	postData.ProvinceCode = provinceCode;
    	postData.ProvinceName = provinceList.find(item=>item.Key==provinceCode).Word;
    	GetCityList(provinceCode)
    })
    //监听城市切换
    $('#citySelect').on('change',function(){
    	var cityCode = $(this).val();
    	// console.log('provice',province)
    	postData.CityCode = cityCode;
    	postData.CityName = cityList.find(item=>item.Key==cityCode).Word;
    	GetArea(cityCode)
    })
     //监听区域切换
    $('#areaSelect').on('change',function(){
    	var code = $(this).val();
    	// console.log('provice',province)
    	postData.AreaCode = code;
    	postData.AreaName = areaList.find(item=>item.Key==code).Word;
    })
});

//所有省
function GetProvinceList()
{
    var sendurl = global.APP_PATH + "api/submit_ajax.ashx?action=app_queryProvince";
    //提交
    $.ajax({
        url: sendurl,
        type: "post",
        timeout: 60000,
        data: { "token": gettoken() },
        dataType: "json",
        success: function (rdata, type) {
            if (rdata.status == 1) {
            	provinceList = rdata.data;
            	
                 //初始化渲染省份select
                 rdata.data.forEach(function(item){
                 	$('#provinceSelect').append('<option value="'+item.Key+'">'+item.Word+'</option>')
                 })
                 //初始化第一条
            	postData.ProvinceCode = provinceList[0].Key;
            	postData.ProvinceName = provinceList[0].Word;
            	//
            	GetCityList(postData.ProvinceCode);
                 
            } else {
                weui.alert(rdata.msg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            weui.alert("状态：" + textStatus + "；出错提示：" + errorThrown);
        }
    });
}

//当前省下所有市
function GetCityList(ProvinceCode) {
    var sendurl = global.APP_PATH + "api/submit_ajax.ashx?action=app_queryCity";
    //提交
    $.ajax({
        url: sendurl,
        type: "post",
        timeout: 60000,
        data: { "token": gettoken(), "ProvinceCode": ProvinceCode },
        dataType: "json",
        success: function (rdata, type) {
            if (rdata.status == 1) {
            	cityList = rdata.data;
                postData.CityCode = rdata.data[0].Key;
                postData.CityName = rdata.data[0].Word;
                //初始化渲染市select
                 rdata.data.forEach(function(item){
                 	$('#citySelect').append('<option value="'+item.Key+'">'+item.Word+'</option>')
                 })
                 GetArea(postData.CityCode)
            } else {
                weui.alert(rdata.msg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            weui.alert("状态：" + textStatus + "；出错提示：" + errorThrown);
        }
    });
}
 
//当前市下的所有区
function GetArea(CityCode) {
    var sendurl = global.APP_PATH + "api/submit_ajax.ashx?action=app_queryArea";
    //提交
    $.ajax({
        url: sendurl,
        type: "post",
        timeout: 60000,
        data: { "token": gettoken(), "CityCode": CityCode },
        dataType: "json",
        success: function (rdata, type) {
            if (rdata.status == 1) {
            	areaList = rdata.data;
                postData.AreaCode = rdata.data[0].Key;
                postData.AreaName = rdata.data[0].Word;
                
                 //初始化渲染市select
                 rdata.data.forEach(function(item){
                 	$('#areaSelect').append('<option value="'+item.Key+'">'+item.Word+'</option>')
                 })
            } else {
                weui.alert(rdata.msg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            weui.alert("状态：" + textStatus + "；出错提示：" + errorThrown);
        }
    });
}

function ajaxPost(){
	['MyAddress','MyTel','Nick','datatype'].forEach(item=>{
		postData[item] = $('#'+item).val();
	})
	if(!postData.MyAddress){
		weui.alert('请输入地址');return;
	}
	if(!postData.Nick){
		weui.alert('请输入联系人');return;
	}
	if(!postData.MyTel){
		weui.alert('请输入电话');return;
	}
	// console.log('postData',postData)

	var sendurl = global.APP_PATH + "api/submit_ajax.ashx?action=app_AddWayAddress";
	//提交
    $.ajax({
        url: sendurl,
        type: "post",
        timeout: 60000,
        data:  {"token": gettoken(),...postData},
        dataType: "json",
        success: function (rdata, type) {
            if (rdata.status == 1) {
            	
                weui.alert('提交成功',function(){
                	window.history.back()
                });
            } else {
                weui.alert(rdata.msg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            weui.alert("状态：" + textStatus + "；出错提示：" + errorThrown);
        }
    });
	
}