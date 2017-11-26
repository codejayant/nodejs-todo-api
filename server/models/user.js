const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

// {
//   email: 'codejayant@gmail.com',
//   password: 'todoapi',
//   tokens: [{
//     access: 'auth',
//     token: 'hellotoken'
// }]
// }


const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    // validate: (value) => {
      // return validator.isEmail(value);
    // },
    validator: validator.isEmail,
    message: '{VALUE} is not a valid email'
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      require: true
    },
    token: {
      type: String,
      require: true
    }
  }]
});

UserSchema.methods.toJSON = function()  {
  let user = this;
  let userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);  // convert user object to include only _id and email field for response
};

// instance methods
UserSchema.methods.generateAuthToken = function() {
  let user = this;
  let access = 'auth';
  let token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();

  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });
};

UserSchema.methods.removeToken = function (token) {
  let user = this;

  return user.update({
    $pull: {
      tokens: {token}
    }
  });
};

UserSchema.statics.findByToken = function (token) {
  let User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log('decoded : ', decoded);
    // console.log(`decoded id : ${decoded._id}`);
  } catch(e)  {
    // return new Promise((resolve, reject) => {
    //   reject();
    // });
    return Promise.reject();
  }

  return User.findOne({
    // _id: decoded._id,
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.statics.findByCredentials = function (email, password) {
  let User = this;

  return User.findOne({email}).then((user) => {
    if (!user)  {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res)  {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

UserSchema.pre('save', function (next) {
  let user = this;
  if (user.isModified('password'))  {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

const User = mongoose.model('Users', UserSchema);

module.exports = { User };