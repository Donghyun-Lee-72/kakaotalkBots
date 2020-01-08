const scriptName="imageDB.js";

var year = new Date().getFullYear();
var month = new Date().getMonth() + 1;
var date = new Date().getDate();
var short_date = ("0" + String(month*100 + date)).slice(-4);
var long_date = (year + short_date).slice(-6);

var 상위관리자 = Bridge.getScopeOf("관리 및 상태.js").상위관리자
var 관리자 = Bridge.getScopeOf("관리 및 상태.js").관리자
var 관리자인증 = false;

var limit = 15;


function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {

if(room == "[ DEV ] 위아더원 커뮤니티 카카오톡" || sender == "큐비스트") {
	//프사등록	
	if(msg == "!프사등록") {
		if(관리자.indexOf(sender) == -1 || 상위관리자.indexOf(sender) != -1) {
			if (DataBase.getDataBase(sender) == undefined) {
		        DataBase.setDataBase(sender, short_date + "\n" + java.lang.String(ImageDB.getProfileImage()).hashCode());
		        DataBase.appendDataBase("프사등록자_목록", sender + ", ");
		        replier.reply(sender + "님의 프로필 사진을 등록했습니다!");
		    }
		    else {
		    	DataBase.setDataBase(sender, short_date + "\n" + java.lang.String(ImageDB.getProfileImage()).hashCode())
		    	replier.reply(sender + "님의 프로필 사진을 재등록했습니다!");
	    	}
    	}
    	else {
    		replier.reply("관리자의 프로필 사진은 상위관리자만 등록할 수 있습니다.\n愛 (아이)님이 확인하시는대로 등록하겠습니다.");
    		replier.reply("큐비스트", sender + "\n" + java.lang.String(ImageDB.getProfileImage()).hashCode());
    		replier.reply("큐비스트", "위의 관리자가 프로필 사진 등록을 원합니다.");
    	}

    }
    //관리자 프사 등록허가
    //!등록허가 ~~~, ~~~~에 받은내용 배껴넣기
    if(room == "큐비스트" && msg.indexOf("!등록허가 ")==0) {
    	var target = msg.split(" ")[1].split("\n")[0]
    	var profile = msg.split("\n")[1]
    	DataBase.setDataBase(target, short_date + "\n" + profile);
    	DataBase.appendDataBase("프사등록자_목록", target + ", ");
    }


    //관리자 확인
    if(msg == "!관리자인증" && 관리자.indexOf(sender) != -1) {
    	if(DataBase.getDataBase(sender).substr(5) == java.lang.String(ImageDB.getProfileImage()).hashCode()) {
    		
    	}
    	else if(DataBase.getDataBase(sender).substr(5) != java.lang.String(ImageDB.getProfileImage()).hashCode()) {
			replier.reply("!프사등록 명령어로 프로필 사진을 재등록해주세요!")
		}
    	else if(DataBase.getDataBase(sender) == undefined) {
    		replier.reply("!프사등록 명령어로 프로필 사진을 등록해주세요!");
		}
	}


    //프사 기간만료 확인
    if(관리자.indexOf(sender) != -1 && msg == "!프사정리") {
		var 등록자수 = DataBase.getDataBase("프사등록자_목록").split(", ").length - 1;
		var 등록자;
		var 시작일시;
		var 삭제목록 = "";
		var 보존목록 = "";

		for(var i = 0; i < 등록자수; i++) {
			등록자 = DataBase.getDataBase("프사등록자_목록").split(", ")[i];
			시작일시 = DataBase.getDataBase(등록자).substr(0, 4);

			if(date_difference(시작일시)) {
				DataBase.removeDataBase(등록자);
				삭제목록 = 삭제목록 + 등록자 + ", ";
			}
			else {
				보존목록 = 보존목록 + 등록자 + ", ";
			}
		}

		if(삭제목록 == "") {
			replier.reply(limit + "일 이상 된 imageDB가 없습니다.");
		} else replier.reply(삭제목록.slice(0, -2) + "님의 imageDB가 삭제되었습니다.");
		if(보존목록 == "") {
			replier.reply("남아있는 imageDB가 없습니다.")
		} else replier.reply(보존목록.slice(0, -2) + "님의 imageDB가 남아있습니다.");
    }
}
}


function date_difference(start_time) {
	var short_date_month = parseInt(short_date.substr(0, 2));
	var short_date_date = parseInt(short_date.substr(2, 2));
	var start_time_month = parseInt(start_time.substr(0, 2));
	var start_time_date = parseInt(start_time.substr(2, 2));

	var month31 = [1, 3, 5, 7, 8, 10, 12]
	var month30 = [4, 6, 9, 11]

	var num;

	if(start_time_month == short_date_month) {
		num = short_date_date - start_time_date;
	}
	else if(short_date_month == start_time_month + 1) {
		if(month31.indexOf(start_time_month) != -1) {
			short_date_date += 31;
			num = short_date_date - start_time_date;
		}
		else if(month30.indexOf(start_time_month) != -1) {
			short_date_date += 30;
			num = short_date_date - start_time_date;
		}
		else {
			short_date_date += 28;
			num = short_date_date - start_time_date;
		}
	}
	else if(start_time_month == 12) {
		short_date_date += 31;
		num = short_date_date - start_time_date;
	}
	else return true;

	if(num >= limit) return true;
	else return false;
}