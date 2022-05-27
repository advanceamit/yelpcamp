const express=require('express')
const app= express()
const path=require('path')
const ejsMate=require('ejs-mate')
const ejs=require('ejs')

app.use(express.urlencoded({ extended: true }));
const mongoose=require('mongoose')
const { stringify } = require('querystring')

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

const Schema2=new mongoose.Schema([{
    name:String,
    city:String,
    product:[{type:mongoose.Schema.Types.ObjectId,ref :'products'}]
}])

const schema2table=mongoose.model('schema2table', Schema2)
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

// onetomany()

const onetomany2=async()=>{
    const schema2tabledata=new schema2table({name:"schema2name",city:"schema2city"})
    const b= await camptable.findOne({name:'b'})
    const c= await camptable.findOne({name:'c'})
    
    const push1=await schema2tabledata.product.push(b)
    
    const push2=await schema2tabledata.product.push(c)
    console.log(push1);
    console.log(push2)
     const sc2data=await schema2tabledata.save()
    
    console.log(sc2data);

}
// onetomany2()

// const findonetomany2=async()=>{
//     const find=await schema2table.findOne({name:'schema2name'}).populate('product')
//     console.log(find);

// }
// findonetomany2()

// schema2table.findOne({name:"schema2name"}).populate('product').then((schema2table)=>{
//     console.log(schema2table);
// })

app.listen(3000,(()=>{
    console.log("server is running port message ");
}))