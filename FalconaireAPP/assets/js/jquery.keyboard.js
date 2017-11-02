$(function($){
	$.fn.keyboard = function() {
		var defaults = {
			"title": "输入密码",
			"total_num": 6,       //密码位数，默认6位密码
			"complete": null

		},pass=[],passTarget=[];
		var api = {
			init:function(opts){
				keyboard.show(opts);
			},
			reset:function(){
				keyboard.reset();
			},
			remove: function(){
				keyboard.remove();
			}
		}		

		var keyboard = {
			"show":function(opts){

				var options = $.extend(defaults,opts);
				pass = []; /* 密码数组 */
				passTarget=[]; /* 密码input框 */

				if($("#keyboardDialog").length > 0 || $("#keyboardCover").length > 0){
					$("#keyboardDialog,#keyboardCover").remove();
				}
				
				var template = '<div class="keyboard-dialog" id="keyboardDialog">'
							+  '	<div class="head">'
							+  '		<a class="btn-close" id="keyboardClose">&times;</a>'
							+  '		<div class="title">'+options.title+'</div>'
							+  '	</div>'
							+  '	<div class="body">'
							+  '		<div class="pass-inputs">'
							+  '		</div>'
							+  '	</div>'
							+  '	<div class="keyboard-area">'
							+  '		<a class="key-item" data-value="1">1</a>'
							+  '		<a class="key-item" data-value="2">2</a>'
							+  '		<a class="key-item" data-value="3">3</a>'
							+  '		<a class="key-item" data-value="4">4</a>'
							+  '		<a class="key-item" data-value="5">5</a>'
							+  '		<a class="key-item" data-value="6">6</a>'
							+  '		<a class="key-item" data-value="7">7</a>'
							+  '		<a class="key-item" data-value="8">8</a>'
							+  '		<a class="key-item" data-value="9">9</a>'
							+  '		<a class="key-item" data-value="empty"></a>'
							+  '		<a class="key-item" data-value="0">0</a>'
							+  '		<a class="key-item" data-value="del">删除</a>'
							+  '	</div>'
							+  '</div>'
							+  '<div class="keyboard-cover" id="keyboardCover"></div>'
				$('body').append(template);
				setTimeout(function(){
					$('#keyboardDialog').addClass("open");
				},1)
				
				/* 密码框初始化 */
				for(i=0;i<options.total_num;i++){					
					$('#keyboardDialog .pass-inputs').append('<div class="pass-item"><input type="password" readonly="readonly"></div>');
				}
				$('#keyboardDialog .pass-inputs .pass-item input').each(function(){
					passTarget.push($(this));
				})
				/* 绑定按键事件 */
				$('.keyboard-area .key-item').off("click").on("click",function(){		
					var val = $(this).attr("data-value"),
						n = pass.length;
					if(val == "empty"){return;}
					else if(val == "del" && pass.length <= 0){return;}
					else if(val == "del" && pass.length >= 0){
						passTarget[n-1].val("");
						pass.splice((n-1),1);
					}else{	
						if(n>=options.total_num){
							return;
						}
						passTarget[n].val(val);
						pass.push(val);
						if(pass.length >= passTarget.length){
							if(options.complete){
								setTimeout(function(){options.complete(pass);},1);
							}
						}
					}
				})
				/* 绑定关闭按钮事件 */
				$("#keyboardClose,#keyboardCover").click(function(){
					api.remove();
				})
			},
			"remove":function(){
				$('#keyboardDialog').removeClass("open");
				$("#keyboardCover").fadeOut(200);
				setTimeout(function(){
					$("#keyboardDialog,#keyboardCover").remove();
				},200)
			},
			"reset":function(){
				pass = []; /* 密码数组 */
				for(i in passTarget){
					passTarget[i].val("");
				}
				
			}

		}
		return api;
    }();
})