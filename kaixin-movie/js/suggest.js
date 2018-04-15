//			var req  = 'http://xl7ac.kankan.com/ac.php?rd='+new Date().getTime()+'&k='+escaped_keyword+'&from=web&cs=utf-8';
//			var url = 'http://api.movie.kankan.com/vodjs/moviedata/'+Math.floor(movieid/1000)+'/'+movieid+'.js';

var data;
var firstContentTimer = firstContentTimer || null;
var SearchInfo = {
	histData : [],
	hotData : [],
	sLimit : 8, 
	unfinishData : [],
	unfinishCount : 0,
	UnfinishDraw : false,
	isPage : {
		'home' : /www\.kankan\.com/.test(window.location.hostname),
		'search' : /search\.kankan\.com/.test(window.location.hostname)
	},
	long_type : ['movie', 'teleplay', 'tv', 'anime', 'documentary', 'lesson', 'vmovie'],
	init: function(){
		var self = this;
		var searchHandler, preKeyVal='', keyVal, sendReq;
		searchHandler = setInterval(function(){
			keyVal = self.getKeywordVal();
			sendReq = $('#keyword').attr('sendReq');
			if(preKeyVal != keyVal &&  (sendReq == null || sendReq ==="true") && firstContentTimer == null){
				if(keyVal == '' && self.isTextboxFocus()){
					self.showAutoList();
				}else{
					self.sendRequest();
				}
				preKeyVal = keyVal;
			}
		},300);
	},
	getKeywordVal: function(){
		var value = $.trim($('#keyword').val());
		return encodeURIComponent(value);
	},

	sendRequest: function(){
		$.getScript('http://xl7ac.kankan.com/ac.php?rd='+new Date().getTime()+'&k='+this.getKeywordVal()+'&from=web&cs=utf-8',function(){
			$('#keyword-info').show();
		});
	},

	getMovieData: function(movieid){
		var self = this;
		//var url = 'http://api.movie.kankan.com/vodjs/moviedata/'+Math.floor(movieid/1000)+'/'+movieid+'.js';
		var url = 'http://api.movie.kankan.com/vodjs/moviedata/'+Math.floor(movieid/1000)+'/'+movieid+'.js';
		MiniSite.loadJSData(url,'GBK',function(){
			self.showMoreInfo(movieid);
		});
	},

	showMoreInfo: function(movieid){
		$('#more-info').empty().hide();
		var self = this;
		try{
			data = window['moviedata_'+movieid];
		}catch(e){
			return;
		}
		if(data == null) return;

	
		var htmlArr = [];
     	htmlArr.push(  '<h3><a href="'+this.getVodlink(data.movieid)+'" target="_blank">'+data.title+'</a></h3>\
                        <div class="completetips_con">\
                            <a href="'+this.getVodlink(data.movieid)+'" class="pic" target="_blank"><img alt="'+data.title+'" src="'+data.poster+'" onerror="this.onerror=\'\';this.src=\'http://images.movie.xunlei.kankan.com/img_default.gif\'"></a>\
                            <ul>\
                                <li>作者:<a href="'+data.director.url+'" target="_blank">'+data.director.name+'</a></li>\
                                <li>地区:<a href="'+data.area.url+'" target="_blank">'+data.area.name+'</a></li>\
                                <li>类型:');
                                $.each(data.genre,function(i,item){
                                	htmlArr.push('<a href="'+item.url+'" target="_blank">'+item.name+'</a>');
                                });
                                htmlArr.push('</li>')
                                htmlArr.push('\
                                <li class="long_li">剧情:'+data.intro+'<a href="#">更多</a></li>\
                            </ul>\
                        </div>');

        if(data.version !== '预告片') {
        	try{
			if(data.type === 'teleplay' || data.type === 'anime'){
					var maxkey = 0;
					$.each(data.moviedata.subtype,function(i,item){
						if(item == 1){
							maxkey = i;
						}
					});
					htmlArr.push( '<dl class="completetips_fj">\
					<dt>剧集:</dt>');
				    if((maxkey+1) < 5) {
						$.each(data.moviedata.subids,function(i,item){
							if(data.moviedata.subtype[i] == 1){
								htmlArr.push('<dd><a  target="_blank" href="'+self.getVodlink(data.movieid,item)+'">0'+(i+1)+'</a></dd>');
							}
						});
				    }else{

					$.each(data.moviedata.subids,function(i,item){
						if(data.moviedata.subtype[i] == 1){
							if(i < 2){
												htmlArr.push('<dd><a  target="_blank" href="'+self.getVodlink(data.movieid,item)+'">0'+(i+1)+'</a></dd>');
							}else if(i == 2){
												htmlArr.push('<dd class="dot"><a  target="_blank" href="'+self.getMorelink(data.movieid)+'">...</a></dd>');
							}else if( i > (maxkey - 2)){
												htmlArr.push('<dd><a  target="_blank" href="'+self.getVodlink(data.movieid,item)+'">'+(i+1)+'</a></dd>');
							}
						}
					});

				    }
					htmlArr.push('</dl>');
			}else if(data.type === 'documentary' || data.type === 'tv'){
					htmlArr.push( '<dl class="completetips_fj completetips_fj_2">\
									<dt>剧集:</dt>');
					var len = data.moviedata.subids.length,num1,num2;
					if(len < 2){
						num1 = 0;
					}else if(len == 2){
						num1 = 1;
						num2 = 0;
					}else{
						num1 = len - 2;
						num2 = len -3;
					}
					if(num1 != null){
						htmlArr.push('<dd><a target="_blank" href="'+self.getVodlink(data.movieid,data.moviedata.subids[num1])+'">'+self.formatTvNumber(data.moviedata.subnames[num1])+'</a></dd>');
					}
					if(num2 != null){
						htmlArr.push('<dd><a target="_blank" href="'+self.getVodlink(data.movieid,data.moviedata.subids[num2])+'">'+self.formatTvNumber(data.moviedata.subnames[num2])+'</a></dd>');
					}

					if(len > 3 ){
						htmlArr.push('<dd class="dot"><a  target="_blank" href="'+self.getMorelink(data.movieid)+'">...</a></dd>');
					}
			}else if(data.type === 'movie'){
				htmlArr.push('<div class="completetips_play">\
				<a  target="_blank" href="'+self.getVodlink(data.movieid)+'" class="completetips_playbtn completetips_playbtn_1" title="立即播放">立即播放</a>\
							</div>'); 
			}
		}catch(e){}
        }else{ //预告片
	        	htmlArr.push('<div class="completetips_play">\
                        <a  target="_blank" href="'+self.getVodlink(data.movieid)+'" class="completetips_playbtn completetips_playbtn_3" title="预告片">预告片</a>\
						</div>'); 
        }
		var htmlStr = htmlArr.join('');

		$('#more-info').empty().html(htmlStr).show();
		try{
			$('#completetips_iframe').height($('#more-info').outerHeight()).width($('#more-info').outerWidth()).show();
		}catch(e){}
	},

	showInfo: function(id){
		try{
			data = window['moviedata_'+id];
		}catch(e){
			return;
		}
		if(typeof(data) == "undefined"){
			SearchInfo.getMovieData(id);
		}else{
			SearchInfo.showMoreInfo(id);
		}
	},
	hide: function(){
		$('#more-info').empty().hide();
		$('#keywordInfo-wrap').hide();
		try{
			$('#completeDiv_iframe').hide();
			$('#completetips_iframe').hide();
		}catch(e){}
	},
	getVodlink: function(movieid,subid) {
		if(subid == undefined)
			return "http://vod.kankan.com/v/"+Math.floor(movieid/1000)+"/"+movieid+".shtml";
		return "http://vod.kankan.com/v/"+Math.floor(movieid/1000)+"/"+movieid+".shtml?subid="+subid;

	},
	getMorelink: function(movieid) {
		return 'http://data.movie.kankan.com/movie/'+movieid;
	},
	formatTvNumber: function(name){
		var reg = /^(\d{4}-\d{1,2}-\d{1,2})/; 
		var r = name.match(reg);
		return r ? (r[0]+'期') : name.substring(0,5);
	},
	in_array : function(v,arr){
		var s_tmp = '~'+arr.join('~')+'~';
		if(s_tmp.indexOf('~'+v+'~') !== -1){
			return true;
		}
		return false;
	},
	hideMoreInfo : function(empty){
		if(empty){
			$('#more-info').empty().hide();
		}else{
			$('#more-info').hide();
		}
		try{
			$('#completetips_iframe').hide();
		}catch(e){}
	},
	
	isTextboxFocus: function(){
		try{
			if(document.activeElement.id == 'keyword'){
				return true;
			}
		}catch(e){
			return false;
		}
		return false;
	},
	
	showAutoList : function(){
		var hisRecord = this.getCookie('KANKANSEARCHRECORD');
		if(hisRecord != ''){
			this.histData = [];
			hisRecord = hisRecord.split(','); 
			for(var i=0;i<hisRecord.length;i++){
				if(hisRecord[i] == ''){
					continue;
				}
				this.histData.push(decodeURIComponent(hisRecord[i]));
			}
		}
		if(this.histData.length > 0){
			this.drawHis();
			$('#keyword-info').parent().show();
			$('#keyword-info').show();
			try{
				$('#completeDiv_iframe').height($('#keyword-info').outerHeight()).width($('#keyword-info').outerWidth()).show();
			}catch(e){}
		}else{
			this.getHotList();
		}
		this.hideMoreInfo(1);
	},

	drawHis : function(){
		var hisData = this.histData;
		var html = '';
		if(typeof hisData == 'object' && hisData.length>0){
			var limitTmp = hisData.length > this.sLimit ? this.sLimit : hisData.length;
			for(var i=0;i<limitTmp;i++){
				html += '\
				<div class="autoComplete" data-title="'+ hisData[i] +'">\
					<span class="autoCompleteF" title="'+hisData[i]+'">'+hisData[i]+'</span>\
					<span class="autoCompleteS"></span>\
					<a href="#" title="删除" class="autoComplete_del" data-kid="'+ i +'">删除</a>\
				</div>';
			}
		}
		$('#keyword-info').removeClass('completeDiv_type2');

		$('#keyword-info').html(html);
	},

	getCookie : function(sName){
		var sSearch = sName + "=";
		var iOffset = document.cookie.indexOf(sSearch);
		if (iOffset != -1) {
			iOffset += sSearch.length;
			var iEnd = document.cookie.indexOf(";", iOffset);
			if (iEnd == -1)
				iEnd = document.cookie.length;
			return unescape(document.cookie.substring(iOffset, iEnd));
		}else 
			return "";
	},
	
	setCookie : function (sName,sValue,sHours){
		var host="xunlei.com";
		if(window.location.host.indexOf("kankan.com")!=-1){
			host="kankan.com";
		}
		if(arguments.length>2){
			var expireDate=new Date(new Date().getTime()+sHours*3600000);
			document.cookie = sName + "=" + escape(sValue) + "; path=/; domain="+host+"; expires=" + expireDate.toGMTString();
		}else
			document.cookie = sName + "=" + escape(sValue) + "; path=/; domain="+host; 
	},
	
	getHotList : function(){
		var self = this;
		var url = 'http://movie.kankan.com/json/hot4search/top10.js';
		$.getScript(url,function(){
			if(typeof HOT10SEARCH == 'object'){
				SearchInfo.hotData = HOT10SEARCH;
				SearchInfo.drawHot();
				$('#keyword-info').parent().show();
				$('#keyword-info').show();
				try{
					$('#completeDiv_iframe').height($('#keyword-info').outerHeight()).width($('#keyword-info').outerWidth()).show();
				}catch(e){}
			}
		});
	},

	drawHot : function(){
		var hotData = this.hotData;
		var html = '',typeName,version,classTmp,topStr='';
		var limitTmp = hotData.length > this.sLimit ? this.sLimit : hotData.length;
		var isLongInput = $('#keyword').width() >= 220;
		for(var k=0;k<limitTmp;k++){
			typeName = this.getTypeName(hotData[k].type);
			version  = this.formatVersion(hotData[k].version,hotData[k].type);
			classTmp = hotData[k].type == 'tv' && isLongInput ? 'autoComplete_zy' : '';
			if(k==0){
				topStr = '<em class="autoComplete_top1">1</em>';
			}else if(k<3){
				topStr = '<em class="autoComplete_top">'+ (k+1) +'</em>'; 
			}else{
				topStr = '';
			}
			classTmp2 = isLongInput ? "autoComplete_type1" : "";
			html += '\
				<div class="autoComplete '+ classTmp2 +' '+classTmp+'" data-id="'+hotData[k].movieid+'" data-type="'+hotData[k].type+'" data-title="'+hotData[k].title+'"> \
					'+ topStr + '\
					<span class="autoCompleteF">'+ hotData[k].title +'</span> \
					<span class="autoCompleteS">'+ typeName +'</span> ';
			if(isLongInput){
				html += '\
					<span class="autoCompleteN">'+ version +'</span>';
			}
			html += '\
					<b class="autoComplete_more"></b> \
				</div>\
			';
		}
		html += '';
		$('#keyword-info').addClass('completeDiv_type2');
		$('#keyword-info').html(html);
	},

	getTypeName : function(text){
		switch(text) {
			case "movie":
				return "(电影)";
				break;
			case "teleplay":
				return "(电视剧)";
				break;
			case "tv":
				return "(综艺)";
				break;
			case "anime":
				return "(动漫)";
				break;
			case "documentary":
				return "(纪录片)";
				break;
			case "person":
				return "(人物)";
				break;
			case "lesson":
				return "(公开课)";
				break;
			case "vmovie":
				return "(微电影)";
				break;
			default:
				return "";
				break;
		}
	},
	
	resetArray : function(arr){
		var tmp = [];
		for(var i=0;i<arr.length;i++){
			if(typeof arr[i] != 'undefined' && arr[i]!=''){
				tmp.push(arr[i]);
			}
		}
		return tmp;
	},
	
	formatVersion : function(version,type){
		if(type == 'movie' && version.indexOf("预告") == -1){
			version = '';
		}
		return version = version.replace(/([\d-]+)/,"<em>$1</em>");
	},
	
	getUnfinishLink : function(movieid){
		return 'http://movie.kankan.com/json/movie_version/'+ Math.floor(movieid/1000) +'/'+ movieid +'.js';
	},
	
	drawUnfinishTip : function(){
		if(this.unfinishCount == 0){
			return;
		}
		if(this.unfinishShow){
			$("#search_badge").html(this.unfinishCount);
		}else{
			var html = '<em id="search_badge">'+this.unfinishCount+'</em>';
			$("#search-first").append(html);
			this.unfinishShow = true;
			$("#search_badge").click(function(e){
				SearchInfo.hide();
				SearchInfo.drawUnfinish();
				$('#keyword-info').parent().show();
				$('#keyword-info').show();
				SearchInfo.hideMoreInfo(1);
				try{
					$('#completeDiv_iframe').height($('#keyword-info').outerHeight()).width($('#keyword-info').outerWidth()).show();
				}catch(e){}
				//更新cookie
				var searchUnfinishList = SearchInfo.getCookie("SEARCHUNFINISHEDRECORD");
				searchUnfinishList = searchUnfinishList.split(",");
				for(var i=0;i<searchUnfinishList.length;i++){
					tmp = searchUnfinishList[i].split("_");
					if(typeof tmp[0] !='undefined'){
						for(var j = 0; j < SearchInfo.unfinishData.length; j++){
							if(SearchInfo.unfinishData[j].movieid == tmp[0]){
								searchUnfinishList[i] = tmp[0]+'_'+SearchInfo.unfinishData[j].maxNum;
							}
						}
					}
				}
				if(searchUnfinishList.length > 0){
					searchUnfinishList = SearchInfo.resetArray(searchUnfinishList);
					searchUnfinishList = searchUnfinishList.join(",");
					SearchInfo.setCookie("SEARCHUNFINISHEDRECORD",searchUnfinishList,24*60);
				}
				$(this).remove();
				return false;
			});
		}
	},

	drawUnfinish : function(){
		if(this.unfinishCount){
			var hotData = this.unfinishData;
			html = '';
			var limitTmp = hotData.length > this.sLimit ? this.sLimit : hotData.length;
			for(var k=0;k<limitTmp;k++){
				typeName = this.getTypeName(hotData[k].type);
				version  = this.formatVersion(hotData[k].version,hotData[k].type);
				var isLongInput = $('#keyword').width() >= 220;
				classTmp = hotData[k].type == 'tv' && isLongInput ? 'autoComplete_zy' : '';
				classTmp2 = isLongInput ? "autoComplete_type1" : "";
				html += '\
					<div class="autoComplete '+classTmp2+' '+classTmp+'" data-id="'+hotData[k].movieid+'" data-type="'+hotData[k].type+'" data-title="'+hotData[k].title+'"> \
						<span class="autoCompleteF">'+ hotData[k].title +'</span> \
						<span class="autoCompleteS">'+ typeName +'</span>';
				if(isLongInput){
					html += '\
						<span class="autoCompleteN">'+ version +'</span>';
				}
				html += '\
						<a href="#" title="删除" class="autoComplete_del" data-mid="'+ hotData[k].movieid +'">删除</a>\
						<b class="autoComplete_more"></b> \
					</div>\
				';
			}
			$('#keyword-info').removeClass('completeDiv_type2');
			$('#keyword-info').html(html);
		}
	},

	stopPropagation : function(e) {  
		e = e || window.event;  
		if(e.stopPropagation) { 
			e.stopPropagation();  
		} else {  
			e.cancelBubble = true; 
		}  
	}
};

SearchInfo.init();

var compResp = compResp || function(keyword,titleAtr,typeIdAtr,collectNumAtr){
	var htmlStr = '',movieAtr = [],htmlArr = [];
	if(titleAtr.length == 0){
		SearchInfo.hide();
		return;
	}	
	$.each(typeIdAtr,function(i,item){
		var itemObj = {title:null,id:null,type:null,subsetTotalNum:null,subsetNewNum:null,subsetFistId:null,subsetNewId:null};
		itemObj.id = item.split('_')[1];
		itemObj.type = item.split('_')[0];
		itemObj.title = titleAtr[i];

		//为了显示子集那些xxxx....
		if(collectNumAtr[0] !== "" && i === 0){
			var subsetArr = collectNumAtr[0].split('_');
			item.subsetTotalNum = parseInt(subsetArr[0],10);
			item.subsetNewNum = parseInt(subsetArr[4],10);
			item.subsetFistId = subsetArr[3];
			item.subsetNewId = subsetArr[5];
		}
		movieAtr.push(itemObj);

	});

	$.each(movieAtr,function(i,item){
         htmlArr.push('<div class="autoComplete" data-id="'+item.id+'" data-type="'+item.type+'" data-title="'+item.title+'">\
                        <span class="autoCompleteF">'+item.title+'</span>\
						<span class="autoCompleteS">'+getTypeName(item.type)+'</span>');
		if(SearchInfo.in_array(item.type,SearchInfo.long_type)){
			htmlArr.push('<b class="autoComplete_more"></b>');
		}
                        
		htmlArr.push('</div>'); 
		if(i === 0 && item.type === 'teleplay') {
			htmlArr.push('<div class="aAutoComplete_info" id="fistMsg-wrap">');
			if(item.subsetNewNum < item.subsetTotalNum){// 正在更新中
				htmlArr.push('<a data-tag="a" target="_blank" data-href="'+SearchInfo.getVodlink(item.id,item.subsetNewId)+'" href="'+SearchInfo.getVodlink(item.id,item.subsetNewId)+'">- '+item.title+' 更新到第'+item.subsetNewNum+'集</a>');
			}else{
				htmlArr.push('<a data-tag="a" target="_blank" data-href="'+SearchInfo.getVodlink(item.id,item.subsetFistId)+'" href="'+SearchInfo.getVodlink(item.id,item.subsetFistId)+'">- '+item.title+' 第1集</a>');
			}
			htmlArr.push('<a  data-tag="a" data-href="'+SearchInfo.getMorelink(item.id)+'" href="'+SearchInfo.getMorelink(item.id)+'" target="_blank">- '+item.title+'剧集详情页</a>');
			htmlArr.push('</div>');
		}
	});
	htmlStr = htmlArr.join('');
	function getTypeName(text){
		switch(text) {
			case "movie":
				return "(电影)";
				break;
			case "teleplay":
				return "(电视剧)";
				break;
			case "tv":
				return "(综艺)";
				break;
			case "anime":
				return "(动漫)";
				break;
			case "documentary":
				return "(纪录片)";
				break;
			case "person":
				return "(人物)";
				break;
			case "lesson":
				return "(公开课)";
				break;
			case "vmovie":
				return "(微电影)";
				break;
			default:
				return "";
				break;
		}
	}
		
	$('#keyword-info').html(htmlStr).parent().show();
	$('#keyword-info').removeClass('completeDiv_type2');
	SearchInfo.hideMoreInfo(1);
	try{
		$('#completeDiv_iframe').height($('#keyword-info').outerHeight()).width($('#keyword-info').outerWidth()).show();
	}catch(e){}

}; 
$('#keyword-info').on('mouseover','div',function(){
	SearchInfo.hideMoreInfo(0);
	if($(this).hasClass('autoComplete')){

		if($('#keyword-info a').hasClass('autoComplete_on')){
			$('#keyword-info a').removeClass('autoComplete_on');
		}

		$(this).addClass('autoComplete_on').siblings().removeClass('autoComplete_on');
		var id = $(this).data('id');

		if(SearchInfo.in_array($(this).data('type'),SearchInfo.long_type)){
			SearchInfo.showInfo(id);
		}
	}else{
		$(this).siblings().removeClass('autoComplete_on');
	}
});
$('#firstMsg-wrap a').hover(function(){
	$(this).addClass('autoComplete_on');
},function(){
	$(this).removeClass('autoComplete_on');
});

$('#keyword-info').on('click','div',function(){
	if($(this).hasClass('autoComplete')){
		var title = $(this).data('title');
		$('#keyword').attr('sendReq','false').val(title);

		$('#searchForm').submit();
		SearchInfo.hide();
		return false;
	}
});

$("#keyword-info").on('click','a',function(e){
	if($(this).hasClass('autoComplete_del')){
		var key = $(this).data('kid');
		if(typeof key != 'undefined'){
			var tmp = [];
			try{
				for(var i = 0; i< SearchInfo.histData.length; i++){
					if(i == key){
						continue;
					}
					tmp.push(encodeURIComponent(SearchInfo.histData[i]));
				}
				var recordStr = tmp.join(",");
				SearchInfo.setCookie("KANKANSEARCHRECORD",recordStr,24*60);
				SearchInfo.histData = [];
				SearchInfo.showAutoList();
			}catch(e){}
		}else{
			var movieid = $(this).data('mid');
			var searchUnfinishList = SearchInfo.getCookie("SEARCHUNFINISHEDRECORD");
			searchUnfinishList = searchUnfinishList.split(",");
			for(var i=0;i<searchUnfinishList.length;i++){
				tmp = searchUnfinishList[i].split("_");
				if(movieid == tmp[0]){
					delete searchUnfinishList[i];
					break;
				}
			}
			searchUnfinishList = SearchInfo.resetArray(searchUnfinishList);
			searchUnfinishList = searchUnfinishList.join(",");
			SearchInfo.setCookie("SEARCHUNFINISHEDRECORD",searchUnfinishList,24*60);
			$(this).parent().remove();
			SearchInfo.unfinishCount --;
			if(SearchInfo.unfinishCount <= 0){
				SearchInfo.hide();
			}
		}
		$('#keyword').focus();
		SearchInfo.stopPropagation(e);
		return false;
	}
});



var ISFOCUS = false;
function setFocusVal(val){
	if(val === 0){
		 ISFOCUS = false;
	}else{
		 ISFOCUS=true;
		 $('#keyword').attr('sendReq','true');
	}
}

$(document).bind('keypress',function(e){
	switch(e.keyCode){
		case 13: //enter
		break;
		case 38: //up
			$('#keyword').attr('sendReq','false');
		break;
		case 40: //down
			$('#keyword').attr('sendReq','false');
		break;
		default:
		break;
	}
});

$(document).bind('keydown',function(e){
	if(ISFOCUS){
		switch(e.keyCode){
			case 13: //enter
				if($('#keyword-info .autoComplete_on').length !== 0){
					$('#keyword').attr('sendReq','false');
					var nowObj = $('#keyword-info .autoComplete_on');
					if(nowObj.data('href').length > 0){
						setTimeout(function(){
							location.href = nowObj.data('href');
						}, 0);
					}else{
						MyObj('keyword').value = nowObj.data('title');
						MyObj('keyword').blur();
						MyObj('searchForm').submit();
					}
				}
			break;
			case 38: //up 
				SearchInfo.hideMoreInfo(0);
				if($('#keyword-info .autoComplete_on').length == 0){
					var nowObj = $('#keyword-info>div').last();
					nowObj.addClass('autoComplete_on');
					if(SearchInfo.in_array(nowObj.data('type'),SearchInfo.long_type)){
						SearchInfo.showInfo(nowObj.data('id'));
					}
					$('#keyword').attr('sendReq','false').val(nowObj.data('title'));
				}else{
					var nowObj = $('#keyword-info .autoComplete_on');

					if(nowObj.prev().length == 0) {
						if(nowObj.data('tag') !== "a"){
							var nowObj = $('#keyword-info>div').last();
							nowObj.addClass('autoComplete_on');
							if(SearchInfo.in_array(nowObj.data('type'),SearchInfo.long_type)){
								SearchInfo.showInfo(nowObj.data('id'));
							}
							$('#keyword').attr('sendReq','false').val(nowObj.data('title'));
						}else{
							nowObj =nowObj.parent().prev();
						}	
					}else{
						nowObj = nowObj.prev();
					}

					$('#keyword-info .autoComplete_on').removeClass('autoComplete_on');

					if(nowObj.hasClass('autoComplete')){
						nowObj.addClass('autoComplete_on');
						if(SearchInfo.in_array(nowObj.data('type'),SearchInfo.long_type)){
							SearchInfo.showInfo(nowObj.data('id'));
						}
						$('#keyword').attr('sendReq','false').val(nowObj.data('title'));
					}else if(nowObj.hasClass('aAutoComplete_info')){
						nowObj.children().last().addClass('autoComplete_on');
						$('#keyword').attr('sendReq','false').val(nowObj.data('title'));
					}else{
						nowObj.addClass('autoComplete_on');
					}
				}

			break;
			case 40: //down
				SearchInfo.hideMoreInfo(0);
				if($('#keyword-info .autoComplete_on').length === 0){
					var nowObj = $('#keyword-info>div').first();
					nowObj.addClass('autoComplete_on');
					if(SearchInfo.in_array(nowObj.data('type'),SearchInfo.long_type)){
						SearchInfo.showInfo(nowObj.data('id'));
					}
					$('#keyword').attr('sendReq','false').val(nowObj.data('title'));
				}else{
					var nowObj = $('#keyword-info .autoComplete_on');
					
					if(nowObj.next().length == 0){
						if(nowObj.data('tag') !== "a"){
							var nowObj = $('#keyword-info>div').first();
							nowObj.addClass('autoComplete_on');
							if(SearchInfo.in_array(nowObj.data('type'),SearchInfo.long_type)){
								SearchInfo.showInfo(nowObj.data('id'));
							}
							$('#keyword').attr('sendReq','false').val(nowObj.data('title'));
						}else{
							nowObj =nowObj.parent().next();
						}
					}else{
						nowObj = nowObj.next();
					} 

					$('#keyword-info .autoComplete_on').removeClass('autoComplete_on');
					if(nowObj.hasClass('autoComplete')){
						nowObj.addClass('autoComplete_on');

						if(SearchInfo.in_array(nowObj.data('type'),SearchInfo.long_type)){
							SearchInfo.showInfo(nowObj.data('id'));
						}
						$('#keyword').attr('sendReq','false').val(nowObj.data('title'));
					}else if(nowObj.hasClass('aAutoComplete_info')){
						nowObj.children().first().addClass('autoComplete_on');
						$('#keyword').attr('sendReq','false').val(nowObj.data('title'));
					}else{
						nowObj.addClass('autoComplete_on');
					}

				}
			break;
			default:
				$('#keyword').attr('sendReq','true');
			break;
		}
	}

});

$(document).bind('click',function(e){
	if($(e.target).attr('id') != "keyword"){
		SearchInfo.hide();
	}
});

$('#keyword').click(function(){
	if(SearchInfo.getKeywordVal() == ''){
		if($('#keywordInfo-wrap').is(':hidden')){
			SearchInfo.showAutoList();
		}
	} 
});

$(document).ready(function(){
	if(SearchInfo.isPage.home || SearchInfo.isPage.search){
		//查cookie
		var searchUnfinishList = SearchInfo.getCookie("SEARCHUNFINISHEDRECORD");
		searchUnfinishList = searchUnfinishList.split(",");
		for(var i=0;i<searchUnfinishList.length;i++){
			tmp = searchUnfinishList[i].split("_");
			if(typeof tmp[0] !='undefined'){
				var link = SearchInfo.getUnfinishLink(tmp[0]);
				(function(url,tmp){
					setTimeout(function(){
						$.getScript(url,function(){
							try{
								unfinishData = eval('SEARCHUNFINISH_'+tmp[0]);
							}catch(e){
								unfinishData = undefined;
							}
							if(typeof unfinishData == 'object' && unfinishData.movieid){
								if(unfinishData.maxNum > tmp[1]){
									SearchInfo.unfinishData.push(unfinishData);
									SearchInfo.unfinishCount ++;
									SearchInfo.drawUnfinishTip();
								}
							}	
						});
					},0);
				})(link,tmp);
			}
		}
	}	
});
