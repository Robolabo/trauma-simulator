const express = require('express');
const app = express();

// importing routes
const trainerRouters = require('./routes/trainerRoute')

//Settings
app.set('port', process.env.PORT || 3000); //puerto por el que se ejecuta la app

//Middlewares
//Funciones que atiende una transaccion HTTP
app.use(express.json());

// Access-Control-Allow-Origin: Para controlar quien puede consumir mi API
// Access-Control-Allow-Headers: Para configurar los headers que acepta la API
// Access-Control-Allow-Methods: Para declarar los métodos que acepta el API
// Configurar cabeceras y cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


app.use('/test', (req, res) => {  //(ruta donde se ejecuta, el middleware)
  res.send("Test route");
}); 

//Route
app.use('/trainer',trainerRouters)


app.listen(app.get('port'),()=>{
  console.log("Start server on port "+app.get('port'))
})

