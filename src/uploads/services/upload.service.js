import {CustomError} from "../../config/errors/custom.error.js";

export class UploadService {

  constructor(cloudinaryService, postImagesService) {
    this.cloudinaryService = cloudinaryService;
    this.postImagesService = postImagesService;
  }

  async uploadImage({
                      file,
                      change_bg = false,
                      masks = [],
                      validExtensions = ['jpg', 'jpeg', 'png'],
                    }) {

    if (!file) {
      return CustomError.badRequest('No se ha enviado ningún archivo');
    }

    const fileExtension = file.mimetype.split('/').at(-1).toLocaleLowerCase() ?? '';

    if (!validExtensions.includes(fileExtension)) {
      throw CustomError
        .badRequest(`Extensión inválida: ${fileExtension}, extensiones válidas: ${validExtensions.join(', ')}`);
    }

    const response = await this.cloudinaryService.uploadImage({file, change_bg, masks});

    return await this.postImagesService.insertPostImage(response);
  }
}