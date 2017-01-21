var coap        = require('coap');

var count=11;
var m="1234567890";
var msg="";
for (var i = 0; i <1 ; i++) {
	msg=msg+m;
}
var sendCount=0;
console.log(msg);
var to=setInterval(function(){
if(count==20){
  clearInterval(to);
}
else{
  count++;
  var req = coap.request('coap://54.92.167.70/'+count);
  req.write(msg);
  console.log('sending '+count);
  req.on('response', function(res) {
    res.pipe(process.stdout);
    res.on('end', function() {
	sendCount++;
     //console.log('sent '+sendCount);
    });
  });
 req.end();
 
}},200);
