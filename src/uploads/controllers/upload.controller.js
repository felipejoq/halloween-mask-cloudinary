import {handleError} from "../../config/errors/handler.error.js";

export class UploadController {

  constructor(uploadService) {
    this.uploadService = uploadService;
  }

  uploadImage(req, res) {

    this.uploadService.uploadImage({ file: req.body.files[0] })
      .then(data => res.json(data))
      .catch(err => handleError(err, res));
  }

  download(req, res) {
  }

}