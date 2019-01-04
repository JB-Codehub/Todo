const express = require("express");
const bodyParser = require("body-parser");
const genericRouter = require("./router");
const methodOverride=require("method-override");
const expressValidator = require("express-validator");
const cors=require("cors");
const config = require("./globalconfig");
const process = require("process");
const dbObj = require("./db/mongoose");


const path=require("path");
const appServer = express();
const port = process.env.port == undefined ? 8081 : process.env.port;
//console.log("Port:" + port);
appServer.use(cors());
appServer.use(methodOverride("_method"));
appServer.use(bodyParser.json());
appServer.use(bodyParser.urlencoded({ extended: false }));
appServer.use(expressValidator());
appServer.use("/",express.static(path.join(__dirname,"../dist/todoAppClient")));

appServer.use("/V1", genericRouter);
appServer.use("/index",(req,res)=>{
  res.sendFile(path.join(__dirname,"../dist/todoAppClient/index.html"));
})

appServer.use("*", (req, res) => {
    res.status(404).send("No API found")
})

appServer.listen(port, err => {
    if (err)
        console.log("Error " + err);
    console.log(`Server hosted at ${port} port`);
})


dbObj.dbConnection().then(res => {
    console.log("DB Connected Successfully");
    config.dbFlag = true;
}).catch(err => {
    console.log(err);
})
