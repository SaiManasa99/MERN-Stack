var network=require('net') 
var client=network.connect({port:5300},function () {     
    console.log('Connected to server....') 
}); 
    client.write('Hello server.....How are you') 
    client.on('data',function (data) {     
    console.log('Server response:'+data.toString());     
    client.end(); 
 
}); 
 
client.on('end ',function (data) {     
    console.log('Disconnected from server.....');   
}); 