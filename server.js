const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();


app.use((req,res,next) => {
  now = new Date().toString();
  log =`${now} ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log + '\n', (err) => {
    if (err) {
console.log('Unable to access file to add log');
}
})
next();
})

app.use((req,res,next) => {
  res.render('maintenance.hbs',{
    pageTitle: 'Home Page',
    // currentYear : new Date().getFullYear()  // Commenting this out since function is defined as helper now.
  })
  })

app.use(express.static(__dirname+'/public'));//setting static contents directory. app.use is registering a middleware

hbs.registerPartials(__dirname+'/views/partials') // This is used to try to template boilerplate code/text in HTML to reduce redundancy
hbs.registerHelper('getCurrentYear',() => {
return new Date().getFullYear()
}
)// This is used to reduce redundancy for template tags within renders. If it is a helper, hbs will first look for it here before it checks inside params of the render function.
hbs.registerHelper('upperTextify',(text) => {
return text.toUpperCase();

})// This helper takes one argument as input. See in header.hbs how it is used '{{upperTextify pageTitle}}'


app.set('view engine','hbs');
// used to set express to use template tagging engine as handlebars (i.e. hbs). views is default folder it looks for.
// .hbs should be the extension used. Then you can use them in app.render as used for 'about' below.




app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    // currentYear : new Date().getFullYear()  // Commenting this out since function is defined as helper now.
  });// HBS style
});

app.get('/json',(req,res)=>{
  res.send({
    name: 'Anil Menon',
    titles : ['Entrepreneur','Integration Architect'],
    hobbies: [
      "football","music","movies","reading"
    ],
    favorites : [
      {
        'bands':['Metallica','Iron Maiden','Dream Theatre','Megadeth','Foo Fighters'],
        'teams' :['Manchester United','Real Madrid']
      }
    ]
  }
);
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle: 'About Us',
    // currentYear : new Date().getFullYear()  // Commenting this out since function is defined as helper now.
  });// HBS style
});
app.get('/bad',(req,res)=>{
  res.send({
      errorMessage: 'Unable to handle request'


  }
  );
});

app.get('/website',(req,res)=>{
  res.send('Hello express! This is my website path');
});

app.listen(3000, ()=> {
  console.log('Server is up on port 3000');
});
