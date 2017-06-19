const Course = require('../models/Course');
const cuid = require('cuid');
const sanitizeHtml = require('sanitize-html');
const ObjectId = require('mongodb').ObjectID;
/**
 * Get all Courses
 * @param req
 * @param res
 * @returns void
 */
exports.getCourses = function(req, res) {
  Course.find().exec((err, courses) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ courses });
  });
};
exports.addCourse = function(req, res) {
  console.log(req.body);
  if (!req.body.name) {
    res.status(403).end();
  }
  let newCourse = new Course({
    name: sanitizeHtml(req.body.name),
    _creator: ObjectId,
  });
  // Let's sanitize inputs
  newCourse.name = sanitizeHtml(newCourse.name);
  newCourse.startDate = sanitizeHtml(newCourse.startDate);
  newCourse.endDate = sanitizeHtml(newCourse.endDate);
  newCourse._creator = sanitizeHtml(newCourse._creator);
  newCourse.cuid = cuid();
  newCourse.save();
  res.status(201).json(newCourse);
};

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
exports.getCourse = function(req, res) {
  Course.findOne({ cuid: req.params.cuid }).exec((err, course) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ course });
  });
  return res.json({ message: 'got Course' });
};

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
exports.deleteCourse = function(req, res) {
  Course.findOne({ cuid: req.params.cuid }).exec((err, course) => {
    if (err) {
      res.status(500).send(err);
    }
    course.remove(() => {
      res.status(200).end();
    });
  });
  return res.status(200).end();
};
