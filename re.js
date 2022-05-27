const express=require('express')
const app= express()
const path=require('path')
const ejsMate=require('ejs-mate')
const ejs=require('ejs')

app.use(express.urlencoded({ extended: true }));
const mongoose=require('mongoose')

 app.engine('ejs' ,ejsMate)
app.use(express.json())
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
const partialspath=path.join(__dirname,'nav')
console.log(partialspath);


console.log(path.join(__dirname,'views'));


mongoose.connect('mongodb://localhost:27017/relatinmongoose')
.then(()=>{  console.log("connection established");}).catch((err)=>{ console.log(err);})

var Schema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true
    },
    country:[{
        city:String,
        state:String,
        _id:{id:false}
    }]
    
})
const camptable=mongoose.model('camptable', Schema)
const onetofewcreate=async()=>{
    console.log("this is funtion");
    console.log();
    console.log();
    try{
        const camprow=new camptable({
            name:"ab",
            phone:1234
        })
        camprow.country.push({
            city:"ne",
            state:"uss",
            
        })
       
        const result=await camprow.save()
        console.log(result);
    }
    catch(err){ console.log(err);
                }
}
// createfunction()
const onetofew=async(id)=>{
    console.log("this is funtion");
    console.log();
    console.log();
    try{
        const addadress= await camptable.findById(id)
       
        addadress.country.push({
            city:"newwwwww",
            state:"usssssssss",
            
        })
       
        const result=await addadress.save()
        console.log(result);
    }
    catch(err){ console.log(err);
                }
}
// onetofew("628f6b3511851fc7a62a557e")
const onetomany=async(id)=>{
    console.log("this is funtion");
    console.log();
    console.log();
    try{
       
     const insert=await  camptable.insertMany([
          {name:"a", phone:1,city:"a",state:"a"},
          {name:"b", phone:2,city:"b",state:"b"},
          {name:"c", phone:3,city:"c",state:"c"},
      ])
      
      
      console.log(insert); 
       
    }
    catch(err){ console.log(err);
                }
}

onetomany()

app.listen(3000,(()=>{
    console.log("server is running port message ");
}))