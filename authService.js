var fsref=require("fs");
var s=require('http');
var exp=require('express');
var exapp=exp();
var uname='sanjay';
var pwd='tmp001';
function Login(request,response){
    fsref.readFile('login.html',function(err,data){
        if(err){
            console.error("unable to open the file... ");
        }
        else{
            var filedata=data.toString();
            response.send(filedata);
        }
    })
}
function Authenticate(request, response){
    
        body='';
        request.on('data', chunk => { body += chunk.toString()}); //chunk will be in json format.
        request.on('end', () => { console.log('Data : ' + body); 
        var pairs = body.split('&');
        var u=pairs[0].split('=');
        var p=pairs[1].split('=');

        if((uname == u[1]) && (pwd== p[1]))
        {
            var resstr='<html><body><b>Welcome Mr./Ms.' + uname + '</B>';
            resstr+='<BR><B>Today = ' +  new Date() + '</b></body></html>';
            today=new Date();
            var logdata=uname+"Logged in on"+today;
            fsref.appendFile('login.log',logdata,function(err){
                if(err){
                    console.error("unable to write logs")
                }else{
                    console.log("userinfo logged successfully......");
                }
            });    
        }else
            {
                var resstr='<html><body><b>Invalid username/password</b><br>';
                resstr += '<b><a href=\'http://localhost:8081/\'>Login again</a></b>';
                resstr+='</body></html>';
            }
            response.end(resstr);
        
        response.end('OK'); });
      
    } 
    exapp.rawListeners({"type":"text/html"})  
    exapp.get('/', Login);
    //exapp.get('/Login',Login);
    exapp.post('/Authenticate',Authenticate);



var server=exapp.listen(8081);
console.log('Started server at 8081');
