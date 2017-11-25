const {User} = require('./../models/user');

const authenticate = (req, res, next) => {
  let token = req.header('x-auth');
  // console.log('token : ', token);

  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    // console.log('user : ', user);
    req.user = user;
    req.token = token;
    next();
  }).catch((err) => {
    console.error("authenticate error : ", err);
    res.status(401).send();
  });
};

module.exports = {authenticate};
