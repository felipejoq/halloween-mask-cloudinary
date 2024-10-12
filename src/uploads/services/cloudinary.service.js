import {v2 as cloudinary} from 'cloudinary';
import {envsPlugin} from "../../config/plugins/envs.plugin.js";
import {masks} from "../utils/mask.array.js";

export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: envsPlugin.CLOUDINARY_CLOUD_NAME,
      api_key: envsPlugin.CLOUDINARY_API_KEY,
      api_secret: envsPlugin.CLOUDINARY_API_SECRET
    });
  }

  getMaskImages({public_id}) {
    return masks.map(mask => {
      const faceImg = cloudinary.image(public_id, {
        transformation: [
          {overlay: mask.public_id},
          {flags: "region_relative", width: mask.width, crop: "scale"},
          {flags: "layer_apply", gravity: "faces"}
        ]
      });
      return faceImg.match(/<img[^>]+src=['"]([^'"]+)['"]/)?.[1]
    });
  }

  async uploadImage({file}) {
    const {secure_url, public_id} = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: 'halloween-hackathon',
    });

    return {
      secure_url,
      public_id,
      face_masks: this.getMaskImages({public_id}),
    }
  }
}