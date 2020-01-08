const scriptName="Administor_and_device.js";

var superAdmin = [];	// insert list of super admin
var admin = [];			// insert list of admin
var command;
var target;

var a = String(Device.getAndroidVersionName()); 	// Android version
var b = Device.isCharging();						// if charging or not
var c = String(Device.getBatteryLevel()); 			// reamining battery level
var d = String(Device.getBatteryTemperature()/10); 	// battery temperature


function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {

if(room == "" || superAdmin.indexOf(sender)) {		// insert the title of chat room
	// addd or remove admin (only by superAdmin)
	if(superAdmin.indexOf(sender) != -1) {
	    if (msg.indexOf ("!admin ") == 0) {
	        command = msg.substr (5);
	        if (command.indexOf ("add ") == 0) {
	            target = command.substr (3);
	            if (admin.indexOf (target) != -1) {
	                replier.reply (target + "is already an admin.");
	            }
	            else {
	                admin.push (target);
	                replier.reply (target + "is addedd to the admin list.");
	            }
	        }
	        if (command.indexOf ("remove ") == 0) {
	            target = command.substr (3);
	            if (admin.indexOf (target) != -1) {
	                admin.pop (target);
	                replier.reply (target + "is removed from the admin list.");
	            }
	            else {
	                replier.reply (target + "is not an admin.");
	            }
	        }
	    }
	}
	else if (superAdmin.indexOf(sender) == -1 && msg.indexOf ("!admin ") == 0) {
		replier.reply(sender + "is not authorized.")
	}

    // Device & bot status
    if(b == true) {
    	b = "charging.\n"
    } else b = "NOT charging.\n"

    if(msg=="!status") {
    	replier.reply("≪(name)'s status≫\n•Android version: " + a + "\n•Is Charging: " + b + "•Current battery level: " + c + "%\n•Battery temperature: " + d + "˚C")
    }					// replace (name) with your bot's name

    // eval (eval as in JavaScript)
    if(msg.split(" ")[0]=="!eval"){
		if(superAdmin.indexOf(sender) != -1){
			eval(msg.substr(6));
		}
		else{
			replier.reply(sender + "is NOT an super admin.")
		}
	}
}
}