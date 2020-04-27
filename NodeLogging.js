var mongo=require('mongodb');
var express=require('express');
var expapp=express();
var myDB;
var req;
var res;
function testconnect(err, client)
{
    
if (err){
    console.error(err.name);
    console.error(err.stack);
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

function getDocuments(request,response){
    console.log("Querying the database....")
    const mycursor=myDB.collection('empinfo').find();
    response.send("<html><body><b>Data</b></body></html>");
    console.log("Sent response to browser")
}

expapp.get('/',getDocuments);
expapp.listen(8081, function(err){console.log("Server started at 8081")});
//console.log('Server started at 8081')
