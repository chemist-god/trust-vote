import { Router } from 'express';
import { login, updatePassword, connectWallet } from '../controllers/auth.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router(); // Use Router() instead of express.Router()

router.post('/login', login);
router.put('/update-password', protect, updatePassword); // PUT for updates
router.post('/connect-wallet', protect, connectWallet);

export default router;
