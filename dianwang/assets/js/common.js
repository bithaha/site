

$(function(){
	$(".sitebar .item-link").click(function(){
		$(this).parent().addClass('active').siblings().removeClass('active');
		if($(this).parent().find('.subnav')){
			$(this).parent().find('.subnav').slideDown();
		}
		$(this).parent().siblings().find('.subnav').slideUp();

		show_tab($(this).attr('type'));
	})
	$(".sitebar .subnav a").click(function(){
		$(this).parent().addClass('active').siblings().removeClass('active');
	})
})
var map;

function show_tab(type){
	$('#content-'+type).show().siblings('.main-content').hide();
	if(type==2 || !map){
		init_map();
	}
}


// 定义一个控件类，即function    
function ZoomControl(){    
    // 设置默认停靠位置和偏移量  
    this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;    
    this.defaultOffset = new BMap.Size(10, 10);    
}    
// 通过JavaScript的prototype属性继承于BMap.Control   
ZoomControl.prototype = new BMap.Control();

// 自定义控件必须实现initialize方法，并且将控件的DOM元素返回   
// 在本方法中创建个div元素作为控件的容器，并将其添加到地图容器中   
ZoomControl.prototype.initialize = function(map){    
    // 创建一个DOM元素   
    var div = document.createElement("div");    
    // 添加文字说明    
    div.appendChild(document.createTextNode("回到中心"));    
    div.classList.add('map-back-center');
    // 绑定事件，点击一次放大两级    
    div.onclick = function(e){  
        map.panTo(new BMap.Point(114.31758,30.550172));    
    }    
    // 添加DOM元素到地图中   
    map.getContainer().appendChild(div);    
    // 将DOM元素返回  
    return div;    
 }

function init_map(){
	map = new BMap.Map("map"); // 创建地图实例  
	var point = new BMap.Point(114.31758,30.550172);  // 创建点坐标  
	map.centerAndZoom(point, 13);                 // 初始化地图，设置中心点坐标和地图级别

	map.addControl(new BMap.NavigationControl());    
	map.addControl(new BMap.ScaleControl());    
	map.addControl(new BMap.OverviewMapControl());    

	map.setCurrentCity("武汉"); // 仅当设置城市信息时，MapTypeControl的切换功能才能可用  

	// 创建控件实例    
	var myZoomCtrl = new ZoomControl();    
	// 添加到地图当中    
	map.addControl(myZoomCtrl);

	load_marker();
}


function load_marker(){
	var list = [{
		"lon": 114.359549,
		"lat": 30.528772,
		"name": "国网宁波供电营业厅",
		"rank": "A级",
		"address": "宁波市海曙区中心西路",
		"phone": "0574-51101051",
		"worktime": "8:30-16:30周一-周日(国定节假日不营业)",
		"service": "人工柜台、自助设备、电子渠道"
	},{
		"lon": 114.357896,
		"lat": 30.549923,
		"name": "国网宁波供电营业厅1",
		"rank": "A级",
		"address": "宁波市海曙区中心西路",
		"phone": "0574-51101051",
		"worktime": "8:30-16:30周一-周日(国定节假日不营业)",
		"service": "人工柜台、自助设备、电子渠道"
	},{
		"lon": 114.397134,
		"lat": 30.508239,
		"name": "武汉工程大学",
		"rank": "A级",
		"address": "宁波市海曙区中心西路",
		"phone": "0574-51101051",
		"worktime": "8:30-16:30周一-周日(国定节假日不营业)",
		"service": "人工柜台、自助设备、电子渠道"
	}]

	list.map(function(item){
		var myIcon = new BMap.Icon("assets/images/marker.png", new BMap.Size(44, 64), {    
	        anchor: new BMap.Size(22, 60)/*下尖角距离图片左上角坐标*/
	    });      
		var marker = new BMap.Marker(new BMap.Point(item.lon,item.lat),{icon: myIcon});//创建标注
		var content = '名称：'+item.name;

		map.addOverlay(marker);
		addClickHander(content, marker);
	})


	function addClickHander(content,marker){  
        marker.addEventListener("click",function(e){  
        openInfo(" "+content,e)});  
    }  
    //++  
    var opts = {  
        width : 200,     // 信息窗口宽度  
        height: 80,     // 信息窗口高度  
        title : "站点信息" , // 信息窗口标题  
        enableMessage:true//设置允许信息窗发送短息  
	}; 
    function openInfo(content,e){  
        var p = e.target;  
        var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);  
        var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象   
        map.openInfoWindow(infoWindow,point);                //开启信息窗口  
    }  
}

