var fsref=require('fs');
var project=new Object();
project.Project_Id=1001;
project.Project_Name='Rockstar Ventures';
project.Start_Date='21-Dec-2005';
project.End_Date='21-Dec-2005';

var data=project.Project_Id + ", " + project.Project_Name + ", ";

data += project.Start_Date + ", " + project.End_Date;

fsref.appendFile('Projects.txt', data, function(){
console.log("Wrote data to the file");
});
