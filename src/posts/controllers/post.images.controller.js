import {handleError} from "../../config/errors/handler.error.js";

export class PostImagesController {
  constructor(postImagesService){
    this.postImagesService = postImagesService;
  }

  getPostImageByPublicId(req, res) {
    const {public_id} = req.params;

    this.postImagesService.getPostImageByPublicId({public_id})
      .then(data => res.json(data))
      .catch(err => handleError(err, res));
  }
}