import {query} from "../../db/db.config.js";
import {GET_POST_IMAGE_BY_PUBLIC_ID, INSERT_POST_IMAGE} from "../../db/queries/images.queries.js";

export class PostImagesService {
  constructor() {}

  async insertPostImage({secure_url, public_id, face_masks}) {
    const finalPublicId = public_id.split('/').at(-1);
    const result = await query(INSERT_POST_IMAGE, [secure_url, finalPublicId, face_masks]);
    return result?.rows[0];
  }

  async getPostImageByPublicId({public_id}) {
    const result = await query(GET_POST_IMAGE_BY_PUBLIC_ID, [public_id]);
    return result?.rows[0];
  }
}