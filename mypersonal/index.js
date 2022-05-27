const express=require('express')
const app= express()
const path=require('path')
const ejsMate=require('ejs-mate')
const ejs=require('ejs')

app.use(express.urlencoded({ extended: true }));
const mongoose=require('mongoose')
const camptable=require('./schema');
const { update } = require('./schema');
 app.engine('ejs' ,ejsMate)
app.use(express.json())
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
const partialspath=path.join(__dirname,'nav')
console.log(partialspath);


console.log(path.join(__dirname,'views'));

mongoose.connect('mongodb://localhost:27017/campinfo')
.then(()=>{  console.log("connection established");}).catch((err)=>{ console.log(err);})
const createfunction=async(n,p)=>{
    console.log("this is funtion");
    console.log(n);
    console.log(p);
    try{
        const camprow=new camptable({
            name:n,
            phone:p
        })
        const result=await camprow.save()
        console.log(result);
    }
    catch(err){ console.log(err);
                }
}

const updatefunction=async(id,type)=>{
    // console.log("this is update function");
    // console.log(id);
    


    
    try{
        const ide=await camptable.findById(id) 
        console.log(ide);
       
       const result= await camptable.updateOne({name:"ora"})
       console.log(result);
    }
    catch(err){ console.log(err);
                }
}




app.get('/home',(req,res)=>{
    res.render('home.ejs')
})
app.get('/create',(req,res)=>{
    res.render('create.ejs')
})

app.post('/postcreate',(req,res)=>{
    const{name,phone}=req.body;
    console.log(name);
    console.log(phone);

    createfunction(name,phone)
    
  
})
// app.post('/postcreate',(req,res)=>{
//     const{ name,type}=req.body;
//     console.log(name);
//     console.log(type);
//     // console.log(phone);
    

//     updatefunction(name,type)
    
  
// })

app.get('/update',(req,res)=>{
    res.render('update.ejs')
})
// app.post('/postupdate', (req,res)=>{
//     const{type,value}=req.body
//    // console.log(type);
//   // postupdate(type,value)
// })

app.listen(3000,(()=>{
    console.log("server is running port message ");
}))