const express = require('express')
const app= express()
const router=require('./routes/backend')
const port = process.env.PORT || 5000

app.use(express.static('public'));
app.get('/',(req,res)=>{
    res.sendFile('index.html');
})
app.use(express.json())
app.use('/backend',router)

app.use('/*',(req,res,next)=>{
    res.sendStatus(404).send('page not found')
    next();
})
app.listen(port,()=>{
    console.log('server is running');
})