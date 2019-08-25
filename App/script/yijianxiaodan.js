var postData = {
	ordernumber: "",
	FromName: "", 
	Fromtel: "", 
	Fromaddress: "", 
	Toname: "", 
	Toaddress: "", 
	Totel: "", 
	Filename: "", 
	Weight: "",  
	Remark: ""
}
$(function(){
	var jijianAddress = new addressService(1);
	var shoujianAddress = new addressService(2);
	jijianAddress.init();
	shoujianAddress.init();
})
//地址接口
function addressService(datatype){
	var address = {
		query:{
			pageindex: 1,
			pagenum: 1,
			datatype: datatype||''
		},
		list:[],//存储地址集合
		init:function(){

			this.getList();
			this.bindEvent();

		},
		getList:function(){
		    var sendurl = global.APP_PATH + "api/submit_ajax.ashx?action=app_queryMyAddressList";
		    var _this = this;
		    $.ajax({
		        url: sendurl,
		        type: "post",
		        timeout: 60000,
		        data: { "token": gettoken(), "usernumber": getusernumber(), "pageindex": _this.query.pageindex, "pagenum": _this.query.pagenum,"datatype":_this.query.datatype },
		        dataType: "json",
		        success: function (rdata, type) {
		           // debugger;
		            if (rdata.status == 1) {

		            	rdata.data.forEach(item=>{
		            		
		            	})
		                _this.loadData(rdata.data);
		            } else {
		                weui.alert(rdata.msg);
		            }
		        },
		        error: function (XMLHttpRequest, textStatus, errorThrown) {
		            weui.alert("状态：" + textStatus + "；出错提示：" + errorThrown);
		        }
		    });
		},
		loadData:function(data){
			var _this = this;
			var container = this.query.datatype==1?$('#jijianAddressList'):$('#shoujianAddressList');
			var curentLength = _this.list.length;
			data.forEach((item,i)=>{
				container.append(`<li class="clearfloat" data-index="${curentLength+i}">
	                <div class="addr">${item.ProvinceName}${item.CityName}${item.AreaName}${item.MyAddress}</div>
	                <div class="name">${item.Nick}</div>
	                <div class="tel">
	                    <span class="default"></span>
	                    ${item.MyTel}
	                </div>
	            </li>`);
	            _this.list.push(item);
			})
		},
		bindEvent:function(){
			var _this = this;
			var container = this.query.datatype==1?$('#jijianAddressList'):$('#shoujianAddressList');
			var trigger = this.query.datatype==1?$('#jijiantrigger'):$('#shoujiantrigger')
			container.on('click','li',function(){
				var index = $(this).data('index');
				var item = _this.list[index];
				trigger.html(`<div class="txt">${item.ProvinceName}${item.CityName}${item.AreaName}${item.MyAddress}</div>
                        <div class="txt">
                            <span>${item.Nick}</span>
                            <span>${item.MyTel}</span>
                        </div>
                        <i class="iconfont icon-arrowright fl"></i>`);
				$('#jijianCloseBtn,#shoujianCloseBtn').click();
				if(_this.query.datatype==1){
					postData.FromName = item.Nick;
					postData.Fromtel = item.Nick;
					postData.Fromaddress = item.ProvinceName+item.CityName+item.AreaName+item.MyAddress;
				}else{
					postData.ToName = item.Nick;
					postData.Totel = item.Nick;
					postData.Toaddress = item.ProvinceName+item.CityName+item.AreaName+item.MyAddress;
				}
			})
		}
	}
	return address;
}

//寄件人信息
function getAddressList(pageindex,pagenum,datatype)
{
	//寄件人,电话，地址,收件人，电话，地址，物品名称，重量，备注
    
}
//选择收件人
function selectShouJianRen()
{

}
//选择快件公司
function  selectFaxComp()
{

}
//提交订单
function ajaxPost()
{

}

function validate(){
	postData.Filename = $('#Filename').val();
	postData.Weight = $('#Weight').val();
	postData.Remark = $('#Remark').val();
	postData.ordernumber = $('#ordernumber').val();

	if(!postData.Fromaddress){
		weui.alert('请选择寄件人');return false;
	}
	if(!postData.Toaddress){
		weui.alert('请选择收件人');return false;
	}
	if(!postData.Filename){
		weui.alert('请输入物品名称');return false;
	}
	if(!postData.Weight){
		weui.alert('请输入包裹重量');return false;
	}
	return true;
}

//提交订单
function postdata(ordernumber,FromName, Fromtel, Fromaddress, Toname, Toaddress, Totel, Filename, Weight, Remark)
{
	if(!validate()){
		return;
	}

	
    //寄件人,电话，地址,收件人，电话，地址，物品名称，重量，备注
    var sendurl = global.APP_PATH + "api/submit_ajax.ashx?action=bill_AddOutWayBill";
    //提交
    $.ajax({
        url: sendurl,
        type: "post",
        timeout: 60000,
        data: { "token": gettoken(), "usernumber": getusernumber(),...postData },
        dataType: "json",
        success: function (rdata, type) {
            if (rdata.status == 1) {
                // debugger;
                weui.alert(rdata.msg);
                history.back();
            } else {
                weui.alert(rdata.msg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            weui.alert("状态：" + textStatus + "；出错提示：" + errorThrown);
        }
    });
}