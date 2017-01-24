var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://test.mosquitto.org')
var count=0;
client.on('connect', function () {
  client.subscribe('topic1')
})
 
client.on('message', function (topic, message) {
  count++;
  console.log(count + '=>' + message.toString().length)
})