/** -------------------------------------------------  工具库  --------------------------------------------**/
/** * 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
    可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) * eg: * (new
    Date()).pattern("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423      
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04      
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04      
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04      
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18      
 */        
Date.prototype.pattern=function(fmt) {         
    var o = {         
    "M+" : this.getMonth()+1, //月份         
    "d+" : this.getDate(), //日         
    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时         
    "H+" : this.getHours(), //小时         
    "m+" : this.getMinutes(), //分         
    "s+" : this.getSeconds(), //秒         
    "q+" : Math.floor((this.getMonth()+3)/3), //季度         
    "S" : this.getMilliseconds() //毫秒         
    };         
    var week = {         
    "0" : "/u65e5",         
    "1" : "/u4e00",         
    "2" : "/u4e8c",         
    "3" : "/u4e09",         
    "4" : "/u56db",         
    "5" : "/u4e94",         
    "6" : "/u516d"        
    };         
    if(/(y+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));         
    }         
    if(/(E+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);         
    }         
    for(var k in o){         
        if(new RegExp("("+ k +")").test(fmt)){         
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
        }         
    }         
    return fmt;         
} 
//对Date的扩展，将 Date 转化为指定格式的String
//月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
//例子： 
//(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
//(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
 var o = {
     "M+": this.getMonth() + 1, //月份 
     "d+": this.getDate(), //日 
     "h+": this.getHours(), //小时 
     "m+": this.getMinutes(), //分 
     "s+": this.getSeconds(), //秒 
     "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
     "S": this.getMilliseconds() //毫秒 
 };
 if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
 for (var k in o)
 if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
 return fmt;
}

//图片转换工具
var MaImage = {};
MaImage.getUrl=function(imageId){
	if(imageId == '' || imageId == null || imageId == 'null'){
		return 'img/no_product.jpg'
	}else{
		return AP_FILE_PATH + imageId + '.jpg';
	}
}
MaImage.getUrlMid=function(imageId){
	if(imageId == '' || imageId == null || imageId == 'null'){
		return 'img/no_product_mid.jpg'
	}else{
		return AP_FILE_PATH + 'mid/' + imageId + '.jpg';
	}
}
MaImage.getUrlSmall=function(imageId){
	if(imageId == '' || imageId == null || imageId == 'null'){
		return 'img/no_product_small.jpg'
	}else{
		return AP_FILE_PATH + 'small/' + imageId + '.jpg';
	}
}


//网络请求部分
var ANAPP = new Object();
ANAPP.callAsyn = function(params){
	var my_async = true;
	if(!!params.async){
		my_async = params.async
	}
	var my_url = params.url;
	var my_data = params.data;
	var my_success = params.success;
	var my_error = params.error;
	var my_complete = params.complete;
	
	var my_contentType = 'application/x-www-form-urlencoded';
	if(!!params.contentType){
		my_contentType = params.contentType;
	}
	$.ajax({
		  type: 'POST',
		  url: my_url,
		  contentType: my_contentType,
		  dataType: 'json',
		  data: my_data,
		  async: my_async,
		  cache: false,
		  success: function(data, textStatus, jqXHR){
			if(!!data && data.isOk == false){
				console.log('服务器异常:' + data.opErrorMsg);
			}
			if(!!my_success){
				my_success(data);
			}
		  },error: function(XMLHttpRequest, textStatus, errorThrown){
			    console.log('通讯错误:textStatus:' + textStatus + ',errorThrown:' + errorThrown);
				if(!!my_error){
					my_error(XMLHttpRequest, textStatus, errorThrown);
				}
		  },complete:function(XHR, textStatus){
				if(!!my_complete){
					my_complete(XHR, textStatus);
				}
		  }
	});
}
//同步调用
ANAPP.callSyn = function(params){
	params.async = false;
	ANAPP.callAsyn(params);
}

//判断字符串是否以str开始
String.prototype.startWith=function(str){     
  var reg=new RegExp("^"+str);     
   return reg.test(this);        
}

//判断字符串是否以str结束
String.prototype.endWith=function(str){     
  var reg=new RegExp(str+"$");     
  return reg.test(this);        
}

//字符串工具类
var MAStr = {}
//如果str不为空，就返回str,否则返回''
MAStr.n = function(str){
	if(str == null || str == '' || str == 'null'){
		return '';
	}else{
		return str;
	}
}

//获得时间戳
getTimeStamp=function(){
	return Math.round(new Date().getTime()/1000) ;
}
//时间处理
//对Date的扩展，将 Date 转化为指定格式的String
//月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
//例子： 
//(new Date()).Format("yyyy-MM-dd HH:mm:ss.S") ==> 2006-07-02 08:09:04.423 
//(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
	 var o = {
	     "M+": this.getMonth() + 1, //月份 
	     "d+": this.getDate(), //日 
	     "H+": this.getHours(), //小时 
	     "m+": this.getMinutes(), //分 
	     "s+": this.getSeconds(), //秒 
	     "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	     "S": this.getMilliseconds() //毫秒 
	 };
	 if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	 for (var k in o)
	 if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	 return fmt;
}

//只能输入数字
function inputNumberOnly(event){
	if(!(event.keyCode==46)&&!(event.keyCode==8)&&!(event.keyCode==37)&&!(event.keyCode==39))
	    if(!((event.keyCode>=48&&event.keyCode<=57)||(event.keyCode>=96&&event.keyCode<=105)))
	    return false;
}

//文件预览组件
jQuery.fn.extend({
	uploadPreview: function (opts) {
	    var _self = this, _this = $(this);
	    opts = jQuery.extend({
	        Img: "ImgPr",
	        Width: 100,
	        Height: 100,
	        ImgType: ["gif", "jpeg", "jpg", "bmp", "png"],
	        Callback: function () { }
	    }, opts || {});
	    _self.getObjectURL = function (file) {
	        var url = null;
	        if (window.createObjectURL != undefined) {
	            url = window.createObjectURL(file);
	        } else if (window.URL != undefined) {
	            url = window.URL.createObjectURL(file);
	        } else if (window.webkitURL != undefined) {
	            url = window.webkitURL.createObjectURL(file);
	        }
	        return url;
	    }
	    _this.change(function () {
	        if (this.value) {
	            if (!RegExp("\.(" + opts.ImgType.join("|") + ")$", "i").test(this.value.toLowerCase())) {
	                alert("选择文件错误,图片类型必须是" + opts.ImgType.join("，") + "中的一种");
	                this.value = "";
	                return false;
	            }
	            if (navigator.userAgent.indexOf("MSIE") > -1) {
	                try {
	                    $("#" + opts.Img).attr('src', _self.getObjectURL(this.files[0]));
	                } catch (e) {
	                    var src = "";
	                    var obj = $("#" + opts.Img);
	                    var div = obj.parent("div")[0];
	                    _self.select();
	                    if (top != self) {
	                        window.parent.document.body.focus();
	                    } else {
	                        _self.blur();
	                    }
	                    src = document.selection.createRange().text;
	                    document.selection.empty();
	                    obj.hide();
	                    obj.parent("div").css({
	                        'filter': 'progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)',
	                        'width': opts.Width + 'px',
	                        'height': opts.Height + 'px'
	                    });
	                    div.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = src;
	                }
	            } else {
	                $("#" + opts.Img).attr('src', _self.getObjectURL(this.files[0]));
	            }
	            opts.Callback();
	        }
	    });
	}
});
/** -------------------------------------------------  /工具库  --------------------------------------------**/

/** -------------------------------------------------  公共分页  --------------------------------------------**/
function refreshPagination(page, paginationCallback, topageCallback){
	var $pagination = $('.ma-pagination');
	var changePage = paginationCallback;
	$pagination.empty();
	var curPage = page.curPage;
	var pageSize = page.pageSize;
	var maxRows = page.maxRows;
	var pageSize = page.pageSize;
	var maxPage = page.maxPage;
	//calculate page
	var pagestartnumber = Math.floor((curPage - 1)/5) * 5;
	var toPage = pagestartnumber;
	var tmppageli = null;
	var showMaxRows = ((curPage * pageSize) > maxRows)? maxRows : (curPage * pageSize);
	//if(maxPage == 1){
	//	return true;
	//}
	$pagination.append('<span class="p-num"></span>');
	$pnum = $(".p-num");
	tmppageli = $('<a class="pn-prev"><i>&lt;</i><em>上一页</em></a>');
	tmppageli.click({'toPage': curPage==1?1:(curPage-1)},changePage);
	if(curPage <= 1){//首页、上一页
		tmppageli.addClass('disabled');
	}
	$pnum.append(tmppageli);
	
	if(maxPage <= 6  || curPage < 6){
		for(var i=1; i <= 6 && i <= maxPage ; i++){
			if(curPage == i){
				tmppageli = $('<a href="javascript:void(0);" class="curr">' + i + '</a>');
			}else{
				tmppageli = $('<a href="javascript:void(0);">' + i + '</a>');
			}
			tmppageli.click({'toPage':i},changePage);
			$pnum.append(tmppageli);
		}
	}else{
		for(var i=1; i <= 2; i++){//最前两页
			if(curPage == i){
				tmppageli = $('<a href="javascript:void(0);" class="curr">' + i + '</a>');
			}else{
				tmppageli = $('<a href="javascript:void(0);">' + i + '</a>');
			}
			tmppageli.click({'toPage':i},changePage);
			$pnum.append(tmppageli);
		}
		
		$pnum.append('<b class="pn-break">...</b>');
		
		for(var i=(curPage - 2); i < curPage; i++){//当前页的前两页
			tmppageli = $('<a href="javascript:void(0);">' + i + '</a>');
			tmppageli.click({'toPage':i},changePage);
			$pnum.append(tmppageli);
		}
		//当前页
		tmppageli = $('<a href="javascript:void(0);" class="curr">' + curPage + '</a>');
		tmppageli.click({'toPage':i},changePage);
		$pnum.append(tmppageli);
		
		for(var i=(curPage + 1); i <= (curPage + 2) && i <= maxPage; i++){//当前页后两页
			tmppageli = $('<a href="javascript:void(0);">' + i + '</a>');
			tmppageli.click({'toPage':i},changePage);
			$pnum.append(tmppageli);
		}
		
		if(maxPage > (curPage + 2)){
			$pnum.append('<b class="pn-break">...</b>');
		}
	}
	if(curPage < maxPage){
		tmppageli = $('<a class="pn-next" href="javascript:;"><em>下一页</em><i>&gt;</i></a>');
		tmppageli.click({'toPage': (curPage + 1) > maxPage?maxPage:(curPage + 1)},changePage);
		$pnum.append(tmppageli);
	}
      
	$pagination.append('<span class="p-skip"></span>');
	$pskip = $('.p-skip');
	$pskip.append('<em>共<b>' + maxPage + '</b>页&nbsp;&nbsp;到第</em>');
	var $inputpage = $('<input class="input-txt" type="text" value="' + curPage + '" onkeydown="javascript:if(event.keyCode==13){}">');
	$inputpage.keydown(inputNumberOnly);
	$pskip.append($inputpage); 
	$pskip.append('<em>页</em>');
	tmppageli = $('<a class="btn btn-default" href="javascript:;">确定</a>');
	if(!topageCallback){
		topageCallback = function(){};
	}
	tmppageli.click({'inputObject': $inputpage,'maxPage':maxPage}, topageCallback);
	$pskip.append(tmppageli); 
}
/** ------------------------------------------------- /公共分页  --------------------------------------------**/


/**------------------------------------------------图片上传区域-----------------------------------------------**/
//文件上传组件初始化函数
function mafileuplod(upload_id, preview_id, callBack){
	var $e = $('#' + upload_id);
	this.$upload_ipt = $e;
    this.$file_box = this.$upload_ipt.parents('.maupload');
    var filetype=this.$file_box.data('filetype');
    if(filetype==null){
        filetype="img";
    }
    if(filetype=='img'){
        //图片文件才初始化预览
        this.$upload_ipt.uploadPreview({Img: preview_id});
    }
	//this.$upload_ipt.uploadPreview({Img: preview_id});
	//this.$file_box = this.$upload_ipt.parents('.maupload');
	this.setImgId = function(imgid){
		var $t = $('#' + upload_id).data('mafileuplod');
		$('.upload-btn', $t.$file_box).remove();
		if(imgid==null || imgid=='' || imgid=='null'){
			$('#' + preview_id).attr('src', 'img/no_product.jpg');
		}else{
			$('#' + preview_id).attr('src', AP_FILE_PATH + imgid);
		}
		$t.$file_box.data('fileid', imgid);
	}
	this.getImgId = function(){
		return this.$file_box.data('fileid');
	}
	this.fileupload = this.$upload_ipt.fileupload({
	    dataType: 'text',
		done: function (e, data) {
		  var $t = $('#' + upload_id).data('mafileuplod');
		  console.log(data.result);
		  var filesObject = JSON.parse(data.result);
		  var isclear=$t.$file_box.data('isclear');
		  if(typeof(isclear)=='undefined'||isclear!='1'){ 
			  $t.$file_box.data('fileid', filesObject.fileId); 
		  }
		  if(!!callBack){
			  callBack(filesObject.fileId, filesObject);
		  }
		  $('.upload-btn', $t.$file_box).remove();
		}, 
		add: function (e, data) {
			var $t = $('#' + upload_id).data('mafileuplod');
			$('.upload-btn', $t.$file_box).remove();
			data.context = $('<div class="upload-btn"></div>').text('上传文件')
            .insertAfter($t.$file_box.find(".up-sel-btn"))
            .click(function () {
                $('.upload-btn', $t.$file_box).addClass('loading');
                data.submit();
            });
			//data.submit();
	    },
	    submit: function(e, data){
	    	var $t = $('#' + upload_id).data('mafileuplod');
	    	data.formData = {fileDir: $t.$file_box.data('filedir'),
	    					 fileId: $t.$file_box.data('fileid'),
	    					 fileTag: $t.$file_box.data('filetag'),
	    					 mkSize: $t.$file_box.data('mksize'),
                             filetype: $t.$file_box.data('filetype')
	    					};
	    },
	    progressall: function (e, data) {
	    	var $t = $('#' + upload_id).data('mafileuplod');
	        var progress = parseInt((data.loaded / data.total) * 100, 10);
	        $t.$file_box.find('.progress .p-bar').css('width',progress + '%');
	        $t.$file_box.parent().find('.progress .p-txt').text(progress + '%');
	    }
	});
	$e.data('mafileuplod', this);
	return this;
}

/** --------------------------------------------------- /文件上传 ----------------------------------------------------- **/
//检测是否已经安装flash，检测flash的版本
var flashVersion =(function() {
        var version;
        try {
            version = navigator.plugins[ 'Shockwave Flash' ];
            version = version.description;
        } catch ( ex ) {
            try {
                version = new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version');
            } catch ( ex2 ) {
                version = '0.0';
            }
        }
        version = version.match( /\d+/g );
        return parseFloat( version[ 0 ] + '.' + version[ 1 ], 10 );
     })(),

    supportTransition = (function(){
        var s = document.createElement('p').style,r = 'transition' in s ||'WebkitTransition' in s ||'MozTransition' in s ||'msTransition' in s ||'OTransition' in s;
        s = null;
        return r;
})();

function initMutiUploader(element,opts){
    this.defaults = {
		pick: {
            id: '#filePicker-2',
            label: '浏览文件'
        },
        formData: {
        	fileDir: "icons",
        	fileTag:'wangEditor_icons'
        },
        dnd: '#dndArea',
        paste: '#uploader',
        swf: AP_PAGE_PATH+'assets/webuploader/0.1.5/Uploader.swf',
        chunked: false,
        chunkSize: 512 * 1024,
        server: AP_PAGE_PATH+'file/wangEditorUpload',
        // 禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
        disableGlobalDnd: true,
        fileNumLimit: 300,
        fileSizeLimit: 200 * 1024 * 1024,    // 200 M
        fileSingleSizeLimit: 50 * 1024 * 1024,    // 50 M
       
        moreFilePicker:"#filePicker2",
        morePickerTxt:"继续添加",
        $success:function(){
			alert("上传成功");
		},
		$error:function(){
			alert("上传失败");
		}
    },
	this.options = $.extend({}, this.defaults, opts);
	
	var $wrap = $(element),
    // 图片容器
    $queue = $('<ul class="filelist"></ul>').appendTo( $wrap.find('.queueList' ) ),
    // 状态栏，包括进度和控制按钮
    $statusBar = $wrap.find('.statusBar'),
    // 文件总体选择信息。
    $info = $statusBar.find('.info'),
    // 上传按钮
    $upload = $wrap.find('.uploadBtn'),
    // 没选择文件之前的内容。
    $placeHolder = $wrap.find('.placeholder'),
    $progress = $statusBar.find('.progress').hide(),
    // 添加的文件数量
    fileCount = 0,
    // 添加的文件总大小
    fileSize = 0,
    // 优化retina, 在retina下这个值是2
    ratio = window.devicePixelRatio || 1,
    // 缩略图大小
    thumbnailWidth = 110 * ratio,
    thumbnailHeight = 110 * ratio,
    // 可能有pedding, ready, uploading, confirm, done.
    state = 'pedding',
    // 所有文件的进度信息，key为file id
    percentages = {},
    // 判断浏览器是否支持图片的base64
    isSupportBase64 = ( function() {
        var data = new Image();
        var support = true;
        data.onload = data.onerror = function() {
            if( this.width != 1 || this.height != 1 ) {
                support = false;
            }
        }
        data.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
        return support;
    })(),
    // WebUploader实例
    uploader;
	
	initFlashTool();
	// 实例化
    uploader = WebUploader.create(options);
	
    // 拖拽时不接受 js, txt 文件。
    uploader.on( 'dndAccept', function( items ) {
        var denied = false,
            len = items.length,
            i = 0,
            // 修改js类型
            unAllowed = 'text/plain;application/javascript ';
        for ( ; i < len; i++ ) {
            // 如果在列表里面
            if ( ~unAllowed.indexOf( items[ i ].type ) ) {
                denied = true;
                break;
            }
        }
        return !denied;
    });

    uploader.on('dialogOpen', function() {
        console.log('here');
    });

    // 添加“添加文件”的按钮，
    uploader.addButton({
        id: options.moreFilePicker,
        label: options.morePickerTxt
    });

    uploader.on('ready', function() {
        window.uploader = uploader;
    });

    // 当有文件添加进来时执行，负责view的创建
    function addFile( file ) {
        var $li = $( '<li id="' + file.id + '">' +
                '<p class="title">' + file.name + '</p>' +
                '<p class="imgWrap"></p>'+
                '<p class="progress"><span></span></p>' +
                '</li>' ),

            $btns = $('<div class="file-panel">' +
                '<span class="cancel">删除</span>' +
                '<span class="rotateRight">向右旋转</span>' +
                '<span class="rotateLeft">向左旋转</span></div>').appendTo( $li ),
            $prgress = $li.find('p.progress span'),
            $wrap = $li.find( 'p.imgWrap' ),
            $info = $('<p class="error"></p>'),

            showError = function( code ) {
                switch(code) {
                    case 'exceed_size':
                        text = '文件大小超出';
                        break;
                    case 'interrupt':
                        text = '上传暂停';
                        break;
                    default:
                        text = '上传失败，请重试';
                        break;
                }
                $info.text( text ).appendTo( $li );
            };
        if ( file.getStatus() === 'invalid' ) {
            showError(file.statusText);
        } else {
            // @todo lazyload
            $wrap.text('预览中');
            uploader.makeThumb(file, function(error, src) {
                var img;
                if (error) {
                    $wrap.text( '不能预览' );
                    return;
                }
                if(isSupportBase64) {
                    img = $('<img src="'+src+'">');
                    $wrap.empty().append( img );
                } else {
                    $.ajax(options.server,{method: 'POST',data: src,dataType:'json'}).done(function( response ) {
                        if (response.result) {
                            img = $('<img src="'+response.result+'">');
                            $wrap.empty().append(img);
                        } else {
                            $wrap.text("预览出错");
                        }
                    });
                }
            }, thumbnailWidth, thumbnailHeight);
            percentages[ file.id ] = [ file.size, 0 ];
            file.rotation = 0;
        }

        file.on('statuschange', function(cur, prev) {
            if (prev === 'progress') {
                $prgress.hide().width(0);
            } else if (prev === 'queued') {
                $li.off('mouseenter mouseleave');
                $btns.remove();
            }
            // 成功
            if ( cur === 'error' || cur === 'invalid' ) {
                console.log( file.statusText );
                showError( file.statusText );
                percentages[ file.id ][ 1 ] = 1;
            } else if (cur === 'interrupt') {
                showError('interrupt');
            } else if (cur === 'queued') {
                percentages[ file.id ][ 1 ] = 0;
            } else if (cur === 'progress') {
                $info.remove();
                $prgress.css('display', 'block');
            } else if (cur === 'complete') {
                $li.append( '<span class="success"></span>' );
            }
            $li.removeClass( 'state-' + prev ).addClass( 'state-' + cur );
        });

        $li.on('mouseenter', function() {
            $btns.stop().animate({height: 30});
        });

        $li.on('mouseleave', function() {
            $btns.stop().animate({height: 0});
        });

        $btns.on('click', 'span', function() {
            var index = $(this).index(),
                deg;
            switch ( index ) {
                case 0:
                    uploader.removeFile( file );
                    return;
                case 1:
                    file.rotation += 90;
                    break;
                case 2:
                    file.rotation -= 90;
                    break;
            }
            if ( supportTransition ) {
                deg = 'rotate(' + file.rotation + 'deg)';
                $wrap.css({'-webkit-transform': deg,'-mos-transform': deg,'-o-transform': deg,'transform': deg});
            } else {
                $wrap.css( 'filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation='+ (~~((file.rotation/90)%4 + 4)%4) +')');
            }
        });
        $li.appendTo($queue);
    }
    // 负责view的销毁
    function removeFile(file) {
        var $li = $('#'+file.id);
        delete percentages[file.id];
        updateTotalProgress();
        $li.off().find('.file-panel').off().end().remove();
    }
    function updateTotalProgress() {
        var loaded = 0,
            total = 0,
            spans = $progress.children(),
            percent;
        $.each( percentages, function( k, v ) {
            total += v[ 0 ];
            loaded += v[ 0 ] * v[ 1 ];
        } );
        percent = total ? loaded / total : 0;
        spans.eq( 0 ).text( Math.round( percent * 100 ) + '%' );
        spans.eq( 1 ).css( 'width', Math.round( percent * 100 ) + '%' );
        updateStatus();
    }

    function updateStatus() {
        var text = '', stats;
        if (state === 'ready' ) {
            text = '选中' + fileCount + '张图片，共' +
                    WebUploader.formatSize( fileSize ) + '。';
        } else if ( state === 'confirm' ) {
            stats = uploader.getStats();
            if (stats.uploadFailNum ) {
                text = '已成功上传' + stats.successNum+ '张照片至XX相册，'+
                    stats.uploadFailNum + '张照片上传失败，<a class="retry" href="#">重新上传</a>失败图片或<a class="ignore" href="#">忽略</a>'
            }
        } else {
            stats = uploader.getStats();
            text = '共' + fileCount + '张（' +
                    WebUploader.formatSize( fileSize )  +
                    '），已上传' + stats.successNum + '张';
            if ( stats.uploadFailNum ) {
                text += '，失败' + stats.uploadFailNum + '张';
            }
        }
        $info.html( text );
    }
    function setState( val ) {
        var file, stats;
        if ( val === state ) {
            return;
        }
        $upload.removeClass('state-' + state );
        $upload.addClass('state-' + val );
        state = val;
        switch (state) {
            case 'pedding':
                $placeHolder.removeClass( 'element-invisible' );
                $queue.hide();
                $statusBar.addClass( 'element-invisible' );
                uploader.refresh();
                break;
            case 'ready':
                $placeHolder.addClass( 'element-invisible' );
                $(options.moreFilePicker).removeClass( 'element-invisible');
                $queue.show();
                $statusBar.removeClass('element-invisible');
                uploader.refresh();
                break;
            case 'uploading':
                $(options.moreFilePicker).addClass( 'element-invisible' );
                $progress.show();
                $upload.text( '暂停上传' );
                break;

            case 'paused':
                $progress.show();
                $upload.text('继续上传');
                break;

            case 'confirm':
                $progress.hide();
                $( '#filePicker2' ).removeClass( 'element-invisible' );
                $upload.text('开始上传');

                stats = uploader.getStats();
                if ( stats.successNum && !stats.uploadFailNum ) {
                    setState( 'finish' );
                    return;
                }
                break;
            case 'finish':
                stats = uploader.getStats();
                if ( stats.successNum ) {
                    if(!!options.$success){
                    	options.$success();
                    }
                } else {
                    // 没有成功的图片，重设
                    state = 'done';
                    if(!!options.$error){
                    	options.$error();
                    }
                }
                break;
        }
        updateStatus();
    }

    uploader.onUploadProgress = function(file, percentage) {
        var $li = $('#icon'+file.id),
        $percent = $li.find('.progress span');

        $percent.css( 'width', percentage * 100 + '%' );
        percentages[ file.id ][ 1 ] = percentage;
        updateTotalProgress();
    };

    uploader.onFileQueued = function( file ) {
        fileCount++;
        fileSize += file.size;
        if ( fileCount === 1 ) {
            $placeHolder.addClass( 'element-invisible' );
            $statusBar.show();
        }
        addFile( file );
        setState( 'ready' );
        updateTotalProgress();
    };

    uploader.onFileDequeued = function( file ) {
        fileCount--;
        fileSize -= file.size;
        if ( !fileCount ) {
            setState( 'pedding' );
        }
        removeFile( file );
        updateTotalProgress();

    };
    uploader.on( 'all', function( type ) {
        var stats;
        switch( type ) {
            case 'uploadFinished':
                setState( 'confirm' );
                break;
            case 'startUpload':
                setState( 'uploading' );
                break;
            case 'stopUpload':
                setState( 'paused' );
                break;
        }
    });
    uploader.onError = function( code ) {
        alert( 'Eroor: ' + code );
    };
    $upload.on('click', function() {
        if ( $(this).hasClass( 'disabled' ) ) {
            return false;
        }
        if ( state === 'ready' ) {
            uploader.upload();
        } else if ( state === 'paused' ) {
            uploader.upload();
        } else if ( state === 'uploading' ) {
            uploader.stop();
        }
    });

    $info.on( 'click', '.retry', function() {
        uploader.retry();
    } );

    $info.on( 'click', '.ignore', function() {
        alert( 'todo' );
    } );

    $upload.addClass( 'state-' + state );
    updateTotalProgress();
}

//判断浏览器flash插件是否可用
function initFlashTool(){
	if (!WebUploader.Uploader.support('flash') && WebUploader.browser.ie ) {
        // flash 安装了但是版本过低。
        if (flashVersion) {
            (function(container) {
                window['expressinstallcallback'] = function( state ) {
                    switch(state) {
                        case 'Download.Cancelled':
                            alert('您取消了更新！')
                            break;

                        case 'Download.Failed':
                            alert('安装失败')
                            break;

                        default:
                            alert('安装已成功，请刷新！');
                            break;
                    }
                    delete window['expressinstallcallback'];
                };

                var swf = 'expressInstall.swf';
                // insert flash object
                var html = '<object type="application/' + 'x-shockwave-flash" data="' +  swf + '" ';

                if (WebUploader.browser.ie) {
                    html += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ';
                }

                html += 'width="100%" height="100%" style="outline:0">'  +
                    '<param name="movie" value="' + swf + '" />' +
                    '<param name="wmode" value="transparent" />' +
                    '<param name="allowscriptaccess" value="always" />' +
                '</object>';

                container.html(html);

            })($wrap);

        // 压根就没有安转。
        } else {
            $wrap.html('<a href="http://www.adobe.com/go/getflashplayer" target="_blank" border="0"><img alt="get flash player" src="http://www.adobe.com/macromedia/style_guide/images/160x41_Get_Flash_Player.jpg" /></a>');
        }
        return;
    } else if (!WebUploader.Uploader.support()) {
        alert( 'Web Uploader 不支持您的浏览器！');
        return;
    }
	//重新获取验证码等待时间
	var wait = 60;
	function getcodetime(o) {
		if (wait == 0) {
			o.attr("disabled", false);
			o.val("获取验证码");
			wait = 60;
		} else {
			o.attr("disabled", true);
			o.val("重新发送(" + wait + ")");
			wait--;
			setTimeout(function() {
				getcodetime(o);
			}, 1000);
		}
	}
}


