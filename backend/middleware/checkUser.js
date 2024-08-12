// const User = require('../models/User');

// exports.checkUser = async (req, res, next) => {
//   const { email } = req.body;
//   try {
//     let user = await User.findOne({ email });
//     if (!user) {
//       // Tạo user mới với password mặc định đã được hash
//       const newUser = new User({
//         email,
//         password: 'defaultpassword', // Thay đổi theo yêu cầu
//       });
//       user = await newUser.save();
//     }
//     req.user = user;
//     next();
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };

// exports.createUser = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ msg: 'User already exists' });
//     }

//     user = new User({
//       name,
//       email,
//       password,
//     });

//     await user.save();
//     res.status(201).json({ msg: 'User created successfully' });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };

// exports.getUserByEmail = async (req, res) => {
//   const { email } = req.params;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ msg: 'User not found' });
//     }

//     res.json(user);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };
