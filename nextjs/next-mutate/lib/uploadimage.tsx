import { S3 } from '@aws-sdk/client-s3';

export async function uploadImage(image) {
  const imageData = await image.arrayBuffer();
  const mime = image.type;
  const fileName = `${image.name}.${mime}`;

  const s3 = new S3({
    region: 'ap-northeast-1'
  });

  s3.putObject({
    Bucket: 'next-image-furqon',
    Key: fileName,
    Body: Buffer.from(imageData),
    ContentType: image.type,
  });

  const result = `https://next-image-furqon.s3.ap-northeast-1.amazonaws.com/${fileName}`;

  return result;
}