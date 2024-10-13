import {v2 as cloudinary} from 'cloudinary';
import {envsPlugin} from "../../config/plugins/envs.plugin.js";
import {masks} from "../utils/mask.array.js";

const halloweenPrompts = [
  "add a background with a zombie invasion",
  "change the background to a haunted forest",
  "replace the background with a dark and eerie graveyard",
  "set the background to a city destroyed by monsters",
  "transform the background into a haunted house full of ghosts",
  "change the background to a swamp with terrifying creatures",
  "add a background of an abandoned and cursed mansion",
  "replace the background with a giant pumpkin apocalypse",
  "set the background to a full moon over a spooky landscape",
  "change the background to a gothic castle surrounded by fog"
];

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
        effect: `gen_background_replace:prompt_an ${halloweenPrompts[Math.floor(Math.random() * halloweenPrompts.length)]}`,
        transformation: [
          {overlay: mask.public_id},
          {flags: "region_relative", width: mask.width, crop: "scale"},
          {flags: "layer_apply", gravity: "faces"},
          {fetch_format: "auto", quality: "auto"}
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