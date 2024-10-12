import {Router} from "express";
import {AuthMiddleware} from "../../middlewares/auth.middleware.js";
import {PostImagesController} from "../controllers/post.images.controller.js";
import {PostImagesService} from "../services/post.images.service.js";

export class PostImagesRoutes {
  static get routes() {

    const postImagesRoutes = Router();

    const postImagesService = new PostImagesService();
    const postImagesController = new PostImagesController(postImagesService);

    const {validateJWT} = AuthMiddleware;

    postImagesRoutes.use(validateJWT);

    postImagesRoutes.get('/:public_id', postImagesController.getPostImageByPublicId.bind(postImagesController));

    return postImagesRoutes;
  }
}