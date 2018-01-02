var wxconfig = {
	appid:'',
	timestamp:'',
	noncestr:'',
	signature:''
}
var linkedurl=location.href.split('#')[0];
if("undefined" != typeof wxShare && wxShare.init){
	
}else{
	weshareInit();
}
function weshareInit(){
	$.ajax({
	  type: "post",
	  url: ROOT_CONFIG.domain+"/WechatDevelop/getJsSdk",
      dataType: 'JSON',
      contentType: "application/json; charset=utf-8",
	  data:JSON.stringify({'url':linkedurl}),
	  async:false,
	  cache:false,
	  success: function(data, textStatus, jqXHR){
		  wxconfig.appid = data.data.appid;
		  wxconfig.timestamp = data.data.timestamp;
		  wxconfig.noncestr = data.data.noncestr;
		  wxconfig.signature = data.data.signature;
		  if("undefined" == typeof wx){
	            if (document.addEventListener) {
	                document.addEventListener('WeixinJSBridgeReady', initWechat, false);
	            } else if (document.attachEvent) {
	                document.attachEvent('WeixinJSBridgeReady', initWechat);
	                document.attachEvent('onWeixinJSBridgeReady', initWechat);
	            }
	        }else{
	            initWechat();
	        }
		  
	  },error: function(XMLHttpRequest, textStatus, errorThrown){
		  
	  },complete:function(XHR, textStatus){
		  
	  }
	});
}

function initWechat(){
	var imgUrl = 'http://www.meyur.cn/recruit_web/assets/images/meiyue_logo.jpg';  // 分享后展示的一张图片
	// 点击分享后跳转的页面地址
	var lineLink = decodeURIComponent(linkedurl);
	var descContent = "美约人才";  // 分享后的描述信息
	var shareTitle = "美约人才";  // 分享后的标题
	var appid = wxconfig.appid;  // 应用id,如果有可以填，没有就留空
	
	if("undefined" != typeof wxShare ){
		if(wxShare && wxShare.title){
			shareTitle = wxShare.title;
		}
		if(wxShare && wxShare.content){
			descContent = wxShare.content;
		}
		if(wxShare && wxShare.link){
			lineLink = wxShare.link;
		}
		if(wxShare && wxShare.imgUrl){
			imgUrl = wxShare.imgUrl;
		}
	}
	
	wx.config({
	    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	    appId: wxconfig.appid, // 必填，公众号的唯一标识
	    timestamp: wxconfig.timestamp, // 必填，生成签名的时间戳
	    nonceStr: wxconfig.noncestr, // 必填，生成签名的随机串
	    signature: wxconfig.signature,// 必填，签名，见附录1
	    jsApiList: ['showAllNonBaseMenuItem','hideMenuItems','getLocation','showMenuItems','onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	});

	wx.ready(function(){
		//wx.showAllNonBaseMenuItem();
		/*分享给朋友*/
		wx.onMenuShareAppMessage({
			title: shareTitle, // 分享标题
			desc: descContent, // 分享描述
			link: lineLink, // 分享链接
			imgUrl: imgUrl, // 分享图标
			type: 'link', // 分享类型,music、video或link，不填默认为link
			dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			success: function () {
				// 用户确认分享后执行的回调函数
				shareOne();
			},
			cancel: function () {
				// 用户取消分享后执行的回调函数
			}
		});
		/*分享到朋友圈*/
		wx.onMenuShareTimeline({
			title: shareTitle, // 分享标题
			link: lineLink, // 分享链接
			imgUrl: imgUrl, // 分享图标
			success: function () {
				// 用户确认分享后执行的回调函数
				shareFriends();
			},
			cancel: function () { 
				// 用户取消分享后执行的回调函数
			}
		});
		/*分享到QQ*/
		wx.onMenuShareQQ({
			title: shareTitle, // 分享标题
			desc: descContent, // 分享描述
			link: lineLink, // 分享链接
			imgUrl: imgUrl, // 分享图标
			success: function () { 
			   // 用户确认分享后执行的回调函数
				
			},
			cancel: function () { 
			   // 用户取消分享后执行的回调函数
			}
		});
		/*分享到腾讯微博*/
		wx.onMenuShareWeibo({
			title: shareTitle, // 分享标题
			desc: descContent, // 分享描述
			link: lineLink, // 分享链接
			imgUrl: imgUrl, // 分享图标
			success: function () { 
			   // 用户确认分享后执行的回调函数
				
			},
			cancel: function () { 
				// 用户取消分享后执行的回调函数
			}
		});
		/*分享到qq空间*/
		wx.onMenuShareQZone({
			title: shareTitle, // 分享标题
			desc: descContent, // 分享描述
			link: lineLink, // 分享链接
			imgUrl: imgUrl, // 分享图标
			success: function () { 
			   // 用户确认分享后执行的回调函数
				
			},
			cancel: function () { 
				// 用户取消分享后执行的回调函数
			}
		});
		/*wx.getLocation({
		    timestamp: wxconfig.timestamp, // 位置签名时间戳，仅当需要兼容6.0.2版本之前时提供
		    nonceStr: wxconfig.noncestr, // 位置签名随机串，仅当需要兼容6.0.2版本之前时提供
		    addrSign: '', // 位置签名，仅当需要兼容6.0.2版本之前时提供，详见附录4
		    success: function (res) {
		        var longitude = res.longitude; // 纬度，浮点数，范围为90 ~ -90
		        var latitude = res.latitude; // 经度，浮点数，范围为180 ~ -180。
		        var speed = res.speed; // 速度，以米/每秒计
		        var accuracy = res.accuracy; // 位置精度
		        //alert("经纬度："+latitude+","+longitude);
		        saveLocation(latitude,longitude);
		    }
		});*/
		
	    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
	});
	wx.error(function(res){
		console.log("失败！");
	    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
	});
}
/**
 * 分享爱到朋友圈回调
 */	
function shareFriends(){
	
}	
/**
 * 分享爱到朋友回调
 */	
function shareOne(){
	
}
function saveLocation(latitude,longitude){
	
}
