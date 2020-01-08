const scriptName="베라.js";


var single_1 = true; //서버 사용가능 여부
var single_2 = true;
var single_3 = true;
var free_1 = true;
var free_2 = true;
var group_1 = true;
var group_2 = true;

var player_s1; //각 게임별 플레이어명
var player_s2;
var player_s3;
var player_f1;
var player_f2;
var player_g11;
var player_g12;
var player_g13;
var player_g21;
var player_g22;
var player_g23;

var num_s1 = 0; //현재 마지막 숫자
var num_s2 = 0;
var num_s3 = 0;
var num_f1 = 0;
var num_f2 = 0;
var num_g1 = 0;
var num_g2 = 0;


function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId){

if(sender === "동현") {

	if(msg.split(" ")[0]=="!eval") {
		eval(msg.substr(6));
	}

	if(msg.indexOf("!서버종료") === 0) {
		if(msg.split(" ")[1] = "s1") return reset(single_1);
		if(msg.split(" ")[1] = "s2") return reset(single_2);
		if(msg.split(" ")[1] = "s3") return reset(single_3);
		if(msg.split(" ")[1] = "f1") return reset(free_1);
		if(msg.split(" ")[1] = "f2") return reset(free_2);
	}
}

if(room === "옵치톡") {
	if(msg === "!베라31") {
		replier.reply("I-bot(아이봇)이 운영하는 베스킨라빈스31 미니 게임입니다!\n현재는 싱글게임과 자유게임이 있습니다.\n\n싱글게임: 봇과 1대1로 평범한 베스킨라빈스31을 합니다.\n봇부터 시작해 1부터 한번에 최대 3개의 숫자를 외칩니다. 먼저 31을 외치는 사람이 지게 됩니다.\n(명령어 형식: !베라31 싱글) \n\n자유게임: 봇과 1대1로 자유로운 베스킨라빈스를 합니다.\n봇부터 시작하고, 1부터 한번에 최대 y개의 숫자를 외칩니다. 먼저 yy를 외치는 사람이 지게 됩니다.\n(명령어 형식: !베라xx, y) ☆x나 y는 어떤 숫자도 가능.\n\n기타명령어:\n• !베라31: 베라31 게임에 대한 설명을 보여줍니다.\n• !베라31 서버: 각 서버의 상태를 보여줍니다.\n• !베라31 사용자: 각 서버를 사용하고 있는 사용자를 보여줍니다.\n\n관리자용 명령어: !eval x, !서버종료 xx");
	}

	if(msg === "!베라31 서버") {
		replier.reply("≪I-bot 베스킨라빈스 31 게임 서버상황≫\n" + "자유서버와 단체게임 서버는 아직 개발중입니다.\n\n• 1번 싱글서버: " + playable(single_1) + "\n" + "• 2번 싱글서버: " + playable(single_2) + "\n" + "• 3번 싱글서버: " + playable(single_3) + "\n" + "• 1번 자유서버: " + playable(free_1) + "\n" + "• 2번 자유서버: " + playable(free_2) + "\n" + "• 1번 단체서버: " + playable(group_1) + "\n" + "• 2번 단체서버: " + playable(group_2));
	}

	if(msg === "!베라31 사용자") {
		replier.reply("≪I-bot 베스킨라빈스 31 게임 현 사용자≫\n• 1번 싱글서버: " + player_s1 + "\n• 2번 싱글서버: " + player_s2 + "\n• 3번 싱글서버: " + player_s3 + "\n• 1번 자유서버: " + player_f2 + "\n• 2번 자유서버: " + player_f2);
	}


	//싱글서버 할당
	if(msg === "!베라31 싱글" && sender !== player_s1 && sender !== player_s2 && sender !== player_s3) {
		if(single_1) {
			single_1 = false;
			player_s1 = sender;
			replier.reply(player_s1 + "님의 베스킨라빈스31 싱글 게임이 1번 서버에서 시작되었습니다.\n저부터 시작할께요.");
			return replier.reply("싱글 1번 서버 (" + player_s1 + ")\n" + random_num(single_1, num_s1));
		}
		else if(single_2) {
			single_2 = false;
			player_s2 = sender;
			replier.reply(player_s2 + "님의 베스킨라빈스31 싱글 게임이 2번 서버에서 시작되었습니다.\n저부터 시작할께요.");
			return replier.reply("싱글 2번 서버 (" + player_s2 + ")\n" + random_num(single_2, num_s2));
		}
		else if(single_3) {
			single_3 = false;
			player_s3 = sender;
			replier.reply(player_s3 + "님의 베스킨라빈스31 싱글 게임이 3번 서버에서 시작되었습니다.\n저부터 시작할께요.");
			return replier.reply("싱글 3번 서버 (" + player_s3 + ")\n" + random_num(single_3, num_s3));
		}
		else return replier.reply("현재 모든 싱글서버가 사용 중입니다.\n나중에 다시 시도해주세요.");
	}

	//싱글서버 1번
	if(sender === player_s1 && parseInt(msg) === num_s1 + 1) {
		if(msg === number_checker(num_s1, 1) || msg === number_checker(num_s1, 2) || msg === number_checker(num_s1, 3)) {
			latest_num(single_1, msg)
			
			if(win1(msg)) {
				replier.reply("싱글 1번 서버 (" + player_s1 + ")\n" + win2(msg));
				reset(single_1);
			}
			else if(msg.indexOf("30") != -1) {
				replier.reply("싱글 1번 서버 (" + player_s1 + ")\n31");
				replier.reply("싱글 1번 서버 (" + player_s1 + ")\n이런! 제 패배네요. 수고하셨습니다, " + player_s1 + "님.");
				reset(single_1);
			}
			else if(msg === "31") {
				replier.reply("싱글 1번 서버 (" + player_s1 + ")\n제가 이겼네요!\n수고하셨습니다, " + player_s1 + "님.");
				reset(single_1);
			}
			else if(single_1 === true) return;
			else replier.reply("싱글 1번 서버 (" + player_s1 + ")\n" + random_num(single_1, num_s1));
		}
		else replier.reply("싱글 1번 서버 (" + player_s1 + ")\n잘못된 입력 방법 혹은 게임 방식입니다.");
	}

	if(sender === player_s1 && msg === "!베라31 종료") {
		replier.reply(player_s1 + "님의 게임이 종료되었습니다.");
		reset(single_1);
	}


	//싱글서버 2번
	if(sender === player_s2 && parseInt(msg) === num_s2 + 1) {
		if(msg === number_checker(num_s2, 1) || msg === number_checker(num_s2, 2) || msg === number_checker(num_s2, 3)) {
			latest_num(single_2, msg)
			
			if(win1(msg)) {
				replier.reply("싱글 2번 서버 (" + player_s2 + ")\n" + win2(msg));
				reset(single_2);
			}
			else if(msg.indexOf("30") != -1) {
				replier.reply("싱글 2번 서버 (" + player_s2 + ")\n31");
				replier.reply("싱글 2번 서버 (" + player_s2 + ")\n이런! 제 패배네요. 수고하셨습니다, " + player_s2 + "님.");
				reset(single_2);
			}
			else if(msg === "31") {
				replier.reply("싱글 2번 서버 (" + player_s2 + ")\n제가 이겼네요!\n수고하셨습니다, " + player_s2 + "님.");
				reset(single_2);
			}
			else if(single_2 === true) return;
			else replier.reply("싱글 2번 서버 (" + player_s2 + ")\n" + random_num(single_2, num_s2));
		}
		else replier.reply("싱글 2번 서버 (" + player_s2 + ")\n잘못된 입력 방법 혹은 게임 방식입니다.");
	}

	if(sender === player_s2 && msg === "!베라31 종료") {
		replier.reply(player_s2 + "님의 게임이 종료되었습니다.");
		reset(single_2);
	}


	//싱글서버 3번
	if(sender === player_s3 && parseInt(msg) === num_s3 + 1) {
		if(msg === number_checker(num_s3, 1) || msg === number_checker(num_s3, 2) || msg === number_checker(num_s3, 3)) {
			latest_num(single_3, msg)
		
			if(win1(msg)) {
				replier.reply("싱글 3번 서버 (" + player_s3 + ")\n" + win2(msg));
				reset(single_3);
			}
			else if(msg.indexOf("30") != -1) {
				replier.reply("싱글 3번 서버 (" + player_s3 + ")\n31");
				replier.reply("싱글 3번 서버 (" + player_s3 + ")\n이런! 제 패배네요. 수고하셨습니다, " + player_s3 + "님.");
				reset(single_3);
			}
			else if(msg === "31") {
				replier.reply("싱글 3번 서버 (" + player_s3 + ")\n제가 이겼네요!\n수고하셨습니다, " + player_s3 + "님.");
				reset(single_3);
			}
			else if(single_3 === true) return;
			else replier.reply("싱글 3번 서버 (" + player_s3 + ")\n" + random_num(single_3, num_s3));
		}
		else replier.reply("싱글 3번 서버 (" + player_s3 + ")\n잘못된 입력 방법 혹은 게임 방식입니다.");
	}

	if(sender === player_s3 && msg === "!베라31 종료") {
		replier.reply(player_s3 + "님의 게임이 종료되었습니다.");
		reset(single_3);
	}
}
}

/*
	//자유서버 할당
	var goal_1 = 0;
	var goal_2 = 0;
	var limit_1 = 0;
	var limit_2 = 0;
	//!베라xx, y
	if(msg.indexOf("!베라자유") === 0 && sender !== player_f1 && sender !== player_f2) {
		if(free_1) {
			goal_1 = parseInt(msg.split(" ")[0].slice(3, -1));
			limit_1 = parseInt(msg.split(" ")[1]);
			free_1 = false;
			player_f1 = sender;
			replier.reply(player_f1 + "님의 베스킨라빈스" + goal + " 자유게임이 1번 서버에서 시작되었습니다.\n저부터 시작할께요.");
			return replier.reply(random_num_free(free_1, num_f1, limit_1));
		}
		else if(free_2) {
			goal_2 = parseInt(msg.split(" ")[0].slice(3, -1));
			limit_2 = parseInt(msg.split(" ")[1]);
			free_2 = false
			player_f2 = sender;
			replier.reply(player_f2 + "님의 베스킨라빈스" + goal + " 자유게임이 2번 서버에서 시작되었습니다.\n저부터 시작할께요.");
			return replier.reply(random_num_free(free_2, num_f2, limit_2));
		}
		else return replier.reply("현재 모든 자유서버가 사용 중입니다.\n나중에 다시 시도해주세요.");
	}
	

	//자유서버 1번
	if(sender === player_f1 && parseInt(msg) === num_f1 + 1) {
		for(i = 1; i <= limit_1; i++) {
			if(msg === number_checker(num_f1, i)) {
				latest_num(free_1, msg);

				if(msg.indexOf(toString(goal_1 - 1)) != -1) {
					replier.reply("자유 1번 서버 (" + player_f1 + ")\n" + (goal_1 - 1));
					replier.reply("자유 1번 서버 (" + player_f1 + ")\n이런! 제 패배네요. 수고하셨습니다, " + player_f1 + "님.");
					reset(free_1);
				}
				else if(msg === toString(goal_1)) {
					replier.reply("자유 1번 서버 (" + player_f1 + ")\n제가 이겼네요!\n수고하셨습니다, " + player_f1 + "님.");
					reset(free_1);
				}
				else if(free_1 === true) return;
				else replier.reply("자유 1번 서버 (" + player_f1 + ")\n" + random_num_free(free_1, num_f1, limit_1));
			}
		}
	}
	else replier.reply("자유 1번 서버 (" + player_f1 + ")\n잘못된 입력 방법 혹은 게임 방식입니다.");

	if(sender === player_f1 && msg === "!베라" + goal_1 + "종료") {
		replier.reply(player_f1 + "님의 게임이 종료되었습니다.");
		reset(free_1);
	}


	//자유서버 2번
	if(sender === player_f2 && parseInt(msg) === num_f2 + 1) {
		for(i = 1; i <= limit_2; i++) {
			if(msg === number_checker(num_f2, i)) {
				latest_num(free_2, msg);

				if(msg.indexOf(toString(goal_2 - 1)) != -1) {
					replier.reply("자유 2번 서버 (" + player_f2 + ")\n" + (goal_2 - 1));
					replier.reply("자유 2번 서버 (" + player_f2 + ")\n이런! 제 패배네요. 수고하셨습니다, " + player_f2 + "님.");
					reset(free_2);
				}
				else if(msg === toString(goal_2)) {
					replier.reply("자유 2번 서버 (" + player_f2 + ")\n제가 이겼네요!\n수고하셨습니다, " + player_f2 + "님.");
					reset(free_2);
				}
				else if(free_2 === true) return;
				else replier.reply("자유 2번 서버 (" + player_f2 + ")\n" + random_num_free(free_2, num_f2, limit_2));
			}
		}
	}
	else replier.reply("자유 2번 서버 (" + player_f2 + ")\n잘못된 입력 방법 혹은 게임 방식입니다.");

	if(sender === player_f2 && msg === "!베라" + goal_2 + "종료") {
		replier.reply(player_f2 + "님의 게임이 종료되었습니다.");
		reset(free_2);
	}
*/


/*
if(msg.indexOf("!베라31 단체") === 0) {
	replier.reply("아직 서비스 중이 아닙니다.")
}
*/


//상대가 낸 가장 최근 숫자를 찾아주는 식
function latest_num(server, message) {
	let num = 0;

	if(parseInt(message) == message) {
		num = parseInt(message);
	}
	else num = parseInt(message.split(" ")[message.split(" ").length - 1]);


	if(server === single_1) {
		return num_s1 = num;
	}
	else if(server === single_2) {
		return num_s2 = num;
	}
	else if(server === single_3) {
		return num_s3 = num;
	}
}

//랜덤한 갯수의 숫자를 뱉는 것
function random_num(server, last_number) {
	let count = Math.floor(Math.random() * 3) + 1;
	let print = "";
	for(i = 0; i < count; i++) {
		print += last_number + i + 1 + " ";
	}

	if(server === single_1) {
		num_s1 = last_number + count;
	}
	else if(server === single_2) {
		num_s2 = last_number + count;
	}
	else if(server === single_3){
		num_s3 = last_number + count;
	}

	return print.slice(0, -1);
}

//랜덤한 갯수의 숫자를 뱉는 것 (자유서버용)
function random_num_free(server, last_number, limit) {
	let count = Math.floor(Math.random() * limit) + 1;
	let print = "";
	for(i = 0; i < count; i++) {
		print += last_number + i + 1 + " ";
	}

	if(server === free_1) {
		num_f1 = last_number + count;
	}
	else if(server === free_2) {
		num_f2 = last_number + count;
	}

	return print.slice(0, -1);
}

//상대가 낼 수 있는 조합을 보여줌
function number_checker(my_last_number, opponent_count) {
	let last = "";
	for(i = 0; i < opponent_count; i++) {
		last += my_last_number + i + 1 + " ";
	}
	return last.slice(0, -1);
}

//이길 수 있을 때 마지막 1턴, 고정응답
function win1(message) {
	if(message.indexOf("27") != -1 && message.indexOf("28") == -1) return true;
	else if(message.indexOf("28") != -1 && message.indexOf("29") == -1) return true;
	else if(message.indexOf("29") != -1 && message.indexOf("30") == -1) return true;
	else return false;
}

//이길 수 있을 때 마지막 1턴, 고정응답
function win2(message) {
	if(message.indexOf("29") != -1) return "30";
	else if(message.indexOf("28") != -1) return "29 30";
	else if(message.indexOf("27") != -1) return "28 29 30";
}

//서버 초기화
function reset(server) {
	if(server === single_1) {
		single_1 = true;
		player_s1 = "";
		num_s1 = 0;
	}
	else if(server === single_2) {
		single_2 = true;
		player_s2 = "";
		num_s2 = 0;
	}
	else if(server === single_3) {
		single_3 = true;
		player_s3 = "";
		num_s3 = 0;
	}
	else if(server === free_1) {
		free_1 = true;
		player_f1 = "";
		num_f1 = 0;
		goal_1 = 0;
		limit_1 = 0;
	}
	else if(server === free_2) {
		free_2 = true;
		player_f2 = "";
		num_f2 = 0;
		goal_2 = 0;
		limit_2 = 0;
	}
}

//서버 가용 여부
function playable(server) {
	if(server) return "플레이 가능";
	else return "이미 사용중";
}