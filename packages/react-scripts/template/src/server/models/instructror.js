const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const instructorSchema = new Schema({
  fullName: String,
  username: String,
  password: String,
});

instructorSchema.methods.comparePassword = function comparePassword(
  password,
  callback
) {
  bcrypt.compare(password, this.password, callback);
};

instructorSchema.pre('remove', function callback(next) {
  const Course = mongoose.model('course');
  Course.update(
    { instructors: { $in: [this._id] } },
    { $pull: { instructors: this._id } },
    { multi: true }
  ).then(() => next());
});

instructorSchema.pre('save', function saveHook(next) {
  const instructor = this;

  if (!instructor.isModified('password')) return next();

  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) {
      return next(saltError);
    }

    return bcrypt.hash(instructor.password, salt, (hashError, hash) => {
      if (hashError) {
        return next(hashError);
      }
      instructor.password = hash;

      return next();
    });
  });
});

const Instructor = mongoose.model('Instructor', instructorSchema);
module.exports = Instructor;
