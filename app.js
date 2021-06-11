const express = require('express');
const app = express();
app.use(express.urlencoded())

// connecting to the database
// import mongodb library mongoose & 
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin-abdulaziz:abdulazizkitindi888@cluster0.ucnsv.mongodb.net/todolistDB', {useNewUrlParser: true, useUnifiedTopology: true});

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



app.use(express.static('public'));
app.use('css', express.static(__dirname + '/public/css'))

// express body-parser
// app.use(express.urlencoded())

app.get('/', (req, res)=>{
   Item.find({}, function(err, foundItems){
     if(foundItems.length === 0){
      Item.insertMany(defaultItems, function(err){
        if(err){
        console.log(err)
           }else{
            console.log("sucsessfully added")
             }
          });
          res.redirect('/')
     }else{
       res.render('index', {day :"Today", newTodo:foundItems});

     }

    //  console.log(foundItems)
   })
})

//Express dynamic route

// app.get("/:customListName", (req, res)=>{
//   const customeListName = req.params.customListName;

//    List.findOne({name:customeListName}, (err, findList)=>{
//     if(!err){
//       if(!findList){
//         console.log("doesn't exists")
//         //create a list
//         const list = new List({
//         name:customeListName,
//         items: defaultItems
//         })
//        list.save();
//       }else{
//         //show existing list
//         console.log("exists")

//         res.render('list',{day :findList.name, newTodo:findList.items} )
//       }
//     }
//    })  
// })





app.post('/', (req, res)=>{
  let itemName = req.body.todo;
  //creating new item to save in database
  if(itemName){
    const item = new Item({name:itemName})
    item.save();
  }
   res.redirect('/'); 
})



app.post('/delete', (req, res)=>{
  const checkedItemId =req.body.checkbox;
  Item.deleteOne({_id: checkedItemId},function(err){
    if(err){
      console.log("try again")
    }else{
      console.log("successfully deleted")
    }

    res.redirect('/');
  })
})

app.listen(process.env.PORT || 3000, (req, res)=>{
    console.log('Server is running on port 3000');
})