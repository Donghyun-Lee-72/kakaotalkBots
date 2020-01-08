const scriptName="수업 확인.js";

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    if(msg.split(" ")[0]=="!eval" && sender == "이동현") {
        eval(msg.substr(6));
    }

try {

  if(msg == "!수업") {
    if(sender == "이동현" || "잡학사전") {
        //LAW301 추적
        let LAW301_u = Utils.getWebText("https://courses.illinois.edu/schedule/2019/fall/LAW/301");
        let LAW301_a = LAW301_u.split('availability":"');
        let LAW301_b = LAW301_a[1].split('","');
        let LAW301_c = LAW301_b[0];
        replier.reply("LAW 301: section A:\n" + LAW301_c);
        return;
    }
  }
  if(msg == "!설명") {
    let 건의사항 = "봇 개발이나 사용법에 관해서 추천하고 싶은 내용을 개발자에게 보내거나, 개발자한테 하고 싶은 말을 할 수 있습니다.\n• 사용법: !건의사항 (내용)\n• 예시: !건의사항 PHYS 212 수업 오류났어요.";
    let 명령어_수업 = "원하는 수업의 각 section의 availability를 확인할 수 있습니다. 2019년도 가을학기 시간표 정보를 제공합니다. (subject code)에는 짧은 과목명을 대소문자 상관없이 넣고, (course number)에는 해당 과목의 숫자를 넣으면 됩니다.\n• 사용법: !수업 (subject code) (course number)\n• 예시: !수업 PHYS 212";

    replier.reply("I-bot(아이봇)이 제공하는 UIUC course availability 제공 시스템을 이용해주셔서 감사합니다. 아래와 같은 명령어들이 있습니다.\n\n" + 명령어_수업 + "\n" + 건의사항);
  }

  if(msg.indexOf("!건의사항") == 0) {
    replier.reply("건의사항이 접수되었습니다.");
    replier.reply(sender + "님이 " + room + "에서 건의사항을 접수하였습니다!\n건의사항:\n" + msg.slice(5), "이동현");
  }
  
  if(msg.indexOf("!수업") == 0) {
    /*명령어 "!수업 (subject) (number)"
    subject: 대소문자 구분없이 2~4자리 영문자
    number: course number
    subject_list: course subject list
    */

    var subject_list = Utils.getWebText("view-source:https://courses.illinois.edu/schedule/2019/fall").replace(/\s/g, "").split("<tr><td>").splice(0, 1).split("</td><td>").splice(-1, 1);

    if(msg.split(" ").length != 3 || msg.split(" ")[2].length != 3) {
      replier.reply('잘못된 명령어입니다.\n"!설명"을 참고해서 올바른 명령어를 입력해주세요.');
      return;
    }
    else if(subject_list.indexOf(msg.split(" ")[1]) == -1) {
      replier.reply("잘못된 과목명입니다. 과목의 약자가 맞는지 확인해주세요.");
    }
    else replier.reply(assive_notifier(msg.split(" ")[1].toUpperCase(), msg.split(" ")[2]));
  }
}
catch(err) {
  replier.reply("에러가 발생했습니다. 명령어를 다시 확인해보신 후, 같은 문제가 계속 일어난다면 !건의사항을 통해서 관리자에게 알려주세요.");
  replier.reply(sender + "님이 " + room + "에서 에러를 냈습니다!\n입력문:\n" + msg + "\n에러:\n" + err, "이동현");
}
}

function passive_notifier(subject, number) { //직접 명령어로 물어봐야지 응답함
  let u = Utils.getWebText("https://courses.illinois.edu/schedule/2019/fall/" + subject + "/" + number);
  let info = u.split('javascript">')[1].split('</script>')[0].replace(/(<([^>]+)>)/ig,""); //각 section의 모든 정보, section끼리 덩이로 잘라야함
    /*
        각 section의 시작점 기준으로 split, 특이점 기준으로 section type에 따라서 나누기. section_num은 (키워드 검색 - 1)
    */
  let text = undefined; //return해서 응답으로 내보낼 값

  let sections; //# of total secitons: (u.split('"availability"').length - 1)
  let lec;
  let dis;
  let lab;
  let other;

//포함할 정보: 1. Course title, 2. Availability, 3. Type, 4. Section, 5. Time, 6. Day 7. Part of Term 8. Link
  for(i=0; i<sections; i++) {


  }

  return text = info;
}