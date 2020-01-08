const scriptName="주사위.js";

var count;
var num;

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId){
    if(room === "[ DEV/DESIGN ] 위아더원 커뮤니티 카카오톡" && msg === "!명령어") {
        replier.reply("현재 구현되어 있는건 주사위밖에 없습니다.\n\n명령어 형식: !주사위(숫자)\n원하는 눈금갯수를 (숫자)위치에 적어주세요. 띄어쓰기 없습니다.");
    }

    if(room === "[ DEV/DESIGN ] 위아더원 커뮤니티 카카오톡" || sender === "외국인") {
        if(msg.indexOf("!주사위") == 0) {
            count = parseInt(msg.slice(4));
            num = Math.floor(Math.random() * count) + 1;
            replier.reply(num + "이(가) 나왔어요!");
            return;
        }
    }

    if(sender === "외국인" || sender === "UnNamed72") {
        if(msg.split(" ")[0]=="!eval") {
            eval(msg.substr(6));
        }
    }
}