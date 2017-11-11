const bcrypt = require('bcryptjs');

let password = "hellopass";

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  });
});

let hashedPassword = '$2a$10$aydjc.w5wal0mH/QwdIRnu2i4sz7fusx9Vz/2DW1ynBK1Q2bcjChe';

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});