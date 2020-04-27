var express=require('Express');
var app=express();
var exprouter=require('./expressRouter.js');
app.rawListeners({"type":"text/html"});
app.use('/exprouter',exprouter);

    


var server=app.listen(8081);
console.log('Started server at 8081');
