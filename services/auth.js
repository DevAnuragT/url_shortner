const jwt= require('jsonwebtoken');
const secret= 'mysecretkey';

function setUser(user){
  return jwt.sign({
    _id: user._id,
    email: user.email
  },
  secret);
}

function getUser(token){
  if(!token){
    return null;
  }
  try{
    return jwt.verify(token, secret);
  }catch(err){
    return null;
  }
}

module.exports = {
  setUser,
  getUser
}

//tokens vs session
//tokens are stateless
//session are stateful
//tokens are stored in client side
//session are  stored in server side
//tokens are used for api, coz tokens are longer sessions
//banks use session, coz they need you to be logged in just for a session
//tokens are faster
//session are slower
//tokens are scalable
//session are not scalable
//tokens are more secure