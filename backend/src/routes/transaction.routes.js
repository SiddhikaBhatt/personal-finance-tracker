import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { authorizeRoles } from '../middleware/role.middleware.js';
import {
  createTransaction,
  getTransactions
} from '../controllers/transaction.controller.js';

const router = express.Router();

router.use(authenticate);

// admin + user can create
router.post('/', authorizeRoles('admin', 'user'), createTransaction);

// admin + user + read-only can view
router.get('/', authorizeRoles('admin', 'user', 'read-only'), getTransactions);

export default router;
