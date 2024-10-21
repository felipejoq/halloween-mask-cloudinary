import {v2 as cloudinary} from 'cloudinary';
import {envsPlugin} from "../../config/plugins/envs.plugin.js";
import {masks} from "../utils/mask.array.js";
import {halloweenPrompts} from "../utils/halloween.prompts.js";

export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: envsPlugin.CLOUDINARY_CLOUD_NAME,
      api_key: envsPlugin.CLOUDINARY_API_KEY,
      api_secret: envsPlugin.CLOUDINARY_API_SECRET
    });
  }

  getMaskImages({public_id, change_bg}) {
    // take 2 random masks for optimization purposes
    // const randomMasks = masks.sort(() => Math.random() - Math.random()).slice(0, 2);

    return masks.map(mask => {

      const changeBackgroundPrompt = `gen_background_replace:prompt_an ${halloweenPrompts[Math.floor(Math.random() * halloweenPrompts.length)]}`;

      const config = {
        transformation: [
          {overlay: mask.public_id},
          {flags: "region_relative", width: mask.width, crop: "scale"},
          {flags: "layer_apply", gravity: "faces"},
          {fetch_format: "auto", quality: "auto"}
        ]
      }

      if (change_bg) {
        config.effect = changeBackgroundPrompt;
      }

      const faceImg = cloudinary.image(public_id, config);
      return faceImg.match(/<img[^>]+src=['"]([^'"]+)['"]/)?.[1]
    });
  }

  async uploadImage({file, change_bg}) {
    const {secure_url, public_id} = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: 'halloween-hackathon',
    });

    return {
      secure_url,
      public_id,
      face_masks: this.getMaskImages({public_id, change_bg}),
    }
  }
}