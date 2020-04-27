var mongo=require('mongodb');
var express=require('express');
var expapp=express();
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
}

function updateEmployee(request,response)
    {
  
        var htm='<html><body><b>updated</b></body></html>';

        
        const cusrsor=myDB.collection('empinfo').updateMany({'first_name':request.params.empname},{$set:{'Project_name':request.params.projectname,'cost':request.params.cost}});
        console.log("updated");
        response.send(htm);


    }    function deleteEmployee(request, response){
        var jsobj={"first_name" : request.params.empname};
        const cursor=myDB.collection('empinfo').deleteMany({jsobj},{});
            console.log('deleted ' + jsobj + '  document...');
            response.send("<html><body><b>document deleted....</b></body></html>");
    }
//Handling Read operation of CRUD
expapp.get('/', getEmployees);
expapp.get('/updateEmployee/:empname/:projectname/:cost', updateEmployee);
expapp.get('/deleteEmployee/:empname', deleteEmployee);
expapp.listen(8081);
