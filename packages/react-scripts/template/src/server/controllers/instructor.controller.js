import Instructor from '../models/instructor';
import cuid from 'cuid';
// import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all Instructors
 * @param req
 * @param res
 * @returns void
 */
export function getInstructors(req, res) {
  Instructor.find().exec((err, instructors) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ instructors });
  });
}
export function addInstructor(req, res) {
  if (
    !req.body.instructor.fullName ||
    !req.body.instructor.username ||
    !req.body.instructor.password
  ) {
    res.status(403).end();
  }
  const newInstructor = new Instructor(req.body.instructor);
  // Let's sanitize inputs
  newInstructor.username = sanitizeHtml(newInstructor.username);
  newInstructor.password = sanitizeHtml(newInstructor.password);
  newInstructor.fullName = sanitizeHtml(newInstructor.fullName);
  newInstructor.cuid = cuid();
  newInstructor.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post: saved });
  });
  return res.json({ message: 'posted' });
}

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
export function getInstructor(req, res) {
  Instructor.findOne({ cuid: req.params.cuid }).exec((err, instructor) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ instructor });
  });
  return res.json({ message: 'got Instructor' });
}

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
export function deleteInstructor(req, res) {
  Instructor.findOne({ cuid: req.params.cuid }).exec((err, instructor) => {
    if (err) {
      res.status(500).send(err);
    }
    instructor.remove(() => {
      res.status(200).end();
    });
  });
  return res.status(200).end();
}
