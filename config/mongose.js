//Require the library
const mongoose = require('mongoose');

//connect to the database 
mongoose.connect('mongodb://localhost/todos');

//acquire the data
const db = mongoose.connection;


//error
db.on('err',console.error.bind(console,"Error connecting to db"));

//up and running
db.once('open',function(){
    console.log("successfully connected to data base");
})