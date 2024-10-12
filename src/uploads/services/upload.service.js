import {CustomError} from "../../config/errors/custom.error.js";

export class UploadService {

  constructor(cloudinaryService) {
    this.cloudinaryService = cloudinaryService;
  }

  async uploadImage({
    file,
    validExtensions = ['jpg', 'jpeg', 'png'],
  }) {

    if(!file) {
      return CustomError.badRequest('No se ha enviado ningún archivo');
    }

    const fileExtension = file.mimetype.split('/').at(-1).toLocaleLowerCase() ?? '';

    if (!validExtensions.includes(fileExtension)) {
      throw CustomError
        .badRequest(`Extensión inválida: ${fileExtension}, extensiones válidas: ${validExtensions.join(', ')}`);
    }

    return await this.cloudinaryService.uploadImage({file});

  }
}