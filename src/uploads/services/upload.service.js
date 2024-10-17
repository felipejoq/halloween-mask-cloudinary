import {CustomError} from "../../config/errors/custom.error.js";
import fs from "node:fs/promises";

export class UploadService {

  constructor(cloudinaryService, postImagesService, processImagesService) {
    this.cloudinaryService = cloudinaryService;
    this.postImagesService = postImagesService;
    this.processImagesService = processImagesService;
  }

  async uploadImage({
                      file,
                      change_bg = false,
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

    file.data = await this.processImagesService.finalImage({file});

    // write file to temp directory
    await fs.writeFile(file.tempFilePath, file.data);

    const response = await this.cloudinaryService.uploadImage({file, change_bg});

    // clean temp file
    await fs.unlink(file.tempFilePath);

    return await this.postImagesService.insertPostImage(response);
  }
}