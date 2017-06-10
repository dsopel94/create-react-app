const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/main');
const instructors = require('./routes/instructor.routes');
logger = require('morgan');
const router = require('./routes/router');
// const home = require('./routse/home.routes')
const passport = require('passport');

app.use(express.static('./server'));
app.use(express.static('../dist'));

// Database Setup
// mongoose.connect(config.dbUri);
function runServer(databaseUrl = config.dbUri, port = '55631') {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, function(err) {
      if (err) {
        return reject(err);
      }
      server = app
        .listen(port, function() {
          console.log(`Your app is listening on port ${port}`);
          resolve();
        })
        .on('error', function(err) {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

// Import routes to be served
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/instructors', instructors);
app.use('/api/register', router);
app.use('/api/login', router);
app.use('/', instructors);
app.use(logger('dev'));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials'
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
// app.use('/', home)
app.use(passport.initialize());
router(app);

const localSignupStrategy = require('./passport/local-signup');
const localLoginStrategy = require('./passport/local-login');

// Start the server
app.listen(config.port);
console.log('Your server is running on port 3000.');
runServer();

// export default app;
module.exports = { app };