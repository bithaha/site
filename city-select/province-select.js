(function($){
	var cityData = [
		{name:"北京",py: "beijing",jp: "bj"},
		{name:"天津",py: "tianjin",jp: "tj"},
		{name:"河北",py: "hebei",jp: "hb"},
		{name:"山西",py: "shanxi",jp: "sx"},
		{name:"内蒙古",py: "neimenggu",jp: "nmg"},
		{name:"辽宁",py: "liaoning",jp: "ln"},
		{name:"吉林",py: "jilin",jp: "jl"},
		{name:"黑龙江",py: "heilongjiang",jp: "hlj"},
		{name:"上海",py: "shanghai",jp: "sh"},
		{name:"江苏",py: "jiangsu",jp: "js"},
		{name:"浙江",py: "zhejiang",jp: "zj"},
		{name:"安徽",py: "anhui",jp: "ah"},
		{name:"福建",py: "fujian",jp: "fj"},
		{name:"江西",py: "jiangxi",jp: "jx"},
		{name:"山东",py: "shandong",jp: "sd"},
		{name:"河南",py: "henan",jp: "hn"},
		{name:"湖北",py: "hubei",jp: "hb"},
		{name:"湖南",py: "hunan",jp: "hn"},
		{name:"广东",py: "guangdong",jp: "gd"},
		{name:"海南",py: "hainan",jp: "hn"},
		{name:"广西",py: "guangxi",jp: "gx"},
		{name:"甘肃",py: "gansu",jp: "gs"},
		{name:"陕西",py: "shanxi",jp: "sx"},
		{name:"新疆",py: "xinjiang",jp: "xj"},
		{name:"青海",py: "qinghai",jp: "qh"},
		{name:"宁夏",py: "ningxia",jp: "nx"},
		{name:"重庆",py: "chongqing",jp: "cq"},
		{name:"四川",py: "sichuan",jp: "sc"},
		{name:"贵州",py: "guizhou",jp: "zg"},
		{name:"云南",py: "yunnan",jp: "yn"},
		{name:"西藏",py: "xizang",jp: "xz"},
		{name:"台湾",py: "taiwan",jp: "tw"},
		{name:"澳门",py: "aomen",jp: "am"},
		{name:"香港",py: "xianggang",jp: "xg"},
	];

	var api = {};
	api.getProvince = function(){
		var province = localStorage.getItem('province');
		if(!province){
			localStorage.setItem('province','全国');
			return "全国";
		}else{
			return province;
		}
	}
	api.init = function(){
		var current = api.getProvince();
		var modal = this.modal = $('<div class="city-select-window"><div class="head"><a class="btn-left"><i class="ico-back"></i></a><h3 class="title">选择省份</h3></div><div class="content"><div class="city-search"><i class="ico-sear"></i><input class="txt" type="text" placeholder="输入省份名"><a class="btn-del">x</a></div><div class="inner"><div class="city-con"><h3 class="tit">当前省份</h3><div class="citylist current"><a class="active">湖北</a></div><h3 class="tit">全国各省</h3><div class="citylist totallist"></div></div></div></div></div>');
		api.searchList = cityData;
		
		modal.find('.citylist.current a').html(current);
		/* 加载城市列表 */
		cityData.forEach(function(item, i){
			modal.find('.totallist').append('<a '+((item.name == current)?'class="active"':'')+'>'+item.name+'</a>')
		});
	
		api.scrollTop = $('body').scrollTop();
		$('body').append(modal).addClass('city-show-body').scrollTop(0);
		setTimeout(function(){
			modal.addClass('active');
			
		});

		api.bind();
	}
	api.bind = function(){
		api.modal.on('click','.btn-left',function(){
			api.destroy();
		}).on('click','.citylist a',function(){
			api.select($(this).html());
		}).on('click','.btn-del',function(){
			api.modal.find('.txt').val('');
			api.modal.find('.search-list').remove();
			api.modal.find('.city-con').show();
			$(this).hide();
		}).on('click','.search-list a',function(){
			api.select($(this).html());
		}).on('input propertychange',function(){
			var inputValue = api.modal.find('.txt').val();
			inputValue = inputValue.replace(/\s/g,"");
			if(!inputValue){
				api.modal.find('.search-list').remove();
				api.modal.find('.city-con').show();
				api.modal.find('.btn-del').hide();
				return;
			}
			api.modal.find('.btn-del').show();
			var val = inputValue.substr(0,1);
			var cnCharacterRule = new RegExp("^[\\u4E00-\\u9FFF]+$","g");
			if(cnCharacterRule.test(val)){
				var arr = [];
				for(var i in api.searchList){
					if(api.searchList[i].name.indexOf(inputValue)!=-1){
						arr.push(api.searchList[i]);
					}
				}
				initSearchList(arr);
			}else{
				var arr = [];
				var indexs = [];
				var getIndexs = function(pinyin,i){
					if(indexs.indexOf(i) > -1){return;}
					var index = pinyin.indexOf(inputValue.toLocaleLowerCase());
					if(index!=-1){
						if(index==0){
							indexs.unshift(i);
						}else{
							indexs.push(i);
						}
					}
				}
				for(var i in api.searchList){
					getIndexs(api.searchList[i].jp,i);
				}
				for(var i in api.searchList){
					getIndexs(api.searchList[i].py,i)
				}
				
				for(var i in indexs){
					arr.push(api.searchList[indexs[i]].name);
				}
				initSearchList(arr);
			}
		});
		function initSearchList(cs, removeFlag){
			if(!removeFlag){
				$('.search-list').remove();
				api.modal.find('.city-con').hide();
				api.modal.find('.inner').append('<div class="search-list"></div>');
			}
			
			if(cs.length <= 0){
				api.modal.find('.search-list').html('<a class="color-red">没有搜索到省份</a>');
				//initSearchList(api.searchList, true);
				return;
			}
			cs.forEach(function(item,i){
				api.modal.find('.search-list').append('<a>'+item+'</a>')
			})
		}
	}
	api.select = function(city){
		localStorage.setItem('province',city);
		cityselect.currentProvince = api.getProvince();
		api.then && api.then(city);
		api.destroy();
	}
	api.destroy = function(){
		api.modal.removeClass('active').off('click').off('input propertychange');
		setTimeout(function(){
			api.modal.remove();
		},300);
		$('body').removeClass('city-show-body').scrollTop(api.scrollTop);
	}
	function cityselect(){
		api.init();
		this.then = function(callback){
			callback && (api.then = callback);
		}
		return this;
	}
	cityselect.currentProvince = api.getProvince();

	$.extend({
		province: cityselect
	})
})(jQuery)
