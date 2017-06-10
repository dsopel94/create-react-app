'use strict';

const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Instructor = require('../models/instructor');
const config = require('../config/main');
const passport = require('passport');
const bcrypt = require('bcrypt');
function generateToken(instructor) {
  return jwt.sign(instructor, config.jwt, {
    expiresIn: 10080, // in seconds
  });
}

function setInstructorInfo(request) {
  return {
    _id: request._id,
    username: request.username,
    password: request.password,
  };
}

//========================================
// Login Route
//========================================
exports.login = function(req, res, next) {
  if (req.body.username && req.body.password) {
    var username = req.body.username;
    var password = req.body.password;
  }
  // usually this would be a database call:
  var instructor = Instructor.findOne(
    { username: username },
    function(err, user) {
      if (err) {
        return console.log('Something went wrong!');
      }
      if (!user) {
        console.log('Not a user');
        return false;
      }
      bcrypt.compare(req.body.password, user.password, function(err, matches) {
        if (err) {
          return err;
        } else if (matches) {
          console.log('The password is correct ');
        } else {
          console.log('The password doesnt match');
        }
      });
    }
  );
};
//========================================
// Registration Route
//========================================

exports.register = function(req, res, next) {
  // Check for registration errors
  const username = req.body.username;
  const fullName = req.body.fullName;
  const password = req.body.password;
  console.log(req.body);
  // Return error if no email provided
  if (!username) {
    return res.status(422).send({ error: 'You must enter a user name.' });
  }

  if (!fullName) {
    return res.status(422).send({ error: 'You must enter a full name.' });
  }
  // Return error if no password provided
  if (!password) {
    return res.status(422).send({ error: 'You must enter a password.' });
  }

  Instructor.findOne({ username: username }, function(err, existingInstructor) {
    if (err) {
      return next(err);
    }

    // If user is not unique, return error
    if (existingInstructor) {
      return res
        .status(422)
        .send({ error: 'That user name is already in use.' });
    }

    // If email is unique and password was provided, create account
    let instructor = new Instructor({
      username: username,
      password: password,
      fullName: fullName,
    });

    instructor.save(function(err, instructor) {
      if (err) {
        return next(err);
      }

      // Subscribe member to Mailchimp list
      // mailchimp.subscribeToNewsletter(user.email);

      // Respond with JWT if user was created

      let instructorInfo = setInstructorInfo(instructor);

      res.status(201).json({
        token: 'JWT ' + generateToken(instructorInfo),
        instructor: instructorInfo,
      });
    });
  });
};
