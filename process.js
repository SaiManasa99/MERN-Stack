console.log(process.argv)
console.log(process.env)//prints values of all environment variables
console.log(process.env["PATH"])//prints values of path
//PATH,ClASSPATH
console.log("MachineName: "+process.env["HOSTNAME"])
console.log("NodeJS version: "+process.version)
console.log("NodeJS and dependencies version: "+process.versions)
console.log("NodeJS config: ")
//console.log(process.config.USER)
//console.log(process.config.HOME)
for(key in process.config){
    console.log("--------------------"+key+"-------------------")
    var sub_conf=process.config[key]
    for(attr in sub_conf){
        console.log(attr+ "="+sub_conf[attr])
    }
}
var memusage=process.memoryUsage();

console.log("Memory usage: "+memusage.heapUsed)
for(key in memusage){
    console.log(key+"="+memusage[key])
}

console.log("Running/Uptime: "+process.uptime())
console.log("ProcessID: "+process.pid)
