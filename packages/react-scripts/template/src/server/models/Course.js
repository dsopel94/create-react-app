const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const courseSchema = new Schema({
  name: String,
  // startDate: { type: Date, default: Date.now },
  // endDate: Date,
  // instructors: [{
  //   type: ObjectId,
  //   ref: 'instructor',
  // }],
  _creator: [{ type: ObjectId, ref: 'Instructor' }],
  // periods: [{
  //   type: ObjectId,
  //   ref: 'period',
  // }],
  periods: [{ type: ObjectId, ref: 'Period' }],
});

const Course = mongoose.model('course', courseSchema);

module.exports = Course;
