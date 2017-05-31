import { Router } from 'express';
import * as InstructorController from '../controllers/instructor.controller';
const router = new Router();

// Get all Posts
router.route('/Instructors').get(InstructorController.getInstructors);

// Get one post by cuid
router.route('/Instructors/:cuid').get(InstructorController.getInstructor);

// Add a new Post
router.route('/Instructors').post(InstructorController.addInstructor);

// Delete a post by cuid
router
  .route('/Instructors/:cuid')
  .delete(InstructorController.deleteInstructor);

export default router;
