const express = require('express');
const app = express();


//set up ejs
app.set('views', './views');
app.set('view engine', 'ejs');


// accesing the static files

app.use(express.static('public'));
app.use('css', express.static(__dirname + '/public/css'))

app.get('/', (req, res)=>{

    const day = new Date().getDay();
    let todayIs ='';
     
     switch(day){
        case 0:
             todayIs = 'Sunday';
            break;
        case 1:
             todayIs = 'Monday';
            break;
        case 2:
             todayIs = 'Tuesday';
            break;
        case 3:
             todayIs = 'Wednesday';
            break;
        case 4:
             todayIs = 'Thursday';
            break;
        case 5:
             todayIs = 'Friday';
            break
        case 6:
             todayIs = 'Saturday';
            break;
        
     }
     res.render('index', {day :todayIs});
})



app.listen(3000, (req, res)=>{
    console.log('Server is running on port 3000');
})