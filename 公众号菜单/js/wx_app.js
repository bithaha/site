var app = angular.module("app",[]);
/*以下是固定url地址数据*/
var origin_urls=[{
	text: "常用快递员",
	url: "http://www.baidu1.com"
},{
	text: "寄快递",
	url: "http://www.baidu2.com"
},{
	text: "查快递",
	url: "http://www.baidu3.com"
},{
	text: "快递通知",
	url: "http://www.baidu4.com"
},{
	text: "我的订单",
	url: "http://www.baidu5.com"
},{
	text: "手机绑定",
	url: "http://www.baidu6.com"
},{
	text: "寄件地址",
	url: "http://www.baidu7.com"
},{
	text: "收件地址",
	url: "http://www.baidu8.com"
}]
/*以下是模拟后端response数据*/
var res = {
    "is_menu_open": 1,
    "selfmenu_info": {
        "button": [
            {
                "type": "view",
                "name": "要寄件",
                "url": "http://wx9e7b607a00bc1504.weixin.kdige.net/user/send/jump_to_smj?spa_path=send%2Fsend-form&user=15331584307"
            },
            {
                "name": "绑定手机",
                "sub_button": {
                    "list": [
                        {
                            "type": "view",
                            "name": "手机绑定",
                            "url": "http://wx9e7b607a00bc1504.weixin.kdige.net/user/mobile"
                        },
                        {
                            "type": "view",
                            "name": "查看取货码",
                            "url": "http://wx9e7b607a00bc1504.weixin.kdige.net/user/send/jump_to_smj?spa_path=my/express-notice"
                        }
                    ]
                }
            },
            {
                "name": "我的",
                "sub_button": {
                    "list": [
                        {
                            "type": "view",
                            "name": "我的订单",
                            "url": "http://wx9e7b607a00bc1504.weixin.kdige.net/user/send/jump_to_smj?spa_path=my/order-list"
                        },
                        {
                            "type": "view",
                            "name": "寄件地址",
                            "url": "http://wx9e7b607a00bc1504.weixin.kdige.net/user/send/jump_to_smj?spa_path=my/address-list?type=1"
                        },
                        {
                            "type": "view",
                            "name": "收件地址",
                            "url": "http://wx9e7b607a00bc1504.weixin.kdige.net/user/send/jump_to_smj?spa_path=my/address-list?type=2"
                        },
                        {
                            "type": "view",
                            "name": "常用快递员",
                            "url": "http://wx9e7b607a00bc1504.weixin.kdige.net/user/send/jump_to_smj?spa_path=send/"
                        },
                        {
                            "type": "view",
                            "name": "查快递",
                            "url": "http://wx9e7b607a00bc1504.weixin.kdige.net/user/send/jump_to_smj?spa_path=check"
                        }
                    ]
                }
            }
        ]
    }
}
app.controller("AppCtrl",function($scope,$location,$http,$timeout){
	

	$scope.buttons=res.selfmenu_info.button; //菜单列表
	$scope.origin_urls = origin_urls;//固定链接列表


	$scope.button_index = -2;
	$scope.select_btn = {}
	$scope.select_button = function(index,btn){
		$scope.button_index = index
		
		$scope.select_btn=btn
		
		$scope.sub_index=-2;
		
	}
	//子菜单切换
	$scope.sub_index=-2;
	$scope.select_sub_button = function(index,btn){
		$scope.sub_index = index
		$scope.select_btn=btn
	}
	//添加子菜单
	$scope.add_sub = function(btn){
		if(!btn.sub_button){
			delete btn.type;
			delete btn.url;
			btn.sub_button={
				list:[]
			}
		}

		btn.sub_button.list.push({
			name: "菜单",
			type: "",
			url: ""
		})
		
	}
	//url地址切换
	$scope.is_auto_url=true;
	$scope.select_url=function(item){
		if(item.url){
			$scope.select_btn.url=item.url;
			$scope.is_auto_url=false;
		}else{
			$scope.select_btn.url='';
			$scope.is_auto_url=true;
		}
	}
	$scope.has_url=function(){

		return $scope.origin_urls.find(function(item){return item.url===$scope.select_btn.url});
	}
	//删除按钮
	$scope.delete_btn=function(){
		if($scope.sub_index==-2){//当前删除的是父菜单
			$scope.buttons.splice($scope.button_index,1);
			$scope.button_index=-2;//初始化
		}else{//当前删除的是子菜单
			$scope.buttons[$scope.button_index].sub_button.list.splice($scope.sub_index,1);
			$scope.sub_index=-2;
			$scope.select_btn = {}
		}
	}
	//发布
	$scope.submit=function(){
		console.log($scope.buttons)
	}
})