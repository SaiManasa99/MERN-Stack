var mysql=require('mysql');
var session=require('cookie-session');
var express=require('express');
var expapp=express();
var expdate=new Date(Date.now()+3*60*1000);
var sesscookie={name:'cookie1',keys:['3306','localhost'],
cookie:{secure:true,httpOnly:true,domain:'localhost.com',expires : expdate}};
expapp.use (session(sesscookie));
const mysqlconn=mysql.createConnection
({host:'localhost',user:'root',password:'root',database:'mysql'})
function testconn(err){
    console.log(err);
    if(err)
        console.log('Unable to connect to the database...');
    else
        console.log('Connected sussessfully....');

        //console.log(temp1);
        console.log(200);
        //This is the matter of time efficiency. Unnecessary 8000 cycles.
        /*for(i=2;i<process.argv[2];)*/
        for(i=2;i<20;)
        //For loop has to generate all even numbers from 2 to 2000.
        {
            console.log(i);
            i=i+2;
        }
}

var req;
var res;

mysqlconn.connect(testconn);
function printEmployees(err,rows){
    //res.cookie('name',sesscookie.name,{expires:sesscookie.expires,httpOnly:sesscookie.httpOnly,secure:sesscookie.secure,domain:sesscookie.domain});
    res.send(rows)

}
function getAllEmployee(request,response){
    req=request;
    res=response;
    mysqlconn.query('select * from employee',printEmployees);
    console.log(200);
    for(i=2;i<20;)
        //For loop has to generate all even numbers from 2 to 2000.
        {
            console.log(i);
            i=i+2;
        }
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
    mysqlconn.query('CALL UpdateEmployee(?,?)',[request.params.empid,request.params.mobno],
    errorCheck)
    response.send("<html><body><b>Updated</b></body></html>")
}
expapp.get('/',getAllEmployee);
expapp.get('/:empid',getEmployee)
expapp.get('/UpdateEmployee/:empid/:mobno',UpdateEmployee)
expapp.get('/:empid1/:empid2', getFewEmployee);
expapp.listen(8081);
console.log("Server started at port 8081")
