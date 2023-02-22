const express = require('express');
// const path = require('path');
const port = 8000;

const app = express();
const Task = require('./models/tasks');

//importing database
const db = require('./config/mongose');

// set up the view engine
app.set('view engine','ejs');
app.set('views','./views');


//use of static files
app.use(express.static('./views'));
// to use encrypted data
app.use(express.urlencoded());

app.get('/',function(req,res){
    // return res.send("<h1> hello </h1>");
    Task.find({},function(err,task){
        if(err){
            console.log('Error in fetching task from db');
            return;
        }

        return res.render('home',{
            task:task
        });
    })
});

// creating Tasks
app.post('/create-task',function(req,res){

    Task.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date
    },function(err,newTask){
        if(err){console.log('error in creating task', err); return;}
        console.log('********',newTask);
        return res.redirect('/');
    })
})


// deleting Tasks
app.get('/delete-task', function(req, res){
    // get the id from query
    var id = req.query;

    // checking the number of tasks selected to delete
    var count = Object.keys(id).length;
    for(let i=0; i < count ; i++){
        
        // finding and deleting tasks from the DB one by one using id
        Task.findByIdAndDelete(Object.keys(id)[i], function(err){
        if(err){
            console.log('error in deleting task');
            }
        })
    }
    return res.redirect('back'); 
});

// make the to listen on assigned port number
app.listen(port,function(err){
    if(err){
        console.log('error is running the server',err);
    }
    console.log('yup , my server is runnning on port ', port);
});