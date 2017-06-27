# School Management App

### API
-- `GET`
`/instructors`
```
{
  fullName: String,
  username: String,
  password: String,
}
```
-- `GET by ID`
`/instructors/:id`
```
{
    "_id": "Object ID",
    fullName: String,
    username: String,
    password: String,
}
```

-- `POST`
`/instructors/`
```
{
  fullName: String,
  username: String,
  password: String,
}
```
-- `PUT`
`/instructors/:id`
```
{
    "_id": "Object ID",
    fullName: String,
    username: String,
    password: String,
}
```
-- `DELETE`
`/instructors/:id`
```
{
  "_id": "Object ID",
  fullName: String,
  username: String,
  password: String,
}
```

-- `GET`
`/courses`
```
{
  name: String,
  _creator: { type: ObjectId, ref: 'Instructor' }
}
```
-- `GET by ID`
`/courses/:id`
```
{
    "_id": "Object ID",
    name: String,
    _creator: { type: ObjectId, ref: 'Instructor' }
}
```

-- `POST`
`/courses/`
```
{
  name: String,
  _creator: { type: ObjectId, ref: 'Instructor' }
}
```
-- `PUT`
`/courses/:id`
```
{
    "_id": "Object ID",
    name: String,
    _creator: { type: ObjectId, ref: 'Instructor' }
}
```
-- `DELETE`
`/courses/:id`
```
{
  "_id": "Object ID",
  firstName: String,
  lastName: String,
  phoneNumber: String,
  courses: { type: ObjectId, ref: 'Course' },
  streetAddress: String,
  miscAddress: String,
}
```

-- `GET`
`/students`
```
{
  firstName: String,
  lastName: String,
  phoneNumber: String,
  courses: { type: ObjectId, ref: 'Course' },
  streetAddress: String,
  miscAddress: String,
}
```
-- `GET by ID`
`/students/:id`
```
{
    "_id": "Object ID",
    firstName: String,
    lastName: String,
    phoneNumber: String,
    courses: { type: ObjectId, ref: 'Course' },
    streetAddress: String,
    miscAddress: String,
}
```

-- `POST`
`/students/`
```
{
  firstName: String,
  lastName: String,
  phoneNumber: String,
  courses: { type: ObjectId, ref: 'Course' },
  streetAddress: String,
  miscAddress: String,
}
```
-- `PUT`
`/students/:id`
```
{
    "_id": "Object ID",
    firstName: String,
    lastName: String,
    phoneNumber: String,
    courses: { type: ObjectId, ref: 'Course' },
    streetAddress: String,
    miscAddress: String,
}
```
-- `DELETE`
`/students/:id`
```
{
  "_id": "Object ID",
  firstName: String,
  lastName: String,
  phoneNumber: String,
  courses: { type: ObjectId, ref: 'Course' },
  streetAddress: String,
  miscAddress: String,
}
```
[Screenshot](http://imgur.com/a/tW2Gl)

Built with Mongoose, Express, React, and Node. Server hosted on mLab and app hosted on heroku
