import multer from 'multer';
import path from 'path';

const configureMulter = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const currentDateTime = new Date().toISOString().replace(/:/g, '-').replace(/\./g, '-');
      const filename = `${currentDateTime}_${file.originalname}${ext}`;
      cb(null, filename);
    }
  });

  return multer({ storage: storage });
};

export default configureMulter;
