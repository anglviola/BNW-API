import express from 'express';

import accountLoginHandler from './accounts/login.js'; 
import accountRegisterHandler from './accounts/register.js'; 
import createUsersImagesHandler from './users-images/users-images.js';
import updateUsersImagesHandler from './users-images/users-images.js';
import deleteUsersImagesHandler from './users-images/users-images.js';
import getAllUsersImagesHandler from './users-images/users-images.js';

const router = express.Router();

router.post('/accounts/login', accountLoginHandler);
router.post('/accounts/register', accountRegisterHandler);
router.post('/users-images/create', createUsersImagesHandler);

router.put('/users-images/update/:id', updateUsersImagesHandler);

router.delete('/users-images/delete/:id', deleteUsersImagesHandler);

router.get('/users-images/all', getAllUsersImagesHandler);

export default router;
