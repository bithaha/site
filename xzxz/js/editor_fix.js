var repeatSub=1;var editor=new UE.ui.Editor({allHtmlEnabled:false});editor.render("editor");function MyAddEvent(b,c,a){if(b.attachEvent){b.attachEvent("on"+c,a)}else{b.addEventListener(c,a,false)}}editor.ready(function(){var b=editor.document;if(UE.browser.ie){var c=b.getElementsByTagName("body")[0];editor.addListener("selectionchange",function(){a()});function a(){var d=c.getElementsByTagName("blockquote");d.length&&MyAddEvent(d[0],"controlselect",function(){return false})}if(UE.browser.version==6){document.getElementById("upload_ie6").style.display="none"}}if(navigator.userAgent.indexOf("Firefox")!=-1){setTimeout(function(){b.designMode="off";b.execCommand("enableObjectResizing",false,"false")},1500)}});editor.addListener("beforeSubmit",function(){if(!valid()){return false}});function valid(){if(!repeatSub){return false}repeatSub=0;var a=editor.getContentTxt();if(!titVerify()){repeatSub=1;return false}if(!editor.hasContents()||a==UEDITOR_CONFIG.initialContent||a.length<5){alert("输入的内容不得小于5个字！");repeatSub=1;return false}window.UE_LEAVE=1;var b=document.getElementById("fosub");b.disabled="disabled";b.className="btn-submit btn-disabled";return true}function priview(){window.UE_LEAVE=1;if(!editor.hasContents()||editor.getContentTxt()==UEDITOR_CONFIG.initialContent){alert("内容为空，没有预览！(^.^)");return}var a=window.open("","_blank",""),c=a.document,b=editor.getContent();b=b.replace(/(width|height)\s?=\s?"\S+"/ig,"");b=b.replace(/<p>\s*<\/p>/ig,"<br/>");b='<!DOCTYPE HTML><html><head><link href="http://'+window.location.host+'/Public/ueditor/themes/default/iframe.css" type="text/css" rel="stylesheet"></head><body><div class="ue_limit">'+b+"</div></body></html>";c.open();c.write(b);c.close()}function upload(){window.UE_LEAVE=1;var a=editor.getDialog("insertimage");a.render();a.open()}editor.addListener("contentChange",function(){window.onbeforeunload=function(){if(window.UE_LEAVE==undefined){return"你确认要离开本页面吗？离开后你输入的内容将可能不被保存"}else{window.UE_LEAVE=null}}});