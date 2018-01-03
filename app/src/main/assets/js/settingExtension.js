extension.setMessageListener(function(json) {
	console.log("=============setting extension=============");
	console.log(json);
	json = eval('(' + json + ')');
	var command = json.command;
	var type = json.type;
	var _token = json.token;
//	var result = json.data.result;
	if (type == "request") {
		console.log("========request===========");
		// 根据command命令不同，处理不同逻辑
	} else if (type == "response") {
		console.log("========response===========");
		if(command == "ACK_SETTING_GET_VIDEO_CAPABILITY"){
			// 返回视频性能参数
//			data:{
////				videoInputs:[ {
//			id:1,
//			name:”USB摄像头”,
//			videoPolicy:[{resolution:1,currentBitRate:200,minBitRate:100,maxBitRat	e:1000, stepLength:50},......],
//			minFrameRate:1,
//			currentFrameRate:30,
//			maxFrameRate:60
//			},...
//			  ]

			var result = json.data.videoInputs;
			console.log(result);
			if(result == "undefined" || result == "[]" || result == ""){
				console.log("ACK_SETTING_GET_VIDEO_CAPABILITY========没有数据");
				result = "";
			}
			showVideoInfo(result); 
		}else if(command == "ACK_SETTING_GET_VERSION"){
//			data:{
//				currentVersion:”2.0.01”,
//				latestVersion:”3.0.0.1”,
//				}
			//获取版本信息
			var result = json.data;
			console.log(result);
			if(result == "undefined" || result == "[]" || result == ""){
				console.log("ACK_SETTING_GET_VERSION========没有数据");
				result = "";
			}
			setVersionInit(result);
		}else if(command == "ACK_SETTING_GET_ACCOUNT"){
//			data:{
//				account:”admin123”,
//				SLWName:”01003”, #视联网号
//				groupName:”分组1”,
//				serverIp:”xxxxxx:xxxx”,
//				isRemberPwd:true/false,
//				}
			//获取账号信息
			var result = json.data;
			console.log(result);
			if(result == "undefined" || result == "[]" || result == ""){
				console.log("ACK_SETTING_GET_ACCOUNT========没有数据");
				result = "";
			}
			showAccoutInfo(result);
		}else if(command == "ACK_SETTING_GET_MEETING_PARAMS"){
			// 获取会议设置参数
//			data:{
//				mediaType:true/false,
//				forceAnswer:true/false,
//				AEC:true/false,
//				encoderType:1
//				}
			var result = json.data;
			console.log(result);
			if(result == "undefined" || result == "[]" || result == ""){
				console.log("ACK_SETTING_GET_MEETING_PARAMS========没有数据");
				result = "";
			}
			setMeetingInit(result);
		}
	}
});

/***
 * 页面向android发送命令
 * @param requestJson
 */
function postMessage(requestJson) {
	console.log("=========== setting->postMessage ===========");
	console.log(requestJson);
	extension.postMessage(requestJson);
}

// 对外开放接口，便于页面直接调用
// 发送消息
exports.postMessage = postMessage;