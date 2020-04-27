var s=require('http');
var uname=new Buffer.alloc(300);
var pname=new Buffer.alloc(300);
var stdate=new Buffer.alloc(300);
function processRequest(request, response){
    if(request.method == 'POST')
    {
        body='';
        request.on('data', chunk => { body += chunk.toString()}); //chunk will be in json format.
        request.on('end', () => { console.log('Data : ' + body); 
        var pairs = body.split('&');
        var u=pairs[0].split('=');
        var p=pairs[1].split('=');
        var s=pairs[2].split('=');
        //console.log(u,p,s);
        uname.write(u[1],0,20);
        pname.write(p[1],0,20);
        stdate.write(s[1],0,20);
        for(i=0;i<25;i++){
          //str += String.fromCharCode(b[i])
          process.stdout.write(String.fromCharCode(uname[i]))
        }
        process.stdout.write(',')
        for(i=0;i<25;i++){
          //str += String.fromCharCode(b[i])
          process.stdout.write(String.fromCharCode(pname[i]))
        }
        process.stdout.write(',')
        for(i=0;i<25;i++){
          //str += String.fromCharCode(b[i])
          process.stdout.write(String.fromCharCode(stdate[i]))
        }
        

        /*console.log("UserName: "+uname.toString());
        console.log(", ProjectName: "+pname.toString());
        console.log(", Start Date: "+stdate.toString());*/
        
        response.end('OK'); });
          } 
        else {
        var str='<HTML><body>';
        str += '<B>Login to proceed</B><br>';
        str +='<form method=\'POST\' action=\'http://localhost:8082\'>'
        str += 'User name <input type=\'text\' placeholder=\'Enter name\' name=\'userid\'/><BR>';
        str += 'Project Name <input type=\'text\' name=\'pname\' /><BR><br>';
        str += 'Start date <input type=\'date\' name=\'stdate\' /><BR><br>';
        str += '<input type=\'submit\' value=\'SignIn\' /> </BODY></HTML>';
        response.end(str);
    }
}
var server=s.createServer(processRequest);
server.listen(8082);
console.log('Started server at 8082');