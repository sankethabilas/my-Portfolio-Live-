/**
 * Image Optimization Script
 * Converts PNG images to WebP format for better performance
 * 
 * Usage: node optimize-images.js
 */

const fs = require('fs');
const path = require('path');

// Simple image optimization using Canvas API (built into Node.js 18+)
async function convertToWebP(inputPath, outputPath) {
  console.log(`Converting: ${inputPath}...`);
  
  try {
    // Check if sharp is available (optional dependency)
    let sharp;
    try {
      sharp = require('sharp');
    } catch (err) {
      console.log('⚠️  Sharp not installed. Installing now...');
      console.log('Run: npm install sharp --save-dev');
      return false;
    }

    const stats = fs.statSync(inputPath);
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
    
    await sharp(inputPath)
      .webp({ quality: 85 })
      .toFile(outputPath);
    
    const newStats = fs.statSync(outputPath);
    const newSizeMB = (newStats.size / 1024 / 1024).toFixed(2);
    const savings = ((1 - newStats.size / stats.size) * 100).toFixed(1);
    
    console.log(`✅ Saved: ${sizeMB}MB → ${newSizeMB}MB (${savings}% smaller)`);
    return true;
  } catch (error) {
    console.error(`❌ Error converting ${inputPath}:`, error.message);
    return false;
  }
}

async function optimizeImages() {
  console.log('🚀 Starting image optimization...\n');
  
  const publicDir = path.join(__dirname, 'public');
  
  // Priority images to convert
  const imagesToConvert = [
    'vehan.png',
    'hero-1.png',
    'hero-2.png', 
    'hero-3.png',
    'hero-4.png',
    'csne.png',
    'googlio.png',
    'myblog1.png',
    'myblog12.png',
    'blog3.jpg',
    'Career Essentials in Cybersecurity by Microsoft and LinkedIn.png',
    'Career Essentials in GitHub Professional Certificate.png',
    'Career Essentials in System Administration by Microsoft and LinkedIn.png',
  ];
  
  let converted = 0;
  let failed = 0;
  let skipped = 0;
  
  for (const image of imagesToConvert) {
    const inputPath = path.join(publicDir, image);
    
    if (!fs.existsSync(inputPath)) {
      console.log(`⏭️  Skipped: ${image} (not found)`);
      skipped++;
      continue;
    }
    
    const ext = path.extname(image);
    const nameWithoutExt = path.basename(image, ext);
    const outputPath = path.join(publicDir, `${nameWithoutExt}.webp`);
    
    // Skip if WebP already exists and is newer
    if (fs.existsSync(outputPath)) {
      const inputTime = fs.statSync(inputPath).mtime;
      const outputTime = fs.statSync(outputPath).mtime;
      if (outputTime > inputTime) {
        console.log(`⏭️  Skipped: ${image} (WebP already exists)`);
        skipped++;
        continue;
      }
    }
    
    const success = await convertToWebP(inputPath, outputPath);
    if (success) {
      converted++;
    } else {
      failed++;
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 OPTIMIZATION SUMMARY:');
  console.log('='.repeat(50));
  console.log(`✅ Converted: ${converted} images`);
  console.log(`⏭️  Skipped: ${skipped} images`);
  console.log(`❌ Failed: ${failed} images`);
  console.log('='.repeat(50));
  
  if (converted > 0) {
    console.log('\n🎉 SUCCESS! Your images are optimized!');
    console.log('\n📝 NEXT STEPS:');
    console.log('1. Update image references in your code from .png to .webp');
    console.log('2. Test locally: npm run dev');
    console.log('3. Push to GitHub: git add . && git commit -m "optimize images"');
    console.log('4. Netlify will auto-deploy');
    console.log('5. Re-test PageSpeed: https://pagespeed.web.dev/');
  }
}

// Run the optimization
optimizeImages().catch(console.error);

