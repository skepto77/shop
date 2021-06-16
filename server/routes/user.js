import express from 'express';
const router = express.Router({ mergeParams: true });
import { authUsers } from '../controllers/user.js';

router.post('/login', authUsers);
export default router;