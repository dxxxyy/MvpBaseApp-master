extension.setMessageListener(function(json) {
	console.log("=============login extension=============");
	console.log(json);
	json = eval('(' + json + ')');
	var command = json.command;
	var type = json.type;
	var _token = json.token;
//	var result = json.data.result;
	if (type == "request") {
		// 根据command命令不同，处理不同逻辑
		// 自动登录
		if (command == "CMD_LOGIN_AUTO_LOGIN_RETURN") {
			// params:{
				// result:”true/false”
				// message:"xxx"
			// }
			var result = json.params.result;
			if(result == true){
				// 自动登录
				setMessage("登录中");
				// 发送CMD_LOGIN_MODULE_EXIT
				var token = getToken();
				var requestJson = vvRequestJson({"token":token,"command":"CMD_LOGIN_MODULE_EXIT"});
				console.log("退出命令："+requestJson);
				extension.postMessage(requestJson);
				// 进入主页
				goIndex();
			}else{
				var msg = json.params.message;
				setErrorMessage(msg);
				// 隐藏等待条
				hideLoading();
				// 恢复焦点
				showFocus();
			}
		} else if (command == "CMD_LOGIN_SEND_USER_INFO_SAVED") {
			// 页面登录
			// params:{
				// name:”xxx”,
				// pwd:”xx”,
				// ip:”xx”,
				// isAuto:”true/false” #
				// IsRememberPWD:”true/false”
			// }
			var result = json.params;
			var name = result.name;
			var pwd = result.pwd;
			var ip = result.ip;
			var isAuto = result.isAuto;
			var IsRememberPWD = result.IsRememberPWD;
			// _token 
			// 页面赋值
			$("#server_name").val(ip);
			$("#user_name").val(name);
			$("#pwd_name").val(pwd);
//			if(isAuto){
//				$(".remember").addClass("remember_checked");
//			}
//			if(IsRememberPWD){
//				$(".auto_login").addClass("remember_checked");
//			}
			console.log(result);
			// 隐藏等待条
			hideLoading();
			// 恢复焦点
			showFocus();
		} 
	} else if (type == "response") {
		console.log("========response===========");
		if (command == "ACK_LOGIN_SUBMIT") {
			//data：{
			// result:”true/false”,
			// message:”xxx”
			// 登录响应
			var result = json.data.result;
			if (result == true) {
				setMessage("登录中");
				// 发送CMD_LOGIN_MODULE_EXIT
				var token = getToken();
				var requestJson = vvRequestJson({"token":token,"command":"CMD_LOGIN_MODULE_EXIT"});
				console.log("退出命令："+requestJson);
				extension.postMessage(requestJson);
				// 进入主页
				goIndex();
			}else {
				var msg = json.data.message;
				setErrorMessage(msg);
				// 隐藏等待条
				hideLoading();
				// 恢复焦点
				showFocus();
			}
		}
	}
});

/***
 * 页面向android发送命令
 * @param requestJson
 */
function postMessage(requestJson) {
	console.log("=========== login->postMessage ===========");
	console.log(requestJson);
	extension.postMessage(requestJson);
}

// 对外开放接口，便于页面直接调用
// 发送消息
exports.postMessage = postMessage;