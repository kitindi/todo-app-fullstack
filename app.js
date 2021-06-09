const express = require('express');
const app = express();

// connecting to the database
// import mongodb library mongoose & 
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todolistDB', {useNewUrlParser: true, useUnifiedTopology: true});

//set up ejs
app.set('views', './views');
app.set('view engine', 'ejs');



// defining scheme

const itemsSchema =  new mongoose.Schema({
   name: String
})

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({name: "Welcome to your todo list"})
const item2 = new Item({name: "Hit + button to add a new item"})
const item3 = new Item({name: "Hit <---- button to delete an item"})


const defaultItems = [item1, item2, item3]


Item.insertMany(defaultItems, function(err){
  if(err){
    console.log(err)
  }else{
    console.log("sucsessfully added")
  }
})

// accesing the static files

app.use(express.static('public'));
app.use('css', express.static(__dirname + '/public/css'))

// express body-parser
app.use(express.urlencoded())

app.get('/', (req, res)=>{

     res.render('index', {day :"Today", newTodo: items});
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