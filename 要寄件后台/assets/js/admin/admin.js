var REG_MAIL = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
var REG_MPHONE = /^(?:13\d|15[89])-?\d{5}(\d{3}|\*{3})$/;
var REG_PASSWORD = /^(\w){6,20}$/;
var REG_USERNAME = /^[\s\u4e00-\u9fa5_a-zA-Z0-9_]{1,20}$/;
var REG_ADDRESSNAME = /^[\s\u4e00-\u9fa5_a-zA-Z0-9_]{2,25}$/;
var REG_PHONE_NUM = /^([0-9]){11}$/;
var REG_NUMBER=/^(-)?[0-9]{1,10}(.[0-9]{1,3})?$/;
var REG_INTNUMBER=/^[0-9]{1,10}?$/;
var REG_IDCARD=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
var REG_REALNAME = /^[\u4e00-\u9fa5]{2,6}$/;
var accordion;
$(function() {
	$(".menu").click(function(){
		var $menu=$(this);
		var bodyhide=$menu.find(".menu-body").is(":hidden");
		if(bodyhide){
			$menu.find(".menu-body").show();
		}else{
			$menu.find(".menu-body").hide();
		}
	});
	$(".menu").find(".menu-item").click(function(){
		var value=$.trim($(this).data("value")); 
		var txt=$.trim($(this).find("span").text()); 
		$(this).parents(".menu").find(".menu-select").find("option[value='"+value+"']").prop("selected",true);
		$(this).parents(".menu").find(".menu-head-content").val(txt);
	});
	accordion = new Accordion($('#accordion'), false); 
	
	$("#accordion .submenu a").click(function(){
		var item=$(this).data("tab"); 
		if(item!=''){
			$.cookie("item",item,{path:'/' });
		}
	});
	//左侧菜单选中逻辑
	var $item=$.cookie("item");
	if($item!=''&&typeof($item)!='undefined'){ 
		$("#accordion .submenu li a[data-tab='"+$item+"']").addClass("active");
		$("#accordion .submenu li a[data-tab='"+$item+"']").parents(".submenu").parent().find(".link").click();
	}
	
});
function history(){
	history.go(-1);
}

function showCreateTime(obj){
	return new Date(obj.createDate).Format("MM/dd HH:mm");
}

function clearFormData(){
	$("#addPanel").find("input").val("");
	$(".upload").parent().find("img").attr("src",AP_PAGE_PATH+"img/default.jpg");
	$('#addForm .placeholder').css('display','inline');
}

function returnToList(){
	hideAllPanel();
	$('#listPanel').show();
}

function hideAllPanel(){
	$('#listPanel, #addPanel,#viewPanel').hide();
}
function loadMenuData(){
	$.ajax({
		  type: 'POST',
		  url: AP_PAGE_PATH+"adm/json/cm/moudels",
		  dataType: 'json',
		  data: datastr,
		  async:true,
		  cache:false,
		  success: function(data, textStatus, jqXHR){
			if(!!data && data.isOk == true){
				var objs=data.datas;
				for(var i=0;i<objs.length;i++){
					var obj=objs[i];
					$("#moudelsDiv").append('<li><a href="admin/articlelist?moudel_id='+obj.id+'" data-tab="item99-'+obj,id+'"><i class="layui-icon">&#xe643;</i>'+obj.mname+' 文章</a></li>');
				}
				//左侧菜单选中逻辑
				var $item=$.cookie("item");
				if($item!=''&&typeof($item)!='undefined'){ 
					$("#accordion .submenu li a[data-tab='"+$item+"']").addClass("active");
					$("#accordion .submenu li a[data-tab='"+$item+"']").parents(".submenu").parent().find(".link").click();
				}
			}
		  },error: function(XMLHttpRequest, textStatus, errorThrown){
		  },complete:function(XHR, textStatus){
		  }
	});
}