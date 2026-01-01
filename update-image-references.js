/**
 * Update Image References Script
 * Automatically updates .png references to .webp in your code
 * 
 * Usage: node update-image-references.js
 */

const fs = require('fs');
const path = require('path');

// Files to update
const filesToUpdate = [
  'app/page.tsx',
  'app/about/page.tsx',
  'app/projects/page.tsx',
  'app/projects/[slug]/page.tsx',
  'app/blogs/page.tsx',
  'app/blogs/[slug]/page.tsx',
  'app/achievements/page.tsx',
  'components/sidebar.tsx',
];

// Image replacements
const imageReplacements = {
  '/vehan.png': '/vehan.webp',
  '/hero-1.png': '/hero-1.webp',
  '/hero-2.png': '/hero-2.webp',
  '/hero-3.png': '/hero-3.webp',
  '/hero-4.png': '/hero-4.webp',
  '/csne.png': '/csne.webp',
  '/googlio.png': '/googlio.webp',
  '/myblog1.png': '/myblog1.webp',
  '/myblog12.png': '/myblog12.webp',
  'blog3.jpg': 'blog3.webp',
  'Career Essentials in Cybersecurity by Microsoft and LinkedIn.png': 
    'Career Essentials in Cybersecurity by Microsoft and LinkedIn.webp',
  'Career Essentials in GitHub Professional Certificate.png': 
    'Career Essentials in GitHub Professional Certificate.webp',
  'Career Essentials in System Administration by Microsoft and LinkedIn.png': 
    'Career Essentials in System Administration by Microsoft and LinkedIn.webp',
};

function updateFile(filePath) {
  const fullPath = path.join(__dirname, filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⏭️  Skipped: ${filePath} (not found)`);
    return { updated: false, changes: 0 };
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  let changeCount = 0;
  
  for (const [oldPath, newPath] of Object.entries(imageReplacements)) {
    const regex = new RegExp(oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    const matches = content.match(regex);
    if (matches) {
      content = content.replace(regex, newPath);
      changeCount += matches.length;
    }
  }
  
  if (changeCount > 0) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Updated: ${filePath} (${changeCount} changes)`);
    return { updated: true, changes: changeCount };
  } else {
    console.log(`⏭️  No changes: ${filePath}`);
    return { updated: false, changes: 0 };
  }
}

function updateImageReferences() {
  console.log('🔄 Updating image references from PNG to WebP...\n');
  
  let totalUpdated = 0;
  let totalChanges = 0;
  
  for (const file of filesToUpdate) {
    const result = updateFile(file);
    if (result.updated) {
      totalUpdated++;
      totalChanges += result.changes;
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 UPDATE SUMMARY:');
  console.log('='.repeat(50));
  console.log(`✅ Files updated: ${totalUpdated}`);
  console.log(`🔄 Total changes: ${totalChanges}`);
  console.log('='.repeat(50));
  
  if (totalUpdated > 0) {
    console.log('\n🎉 SUCCESS! Image references updated!');
    console.log('\n📝 NEXT STEPS:');
    console.log('1. Test locally: npm run dev');
    console.log('2. Check that all images load correctly');
    console.log('3. Commit changes: git add . && git commit -m "feat: optimize images to WebP"');
    console.log('4. Push to GitHub: git push origin main');
  }
}

updateImageReferences();

