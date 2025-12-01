import { Router } from 'express';
import { ping } from '../controllers/pingController.js';

const router = Router();

router.get('/ping', ping);

export default router;
