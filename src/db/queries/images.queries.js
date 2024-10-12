export const INSERT_POST_IMAGE = `
INSERT INTO post_images (secure_url, public_id, face_masks)
VALUES ($1, $2, $3) RETURNING *
`;

export const GET_POST_IMAGE_BY_PUBLIC_ID = `
SELECT * FROM post_images WHERE public_id = $1
`;