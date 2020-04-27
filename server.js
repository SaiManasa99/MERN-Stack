var network=require('net'); 
var fsmod=require('fs') 
 
function endConnection(){     
    console.log('Client disconnected..........');     
    var today=new Date();     
    var str='Client disconnected......'+today+'\n\n'; 
 
    fsmod.appendFile('ClientLog.log',str,function(err){         
        console.log('Data Logged..........')     }) } 
 
function createMyServer(connection){     
    console.log('client connected....');     
    connection.on('data',function (data) {         
    console.log('Client data........'+data)   
  })   
 
    var today=new Date();     
    var str='Client connected......'+today; 
 
    fsmod.appendFile('ClientLog.log',str,function(err){         
        console.log('Data Logged..........')     })     
        connection.on('end',endConnection);     
        connection.write('Hello!! I\'m fine. How are you???')     
        connection.end() } var server=network.createServer(createMyServer); 
        server.listen(5300,function ()
       {     
        console.log('Server waits for the client......') 
    }); 