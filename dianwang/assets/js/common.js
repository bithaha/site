(function(){
	function Navigate(opt){
		var _this = this;
		setTimeout(function(){
			if(!opt){
				throw new Error("参数不能为空");
			}
			var box = document.querySelector(opt.container);
			if(!box){
				throw new Error(selector+"容器不存在");
			}

			_this.box = box;
			var bgImg = new Image();
			bgImg.onload = function(){
				_this.init(bgImg, box);
				_this.bg = bgImg;
				if(_this.afterBgLoaded && (_this.afterBgLoaded instanceof Function)){
					_this.afterBgLoaded();
				}
			}
			bgImg.src = opt.bg;
		})
		
	}
	Navigate.prototype.init = function(bgImg, box){
		box.appendChild(bgImg);
		var iw = bgImg.offsetWidth,ih = bgImg.offsetHeight,w,h;
		if(iw/ih > box.offsetWidth/box.offsetHeight){
			w = iw>box.offsetWidth?box.offsetWidth:iw;
			h = w * ih/iw;
			bgImg.style.width = w +'px';
			bgImg.style.height = h +"px";
			this.scale = w/iw;
		}else{
			h = iw>box.offsetHeight?box.offsetHeight:ih;
			w = h * iw/ih
			bgImg.style.height = h +'px';
			bgImg.style.width = w+"px";
			this.scale = h/ih;
		}
		console.log(w+ '  '+h)
		box.style.width=w+'px';
		box.style.height=h+'px';
		
	}
	var currentPosition = {
		top: 300,
		left: 520
	}
	var list = [{
		id: 1,
		name: "人工业务办理区",
		images: [{
			id: 1,
			path: "assets/images/area-1.png",
			width: 679,
			height: 182,
			left: 155,
			top: 135
		}]
	},{
		id: 2,
		name: "自主业务办理区",
		images: [{
			id: 2,
			path: "assets/images/area-2.png",
			width: 247,
			height: 232,
			left: 584,
			top: 334
		}]
	},{
		id: 3,
		name: "自主业务办理区",
		images: [{
			id: 2,
			path: "assets/images/area-3.png",
			width: 475,
			height: 263,
			left: 620,
			top: 311
		}]
	},{
		id: 4,
		name: "自主业务办理区",
		images: [{
			id: 2,
			path: "assets/images/area-4.png",
			width: 364,
			height: 218,
			left: 623,
			top: 350
		}]
	},{
		id: 5,
		name: "自主业务办理区",
		images: [{
			id: 2,
			path: "assets/images/area-5.png",
			width: 169,
			height: 196,
			left: 392,
			top: 109
		}]
	},{
		id: 6,
		name: "自主业务办理区",
		images: [{
			id: 2,
			path: "assets/images/area-6.png",
			width: 476,
			height: 336,
			left: 25,
			top: 220
		}]
	}]
	Navigate.prototype.show = function(id){
		var _this = this;
		var area = list.find(function(item){return item.id == id});
		var showPathItem = function(imgItem){
			var pathDom = document.querySelector("#path_img_"+imgItem.id)
			if(!pathDom){
				var pathImg = new Image();
				pathImg.onload = function(){
					this.style.width = imgItem.width*_this.scale+'px';
					this.style.height = imgItem.height*_this.scale+'px';
					this.style.top = imgItem.top*_this.scale+"px";
					this.style.left = imgItem.left*_this.scale+"px";
					this.classList.add('path_img');
					_this.box.appendChild(pathImg);
				}
				pathImg.src=imgItem.path;
			}
		}
		var showPath = function(){
			$('.path_img').hide();
			setTimeout(function(){
				var curP = document.getElementById('currentPoint')
				curP.style.display = "block";
				curP.style.left = currentPosition.left*_this.scale+"px";
				curP.style.top = currentPosition.top*_this.scale+"px";
				area.images.map(function(item){
					showPathItem(item);
				})
			},100)
		}
		if(area){
			if(!_this.bg){
				_this.afterBgLoaded = showPath;
			}else{
				showPath()
			}
			
		}
	}
	window.Navigate = Navigate;
})()
var map,navigate;

navigate = new Navigate({container:".img-container",bg:"assets/images/yyt-1.jpg"});


$(function(){
	$(".sitebar .item-link").click(function(){
		$(this).parent().addClass('active').siblings().removeClass('active');
		if($(this).parent().find('.subnav')){
			$(this).parent().find('.subnav').slideDown();
		}
		$(this).parent().siblings().find('.subnav').slideUp();

		show_tab($(this).attr('type'),$(this));
	})
	$(".sitebar .subnav a").click(function(){
		$(this).parent().addClass('active').siblings().removeClass('active');
		navigate.show($(this).data("id"));
	});

	setTimeout(function(){
		$(".sitebar .item-link").eq(0).click();
	},100)
	

})

function show_tab(type,_this){
	$('#content-'+type).show().siblings('.main-content').hide();
	if(type==2 || !map){
		init_map();
	}
	if(type==1){
		_this.parent().find('.subnav').find('a').each(function(){
			$(this).parent().removeClass('active');
			navigate.show($(this).data("id"));
		})
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
	var point = new BMap.Point(114.5,30.550172);  // 创建点坐标  
	map.centerAndZoom(point, 13);                 // 初始化地图，设置中心点坐标和地图级别

	map.addControl(new BMap.NavigationControl());    
	map.addControl(new BMap.ScaleControl());    
	map.addControl(new BMap.OverviewMapControl());    

	// map.setCurrentCity("武汉"); // 仅当设置城市信息时，MapTypeControl的切换功能才能可用  

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
		"rank": "1",
		"address": "宁波市海曙区中心西路",
		"tel": "0574-51101051",
		"worktime": "8:30-16:30周一-周日(国定节假日休息)",
		"service": "人工柜台、自助设备、电子渠道",
		"iscurrent": 0
	},{
		"lon": 114.357896,
		"lat": 30.549923,
		"name": "国网宁波供电营业厅1",
		"rank": "2",
		"address": "宁波市海曙区中心西路",
		"tel": "0574-51101051",
		"worktime": "8:30-16:30周一-周日(国定节假日休息)",
		"service": "人工柜台、自助设备、电子渠道",
		"iscurrent": 0
	},{
		"lon": 114.397134,
		"lat": 30.508239,
		"name": "武汉工程大学",
		"rank": "3",
		"address": "宁波市海曙区中心西路",
		"tel": "0574-51101051",
		"worktime": "8:30-16:30周一-周日(国定节假日休息)",
		"service": "人工柜台、自助设备、电子渠道",
		"iscurrent": 1
	},{
		"lon": 114.397134,
		"lat": 30.59,
		"name": "武汉工程大学",
		"rank": "4",
		"address": "宁波市海曙区中心西路",
		"tel": "0574-51101051",
		"worktime": "8:30-16:30周一-周日(国定节假日休息)",
		"service": "人工柜台、自助设备、电子渠道",
		"iscurrent": 0
	}]
	
	var a = {
		"1":{
			icon: "assets/images/marker-1.png",
			rank: "A类"
		},
		"2":{
			icon: "assets/images/marker-2.png",
			rank: "B类"
		},
		"3":{
			icon: "assets/images/marker-3.png",
			rank: "C类"
		},
		"4":{
			icon: "assets/images/marker-4.png",
			rank: "非三型一化"
		}
	}
	
	/*保存当前点*/
	var current = list.find(function(a){return a.iscurrent});
	var currentPoint = current?new BMap.Point(current.lon,current.lat):null;
	list.map(function(item){
		add_marker(item);
	});

	function add_marker(item){
		var rank = a[item.rank];
		var myIcon = new BMap.Icon(rank.icon, new BMap.Size(52, 74), {    
	        anchor: new BMap.Size(26, 74)/*下尖角距离图片左上角坐标*/
	    });
	    var myPoint = new BMap.Point(item.lon,item.lat);
		var marker = new BMap.Marker(myPoint,{icon: myIcon});//创建标注
		//计算距离
		var distance = '';
		if(currentPoint && item.iscurrent){
			distance = "当前营业厅";
		}else{
			distance = "距离"+parseFloat(map.getDistance(currentPoint,myPoint)/1000).toFixed(1)+"公里";
		}
		var content = ` <div class="map-info-window">
							<div class="left">
								<div class="img"><img src="assets/images/demo-1.jpg"></div>
								<p>${distance}</p>
							</div>
							<div class="det">
								<table>
									<tr>
										<td width="80">网点地址：</td><td>${item.address}</td>
									</tr>
									<tr>
										<td>联系电话：</td><td>${item.tel}</td>
									</tr>
									<tr>
										<td>营业时间：</td><td>${item.worktime}</td>
									</tr>
								</table>
							</div>
						</div>`;
		map.addOverlay(marker);
		addClickHander(content, marker);
	}


	function addClickHander(content,marker){  
        marker.addEventListener("touchstart",function(e){  
        openInfo(" "+content,e)});  
        marker.addEventListener("click",function(e){  
        openInfo(" "+content,e)});  
    }  
    //++  
    var opts = {  
        width : 560,     // 信息窗口宽度  
        height: 150,     // 信息窗口高度  
        title : "国网宁波供电营业厅" , // 信息窗口标题  
        enableMessage:true//设置允许信息窗发送短息  
	}; 
    function openInfo(content,e){  
        var p = e.target;  
        var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);  
        var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象   
        map.openInfoWindow(infoWindow,point);                //开启信息窗口  
    }  
}

