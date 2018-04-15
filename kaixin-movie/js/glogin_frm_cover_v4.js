typeof window.kkLoginFrame == "undefined" && (window.kkLoginFrame = {});
KK_LOGIN_TYPE = 'common';

String.prototype.trim=function(){
	return this.replace(/(^\s*)|(\s*$)/g, "");
}

kkLoginFrame.version = 3.0;

kkLoginFrame.cancel_div = function(div_id){
	var o = document.getElementById(div_id);
	o.parentNode.removeChild(o);
}

//获取元素的纵坐标
kkLoginFrame.getTop = function(e){
	var offset=e.offsetTop;
	if(e.offsetParent!=null){ offset+=kkLoginFrame.getTop(e.offsetParent);}
	return offset;
}
//获取元素的横坐标
kkLoginFrame.getLeft = function(e){
	var offset=e.offsetLeft;
	if(e.offsetParent!=null){ offset+=kkLoginFrame.getLeft(e.offsetParent);}
	return offset;
}

//获取滚动条的位置
kkLoginFrame.getScroll = function(){
	var t, l, w, h;
	if (document.documentElement && document.documentElement.scrollTop) {
		t = document.documentElement.scrollTop;
		l = document.documentElement.scrollLeft;
		w = document.documentElement.scrollWidth;
		h = document.documentElement.scrollHeight;
	} else if (document.body) {
		t = document.body.scrollTop;
		l = document.body.scrollLeft;
		w = document.body.scrollWidth;
		h = document.body.scrollHeight;
	}
	return { t: t, l: l, w: w, h: h };
}

kkLoginFrame.getCookie = function(name){
	return (document.cookie.match(new RegExp("(^"+name+"| "+name+")=([^;]*)"))==null)?"":decodeURIComponent(RegExp.$2);
}
kkLoginFrame.setCookie = function(name,value,hours,domain){
	var domain = domain ? domain : ((window.location.host.indexOf("xunlei.com")!=-1) ? 'xunlei.com' : 'kankan.com');
	if(arguments.length>2){
		var expireDate=new Date(new Date().getTime()+hours*3600000);
		document.cookie = name + "=" + encodeURIComponent(value) + "; path=/; domain="+domain+"; expires=" + expireDate.toGMTString() ;
	}else{
		document.cookie = name + "=" + encodeURIComponent(value) + "; path=/; domain="+domain; 
	}
}


kkLoginFrame.global_login_notice_add_exp = function(){
	var d = new Date();
	var hour = (new Date(d.getFullYear(),d.getMonth(),(d.getDate()+1),0,0,0).getTime()-d.getTime())/3600000;
	var userid = kkLoginFrame.getCookie('userid');
	var logtimes = kkLoginFrame.getCookie('dLogTimes_'+userid);
	if(logtimes){
		kkLoginFrame.setCookie('dLogTimes_'+userid,parseInt(logtimes)+1,hour);
		global_login_frm_unshow();
		return;
	}else{
		kkLoginFrame.LoadJSData('http://backend.t.kankan.com/level.json?a=web_login&jsobj=LOG_EXPERIENCE&rd='+new Date().getTime(),function(){
			if(window.LOG_EXPERIENCE && LOG_EXPERIENCE.status == '200' && LOG_EXPERIENCE.data.exp >0){
				kkLoginFrame.global_login_tip_show();
			}else{
				global_login_frm_unshow();
			}
		});
		kkLoginFrame.setCookie('dLogTimes_'+userid,1,hour);
		return;
	}
}

kkLoginFrame.global_login_tip_show = function(){
	kkLoginFrame.resetSize();
	document.getElementById('login_frame').src='http://movie.kankan.com/kankan_login_exp_tips.html';
	document.getElementById('login_box').style.display="";
}

kkLoginFrame.create_login_opacity_div = function(){
	var div = document.createElement("div");
	div.setAttribute('id', 'login_half_opacity_div');
	div.style.left = '0px';
	div.style.height = Math.max(document.body.clientHeight,document.documentElement.clientHeight)+"px";
	document.body.appendChild(div);
}

kkLoginFrame.send_login_pv = function(stat){	
	var userid = kkLoginFrame.getCookie("userid"), cookieid = kkLoginFrame.getCookie("KANKANWEBUID");
	var pvRd = Math.floor(Math.random()*99999)+1, pvImg = '_pvImg_'+pvRd;
	var u5 = 2, u6 = (arguments.length > 1) ? arguments[1] : '', u7 = document.referrer;//父窗体都是登录成功后发包，u5默认为2
	if(stat == 13){//点开登录浮层发包
		u5 = 1;
	}
	var surl = 'http://kkpgv2.kankan.com/?u=kk_login&u1='+encodeURIComponent(top.location.href)+'&u2='+stat+'&u3='+userid+'&u4='+cookieid+'&u5='+u5+'&u6='+u6+'&u7='+u7+'&rd='+pvRd;
	var _img = window[pvImg] = new Image();			
	_img.onload = _img.onerror = function(){
		window[pvImg] = null;
	};
	_img.src = surl;
}

kkLoginFrame.resetSize = function(w,wf,h,hf,l){
	document.getElementById('login_box').style.width= w ? w : '530px';
	document.getElementById('login_box').style.height= h ? h : '341px';
	document.getElementById('login_frame').style.width=wf ? wf : '530px';
	document.getElementById('login_frame').style.height=hf ? hf : '339px';
	document.getElementById('login_box').style.marginLeft =l ? l : '-265px';
}

kkLoginFrame.LoadJSData = function (url,callback) { 
	var script = document.createElement('script');	
	script.type = 'text/javascript';
	if (callback) {
		script.onload = script.onreadystatechange = function() { 
			if (script.readyState && script.readyState != 'loaded' && script.readyState != 'complete') 
				return; 
			script.onreadystatechange = script.onload = null;

			try{
				if(typeof(callback) == "function"){
					callback();
				} else{
					eval(callback+'();');
				}
			}catch(e){}
		}; 
	}
	script.src = url; 
	document.getElementsByTagName('head')[0].appendChild(script);
}

kkLoginFrame.getParameter = function(e){var t=document.location.search,n=new RegExp("[?&]"+e+"=([^&]+)","g"),r=n.exec(t),i=null;return null!=r&&(i=decodeURIComponent(r[1])),i}

kkLoginFrame.openWin = function(URL,name,features,replace){
	window.open(URL,name,features,replace);
}

function global_login_frm_show(type,flag){
	if(document.getElementById('global_login_frm') == null){
		if(type=="vod_remove_ad"){
			kkLoginFrame.create_login_opacity_div();
			document.getElementById('login_box').style.display="";			
			var box_top = ((screen.availHeight - 80)/6 +Math.max(document.documentElement.scrollTop,document.body.scrollTop));
			kkLoginFrame.resetSize('415px','415px','330px','330px','-265px');
			var lfSrc = "http://movie.kankan.com/kankan_privilege_login_v2.html?v=1.0";
			document.getElementById('login_frame').src=lfSrc;	
			document.getElementById('login_box').style.top = box_top + 'px';
		} else {
			xlQuickLogin.login();
		}
		//kkLoginFrame.send_login_pv(13);//打开浮层就发包
	}
}

function global_login_frm_unshow(){
	try{
		if(!!document.getElementById('login_half_opacity_div')){
			kkLoginFrame.cancel_div('login_half_opacity_div');
		}
	}catch(e){}
	document.getElementById('login_box').style.display="none";
	document.getElementById('login_frame').src='about:blank';
	try {
		login_close_callback();
	}catch(e){};
}

document.write('<div class="login_box4 loginLayer" id="login_box" style="height:308px;display:none;position:absolute; top:80px; left:120px; z-index:1999; padding-bottom:3px; padding-right:3px; overflow:hidden;left:50%;margin-left:-206px;"><div id="loading_frame" style="position:absolute;margin-top:3px;margin-left:5px;"><img id="loading_img" alt="" src="http://misc.web.kankan.com/user/images/loading2.gif"/></div><div id="loading_frame2" style="margin-top: 5px; margin-right: 5px; position: absolute; right: 10px;font-size:11px"><a target="_self" href="javascript:void(0);" onclick="global_login_frm_unshow();">close</a></div><iframe id="login_frame" src="" SCROLLING="no" FRAMEBORDER="no"></iframe></div>');
document.write('<style>#login_half_opacity_div{width:100%;top:0px;background-color:#000;position:fixed;_position:absolute;z-index:999;opacity:0.35;filter:progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=40,finishOpacity=100);}</style>');

