/* ----------------------------------------------------- alert 弹出框 ------------------------------------------------ */
!function ($) {
 /* alert CLASS DEFINITION
  * ====================== */
  var Alert = function(element, in_options){
	this.$element  = $(element)
    this.options   = in_options;
  };
  Alert.prototype.open=function(msg, closeCallBack){
	  var $e = this;
	  var obj = $e.data('ma.alert');
	  var opts = obj.options;
	  opts.tmpOnClose = closeCallBack;
	  var left = ($(document).width() - $e.outerWidth())/2;
	  $e.css({'left': left + 'px', 'top': options.top});
	  if(!!msg)
		  $e.find('.content').html(msg);
	  $('#maskDiv').show();
	  $e.show();
  }
  Alert.prototype.close=function(event){
	  var $e = null;
	  if($(this).hasClass('close-btn')){//点击关闭按钮
		  $e = $(this).parent().parent('.ma.alert');
		  event.stopPropagation();
	  }else{
		  $e = this;
	  }
	  var obj = $e.data('ma.alert');
	  var opts = obj.options;
	  if(!!opts.onClose){
		  opts.onClose($e);
	  }
	  if(!!opts.tmpOnClose){
		  opts.tmpOnClose($e);
		  opts.tmpOnClose == null;
	  }
	  $('#maskDiv').hide();
	  $e.hide();
  }
  // ALERT PLUGIN DEFINITION
  // =======================
  function Plugin(option, params1, params2) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('ma.alert');
      options = $.extend({}, $.fn.ma_alert.defaults, $this.data(), typeof option == 'object' && option);
      if (!data) $this.data('ma.alert', (data = new Alert(this, options)))
      if (typeof option == 'string') data[option].call($this, params1, params2);
    })
  }
 /* alert PLUGIN DEFINITION
  * ======================= */
  var old = $.fn.ma_alert;
  $.fn.ma_alert = Plugin;
  $.fn.ma_alert.Constructor = Alert;
  $.fn.ma_alert.defaults = {top:'250px'}; 
 /* alert NO CONFLICT
  * ================= */
  $.fn.ma_alert.noConflict = function(){
    $.fn.ma_alert = old;
    return this;
  };
  $(document).on('click', '.ma.alert .close-btn', Alert.prototype.close);
}(window.jQuery);
/* ----------------------------------------------------- /alert 弹出框 ------------------------------------------------ */


/* ----------------------------------------------------- confirm 确认框 ------------------------------------------------ */
!function ($) {
 /* confirm CLASS DEFINITION
  * ====================== */
  var Confirm = function(element, in_options){
	this.$element  = $(element)
    this.options   = in_options;
  };
  Confirm.prototype.open=function(msg, okCallBack, cancelCallBack){
	  var $e = this;
	  var obj = $e.data('ma.confirm');
	  var opts = obj.options;
	  opts.OnOK = okCallBack;
	  opts.OnCancel = cancelCallBack;
	  var left = ($(document).width() - $e.outerWidth())/2;
	  $e.css({'left': left + 'px', 'top': options.top});
	  if(!!msg)
		  $e.find('.content').html(msg);
	  $('#maskDiv').show();
	  $e.show();
  }
  Confirm.prototype.ok=function(){
	  var $e = null;
	  if($(this).hasClass('ok-btn')){//点击关闭按钮
		  $e = $(this).parent().parent('.ma.confirm');
		  event.stopPropagation();
	  }else{
		  $e = this;
	  }
	  var obj = $e.data('ma.confirm');
	  var opts = obj.options;
	  if(!!opts.OnOK){
		  opts.OnOK($e);
		  opts.OnOK == null;
	  }
	  $('#maskDiv').hide();
	  $e.hide();
  }
  Confirm.prototype.cancel=function(event){
	  var $e = null;
	  if($(this).hasClass('cancel-btn')){//点击关闭按钮
		  $e = $(this).parent().parent('.ma.confirm');
		  event.stopPropagation();
	  }else{
		  $e = this;
	  }
	  var obj = $e.data('ma.confirm');
	  var opts = obj.options;
	  if(!!opts.OnCancel){
		  opts.OnCancel($e);
		  opts.OnCancel == null;
	  }
	  $('#maskDiv').hide();
	  $e.hide();
  }
  // ALERT PLUGIN DEFINITION
  // =======================
  function Plugin(option, params1, params2, params3) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('ma.confirm');
      options = $.extend({}, $.fn.ma_confirm.defaults, $this.data(), typeof option == 'object' && option);
      if (!data) $this.data('ma.confirm', (data = new Confirm(this, options)))
      if (typeof option == 'string') data[option].call($this, params1, params2, params3);
    })
  }
 /* alert PLUGIN DEFINITION
  * ======================= */
  var old = $.fn.ma_confirm;
  $.fn.ma_confirm = Plugin;
  $.fn.ma_confirm.Constructor = Confirm;
  $.fn.ma_confirm.defaults = {top:'250px'}; 
 /* alert NO CONFLICT
  * ================= */
  $.fn.ma_confirm.noConflict = function(){
    $.fn.ma_confirm = old;
    return this;
  };
  $(document).on('click', '.ma.confirm .ok-btn', Confirm.prototype.ok);
  $(document).on('click', '.ma.confirm .cancel-btn', Confirm.prototype.cancel);
}(window.jQuery);
/* ----------------------------------------------------- /confirm 确认框 ------------------------------------------------ */

/* ----------------------------------------------------- pupdiv 弹出框 ------------------------------------------------ */
!function ($) {
 /* PopUp CLASS DEFINITION
  * ====================== */
  var PopUp = function(element, in_options){
	this.$element  = $(element)
    this.options   = in_options;
  };
  PopUp.prototype.open=function(){
	  var $e = this;
	  var obj = $e.data('ma.popdiv');
	  var opts = obj.options;
	  var left = ($(document).width() - $e.outerWidth())/2;
	  $e.css({'left': left + 'px', 'top': opts.top});
	  $('#maskDiv').show();
	  $e.show();
  }
  PopUp.prototype.close=function(event){
	  var $e = null;
	  if($(this).hasClass('close-btn')){//点击关闭按钮
		  $e = $(this).parent('.ma.popdiv');
	  }else{
		  $e = this;
	  }
	  var obj = $e.data('ma.popdiv');
	  var opts = obj.options;
	  if(!!opts.onClose){
		  opts.onClose($e);
	  }
	  $('#maskDiv').hide();
	  $e.hide();
  }
  // PopUp PLUGIN DEFINITION
  function Plugin(option, params) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('ma.popdiv');
      options = $.extend({}, $.fn.ma_popup.defaults, $this.data(), typeof option == 'object' && option);
      if (!data) $this.data('ma.popdiv', (data = new PopUp(this, options)))
      if (typeof option == 'string') data[option].call($this);
    })
  }
  /* PopUp PLUGIN DEFINITION
  * ======================= */
  var old = $.fn.ma_popup;
  $.fn.ma_popup = Plugin;
  $.fn.ma_popup.Constructor = PopUp;
  $.fn.ma_popup.defaults = {top:'250px'}; 
  /* PopUp NO CONFLICT
  * ================= */
  $.fn.ma_popup.noConflict = function(){
    $.fn.ma_popup = old;
    return this;
  };
  $('.ma.popdiv').on('click', '.close-btn', PopUp.prototype.close);
}(window.jQuery);
/* ----------------------------------------------------- /pupdiv 弹出框 ------------------------------------------------ */



/* ----------------------------------------------------- dropmenu 下拉选择 ------------------------------------------------ */
//下拉菜单插件
!function($){
	//构造函数
	DropdownMenu = function(element, options){
		this.$element=$(element);
		this.options = $.extend({}, DropdownMenu.defaults, options);
		this.$element.children('.menu').css('width',this.$element.outerWidth()  + 'px');
		this.$element.click({'plugin': this}, this.click);
		this.$element.on('click', '.item', {'plugin': this}, this.itemclick);
		$('.item', this.$element).on('mouseenter', {'plugin': this}, this.item_mouseenter);
		$('.item', this.$element).on('mouseleave', {'plugin': this}, this.item_mouseleave);
	}
	//默认的options值
	DropdownMenu.defaults = {
		onChange: $.noop
	}
	DropdownMenu.prototype.click=function(event){
		event.stopPropagation();
		var plugin = event.data.plugin;
		var $e = plugin.$element;
		$('.ma.dropmenu .menu').slideUp('fast');
		var $menu = $e.children('.menu');
		if($menu.is(":hidden")){
			plugin.show($menu);
		}else{
			plugin.hide($menu);
		}
	}
	DropdownMenu.prototype.itemclick=function(event){
	    event.stopPropagation();
		event.preventDefault();
		var plugin = event.data.plugin;
		var $e = plugin.$element;
		var text_str = null;
		if($('.text', $(this)).size() > 0){
			text_str = $('.text', $(this)).text();
		}else{
			text_str = $(this).text();
		}
		$e.children('.text').html(text_str);
		$e.children('input').val($(this).data('value'));
		var $menu = $e.children('.menu');
		$('.item', $e).removeClass('active');
		$(this).addClass('active');
		plugin.hide($menu);
		if(typeof plugin.options.onChange == "function"){
			plugin.options.onChange($(this).data('value'), text_str, $(this));
		}
	}
	DropdownMenu.prototype.show=function($menu){
	    var $e = this.$element;
		//$menu.css({'top': ($e.outerHeight() - 2) + 'px', 'left': '-1px'});
		$menu.slideDown('fast');
	}
	DropdownMenu.prototype.hide=function($menu){
		$menu.slideUp('fast');
	}
	DropdownMenu.prototype.item_mouseenter=function(event){
		event.stopPropagation();
		event.preventDefault();
		$(this).children('.menu').show();
	}
	DropdownMenu.prototype.item_mouseleave=function(event){
		event.stopPropagation();
		event.preventDefault();
		$(this).children('.menu').hide();
	}
	DropdownMenu.prototype.setVal=function(newval){
		this.$element.find('.item[data-value="' + newval + '"]').click();
	}
	
	DropdownMenu.prototype.onChange=DropdownMenu.defaults.onChange;
	
	var old = $.fn.ma_dropmenu;
	$.fn.ma_dropmenu=function(option, args1){
		//支持jQuery的连接调用：循环把每个元素返回
		return this.each(function(){
			var $this = $(this);
            // 判断是否初始化过的依据
            var data = $this.data('maui.dropmenu');
            var options = typeof option == 'object' && option;
            // 如果没有初始化过, 就初始化它
            if(!data)$this.data('maui.dropmenu', (data = new DropdownMenu(this, options)));
			if (typeof option === "string" && typeof data[option] == "function") {
				data[option](args1);
			}
            //if (option == 'toggle') data.toggle();
            //else if (option) data.setState(option)
		});
	}
	//暴露类名, 可以通过这个为插件做自定义扩展
    $.fn.ma_dropmenu.Constructor = DropdownMenu;
    // ② 无冲突处理
    $.fn.ma_dropmenu.noConflict = function () {
        //$.fn.dropmenu = old;
        //return this  
    };
    $(document).on('click', function(){
    	$('.ma.dropmenu .menu').slideUp('fast');
    });
}(window.jQuery);
/* ----------------------------------------------------- /dropmenu 下拉选择 ------------------------------------------------ */

var Accordion = function(el, multiple) {
	this.el = el || {};
	this.multiple = multiple || false;

	// Variables privadas
	var links = this.el.find('.link');
	// Evento
	links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown);
	//links.toggleClass('open');
	//links.click();   
} 

Accordion.prototype.dropdown = function(e) {
	var $el = e.data.el;
		$this = $(this),
		$next = $this.next(); 

	$next.slideToggle(); 
	$this.parent().toggleClass('open');

	if (!e.data.multiple) {
		$el.find('.submenu').not($next).slideUp().parent().removeClass('open');
	};
}	

