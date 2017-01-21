var coap        = require('coap');

var count=11;
var m="1234567890";
var msg="";
for (var i = 0; i <1 ; i++) {
	msg=msg+m;
}
//msg=""
console.log(msg);
var to=setInterval(function(){
if(count==20){
  clearInterval(to);
}
else{
  count++;
var req = coap.request('coap://54.208.138.162/'+count);
req.write(msg);
req.on('response', function(res) {
    res.pipe(process.stdout);
    res.on('end', function() {
     console.log('sent '+count);
    });
  });
 req.end();
 
}},200);
