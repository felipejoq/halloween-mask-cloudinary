import {handleError} from "../../config/errors/handler.error.js";

export class UploadController {

  constructor(uploadService) {
    this.uploadService = uploadService;
  }

  uploadImage(req, res) {

    const file = req.body.files[0];
    const change_bg = Boolean(req.body.change_bg);
    const masks = req.body.masks;

    this.uploadService.uploadImage({ file, change_bg, masks })
      .then(data => res.json(data))
      .catch(err => handleError(err, res));
  }

}