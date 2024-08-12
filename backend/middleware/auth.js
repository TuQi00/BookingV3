// const jwt = require('jsonwebtoken');
// const config = require('../config');
// const User = require('../models/User');

// module.exports = async (req, res, next) => {
//   try {
//     const token = req.header('Authorization');

//     if (!token) {
//       return res.status(401).json({ msg: 'No token, authorization denied' });
//     }

//     const formattedToken = token.replace('Bearer ', '');

//     const decoded = jwt.verify(formattedToken, config.get('jwtSecret'));

//     req.user = decoded.user;

//     next();
//   } catch (err) {
//     console.error('Something went wrong with auth middleware', err);
//     res.status(401).json({ msg: 'Token is not valid' });
//   }
// };
