function renderRow(data,i){
	var topClass = i<3?'level':'';
	var firstClass = i<3?'l'+(i+1):'';
	var html = `<tr class="${topClass} ${firstClass}">
					<td width="12%"><div class="num"><b>${i+1}</b><em></em></div></td>
					<td width="16%" class="color-yellow">${data.name}</td>
					<td width="10%" class="color-pink-light">${data.orders}</td>
					<td width="24%" class="color-yellow">${data.sales}</td>
					<td width="16%" class="color-pink-dark">${data.award}</td>
					<td width="" class="color-purple">${data.jf_num}</td>
				</tr>`
	return html;
}
function render(datas,page){
	$('.viewport-main .table-container table').empty();
	for(var i = page; i < 30+page; i++){
		var data = datas[i];
		var html = renderRow(data,i);
		var index = Math.floor((i-page)/10)
		$('.viewport-main .table-container').eq(index).find('table').append(html)
	}
}

var step = 0;
function getData(type,page){
	$.ajax({
		url: 'http://jf.qcs99.com/get/datas/?stype='+type,
		method:'get',

		success: function(res){
			var datas = res.datas.map(item=>{
				['orders','sales','award','jf_num'].map(key=>{
					if(item[key]>=10000000){
						item[key] = parseFloat(item[key]/10000000).toFixed(2)+'千万'
					}else{
						item[key] = parseInt(item[key])
					}
				})
				return item;
			})
			render(datas,page)
			setTimeout(function(){
				step>=3?step=0:step++
				sleepTime();
			},10000)
		}
	})
}
function sleepTime(){
	let type = 'yj';
	let page = 0;
	switch(step){
		case 0: break;
		case 1: page = 30;break;
		case 2: type = 'jf';break;
		case 3: type = 'jf',page =30;break;
	}
	getData(type,page);
}
$(function(){
	sleepTime();
})
