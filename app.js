const express = require('express');
const date = require(__dirname + '/date.js')
const app = express();

const items= [];

//set up ejs
app.set('views', './views');
app.set('view engine', 'ejs');


// accesing the static files

app.use(express.static('public'));
app.use('css', express.static(__dirname + '/public/css'))

// express body-parser

app.use(express.urlencoded())

app.get('/', (req, res)=>{
     const day = date()

     res.render('index', {day :day, newTodo: items});
})

app.post('/', (req, res)=>{
  let item = req.body.todo;
  if(item){
    items.push(item)
  }
  //check for valid user
  res.redirect('/')
})



app.listen(3000, (req, res)=>{
    console.log('Server is running on port 3000');
})