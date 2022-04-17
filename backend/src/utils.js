// generate token using secret from process.env.JWT_SECRET
var jwt = require('jsonwebtoken');
 
// generate token and return it
function generateToken(user) {
  //1. Don't use password and other sensitive fields
  //2. Use the information that are useful in other parts
  if (!user) return null;
 
  var u = {
    name: user.name,
    surname: user.surname,
    email: user.email,
    //password: user.password,
    workplace: user.workplace,
    roleId: user.roleId

  };
 
  return jwt.sign(u, process.env.JWT_SECRET, {
    expiresIn: 60 // 1 hora de sesión
  });
}
 
// return basic user details
function getCleanUser(user) {
  if (!user) return null;
 
  return {
    name: user.name,
    surname: user.surname,
    email: user.email,
    //password: user.password,
    workplace: user.workplace,
    roleId: user.roleId

  };
}
 
module.exports = {
  generateToken,
  getCleanUser
}