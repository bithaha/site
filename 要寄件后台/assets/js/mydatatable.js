!function ($) {

 /* MyDataTable CLASS DEFINITION
  * ====================== */
	
  var MyDataTable = function(element, options){
	  this.$element = $(element);
	  this.$tbody = $('.dt-tbody',this.$element);
	  this.$theadtr = $('.dt-theadtr',this.$element);
	  this.options = options;
	  var tmpcolums = new Array();
	  $('th',this.$theadtr).each(function(i){
		var colum = {};
		colum.dataname = $(this).data('dtname');
		colum.type = $(this).data('type');
		colum.img_width = $(this).data('imgwidth');
		colum.img_height = $(this).data('imgheight');
		colum.showdateonly = $(this).data('showdateonly');
		colum.func=$(this).data('func');
		if(colum.type == 'operation'){
			var opname=$(this).data('opname');
			colum.opname = opname;
			var names=opname.split(",");
			colum.mdata=new Array();
			colum.callback=new Array();
			colum.validate=new Array();
			for(var k=0;k<names.length;k++){
				var name=names[k];
				if(name!=''){
                    var opcolumn = options.columns[name];
                    colum.mdata[k] = opcolumn.mdata;
                    colum.callback[k] = opcolumn.callback;
                    colum.validate[k] = opcolumn.validateFuc;
				}
			}
		}
		if(colum.type == 'checkbox'){
			$(".checkbox-selectall" ,this.$element).click(function(){
				if($(this).parent().parent().hasClass('checker')){//如果使用了uniform插件
					if($(this).parent().hasClass('checked') == false){
						$('input[name="rowcheckbox"]',this.$element).each(function(){
							$(this).addClass('checked');
							$(this).prop("checked",true);
						});
					}else{
						$('input[name="rowcheckbox"]:checked',this.$element).each(function(){
							$(this).removeClass('checked');
							$(this).prop("checked",false);
						});
					}
				}else{
					if($(this).prop("checked")){
						$("input[name='rowcheckbox']",this.$element).each(function(){
							$(this).prop("checked",true);
						});
				    }else{
				    	$("input[name='rowcheckbox']",this.$element).each(function(){
						  $(this).prop("checked",false);
						});
					}
				}
		    });
		}
		tmpcolums[i] = colum;
	  });
	  this.colums = tmpcolums;
	  this.$pagination = $('.my-pagination',this.$element);
  };
  
  MyDataTable.prototype = {
	refresh:function(page){
		this.page = page;
		this.$tbody.empty();
		var pagedatas = page.datas;
		var pageSize = page.pageSize * 1;
		var curPage = page.curPage * 1;
		var maxPage = page.maxPage;
		//alert("maxPage:"+maxPage);
		var maxRows = page.maxRows;
		var row = null;
		var starrownum = (curPage - 1) * pageSize;
		var $rowtr = null;
		for(var i = 0 ; (i < pagedatas.length && i < pageSize) ; i++){
			row = pagedatas[i];
			$rowtr = $('<tr id="tr_'+i+'" data-index="'+ i +'" data-status="'+(row.status==null?"":row.status)+'"></tr>');
			var tmptd = null;
			for(var j = 0; j < this.colums.length ; j++){
				var colum = this.colums[j];
				var dataname = colum.dataname;
				var opname = colum.opname;
				var datatype = colum.type;
				var showdateonly = colum.showdateonly;
				var func = colum.func;
				if(datatype == 'operation'){
					var names=opname.split(",");
					tmptd = $('<td></td>');
					for(var k=0;k<names.length;k++){
						var tmpelement = $(colum.mdata[k]);
						tmpelement.click({'index':i,'rowdata':row},$.proxy(colum.callback[k],this));
						var validatefunc = colum.validate[k];
						if(!!validatefunc){
							var vfunc=eval(validatefunc)({data:{'index':i,'rowdata':row}});
							if(!vfunc){
								tmptd.append("");
							}else{
								tmptd.append(tmpelement);
								tmptd.append("&nbsp;");
							}
						}else{
							tmptd.append(tmpelement);
							tmptd.append("&nbsp;");
						}
					}
				}else if(datatype == 'text'){
					if(dataname == 'rownum'){
						tmptd = $('<td><span class="td_num">' + (starrownum + i + 1) + '</span></td>');
					}else{
						var datavalue = null;
						try{
							datavalue = eval('row.' + dataname);
						}catch(e){
							alert(e);
						}
						if(datavalue =='null' || datavalue == null){
							tmptd = $('<td></td>');
						}else{
							tmptd = $('<td>' + datavalue + '</td>');
						}
					}
				}else if(datatype == 'password'){
					if(dataname == 'rownum'){
						tmptd = $('<td><span class="td_num">' + (starrownum + i + 1) + '</span></td>');
					}else{
						if(row[dataname]=='null'||row[dataname]==null){
							tmptd = $('<td>******</td>');
						}else{
							tmptd = $('<td>******</td>');
						}
					}
				}else if(datatype == 'date'){
					if(dataname == 'rownum'){
						tmptd = $('<td><span class="td_num">' + (starrownum + i + 1) + '</span></td>');
					}else{
						if(row[dataname]=='null'||row[dataname]==null){
							tmptd = $('<td></td>');
						}else{
							var tempdate = new Date(row[dataname]);
							
							var tempmonth = tempdate.getMonth() + 1;
							tempmonth = tempmonth < 10? ('0' + tempmonth):tempmonth;
							
							var tempday = tempdate.getDate();
							tempday = tempday < 10? ('0' + tempday):tempday;
							
							var tempHours = tempdate.getHours();
							tempHours = tempHours < 10? '0' + tempHours: tempHours;
							
							var tempMinutes = tempdate.getMinutes();
							tempMinutes = tempMinutes < 10? '0' + tempMinutes: tempMinutes;
							
							var tempSeconds = tempdate.getSeconds();
							tempSeconds = tempSeconds < 10? '0' + tempSeconds: tempSeconds;
							if(showdateonly == 'Y'){
								tmptd = $('<td>' + tempdate.getFullYear()+"年"+(tempmonth)+"月"+ tempday +"日 " + '</td>');
							}else{
								tmptd = $('<td>' + tempdate.getFullYear()+"年"+(tempmonth)+"月"+ tempday +"日 " + tempHours +":" + tempMinutes + ":" + tempSeconds + '</td>');
							}
						}
					}
				}else if(datatype == 'imgFileId'){
					tmptd = $('<td><img src="' + basePath + 'f/r/' + row[dataname] + '"></td>');
					tmptd.find('img').width(colum.img_width).height(colum.img_height);
				}else if(datatype == 'checkbox'){
					tmptd = $('<td><input type="checkbox" name="rowcheckbox" value=' + i + '></td>');
				}else if(datatype== 'func'){
					//var tddata = eval(func + '(\'' + JSON.stringify(row) + '\')');
					//var tddata = window[func](row);
					var tddata = eval(func)(row);
					tmptd = $('<td>' + tddata + '</td>');
				}else{
                    tmptd = $('<td></td>');
                }
				$rowtr.append(tmptd);
				this.$tbody.append($rowtr);
			}
		}
		this.$pagination.empty();
		//calculate page
		var pagestartnumber = Math.floor((curPage - 1)/5) * 5;
		var toPage = pagestartnumber;
		var tmppageli = null;
		var showMaxRows = ((curPage * pageSize) > maxRows)? maxRows : (curPage * pageSize);
		tmppageli = $('<li class="item" style="display:none;"><a href="javascript:void(0);">' + ((curPage - 1) * pageSize + 1) + '  -  ' + showMaxRows + '   of   ' + maxRows + '</a></li>');
		this.$pagination.append(tmppageli);
		tmppageli = $('<li class="item"><a href="javascript:void(0);">&laquo;</a></li>');
		if(toPage <= 1){
			tmppageli.addClass('disabled');
		}else{
			tmppageli.click({'toPage':toPage},$.proxy(this.options.onPage,this));
		}
		this.$pagination.append(tmppageli);
		toPage ++;
		for(var i = 0 ; i < 5 ; i++,toPage++){
			tmppageli = $('<li class="item"><a href="javascript:void(0);">' + toPage + '</a></li>');
			if(toPage == curPage){
				tmppageli.addClass('active');
			}
			if(toPage > maxPage){
				tmppageli.addClass('disabled');
			}else{
				tmppageli.click({'toPage':toPage},$.proxy(this.options.onPage,this));
			}
			this.$pagination.append(tmppageli);
		}
		tmppageli = $('<li class="item"><a href="javascript:void(0);">&raquo;</a></li>');
		//alert("--toPage:"+toPage+"---maxPage:"+maxPage);
		if(toPage > maxPage){
			tmppageli.addClass('disabled');
		}else{
			tmppageli.click({'toPage':toPage},$.proxy(this.options.onPage,this));
		}
		this.$pagination.append(tmppageli);
	},
	getCheckRows:function(){
		var checkeds = $('input[name="rowcheckbox"]:checked',this.$element);
		var pagedatas = this.page.datas;
		var r = new Array();
		for(var i = 0 ; i < checkeds.size() ; i++){
			var rownumber = $(checkeds.get(i)).val() * 1;
			r[i] = pagedatas[rownumber];
		}
		return r;
	},
	getRowData: function(index){
		return this.page.datas[index * 1];
	}
  };
  
  
 /* MyDataTable PLUGIN DEFINITION
  * ======================= */
  var old = $.fn.mydatatable;

  $.fn.mydatatable = function (option, datas) {
	if (typeof option == 'string'){
		if(option == 'getCheckRows'){
			return this.data('mydatatable')['getCheckRows']();
		}
		if(option == 'getRowData'){
			return this.data('mydatatable')['getRowData'](datas);
		}
	}
    return this.each(function(){
      var $this = $(this), data = $this.data('mydatatable'),
      options = $.extend({}, $.fn.mydatatable.defaults, $this.data(), typeof option == 'object' && option);
      if (!data)
    	  return $this.data('mydatatable', (data = new MyDataTable(this,options)));
      if (typeof option == 'string')
    	  return data[option](datas);
    });
  };
  
  $.fn.mydatatable.Constructor = MyDataTable;

  $.fn.mydatatable.defaults = {
	  onPage:$.noop
  };  

 /* MyDataTable NO CONFLICT
  * ================= */
  $.fn.mydatatable.noConflict = function(){
    $.fn.mydatatable = old;
    return this;
  };

}(window.jQuery);