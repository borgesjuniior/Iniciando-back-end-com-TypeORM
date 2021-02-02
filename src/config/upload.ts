import multer from 'multer';
import crypto from 'crypto';
import patch from 'path';

const tmpFolder = patch.resolve(__dirname, '..', '..', 'temp')

export default {
  directory: tmpFolder,

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(Request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const filename = `${fileHash}-${file.originalname}`;

      return callback(null, filename);
    }
  })
}
