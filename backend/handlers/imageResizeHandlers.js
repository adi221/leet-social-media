import sharp from 'sharp';

export const resizeImage = async (base64Image, width, height) => {
  let parts = base64Image.split(';');
  let mimType = parts[0].split(':')[1];
  let imageData = parts[1].split(',')[1];

  const img = Buffer.from(imageData, 'base64');
  let resizedImage = await sharp(img).resize(width, height).toBuffer();
  let resizedImageData = resizedImage.toString('base64');
  let resizedBase64 = `data:${mimType};base64,${resizedImageData}`;

  return resizedBase64;
};
