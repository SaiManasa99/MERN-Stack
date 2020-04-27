console.log("Hi!!! How are you?")
console.warn("System is running out of memory.............")
if(!(process.argv.length>2)){
    console.log("Must pass some parameters.........")

}else{
    console.error("Welocme to console........")
}
console.log("File Name:"+__filename)
console.log("Directory Name: "+__dirname)