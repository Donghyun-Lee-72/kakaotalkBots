const scriptName="관리자_인증.js";

var administrator = ['큐비스트']; //관리자 목록
var master = []; //로그인한 관리자 목록
var key; //무작위 생성될 암호

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
	if(administrator.indexOf(sender) !== -1) {
		if(msg === "/관리자로그인") {
			key = Math.floor(Math.random()*9000) + 1000;
			replier.reply(sender, key);
			replier.reply("비밀번호를 입력해주세요.");
		}
		else if(msg == key) {
			key = undefined;
			master.push(sender);
			replier.reply(sender + "님이 관리자로 로그인 하셨습니다.");
		}
		else if(msg === "/로그아웃") {
			for(i=0; i < master.length; i++) {
				if(master[i] === sender) {
					master.splice(i, 1);
				}
			}
			replier.reply(sender + "님이 관리자 계정에서 로그아웃 하셨습니다.");
		}
	}


	if(master.indexOf(sender) !== -1) {
		//여기에 관리자 계정 명령어 입력
	}
}