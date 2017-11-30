var imageUploader = {};
(function(){
	var g = $G,
        ajax = parent.baidu.editor.ajax,
        maskIframe = g( "maskIframe" ), 
        flashObj;
    var flagImg = null,flashContainer;
    imageUploader.init = function(){
        addOKListener();
    };

    function insertImage(imgObjs){
        editor.fireEvent('beforeInsertImage',imgObjs);
        editor.execCommand( "insertImage", imgObjs );
    }

    /**
     * 绑定确认按钮
     */
    function addOKListener(){
        dialog.onok = function (){
            return insertBatch();
        };
        dialog.oncancel = function(){
            hideFlash();
        }
    }

    /**
     * 插入多张图片
     */
    function insertBatch(){
        if ( imageUrls.length < 1 ) return false;
        var imgObjs = [];
        for ( var i = 0, ci; ci = imageUrls[i++]; ) {
            var tmpObj = {};
			tmpObj.src = ci.url;	
			tmpObj.title="user";
			if(ci.width>ci.height){				
				tmpObj.width = ci.width >200 ? 200:ci.width;
				if(tmpObj.width==200)
					tmpObj.height=(200/ci.width)*ci.height;
			}else{
				tmpObj.height = ci.height > 200 ? 200: ci.height;
				if(tmpObj.height==200)
					tmpObj.width=(200/ci.height)*ci.width;
			}	
            imgObjs.push( tmpObj );
        }
        insertImage(imgObjs);
        hideFlash();
    }

    function hideFlash(){
        //flashObj = null;
        //flashContainer.innerHTML = "";
    }

})();

function fileDialogStart(){

}

function fileQueued(file) {
	var file_list_box = $('#photo_list');
	//填充图片显示位置
	var empty_box = $('#photo_list > li.empty:eq(0)'),
		name = file.name,
		file_extension = name.substring(name.lastIndexOf('.') + 1,name.length).toLowerCase();
	empty_box.addClass('readying');
	var invalid = false, tip = '';
	var allowSize = parseInt(IMAGE_CONFIG.filetype[file_extension])*1024;
	var allowFileCount = parseInt(IMAGE_CONFIG.attachnum);

	if(empty_box.length){
		if(allowSize && file.size > allowSize){
			tip = '大小超限制('+ allowSize/1024 +'kb)';
			invalid = true;
		}else if(!allowSize) {
			tip = '不允许上传此类型文件('+ this.settings.file_types +')';
			invalid = true;
		}else if(file_list_box.find('li.uploaded,li.readying').size() > allowFileCount) {
			tip = '上传数量超出限制';
			invalid = true;
		}else{
			invalid = false;
			empty_box.replaceWith('<li class="readying" id="'+ file.id +'"><div class="schedule"><em>0%</em><span style="width:0%;"></span></div></li>');
		}
		//如果是无效的则取消上传
		if(invalid){
			this.cancelUpload(file.id);
			empty_box.before('<li class="invalid"><div class="error" title="'+ tip +'">'+ tip +'<a href="javascript:;" class="del">删除</a></div></li>');
		}
	}else{
		this.cancelUpload(file.id);
		tip = '上传数量超出限制';
		invalid = true;
		if( $('.limit').length <= 0){
			file_list_box.append('<li class="invalid limit"><div class="error" title="'+ tip +'">'+ tip +'<a href="javascript:;" class="del">删除</a></div></li>');
		}
	}
}

function fileDialogComplete(numFilesSelected, numFilesQueued){
	try{
		//this.getStats().files_queued  获取上传数量
		this.startUpload();
	}catch(ex){
       $.error(ex);
	}
}

function uploadStart(file){
	return true;
}

function uploadProgress(file, bytesLoaded, bytesTotal){
	var file_detail = $('#'+file.id);
	file_detail.removeClass('readying').addClass('uploading');
	try{
		var percent = Math.ceil((bytesLoaded / bytesTotal) * 100);
		file_detail.find('em').text(percent + '%');//显示进度
		file_detail.find('span').css('width',percent + '%');//使用宽度来显示进度条
	}catch(ex){
		$.error(ex);
	} 
}

function uploadSuccess(file, serverData){
	 try {
		var file_detail = $('#'+file.id);

		var json = $.parseJSON(serverData);
		if(json.state.toLowerCase() !== 'success'){
			file_detail.html('<div class="error" title="上传失败">上传失败<a href="javascript:;" class="del">删除</a></div>').addClass('invalid');
			return;
		}
		//var data = json.data;
		//file_list[''+ data['aid']] = {name : file.name, size : file.size, path : data.path, desc : '',is_new : true };
		file_detail.data('serverData', json.url).removeClass('uploading').addClass('uploaded');
		file_detail.html('<div class="get"><img alt="上传完成" src="'+ json.url +'" width="88" height="88"/><a href="javascript:;" class="del">删除</a></div>');
		imageUrls.push(json);
	} catch (ex) {
		$.error(ex);
	}
}

function uploadComplete(file, serverData){
	try{
		if(this.getStats().files_queued === 0){

		}else{
			this.startUpload();
		}
	}catch(ex){
		$.error(ex);
	}
}

function uploadError(file, errorCode, message){

}

//删除已经上传好的图片
$('#photo_list').on('click','a.del',function(e){
	e.preventDefault();
	var li = $(this).parent().parent();
	var url = li.data('serverData');
	if(url){		
		imageUrls.splice($.inArray(url, imageUrls),1);
		
		
	}
		
	if($('#photo_list li.uploaded').size() == parseInt(IMAGE_CONFIG.attachnum) && url == undefined){
		li.remove();
	}else{
		li.replaceWith('<li class="empty"><div class="no">暂无</div></li>');
	}
});

