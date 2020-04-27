var b=new Buffer(300);//It can store 300 characters
b.write("NodeJS is a light-weight platform.......")//saving or writing data
console.log("Data in Buffer: "+b.toString())//read data from buffer
console.log("5-25 position:"+b.toString('ascii',5,25))//all characters from 5th to 25th position
console.log("5-25 position: "+b.toString('utf8',5,25))
var str=new String();

for(i=0;i<25;i++){
    //str += String.fromCharCode(b[i])
    process.stdout.write(String.fromCharCode(b[i]))
}
//console.log("String: "+str)
process.stdout.write('\n')


console.log("Hello......")
process.stdout.write("How are you?...........")
process.stdout.write("I'm fine!!!!!")
