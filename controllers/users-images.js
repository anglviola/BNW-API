import UsersImages from '../models/UsersImages.js';
import upload from '../util/multer.js'; 

export const createImage = async (req, res) => {
  try {
    const { userId } = req;
    const { caption } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    const imageFilename = req.file.filename;

    const newImage = await UsersImages.create({
      user_id: userId,
      image: imageFilename, 
      caption: caption
    });

    res.status(201).json(newImage);
  } catch (error) {
    console.error('Error creating image:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { caption, status } = req.body;

    let imageFilename = null;
    if (req.file) {
      imageFilename = req.file.filename;
    }

    const updatedImage = await UsersImages.update(
      { caption: caption, image: imageFilename, status: status },
      { where: { id: id } }
    );

    if (updatedImage[0] === 1) {
      res.json({ message: 'Image updated successfully' });
    } else {
      res.status(404).json({ message: 'Image not found' });
    }
  } catch (error) {
    console.error('Error updating image:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    await UsersImages.destroy({ where: { id: id } });
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getAllImages = async (req, res) => {
  try {
    const images = await UsersImages.findAll();
    res.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};