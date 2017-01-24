var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://test.mosquitto.org')
count =0;

var m="1234567890";
var msg="";
for (var i = 0; i <1; i++) {
	msg=msg+m;
}

client.on('connect', function () {

	var to=setInterval(function(){
	if(count==10){
		clearInterval(to);
	}
	else {
		count++; 
		console.log('sending '+count);
		client.publish('topic1', msg); 
	}
   },250);
});
