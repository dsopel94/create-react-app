import { Router } from 'express';
import * as InstructorController from '../controllers/instructor.controller';
const router = new Router();

// Get all Posts
router.route('/instructors').get(InstructorController.getInstructors);

// Get one post by cuid
router.route('/instructors/:cuid').get(InstructorController.getInstructor);

// Add a new Post
router.route('/instructors').post(InstructorController.addInstructor);

// Delete a post by cuid
router
  .route('/instructors/:cuid')
  .delete(InstructorController.deleteInstructor);

export default router;
