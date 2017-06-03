const InstructorController = require('../controllers/instructor.controller');
const express = require('express');
const router = new express.Router();
//Get all Posts
router.get('/', InstructorController.getInstructors);

// Get one post by cuid
router.route('/:cuid').get(InstructorController.getInstructor);

// Add a new Post
router.route('/').post(InstructorController.addInstructor);

// Delete a post by cuid
router.route('/:cuid').delete(InstructorController.deleteInstructor);

module.exports = router;
//
// router.get('/instructors', InstructorController.getInstructors);
// router.post('/instructors', InstructorController.addInstructor);
// router.delete('/instructors/:id', InstructorController.deleteInstructor);
// router.get('/instructors/:id', InstructorController.getInstructor);
