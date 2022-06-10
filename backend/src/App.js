var Utils = require('./utils');
require('dotenv').config({path: __dirname + '/.env'});

const express = require('express');
const cors = require('cors');
//const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();

// enable CORS
app.use(cors());
// parse application/json
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// importing routes
const trainerRouters = require('./routes/trainerRoute')
const simulationRouters = require('./routes/simulationRoute')
const traineeRouters = require('./routes/traineeRoute')
const actionRouters = require('./routes/actionRoute')
const informRouters = require('./routes/informRoute')
const evaluationRouters = require('./routes/evaluationRoute')
const resultsRouters = require('./routes/resultsRoute')

//Settings
app.set('port', process.env.PORT || 8080); //puerto por el que se ejecuta la app

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
app.use('/simulation', simulationRouters)
app.use('/trainee', traineeRouters)
app.use('/action', actionRouters)
app.use('/inform', informRouters)
app.use('/evaluation', evaluationRouters)
app.use('/results', resultsRouters)

//middleware that checks if JWT token exists and verifies it if it does exist.
//In all future routes, this helps to know if the request is authenticated or not.
app.use(function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers['authorization'];
  if (!token) return next(); //if no token, continue
 
  token = token.replace('Bearer ', '');
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    } else {
      req.user = user; //set the user to req so other routes can use it
      next();
    }
  });
});
 
// request handlers
app.get('/', (req, res) => {
  if (!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.' });
  res.send('Welcome to the Node.js Tutorial! - ' + req.user.name);
});

// verify the token and return it if it's valid
app.get('/verifyToken', function (req, res) {
  // check header or url parameters or post parameters for token
  var token = req.query.token;
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token is required."
    });
  }
  // check token that was passed by decoding token using secret
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) return res.status(401).json({
      error: true,
      message: "Invalid token."
    });
 
 
    // return 401 status if the userId does not match.
    if (user.email !== data.email) {
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    }
    // get basic user details
    var userObj = Utils.getCleanUser(data);
    return res.json({ success: true, data: data, user: userObj, token });
  });
});

app.listen(app.get('port'),()=>{
  console.log("Start server on port "+app.get('port'))
})

