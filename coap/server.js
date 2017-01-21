var coap        = require('coap')
  , server      = coap.createServer()
 
server.on('request', function(req, res) {
  console.log(req.url.split('/')[1]+'=>'+req.read());
  res.end();
})
 
// the default CoAP port is 5683 
server.listen();
console.log('coap server listening');