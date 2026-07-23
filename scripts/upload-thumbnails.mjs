import cloudinary from 'cloudinary';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const env = readFileSync(resolve(root, '.env.local'), 'utf-8');
const get = (k) => env.match(new RegExp(`^${k}=(.+)`, 'm'))?.[1];

cloudinary.v2.config({
  cloud_name: get('CLOUDINARY_CLOUD_NAME'),
  api_key: get('CLOUDINARY_API_KEY'),
  api_secret: get('CLOUDINARY_API_SECRET'),
});

const files = [
  ['scripts/automation-workflow.svg', 'lifistudio/blog/automation-workflow'],
  ['scripts/wordpress-rest-api.svg', 'lifistudio/blog/wordpress-rest-api'],
];

for (const [filepath, publicId] of files) {
  const result = await cloudinary.v2.uploader.upload(resolve(root, filepath), {
    public_id: publicId,
    resource_type: 'image',
    overwrite: true,
  });
  console.log(`${publicId}: ${result.secure_url}`);
}
