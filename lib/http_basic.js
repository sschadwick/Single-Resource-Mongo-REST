'use strict';

module.exports = exports = function(req, res, next) {
  
  var userPassEncoded = (req.headers.authorization || ' :').split(' ')[1];
  var userPassBuf = new Buffer(userPassEncoded, 'base64');
  var userPassSplit = userPassBuf.toString('utf8').split(':');
  req.auth = {
    username: userPassSplit[0],
    password: userPassSplit[1]
  };
  debugger;
  if (!(req.auth.username.length && req.auth.password.length)) {
    //both username and password are required to login
    console.log('could not authenticate: ' + req.auth.username);
    return res.status(401).send({msg: 'could not authenticate http basic'});
  }
  next();
}
