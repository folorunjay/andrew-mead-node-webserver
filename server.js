const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('theYear',() => {
    return new Date().getFullYear();
});

hbs.registerHelper('capgun',(text) => {
    return text.toUpperCase();
});

app.set('view engine','hbs');

//middleware calls

app.use((req,res,next) => {
var currentDate = new Date().toString();
var log = `${currentDate}: ${req.method} ${req.url}`;
console.log(log);
fs.appendFile('server.log',log + '\n',(err) => {
    if(err){
        console.log('Unable to write to log');
    }
});
  next();
});

// app.use((req,res,next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res) => {
   res.render('index.hbs',{
       welcMsg:'Welcome to my fast-evolving WORLD!!',
       pageTitle:'Home Page'
   })
});

app.get('/about',(req,res) => {
    // res.send('<h1>Hello Express</h1>');
   res.render('about.hbs',{
       pageTitle:'About Page '
   });
});

app.get('/bad',(req,res) => {
    // res.send('<h1>Hello Express</h1>');
    res.send({
        errorMessage:'what was you thinking! ..BAD!!'
    });
});


app.listen(3000,() => {
    console.log('Server running on port 3000');
});