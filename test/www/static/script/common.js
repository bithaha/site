requirejs.config({
	baseUrl: 'static/script'
});
require(['widget/dialog'],function(dialog){
	console.log(dialog);
});