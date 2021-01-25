import multer from 'multer';
import crypto from 'crypto';
import patch from 'path';

export default {
  storage: multer.diskStorage({
    destination: patch.resolve(__dirname, '..', '..', 'temp'),
    filename(Request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const filename = `${fileHash}-${file.originalname}`;

      return callback(null, filename);
    }
  })
}
