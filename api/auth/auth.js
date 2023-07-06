const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// some string as a secret to generate toekns.
const SECRET = process.env.SECRET

const getToken = ({ id, name, email }) =>{
    return jwt.sign(
        {
          id,
          name,
          email
        },
        SECRET,
        { expiresIn: '1d' }
      )
};

const getUser = async auth => {
    console.log(auth)
    if (!auth) throw new Error('you must be logged in!');
  
    const token = auth.split('Bearer ')[1];
    if (!token) throw new Error('you should provide a token!');
  
    const user = await jwt.verify(token, SECRET, (err, decoded) => {
      if (err) throw new Error('invalid token!');
      return decoded;
    });
    return user;
  };

module.exports = {
    getUser: getUser,
  getToken: getToken
};