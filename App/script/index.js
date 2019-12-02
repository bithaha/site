//alert(gettoken());//读取袜
//初始化菜单

$(document).ready(function () {
    //权限是否登录
    islogin();
    var role = getuserrole();
    switch (role) {
        case 0:
            initMember();
            break;
        case 1:
            initEmployee();
            break;
        case 2:
            initWaySite();
            break;
    }
});
function initMember() {
    var html = '<div class="cation clearfloat">';
    html += '<ul class="clearfloat">';
    html += '  	<li>';
    html += '   		<a href="inbox.html" >';
    html += '	    	<img src="img/inbox.png" />';
    html += '	    	<p>收件</p>';
    html += '           <span class="weui-badge">8</span>';
    html += '    	</a>';
    html += '    </li>';
    html += '     <li>';
    html += '         <a href="outbox.html">';
    html += '             <img src="img/outbox.png" />';
    html += '             <p>寄件</p>';
    html += '             <span class="weui-badge">8</span>';
    html += '         </a>';
    html += '     </li>';
    html += '     <li>';
    html += '         <a href="errorbox.html">';
    html += '             <img src="img/errorbox.png" />';
    html += '            <p>问题件</p>';
    html += '            <span class="weui-badge">8</span>';
    html += '        </a>';
    html += '    </li>';
    html += '	<li>';
    html += '		<a href="super.html">';
    html += '			<img src="img/daojian.png" />';
    html += '			<p>大件</p>';
    html += '           <span class="weui-badge">8</span>';
    html += '		</a>';
    html += '	</li>';
    html += '</ul>';
    html += ' </div>';
    $("#main").html(html);
}
function initEmployee() {
    var html = '<div class="cation clearfloat">';
    html += '<ul class="clearfloat">';
    html += '  	<li>';
    html += '   		<a href="inbox.html" >';
    html += '	    	<img src="img/inbox.png" />';
    html += '	    	<p>收件</p>';
    html += '           <span class="weui-badge">8</span>';
    html += '    	</a>';
    html += '    </li>';
    html += '     <li>';
    html += '         <a href="outbox.html">';
    html += '             <img src="img/outbox.png" />';
    html += '             <p>寄件</p>';
    html += '             <span class="weui-badge">8</span>';
    html += '         </a>';
    html += '     </li>';
    html += '     <li>';
    html += '         <a href="errorbox.html">';
    html += '             <img src="img/errorbox.png" />';
    html += '            <p>问题件</p>';
    html += '            <span class="weui-badge">8</span>';
    html += '        </a>';
    html += '    </li>';

    html += '	<li>';
    html += '		<a href="paijian.html">';
    html += ' 			<img src="img/paijianbox.png" />';
    html += ' 			<p>派送管理</p>';
    html += '           <span class="weui-badge">8</span>';
    html += '		</a>';
    html += '	</li>';
    html += '     <li>';
    html += '         <a href="paijian.html">';
    html += '            <img src="img/paijian.png" />';
    html += '             <p>待派单</p>';
    html += '             <span class="weui-badge">8</span>';
    html += '        </a>';
    html += '     </li>';
    html += '	<li>';
    html += '		<a href="paijian_wait.html">';
    html += ' 			<img src="img/paijian_wait.png" />';
    html += ' 			<p>待签收</p>';
    html += '           <span class="weui-badge">8</span>';
    html += '		</a>';
    html += '	</li>';
    html += '     <li>';
    html += '         <a href="lanjian.html">';
    html += '             <img src="img/lanjianbox.png" />';
    html += '             <p>揽件管理</p>';
    html += '             <span class="weui-badge">8</span>';
    html += '         </a>';
    html += '     </li>';
    html += '	<li>';
    html += '		<a href="lanjian.html">';
    html += '			<img src="img/lanjian.png" />';
    html += '			<p>待抢单</p>';
    html += '           <span class="weui-badge">8</span>';
    html += '		</a>';
    html += '	</li>';
    html += '	<li>';
    html += '		<a href="lanjian_wait.html">';
    html += ' 			<img src="img/lanjian_wait.png" />';
    html += '			<p>等收件</p>';
    html += '           <span class="weui-badge">8</span>';
    html += '		</a>';
    html += '	</li>';
    html += '	<li>';
    html += '		<a href="super.html">';
    html += '			<img src="img/daojian.png" />';
    html += '			<p>大件</p>';
    html += '           <span class="weui-badge">8</span>';
    html += '		</a>';
    html += '	</li>';
    html += '</ul>';
    html += ' </div>';
    $("#main").html(html);
}
function initWaySite() {
    var html = '<div class="cation clearfloat">';
    html += '<ul class="clearfloat">';
    html += '  	<li>';
    html += '   		<a href="inbox.html" >';
    html += '	    	<img src="img/inbox.png" />';
    html += '	    	<p>收件</p>';
    html += '    	</a>';
    html += '    </li>';
    html += '     <li>';
    html += '         <a href="outbox.html">';
    html += '             <img src="img/outbox.png" />';
    html += '             <p>寄件</p>';
    html += '         </a>';
    html += '     </li>';
    html += '     <li>';
    html += '         <a href="errorbox.html">';
    html += '             <img src="img/errorbox.png" />';
    html += '            <p>问题件</p>';
    html += '        </a>';
    html += '    </li>';
    html += '	<li>';
    html += '		<a href="paijian.html">';
    html += ' 			<img src="img/paijianbox.png" />';
    html += ' 			<p>派送管理</p>';
    html += '		</a>';
    html += '	</li>';
    html += '     <li>';
    html += '         <a href="paijian.html">';
    html += '            <img src="img/paijian.png" />';
    html += '             <p>待派单</p>';
    html += '        </a>';
    html += '     </li>';

    html += '     <li>';
    html += '         <a href="lanjian.html">';
    html += '             <img src="img/lanjianbox.png" />';
    html += '             <p>揽件管理</p>';
    html += '         </a>';
    html += '     </li>';
    html += '	<li>';
    html += '		<a href="lanjian.html">';
    html += '			<img src="img/lanjian.png" />';
    html += '			<p>待抢单</p>';
    html += '		</a>';
    html += '	</li>';
    html += '	<li>';
    html += '		<a href="super.html">';
    html += '			<img src="img/daojian.png" />';
    html += '			<p>大件</p>';
    html += '		</a>';
    html += '	</li>';
    html += '</ul>';
    html += ' </div>';
    $("#main").html(html);
}