const deviceModule = require('..').device;
const cmdLineProcess = require('./lib/cmdline');

//begin module

function processTest(args) {
   //
   // The device module exports an MQTT instance, which will attempt
   // to connect to the AWS IoT endpoint configured in the arguments.
   // Once connected, it will emit events which our application can
   // handle.
   //
   const device = deviceModule({
      keyPath: args.privateKey,
      certPath: args.clientCert,
      caPath: args.caCert,
      clientId: args.clientId,
      region: args.region,
      baseReconnectTimeMs: args.baseReconnectTimeMs,
      keepalive: args.keepAlive,
      protocol: args.Protocol,
      port: args.Port,
      host: args.Host,
      debug: args.Debug
   });

   var timeout;
   var intitialCount=1000;
   var count = intitialCount;
   var tries =10;  //0, 10, 100, 1000
   var msgSize=10; //0, 10,100,1000
   const minimumDelay = 250;
   var omg={b:'1234567890123456789012345678901234567890123456789012345678901234567890123456789012'};
   if(msgSize==10){
	delete omg.b;
   }
   if(msgSize==100){
       //do nothing
   }
   else if(msgSize==1000){
       omg.l=omg.k=omg.j=omg.i=omg.h=omg.g=omg.f=omg.e=omg.d=omg.c=omg.b;
   }

   if ((Math.max(args.delay, minimumDelay)) !== args.delay) {
      console.log('substituting ' + minimumDelay + 'ms delay for ' + args.delay + 'ms...');
   }
   timeout = setInterval(function() {
      count++;
      omg.a=count;
      if(msgSize>0){
        console.log('sending: '+JSON.stringify(omg));
        device.publish('topic_2', JSON.stringify(omg));
      }
      if(tries==(count-intitialCount)) {
	clearInterval(timeout);
	console.log('done after '+ tries +' tx attempts');
      }
   }, Math.max(args.delay, minimumDelay)); // clip to minimum

   //
   // Do a simple publish/subscribe demo based on the test-mode passed
   // in the command line arguments.  If test-mode is 1, subscribe to
   // 'topic_1' and publish to 'topic_2'; otherwise vice versa.  Publish
   // a message every four seconds.
   //
   device
      .on('connect', function() {
         console.log('connect');
      });
   device
      .on('close', function() {
         console.log('close');
      });
   device
      .on('reconnect', function() {
         console.log('reconnect');
      });
   device
      .on('offline', function() {
         console.log('offline');
      });
   device
      .on('error', function(error) {
         console.log('error', error);
      });
   device
      .on('message', function(topic, payload) {
         console.log('message', topic, payload.toString());
      });

}

module.exports = cmdLineProcess;

if (require.main === module) {
   cmdLineProcess('connect to the AWS IoT service and publish/subscribe to topics using MQTT, test modes 1-2',
      process.argv.slice(2), processTest);
}
