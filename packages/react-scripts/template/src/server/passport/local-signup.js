const Instructor = require('../models/instructor');
const LocalStrategy = require('passport-local').Strategy;

module.exports = new LocalStrategy(
  {
    fullName: 'fullName',
    userName: 'userName',
    password: 'password',
    session: false,
    passReqToCallback: true,
  },
  (req, fullName, userName, password, done) => {
    const instructorData = {
      fullName: fullName.trim(),
      userName: userName.trim(),
      password: password.trim(),
    };

    const newInstructor = new Instructor(instructorData);
    newInstructor.save(err => {
      if (err) {
        return done(err);
      }

      return done(null);
    });
  }
);
