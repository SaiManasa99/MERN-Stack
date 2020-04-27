var mongo=require('mongodb');
var express=require('express');
var expapp=express();
var RateLimit=require('express-rate-limit');
var session=require('express-session');
var myDB;
var req;
var res;
function testconnect(err, client)
{
    
if (err){
    //console.error(err.name);
   // console.error(err.stack);
   console.error("Unable to connect to database..");
}else{
    console.log("Connected to db.....");
    console.log("Client info : " +client);
}

myDB=client.db('employee');
}
//retryWrites. works in a loop until the data modification is successful.
//w - Write. w=majority. It has to perform bulk writing/bulk modification
mongo.MongoClient.connect
('mongodb://localhost:27017/employee?retryWrites=true&w=majority', testconnect);

function querryresult(err, result)
{
    var h='<html><body>';
    //console.log('----------' + result.length);

    for(i=0;i<result.length;i++)
    {
        h += '<b>First Name </b>' + result[i].first_name + '<BR>';
        h += '<b>Project Name </b>' + result[i].Project_name + '<br><br>';
        //console.log(doc.First_Name + ', ' + doc.Project_Name);

    }
     h += '</body></html>';
    res.send(h);
}
function getEmployees(request, response){
    const cursor=myDB.collection('empinfo').find();
    //response.send(cursor);
    //console.log(cursor);
       req=request;
       res=response;
    cursor.toArray(querryresult);
    console.log(200);
}

function getEmployee(request, response)
    {
        if(request.session.acessCount)
          request.session.acessCount++;
        else
          request.session.acessCount=1;
        console.log('acess count'+request.session.acessCount);
        var rexp=new RegExp(request.params.projectname);
        var regexp={"Project_name":rexp};
        const cursor=myDB.collection('empinfo').find(regexp);
        req=request;
        res=response;
        cursor.toArray(querryresult);
    }
    function insertEmployee(request, response){
        var jsobj={"first_name" : request.params.empname, "Project_name" : request.params.projectname,
            "Start_Date" : request.params.startdate};
        const cursor=myDB.collection('empinfo').insertOne(jsobj);
            console.log('inserted ' + jsobj + '  document...');
            response.send("<html><body><b>document inserted....</b></body></html>");
    }
//Handling Read operation of CRUD
var r1={windows:1*60*1000,max:100,delayMs:0}
var ratelim=new RateLimit(r1);
expapp.use(express.json({limit:'10kb'}));
expapp.use(ratelim)
expapp.use(session({secret:"CTS"}));
expapp.get('/', getEmployees);
expapp.get('/getEmployee/:projectname', getEmployee);
expapp.get('/insertEmployee/:empname/:projectname/:startdate', insertEmployee);
expapp.listen(8082);
