import express from 'express';
import { createImage, getAllImages, updateImage, deleteImage } from '../../controllers/users-images.js';
import upload from '../../util/multer.js';
import isAuth from '../../middlewares/authorization.js';

const router = express.Router();

router.post('/users-images/create', isAuth, createImage);
router.get('/users-images/all', isAuth, getAllImages);
router.put('/users-images/update/:id', isAuth, updateImage);
router.delete('/users-images/delete/:id', isAuth, deleteImage);

export default router;
