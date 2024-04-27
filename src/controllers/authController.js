const bcrypt = require('bcryptjs');
const User = require('../models/user');
const validator = require('validator')

const authController = {
  async register(req, res) {
    const { email, password } = req.body;
    try {
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email, please try again'});
      }
      
      if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ message: 'Password must contain be at least 8 characters long and contain at least one lowercase, uppercase, symbol and number'});
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      await User.create(email, hashedPassword);
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Error registering user, please try again shortly' });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found, register?' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Wrong password' });
        }

        req.session.userId = user.id;
        console.log(req.session.userId)

        res.status(200).json({ message: 'Logged in successfully' });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
  },
  
  async logout(req, res) {
    try {
      req.session.destroy(err => {
        if (err) {
          console.error('Error logging out:', err);
          return res.status(500).json({ message: 'Error logging out, please try again shortly' });
        }

        res.status(200).json({ message: 'Logged out successfully' });
      });
    } catch (error) {
      console.error('Error logging out:', error);
      res.status(500).json({ message: 'Error logging out, please try again shortly' });
    }
  }
};

module.exports = authController