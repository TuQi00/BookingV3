const User = require('../models/User');

exports.checkAndCreateUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Email and password are required.' });
  }

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.json({ msg: 'User already exists.', user });
    }

    user = new User({
      name: name || '', // Nếu tên không được cung cấp, gán giá trị mặc định là chuỗi rỗng
      email,
      password: password || email,
    });

    await user.save();
    res.status(201).json({ msg: 'User created successfully.', user });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


exports.getUserByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
