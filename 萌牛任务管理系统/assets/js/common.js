(function(){
    var Api = {
        current: 'default',
        set:function(t){
            this.current = t;
            localStorage.setItem('currentTheme',this.current);
            this.addCssByLink('./assets/css/theme/'+this.current+'.css')
        },
        init:function(){
            var currentTheme = localStorage.getItem('currentTheme');
            currentTheme && this.set(currentTheme);
        },
        addCssByLink(url){
            var doc=document;
            var link=doc.createElement("link");
            link.setAttribute("id", "themeCss");
            link.setAttribute("rel", "stylesheet");
            link.setAttribute("type", "text/css");
            link.setAttribute("href", url);

            var prev = document.getElementById('themeCss')
            if(prev){
               prev.parentNode.removeChild(prev) 
            }
            var heads = doc.getElementsByTagName("head");
            if(heads.length)
                heads[0].appendChild(link);
            else
                doc.documentElement.appendChild(link);
            }
        }
    Api.init();
    window.theme = Api
})()
$(function(){
    
})
