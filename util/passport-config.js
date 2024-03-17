import passport from 'passport';
import LocalStrategy from 'passport-local';
import Users from '../models/Users.js';

function passportConfig() {
    passport.use('register', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, email, password, done) => {
    try {
        const existingUser = await Users.findOne({ where: { email: email } });

        if (existingUser) {
            return done(null, false, { message: 'Email is already used.' });
        }

        const newUser = await Users.create({
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: email,
            password: password 
        });

        return done(null, newUser);
    } catch (error) {
        return done(error);
    }
    }));

    passport.use('login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, email, password, done) => {
    try {
        
        console.log('Attempting login for email:', email);
        const user = await Users.findOne({ where: { email } });
        console.log('User:', user);

        if (!user || !(await user.validatePassword(password))) {
        console.log('Invalid email or password');
        return done(null, false, { message: 'Invalid email or password' });
        }

        console.log('Login successful');
        return done(null, user);
    } catch (error) {
        console.error('Error during login:', error);
        return done(error);
    }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await Users.findByPk(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });

  return passport;
}

export default passportConfig;
