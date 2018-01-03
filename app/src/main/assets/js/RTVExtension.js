/**
 * Created by Administrator on 2016/11/15.
 */
extension.setMessageListener(function(json) {
    console.log("=============Live extension=============");
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
        if (command=='ACK_LIVE_GET_CHANNEL_LIST'){
            var result = json.data;
            console.log(result);

            setVideoList(result);
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