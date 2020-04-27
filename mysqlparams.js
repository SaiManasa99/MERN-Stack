var mysql=require('mysql');
var file=require('fs')
var express=require('express');
var speakeasy=require('speakeasy');
var QRCode=require('qrcode');
var expapp=express();


var secret=speakeasy.generateSecret({length:25})
console.log(secret.base32);
console.log(secret.otpauth_url);
QRCode.toDataURL(secret.otpauth_url,function (err,image_data){
 console.log(image_data);
 file.writeFile('QRCode.png',image_data,function(err){
     console.log("Successfully saved in the file......");
 });


});

const mysqlconn=mysql.createConnection
({host:'localhost',user:'root',password:'root',database:'mysql'})
function testconn(err){
    if(err){
        console.log("unable to connect to the database....")

    }else{
        console.log("Connected successfully.....")
    }

}

var req;
var res;

mysqlconn.connect(testconn);
function printEmployees(err,rows){
    res.send(rows)

}
function getAllEmployee(request,response){
    req=request;
    res=response;
    mysqlconn.query('select * from employee',printEmployees);
}
function getEmployee(request,response){
    req=request;
    res=response;
    mysqlconn.query('select * from employee where emp_id = ?',[request.params.empid],printEmployees);
}

function getFewEmployee(request, response) //Call back function
{
    req=request;
    res=response;
   // qry='select * from employee where emp_id > ? and emp_id < ?',
     //[request.params.empid1,request.params.empid2];
    mysqlconn.query('select * from employee where emp_id > ? and emp_id < ?',
    [request.params.empid1,request.params.empid2], printEmployees); //Static SQL
}
function errorCheck(err){
    if(err)
        console.error('Error in procedure cal.....');
    else    
        console.log('Procedure executed successfully')
}
function UpdateEmployee(request,response){
    req=request;
    res=response;
    mysqlconn.query('CALL UpdEmployee(?,?)',[request.params.empid,request.params.mobno],
    errorCheck)
    response.send("<html><body><b>Updated</b></body></html>")
}
/*function DeleteEmployee(request,response){
    req=request;
    res=response;
    mysqlconn.query('CALL DelEmployee(?)',[request.params.empid],
    errorCheck)
    response.send("<html><body><b>Deleted</b></body></html>")
}*/

expapp.get('/',getAllEmployee);
expapp.get('/:empid',getEmployee)
expapp.get('/UpdateEmployee/:empid/:mobno',UpdateEmployee)
//expapp.get('/DeleteEmployee/:empid',DeleteEmployee)
expapp.get('/:empid1/:empid2', getFewEmployee);
expapp.listen(8085);
console.log("Server started at port 8085")

