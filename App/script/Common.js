function Global() {
     // this.APP_PATH = "http://localhost:9900/";
      this.APP_PATH = "http://106.13.125.110:888/";
    this.IndexUrl = "index.html";
    //  jQuery.support.cors = true;
}
var global = new Global();

/*
存储localstorage时候最好是封装一个自己的键值，在这个值里存储自己的内容对象，封装一个方法针对自己对象进行操作。避免冲突也会在开发中更方便。
*/
var mystorage = (function mystorage(){
    var ms = "mystorage";
    var storage=window.localStorage;
    if(!window.localStorage){
        alert("浏览器支持localstorage");
        return false;
    }

    var set = function(key,value){
        //存储
        var mydata = storage.getItem(ms);
        if(!mydata){
            this.init();
            mydata = storage.getItem(ms);
        }
        mydata = JSON.parse(mydata);
        mydata.data[key] = value;
        storage.setItem(ms,JSON.stringify(mydata));
        return mydata.data;

    };

    var get = function(key){
        //读取
        var mydata = storage.getItem(ms);
        if(!mydata){
            return false;
        }
        mydata = JSON.parse(mydata);

        return mydata.data[key];
    };

    var remove = function(key){
        //读取
        var mydata = storage.getItem(ms);
        if(!mydata){
            return false;
        }

        mydata = JSON.parse(mydata);
        delete mydata.data[key];
        storage.setItem(ms,JSON.stringify(mydata));
        return mydata.data;
    };

    var clear = function(){
        //清除对象
        storage.removeItem(ms);
    };

    var init = function(){
        storage.setItem(ms,'{"data":{}}');
    };

    return {
        set : set,
        get : get,
        remove : remove,
        init : init,
        clear : clear
    };
})();

//令牌
function gettoken()
{
    return mystorage.get("user_token");
}
//用户名
function getusernumber()
{
    return mystorage.get("user_number");
}
//角色 0会员 ,1,派送员,2运营中心
function getuserrole() {
    return mystorage.get("user_role");
}
//权限
function getuserrule() {
    return mystorage.get("user_rule");
}
//用户json值
function getUser()
{
    return mystorage.get("user_object");
}

function islogin()
{
    var role = getuserrole();
    var token = gettoken();
    if (role == undefined || role == null || role == false || token == undefined || token == null || token==false) {
        this.location.href = 'login.html';
        return;
    }
}
