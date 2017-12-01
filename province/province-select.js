(function($){
	var cityData = [
		{name:"����",py: "beijing",jp: "bj"},
		{name:"���",py: "tianjin",jp: "tj"},
		{name:"�ӱ�",py: "hebei",jp: "hb"},
		{name:"ɽ��",py: "shanxi",jp: "sx"},
		{name:"���ɹ�",py: "neimenggu",jp: "nmg"},
		{name:"����",py: "liaoning",jp: "ln"},
		{name:"����",py: "jilin",jp: "jl"},
		{name:"������",py: "heilongjiang",jp: "hlj"},
		{name:"�Ϻ�",py: "shanghai",jp: "sh"},
		{name:"����",py: "jiangsu",jp: "js"},
		{name:"�㽭",py: "zhejiang",jp: "zj"},
		{name:"����",py: "anhui",jp: "ah"},
		{name:"����",py: "fujian",jp: "fj"},
		{name:"����",py: "jiangxi",jp: "jx"},
		{name:"ɽ��",py: "shandong",jp: "sd"},
		{name:"����",py: "henan",jp: "hn"},
		{name:"����",py: "hubei",jp: "hb"},
		{name:"����",py: "hunan",jp: "hn"},
		{name:"�㶫",py: "guangdong",jp: "gd"},
		{name:"����",py: "hainan",jp: "hn"},
		{name:"����",py: "guangxi",jp: "gx"},
		{name:"����",py: "gansu",jp: "gs"},
		{name:"����",py: "shanxi",jp: "sx"},
		{name:"�½�",py: "xinjiang",jp: "xj"},
		{name:"�ຣ",py: "qinghai",jp: "qh"},
		{name:"����",py: "ningxia",jp: "nx"},
		{name:"����",py: "chongqing",jp: "cq"},
		{name:"�Ĵ�",py: "sichuan",jp: "sc"},
		{name:"����",py: "guizhou",jp: "zg"},
		{name:"����",py: "yunnan",jp: "yn"},
		{name:"����",py: "xizang",jp: "xz"},
		{name:"̨��",py: "taiwan",jp: "tw"},
		{name:"����",py: "aomen",jp: "am"},
		{name:"���",py: "xianggang",jp: "xg"},
	];

	var api = {};
	api.getProvince = function(){
		var province = localStorage.getItem('province');
		if(!province){
			localStorage.setItem('province','ȫ��');
			return "ȫ��";
		}else{
			return province;
		}
	}
	api.init = function(){
		var current = api.getProvince();
		var modal = this.modal = $('<div class="city-select-window"><div class="head"><a class="btn-left"><i class="ico-back"></i></a><h3 class="title">ѡ��ʡ��</h3></div><div class="content"><div class="city-search"><i class="ico-sear"></i><input class="txt" type="text" placeholder="����ʡ����"><a class="btn-del">x</a></div><div class="inner"><div class="city-con"><h3 class="tit">��ǰʡ��</h3><div class="citylist current"><a class="active">����</a></div><h3 class="tit">ȫ����ʡ</h3><div class="citylist totallist"></div></div></div></div></div>');
		api.searchList = cityData;
		
		modal.find('.citylist.current a').html(current);
		/* ���س����б� */
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
				api.modal.find('.search-list').html('<a class="color-red">û��������ʡ��</a>');
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
