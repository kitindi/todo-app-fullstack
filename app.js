const express = require('express');
const ejs = require ('ejs')
const app = express();



app.use(express.urlencoded());

app.get('/', (req, res)=>{
    res.send('Up and running')
})




app.listen(3000, (req, res)=>{
    console.log('Server is running on port 3000');
})