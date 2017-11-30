/**
 * Created by JetBrains PhpStorm.
 * User: taoqili
 * Date: 12-2-20
 * Time: 上午11:19
 * To change this template use File | Settings | File Templates.
 */
var video = {};

(function(){
    video.init = function(){
        switchTab("videoTab");       
        addUrlChangeListener($G("videoUrl"));
        addOkListener();       

        //编辑视频时初始化相关信息
        (function(){
            var img = editor.selection.getRange().getClosedNode(),url;
            if(img && img.className == "edui-faked-video"){
                $G("videoUrl").value = url = img.getAttribute("_url");
            }
            createPreviewVideo(url);
        })();
    };
    /**
     * 监听确认和取消两个按钮事件，用户执行插入或者清空正在播放的视频实例操作
     */
    function addOkListener(){
        dialog.onok = function(){
            $G("preview").innerHTML = "";           
            return insertSingle();             
        };
        dialog.oncancel = function(){
            $G("preview").innerHTML = "";
        };
    }

    function selectTxt(node){
        if(node.select){
            node.select();
        }else{
            var r = node.createTextRange && node.createTextRange();
            r.select();
        }
    }

    
    /**
     * 将单个视频信息插入编辑器中
     */
    function insertSingle(){
        var width =300,
            height =200,
            url=$G('videoUrl').value;          
        if(!url) return false;
        if ( !checkNum( [width, height] ) ) return false;
        editor.execCommand('insertvideo', {
            url: convert_url(url),
            width: width,
            height: height            
        });
    }

    
   
    function convert_url(s){
        return s.replace(/http:\/\/www\.tudou\.com\/programs\/view\/([\w\-]+)\/?/i,"http://www.tudou.com/v/$1")
            .replace(/http:\/\/www\.youtube\.com\/watch\?v=([\w\-]+)/i,"http://www.youtube.com/v/$1")
            .replace(/http:\/\/v\.youku\.com\/v_show\/id_([\w\-=]+)\.html/i,"http://player.youku.com/player.php/sid/$1")
            .replace(/http:\/\/www\.56\.com\/u\d+\/v_([\w\-]+)\.html/i, "http://player.56.com/v_$1.swf")
            .replace(/http:\/\/www.56.com\/w\d+\/play_album\-aid\-\d+_vid\-([^.]+)\.html/i, "http://player.56.com/v_$1.swf")
            .replace(/http:\/\/v\.ku6\.com\/.+\/([^.]+)\.html/i, "http://player.ku6.com/refer/$1/v.swf");
    }

    /**
      * 检测传入的所有input框中输入的长宽是否是正数
      * @param nodes input框集合，
      */
     function checkNum( nodes ) {
         for ( var i = 0, ci; ci = nodes[i++]; ) {
             var value = ci.value;
             if ( !isNumber( value ) && value) {
                 alert( lang.numError );
                 ci.value = "";
                 ci.focus();
                 return false;
             }
         }
         return true;
     }

    /**
     * 数字判断
     * @param value
     */
    function isNumber( value ) {
        return /(0|^[1-9]\d*$)/.test( value );
    }

    /**
     * tab切换
     * @param tabParentId
     * @param keepFocus   当此值为真时，切换按钮上会保留focus的样式
     */
    function switchTab( tabParentId,keepFocus ) {
        var tabElements = $G( tabParentId ).children,
                tabHeads = tabElements[0].children,
                tabBodys = tabElements[1].children;
        for ( var i = 0, length = tabHeads.length; i < length; i++ ) {
            var head = tabHeads[i];
            domUtils.on( head, "click", function () {
                //head样式更改
                for ( var k = 0, len = tabHeads.length; k < len; k++ ) {
                    if(!keepFocus)tabHeads[k].className = "";
                }
                this.className = "focus";
                //body显隐
                var tabSrc = this.getAttribute( "tabSrc" );
                for ( var j = 0, length = tabBodys.length; j < length; j++ ) {
                    var body = tabBodys[j],
                        id = body.getAttribute( "id" );

                    if ( id == tabSrc ) {
                        body.style.display = "";                        
                        if(id=="video"){
                            selectTxt($G("videoUrl"));
                        }

                    } else {
                        body.style.display = "none";
                    }
                }
            } );
        }
    }
   

    
    /**
     * 监听url改变事件
     * @param url
     */
    function addUrlChangeListener(url){
        if (browser.ie) {
            url.onpropertychange = function () {
                createPreviewVideo( this.value );
            }
        } else {
            url.addEventListener( "input", function () {
                createPreviewVideo( this.value );
            }, false );
        }
    }

    /**
     * 根据url生成视频预览
     * @param url
     */
    function createPreviewVideo(url){

        if ( !url )return;
		var matches = url.match(/youtu.be\/(\w+)$/) || url.match(/youtube\.com\/watch\?v=(\w+)/) || url.match(/youtube.com\/v\/(\w+)/),
            youku = url.match(/youku\.com\/v_show\/id_(\w+)/);
		if (matches){
			url = "https://www.youtube.com/v/" + matches[1] + "?version=3&feature=player_embedded";
		}else if(youku){
            url = "http://player.youku.com/player.php/sid/"+youku[1]+"/v.swf"
        }else if(!endWith(url,[".swf",".flv",".wmv"])){
            $G("preview").innerHTML = lang.urlError;
            return;
        }
        $G("preview").innerHTML = '<embed type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"' +
        ' src="' + url + '"' +
        ' width="' + 420  + '"' +
        ' height="' + 280  + '"' +
        ' wmode="transparent" play="true" loop="false" menu="false" allowscriptaccess="never" allowfullscreen="true" ></embed>';
    }

    /**
     * 末尾字符检测
     * @param str
     * @param endStrArr
     */
    function endWith(str,endStrArr){
        for(var i=0,len = endStrArr.length;i<len;i++){
            var tmp = endStrArr[i];
            if(str.length - tmp.length<0) return false;

            if(str.substring(str.length-tmp.length)==tmp){
                return true;
            }
        }
        return false;
    }

   

    /**
     * 改变对象o的选中状态
     * @param o
     */
    function changeSelected(o){
        if ( o.getAttribute( "selected" ) ) {
            o.removeAttribute( "selected" );
            o.style.cssText = "filter:alpha(Opacity=100);-moz-opacity:1;opacity: 1;border: 2px solid #fff";
        } else {
            o.setAttribute( "selected", "true" );
            o.style.cssText = "filter:alpha(Opacity=50);-moz-opacity:0.5;opacity: 0.5;border:2px solid blue;";
        }
    }
    



})();