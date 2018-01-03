extension.setMessageListener(function(json) {
	console.log("=============videoCall extension=======gavin test======");
	console.log(json);
	json = eval('(' + json + ')');
	var command = json.command;
	var type = json.type;
	var _token = json.token;
	if(type == "request"){
		console.log("========request===========");
		if(command == "CMD_VIDEOCALL_CALLING"){
			console.log(json);
		}
	} else if (type == "response"){
		console.log("========response=======jsp test1====");
		// 拨打号码响应
		if("ACK_VCALL_START_CALL" == command){
			// data:{
				// result:”true/false”
				// message:"xxx"}
			var result = json.data.result;
			console.log(result);
			if(result == true){
				// 发送CMD_LOGIN_MODULE_EXIT
				var token = getToken();
				var requestJson = vvRequestJson({"token":token,"command":"CMD_VIDEOCALL_MODULE_EXIT"});
				console.log("退出命令："+requestJson);
				postMessage(requestJson);
				// 跳转页面
				goCalling();
			}else{
				// 发送错误信息，暂时打印出来
				var msg = json.data.message;
				console.log(msg);
				
			}
		}else if("ACK_VCALL_GET_CALLRECORD" == command){
			// 通话记录响应
			/*
			 * type:”response”, 
			 * command:”ACK_VCALL_GET_CALLRECORD”, 
			 * token:”xxxx”
			 * data:{ 
			 * list:[{
			 * userId:1234, userName:”zhangmc”,
			 * time:”2016-4-22”,isCall:true, isTurn:true}, ...}]
			 * isCall true拨打电话 false接听电话
			 * isTurn true接听 false未接听
			 */
			var result = json.data.list;
			console.log(result);
			if(result == "undefined" || result == "[]" || result == ""){
				console.log("ACK_VCALL_GET_CALLRECORD========没有数据");
				result = "";
			}
			showCallList(result);
		}else if("ACK_VCALL_GET_GROUP_LIST" == command){
			//获取分组信息(联系人)
			/*
			 data:{
					list:”["GroupID": 7,"GroupName": “group123”,"UserSum": 1,"UserOnline": 0}]”
				}*/
			var result = json.data.list;
			console.log(result);
			if(result == "undefined" || result == "[]" || result == ""){
				console.log("ACK_VCALL_GET_GROUP_LIST========没有数据");
				result = "";
			}
			showPeopleList(result);
		}else if("ACK_VCALL_GET_USER_LIST_BY_GROUPID" == command){
			//按组ID获取组内用户
//			data:{
//				list:[{name:”zhangmc”, userID:”1234”, isOnline:false},...]
//				}
			var result = json.data.list;
			console.log(result);
			if(result == "undefined" || result == "[]" || result == ""){
				console.log("ACK_VCALL_GET_USER_LIST_BY_GROUPID========没有数据");
				result = "";
			}
			showPeopleChildList(result);
		}
	}
});


/***
 * 页面向android发送命令
 * @param requestJson
 */
function postMessage(requestJson) {
	console.log("=========== videoCall->postMessage ===========");
	console.log(requestJson);
	extension.postMessage(requestJson);
}

// 对外开放接口，便于页面直接调用
// 发送消息
exports.postMessage = postMessage;
