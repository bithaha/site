"object"!=typeof JSON&&(JSON={}),function(){"use strict";function f(t){return t<10?"0"+t:t}function this_value(){return this.valueOf()}function quote(t){return rx_escapable.lastIndex=0,rx_escapable.test(t)?'"'+t.replace(rx_escapable,function(t){var e=meta[t];return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+t+'"'}function str(t,e){var r,n,o,u,f,a=gap,i=e[t];switch(i&&"object"==typeof i&&"function"==typeof i.toJSON&&(i=i.toJSON(t)),"function"==typeof rep&&(i=rep.call(e,t,i)),typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";if(gap+=indent,f=[],"[object Array]"===Object.prototype.toString.apply(i)){for(u=i.length,r=0;r<u;r+=1)f[r]=str(r,i)||"null";return o=0===f.length?"[]":gap?"[\n"+gap+f.join(",\n"+gap)+"\n"+a+"]":"["+f.join(",")+"]",gap=a,o}if(rep&&"object"==typeof rep)for(u=rep.length,r=0;r<u;r+=1)"string"==typeof rep[r]&&(n=rep[r],o=str(n,i),o&&f.push(quote(n)+(gap?": ":":")+o));else for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(o=str(n,i),o&&f.push(quote(n)+(gap?": ":":")+o));return o=0===f.length?"{}":gap?"{\n"+gap+f.join(",\n"+gap)+"\n"+a+"}":"{"+f.join(",")+"}",gap=a,o}}var rx_one=/^[\],:{}\s]*$/,rx_two=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rx_three=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rx_four=/(?:^|:|,)(?:\s*\[)+/g,rx_escapable=/[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,rx_dangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},Boolean.prototype.toJSON=this_value,Number.prototype.toJSON=this_value,String.prototype.toJSON=this_value);var gap,indent,meta,rep;"function"!=typeof JSON.stringify&&(meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(t,e,r){var n;if(gap="",indent="","number"==typeof r)for(n=0;n<r;n+=1)indent+=" ";else"string"==typeof r&&(indent=r);if(rep=e,e&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw new Error("JSON.stringify");return str("",{"":t})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){function walk(t,e){var r,n,o=t[e];if(o&&"object"==typeof o)for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(n=walk(o,r),void 0!==n?o[r]=n:delete o[r]);return reviver.call(t,e,o)}var j;if(text=String(text),rx_dangerous.lastIndex=0,rx_dangerous.test(text)&&(text=text.replace(rx_dangerous,function(t){return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})),rx_one.test(text.replace(rx_two,"@").replace(rx_three,"]").replace(rx_four,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();

document.domain = 'kankan.com';

;(function (root) {



  var docCookies = {
    /*
     |*|
     |*|	* docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
     |*|	* docCookies.getItem(name)
     |*|	* docCookies.removeItem(name[, path[, domain]])
     |*|	* docCookies.hasItem(name)
     |*|	* docCookies.keys()
     */
    getItem: function (sKey,WINDOW) {
      WINDOW = WINDOW || window;
      if (!sKey) { return null; }
      return decodeURIComponent(WINDOW.document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure, WINDOW) {
      if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
      var sExpires = "";
      if (vEnd) {
        switch (vEnd.constructor) {
          case Number:
            sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
            break;
          case String:
            sExpires = "; expires=" + vEnd;
            break;
          case Date:
            sExpires = "; expires=" + vEnd.toUTCString();
            break;
        }
      }
      WINDOW = WINDOW || window;
      WINDOW.document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
      return true;
    },
    removeItem: function (sKey, sPath, sDomain, WINDOW) {
      WINDOW = WINDOW || window;
      if (!this.hasItem(sKey)) { return false; }
      WINDOW.document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
      return true;
    },
    hasItem: function (sKey,WINDOW) {
      WINDOW = WINDOW || window;
      if (!sKey) { return false; }
      return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(WINDOW.document.cookie);
    },
    keys: function (WINDOW) {
      WINDOW = WINDOW || window;
      var aKeys = WINDOW.document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
      for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
      return aKeys;
    }
  };

  function SyncStorageClient(url, opts) {
    opts = opts || {};

    var client = this, frame;

    client._connected = false;

    SyncStorageClient._frameId = opts.frameId || 'SyncStorageClient-' + SyncStorageClient._generateUUID();
    client._frameId = SyncStorageClient._frameId;

    if (opts.frameId) {
      frame = document.getElementById(opts.frameId);
    }

    frame = frame || SyncStorageClient._createFrame(url);
    client._frame = frame;

    if (opts.frameId) {
      client._storage = frame.contentWindow.SyncStorageHub;
      _connected = true;
    } else {
      frame.onload = function () {
        client._storage = frame.contentWindow.SyncStorageHub;
        client._connected = true;
        frame.onload = null;
      }
    }
  
    client._sendMessage = function(msg){
      var ifrWindow = frame.contentWindow || frame;
      ifrWindow.postMessage( (msg || 'hello'),'*')
    }
    client._setCallbacks = {};
    client._getCallbacks = {};
  
    client._receiveMessage = function(event) {
      var obj;
      try{
        obj = JSON.parse(event.data || '{}');
      }catch(e){
        obj = {};
      }
      if(obj.s && obj.s == 'ok'){
        if(obj.o == 'g'){
          if(typeof client._getCallbacks[obj.k] === 'function') client._getCallbacks[obj.k](obj.r);
          delete client._getCallbacks[obj.k]
        }else if(obj.o == 's'){
          if(typeof client._setCallbacks[obj.k] === 'function') client._setCallbacks[obj.k](obj.r);
          delete client._setCallbacks[obj.k];
        }
      }
    }
    client._isSupportAsync = function () {
      if (window.JSON && window.postMessage && window.addEventListener){
        return true;
      }else{
        return false;
      }
    }
    if(client._isSupportAsync())
      window.addEventListener("message", client._receiveMessage, false);
  }

  SyncStorageClient.frameStyle = {
    display: 'none',
    position: 'absolute',
    top: '-999px',
    left: '-999px'
  };

  SyncStorageClient._generateUUID = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16|0, v = c == 'x' ? r : (r&0x3|0x8);

      return v.toString(16);
    });
  };

  SyncStorageClient._createFrame = function (url) {
    var frame, key;

    frame = window.document.createElement('iframe');
    frame.id = SyncStorageClient._frameId;

    // Style the iframe
    for (key in SyncStorageClient.frameStyle) {
      if (SyncStorageClient.frameStyle.hasOwnProperty(key)) {
        frame.style[key] = SyncStorageClient.frameStyle[key];
      }
    }

    // change IE8 body appendChild to insertBefore body.firstChild
    // body may be empty
    if(document.body.firstChild){
      document.body.insertBefore(frame,document.body.firstChild);
    }else{
      window.document.body.appendChild(frame);
    }
	
    frame.src = url;

    return frame;
  };

  SyncStorageClient.prototype = {
    constructor: SyncStorageClient,
    onConnect: function (callback) {
      var client = this, interval;

      if (client._connected) return callback();
      
      interval = setInterval(function () {
        if (!client._connected) return;
        clearInterval(interval);
        return callback();
      }, 50);
    },
    set: function (key, value, domain, expire,path,secure) {
      var client = this;
      domain = domain || 'vod.kankan.com';
      expire = expire || 300 ;
      path = path || '/';
      var r;
      try {
        r = this._storage._set(key, value);
      }catch (e){
        var tmp_window;
        var ele_i = client._frame || document.getElementById(client._frameId);
        if (ele_i.contentWindow){
          tmp_window = ele_i.contentWindow;
        }else{
          tmp_window = window.frames[client._frameId];
        }
        r = docCookies.setItem(key,value,expire,path,domain,secure,tmp_window)
      }
      return r;
    },
    setAsync:function (key,value,cb) {
      if(!this._isSupportAsync()){
        return false;
      }
      var sentObj = {
        //operation : set
        "o":"s" ,
        "k":key,
        "v":value
      };
      var sentStr = JSON.stringify(sentObj);
      this._sendMessage(sentStr);
      if(cb) this._setCallbacks[key] = cb;
    },
    get: function (key, defaultValue) {
      var client = this;
      var r;
      try{
        r = this._storage._get(key, defaultValue);
      }catch (e){
        
        if (window.location.href.indexOf('vod.kankan.com')>=0){ //current site is vod.kankan.com
          r = docCookies.getItem(key);
        }else{
          var tmp_window;
          var ele_i = client._frame || document.getElementById(client._frameId);
          if (ele_i.contentWindow){
            tmp_window = ele_i.contentWindow;
          }else{
            tmp_window = window.frames[client._frameId];
          }
          r = docCookies.getItem(key,tmp_window);
        }
      }
      return r;
    },
    getAsync: function (key,cb) {
      if(!this._isSupportAsync()){
        return false;
      }
      var sentObj = {
        //operation : get
        "o":"g",
        "k":key
      };
      var sentStr = JSON.stringify(sentObj);
      this._sendMessage(sentStr);
      if(cb) this._getCallbacks[key] = cb;
    },
    has: function (key) {
      return this.get(key) !== undefined;
    },
    remove: function (key, path, domain) {
      var client = this;
      domain = domain || 'vod.kankan.com';
      path = path || '/';
      var r;
      try {
        r = this._storage._remove(key);
      }catch (e){
        var tmp_window;
        var ele_i = client._frame || document.getElementById(client._frameId);
        if (ele_i.contentWindow){
          tmp_window = ele_i.contentWindow;
        }else{
          tmp_window = window.frames[client._frameId];
        }
        r = docCookies.removeItem(key, path, domain, tmp_window)
      }
      return r;
    },
    clear: function () {
      return this._storage._clear();
    },
    getAll: function () {
      return this._storage._getAll();
    },
    Cookies : docCookies
  };



  // 用于模块加载，暂时用不到
  root.SyncStorageClient = SyncStorageClient;
}(this));