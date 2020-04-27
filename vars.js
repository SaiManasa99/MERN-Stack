function printString(str) {
    var b = new Buffer.alloc(3000)
    b.write(str);
    for (i = 0; i < str.length; i++)
    {
        process.stdout.write(String.fromCharCode(b[i]));
    }
    process.stdout.write('\n');
}

var name="kondandaramaih";
var projectname="HYDECATPAT";
module.exports.name=name;
module.exports.printstr = printString;
module.exports.pname=projectname;