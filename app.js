
require('dotenv').config();
const express = require('express');
const hbs = require('hbs');

const app = express()
const port = process.env.PORT;

// const port= 8081;


//Handlebars
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');


//Middleware Servir contenido estatico
app.use(express.static('public'));

// app.get('/', function (req, res) {
//   res.render('home',{
//       Nombre:'Fernando Cortes',
//       Titulo: 'Curso de node'
//   });
// });


// app.get('/generic', function (req, res) {
//   res.render('generic',{
//       Nombre:'Fernando Cortes',
//       Titulo: 'Generic'   

//   })
// });

// app.get('/elements', function (req, res) {
//   res.render('elements',{
//     Nombre:'Fernando Cortes',
//     Titulo: 'elements'   

// })
// });
  

app.get('*', (req, res)=>{
    res.sendFile(__dirname +'/public/index.html');
});

app.listen(port,()=>{
    console.log(`example app listening at http://localhost:${port}`);
})