var fsmodule=require('fs');
fsmodule.rename(process.argv[2],process.argv[3], function(err){
    if(err){
        console.error("Unable to rename the file...");
    }else
    {
        console.log("Renamed successfully");
        //console.log(stats); //err and stats objects are automatically created
    }
}
)