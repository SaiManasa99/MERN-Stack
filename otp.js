var s=require('http');
var otp=Math.floor(Math.random() * 9999);
        console.log(otp);
function processRequest(request, response){
    if(request.method == 'POST')
    {
        body='';
        
        request.on('data', chunk => { body += chunk.toString()}); //chunk will be in json format.
        request.on('end', () => { console.log('Data : ' + body);
        //var notp = body;
        var o = body.split('=');

        
        if(otp==o[1])
        {
            var resstr='<html><body><b>Entered OTP is correct </B>';
            resstr+='<BR><B>Today = ' +  new Date() + '</b></body></html>';
            }else
            {
                var resstr='<html><body><b>Invalid OTP/password</b><br>';
                resstr += '<b><a href=\'http://localhost:8083\'>Retry</a></b>';
                resstr+='</body></html>';
            }
            response.end(resstr);
        
        response.end('OK'); });
           } else {
        var str='<HTML><body>';
        str += '<B>OTP Generation</B><br>';
        str +='<form method=\'POST\' action=\'http://localhost:8083\'>'
        //str += 'User name <input type=\'text\' placeholder=\'Enter name\' name=\'userid\'/><BR>';
        //str += 'Password <input type=\'password\' name=\'pwd\' /><BR><br>';
        
        str += 'Enter OTP<input type=\'text\' placeholder=\'Enter OTP\' name=\'otp\'/><BR>';
        str += '<input type=\'submit\' value=\'SubmitOTP\' /> </BODY></HTML>';
        response.end(str);
    }
}
var server=s.createServer(processRequest);
server.listen(8083);
console.log('Started server at 8083');