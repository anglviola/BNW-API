import jwt from 'jsonwebtoken';
import initializePassport from '../util/passport-config.js';

const passport = initializePassport();

export const accountLogin = (req, res, next) => {
  passport.authenticate('login', { session: false }, (err, user, info) => {
    if (err) {
      return next(err); 
    }
    if (!user) {
      return res.status(401).json({ success: false, message: info.message });
    }

    const token = jwt.sign({ userId: user.id }, process.env.SECRETKEY, {
      expiresIn: '2h',
    });

    res.json({ success: true, token });
  })(req, res, next); 
};

export const accountRegister = (req, res, next) => {
  passport.authenticate('register', { session: false }, (err, user, info) => {
      if (err) {
          return next(err);
      }
      if (!user) {
          if (info && info.message === 'Email is already used.') {
              return res.status(400).json({ success: false, message: 'Email is already used.' });
          }
          return res.status(400).json({ success: false, message: 'Failed to create an account.' });
      }

      const token = jwt.sign({ userId: user.id }, process.env.SECRETKEY, {
          expiresIn: '2h',
      });

      res.json({ success: true, token });
  })(req, res, next);
};