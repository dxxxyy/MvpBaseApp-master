extension.setMessageListener(function(json) {
	console.log("============vodExtension===========");
	console.log(json);
	json = eval('(' + json + ')');
	var command = json.command;
	var type = json.type;
	var _token = json.token;
	if(type == "request"){
		console.log("========request===========");
	}else if(type == "response"){
		console.log("========response===========");
//		data:{
//			list:[{id:1, name:”电影”, programCategoryID:1},...]
		// 返回节目分类
		if(command == "ACK_GET_PROGRAM_CATEGORY"){
			var result = json.data.list;
			if(result == "undefined" || result == "[]" || result == ""){
				console.log("ACK_GET_PROGRAM_CATEGORY========没有数据");
				result = "";
			}
			showProgramCategory(result);
		}else if(command == "ACK_GET_PROGRAM_CATEGORY_RESOURCES"){
			// 返回节目列表
//			data:{
//				list:[{id:1, title:”电影天堂”, thumbnail:”http://xxxx”,ProgramCategoryID},...]
			var result = json.data.list;
			if(result == "undefined" || result == "[]" || result == ""){
				console.log("ACK_GET_PROGRAM_CATEGORY_RESOURCES========没有数据");
				result = "";
			}
			showProgramCategoryResources(result);
		}else if(command == "ACK_GET_PROGRAM_DETAILS"){
			// 返回节目详情
//			data:{
//				details:{programID:1, title:”电影天堂”, thumbnail:”http://xxxx”,programType:”电影”, sourcesType:”上传”, info:”106分钟|2014年07月24日”, brief:”20世纪二十年代”}
			var result = json.data.details;
			if(result == "undefined" || result == "[]" || result == ""){
				console.log("ACK_GET_PROGRAM_DETAILS========没有数据");
				result = "";
			}
			showProgramDetails(result);
		}else if(command == "ACK_PROGRAM_PLAY"){
//			data:{
//				result:true/false,
//				message:”提示信息”
			var result = json.data.result;
			if(result == false || result == "false") {
				var msg = json.data.message;
				showPlayMessage(msg);
			}
		}
	}
});


/***
 * 页面向android发送命令
 * @param requestJson
 */
function postMessage(requestJson) {
	console.log("=========== vod->postMessage ===========");
	console.log(requestJson);
	extension.postMessage(requestJson);
}

// 对外开放接口，便于页面直接调用
// 发送消息
exports.postMessage = postMessage;
