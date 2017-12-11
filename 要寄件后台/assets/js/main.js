var AP_PAGE_PATH = $('base').attr('href');
var AP_FILE_PATH = AP_PAGE_PATH + 'file/get/';
var AP_TOUR_SLIDEBAR_NUM=5;
var regx_user_phone = /^(13[0-9]|15[0-9]|18[0-9])\d{8}$/;
var regx_user_mail = /^([a-z0-9A-Z]+[-|\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-zA-Z]{2,}$/;
var regx_price = /^\d+(\.\d{2})?$/;
var regx_int = /^[1-9]\d*$/;
var myform;
layui.use(['layer', 'form'], function(){
	//layui初始化
	myform = layui.form();
});

//编辑器初始化函数
function initwangEditor(div_id){
	var editor = new wangEditor(div_id);
    editor.config.uploadImgUrl = AP_PAGE_PATH + 'file/wangEditorUpload';
    editor.config.uploadParams = {
        token: 'tourmodify',
        user: 'admin'
    };
    // 配置自定义表情，在 create() 之前配置
    editor.config.emotions = {
		// 第一组，id叫做 'default' 
	    'default': {
	        title: '默认',  // 组名称
	        data: AP_PAGE_PATH+'adm/json/icons'  // data 可以是一个url地址，访问该地址要能返回表情包的json文件
	    },
    };
    // 取消粘贴过滤
    editor.config.pasteFilter = false;
    editor.create();
    return editor;
}
//编辑器内容读取
function readEditorHtml(editor){
	var html = editor.$txt.html();
	return html;
}

//编辑器内容读取
function readEditorTxt(editor){
	var html = editor.$txt.text();
	return html;
}

getTimeStamp=function(){
	return Math.round(new Date().getTime()/1000) ;
}