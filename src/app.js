const express = require("express")
const app = express();

app.use("/profile", (req,res)=>{
res.send("pofoleihekfhdifahsih")
})

app.listen(3000, function(){
   console.log( "we are listening");
})