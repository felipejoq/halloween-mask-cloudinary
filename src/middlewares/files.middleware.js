export class FilesMiddleware {
  static containFiles(req, res, next) {

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: 'No files were selected' });
    }

    if (!Array.isArray(req.files.file)) {
      req.body.files = [req.files.file];
    } else {
      req.body.files = req.files.file;
    }

    next();
  }
}