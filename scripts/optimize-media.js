import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const sourceDir = fs.existsSync('media-originals') ? 'media-originals' : 'public';
const targetDir = 'public';

async function optimizeImages() {
  console.log('🚀 Starting image optimization from:', sourceDir);

  const files = fs.readdirSync(sourceDir).filter(f => 
    (f.startsWith('dphoto_') || f.startsWith('weather') || f.startsWith('myphoto2')) && 
    (f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png')) &&
    !f.includes('_thumb')
  );

  for (const file of files) {
    const ext = path.extname(file);
    const baseName = path.basename(file, ext);
    const inputPath = path.join(sourceDir, file);

    const originalSize = fs.statSync(inputPath).size;
    console.log(`\nProcessing ${file} (${(originalSize / 1024 / 1024).toFixed(2)} MB)...`);

    // 1. High-Resolution Web-Optimized JPEG (2048px max dimension, progressive, mozjpeg)
    const optimizedJpgPath = path.join(targetDir, `${baseName}.jpg`);
    await sharp(inputPath)
      .rotate() // automatically apply orientation from EXIF
      .resize({ width: 2048, height: 2048, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 83, progressive: true, mozjpeg: true })
      .toFile(optimizedJpgPath + '.tmp');
    
    fs.renameSync(optimizedJpgPath + '.tmp', optimizedJpgPath);
    const jpgSize = fs.statSync(optimizedJpgPath).size;

    // 2. Modern WebP version (2048px max dimension)
    const webpPath = path.join(targetDir, `${baseName}.webp`);
    await sharp(inputPath)
      .rotate()
      .resize({ width: 2048, height: 2048, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82, effort: 4 })
      .toFile(webpPath);
    const webpSize = fs.statSync(webpPath).size;

    // 3. Compact WebP Thumbnail (360x240, cover fit, ideal for strip & cards)
    const thumbWebpPath = path.join(targetDir, `${baseName}_thumb.webp`);
    await sharp(inputPath)
      .rotate()
      .resize({ width: 360, height: 240, fit: 'cover' })
      .webp({ quality: 78, effort: 4 })
      .toFile(thumbWebpPath);
    const thumbSize = fs.statSync(thumbWebpPath).size;

    // 4. Compact JPEG Thumbnail as fallback
    const thumbJpgPath = path.join(targetDir, `${baseName}_thumb.jpg`);
    await sharp(inputPath)
      .rotate()
      .resize({ width: 360, height: 240, fit: 'cover' })
      .jpeg({ quality: 80, progressive: true })
      .toFile(thumbJpgPath);

    console.log(`  ✓ Optimized JPEG: ${(jpgSize / 1024).toFixed(1)} KB (-${((1 - jpgSize / originalSize) * 100).toFixed(1)}%)`);
    console.log(`  ✓ Modern WebP:    ${(webpSize / 1024).toFixed(1)} KB (-${((1 - webpSize / originalSize) * 100).toFixed(1)}%)`);
    console.log(`  ✓ WebP Thumbnail: ${(thumbSize / 1024).toFixed(1)} KB (-${((1 - thumbSize / originalSize) * 100).toFixed(1)}%)`);
  }

  // Create video posters from relevant build photos if not present
  const videoPosterMappings = [
    { video: 'dvideo_1', sourceImage: 'dphoto_1.jpg' },
    { video: 'dvideo_2', sourceImage: 'dphoto_7.jpg' },
    { video: 'dvideo_3', sourceImage: 'dphoto_9.jpg' }
  ];

  for (const mapping of videoPosterMappings) {
    const posterPath = path.join(targetDir, `${mapping.video}_poster.webp`);
    const posterJpgPath = path.join(targetDir, `${mapping.video}_poster.jpg`);
    const srcPath = path.join(sourceDir, mapping.sourceImage);

    if (fs.existsSync(srcPath)) {
      await sharp(srcPath)
        .rotate()
        .resize({ width: 1280, height: 720, fit: 'cover' })
        .webp({ quality: 80 })
        .toFile(posterPath);

      await sharp(srcPath)
        .rotate()
        .resize({ width: 1280, height: 720, fit: 'cover' })
        .jpeg({ quality: 80, progressive: true })
        .toFile(posterJpgPath);

      console.log(`  ✓ Generated video poster for ${mapping.video}`);
    }
  }

  console.log('\n✨ Image and media optimization completed successfully!');
}

optimizeImages().catch(err => {
  console.error('Error optimizing images:', err);
  process.exit(1);
});
