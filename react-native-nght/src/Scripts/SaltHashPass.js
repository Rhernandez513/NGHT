import CryptoJS from 'crypto-js';
import uuid from 'uuid';

module.exports = {
  saltHashPass: function(pass, salt='') {
    // uses a given salt or generates a new one
    salt = salt || uuid.v4().slice(-12) + uuid.v4().slice(-17, 4);
    passwordHash = CryptoJS.HmacSHA512(pass, salt).toString()
    return {
        salt: salt,
        passwordHash: passwordHash
    };
  }
}
