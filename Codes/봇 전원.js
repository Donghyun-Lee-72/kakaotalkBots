const scriptName="봇 전원.js";

var botOn = true;
var administrator = ["미사카10032호(카페매니저)"];
var command;

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
if(msg == "!on" || msg == "!off") {
    if(administrator.indexOf(sender) != -1 && msg == "!on") {
    	if (botOn == true) {
            replier.reply ("봇의 전원이 이미 켜져 있습니다.");
        }
        else {
            botOn = true;
            Api.on("관리 및 상태.js");
            Api.on("imageDB.js");
            replier.reply ("봇의 전원이 켜졌습니다.");
        }
    }
    else if(administrator.indexOf(sender) != -1 && msg == "!off") {
		if (botOn == true) {
            botOn = false;
            Api.off("관리 및 상태.js");
            Api.off("imageDB.js");
            replier.reply ("봇의 전원이 꺼졌습니다.");
        }
        else replier.reply ("봇의 전원이 이미 꺼져 있습니다.");
    }
    else replier.reply (sender + "님은 관리자가 아니므로 이 명령어를 사용하실 수 없습니다.");
}