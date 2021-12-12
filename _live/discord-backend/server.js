
const express = require ("express");
const mongoose = require ("mongoose");
const cors = require ("cors");
const bodyParser= require("body-parser");
// app config
const app = express();
const port= process.PORT||3000;

// middlewares
app.use(express.json());
app.use(cors());



app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
// dbconfig
main().catch(err => console.log(err));


async function main() {
  await mongoose.connect('mongodb+srv://admin:DgjLh60He4m5HPhC@cluster0.y7ebl.mongodb.net/discordDatabase?retryWrites=true&w=majority');
}
const discordSchema= mongoose.Schema({
  channelName:String,
  conversation:[{
     message:String,
     timeStamp:String,
      user:{
          displayName:String,
          email:String,
          photo:String,
          uid:String
      }
  
  
  
  }]
  
  })
  const mongoData =mongoose.model('mongoData',discordSchema);
// api routes
app.get("/",(req,res)=>res.status(200).send("Hello There"));
app.post("/new/channel",(req,res)=>{
  dbData=req.body;
  
  mongoData.create(dbData,(err,data)=>{
    if (err){
      res.status(500).send(err)
    }else{
      
      res.status(201).send(data)
    }
  })
  console.log(req.body);
})


app.get("/get/channelList",(req,res)=>{
mongoData.find((err,data)=>{
  if (err){
    res.status(500).send(err)
  }else{
    let channels=[]
data.map((channelData)=>{
 const channelInfo= {
   id:channelData._id,
  name:channelData.channelName}
  channels.push(channelInfo)
})

    res.status(200).send(channels)
  }
})
})
app.post('/new/message',(req,res)=>{
  const newMessage=req.body;

  mongoData.updateMany({ _id: req.query.id },
  {$push:{ conversation:req.body }},
  (err,data)=>{
    if(err){
      console.log(err)
      console.log("error loading message")
      res.status(500).send(err)
      
    }else{
      res.status(201).send(data)
   
   console.log(
    data
   )
    }

  })
})
app.get("/get/data",(req,res)=>{
  mongoData.find((err,data)=>{
    if(err){
      res.send(err)
    }else{
      res.send(data)
    }
  })
})
app.get("/get/conversation",(req,res)=>{
  const id=req.query.id
  mongoData.find({_id:id},(err,data)=>{
    if(err){
      res.send(err)
    }else{
      x=data[0].conversation;
      res.send(x)
      console.log(x)
    }
  })
})
// listening
app.listen(port,()=>console.log("server started working"))
