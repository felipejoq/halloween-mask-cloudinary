import sharp from 'sharp';

export class ProcessImagesService {

  async getMetaData({file}){
    return await sharp(file.tempFilePath).metadata();
  }

  async finalImage({file}){
    const metadata = await this.getMetaData({file});

    if(metadata.width > 1500 || metadata.height > 1500){
      // resize max 1500px width or height, keeping the aspect ratio
      return sharp(file.tempFilePath)
        .resize(1500, 1500, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .toBuffer();
    } else {
      return file.data;
    }
  }

}