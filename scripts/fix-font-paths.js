import fs from 'fs';
import path from 'path';

const docsDir = './docs';

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Fix font URLs
  content = content.replace(/url\((['"]?)\/__astro_font_generated__/g, 'url($1/astro-apple/__astro_font_generated__');
  // Fix Umami script src
  content = content.replace(/src="\/umami\.is\.js"/g, 'src="/astro-apple/umami.is.js"');
  // Fix favicon/image href and src
  content = content.replace(/(href|src)="\/images\/favicons\//g, '$1="/astro-apple/images/favicons/');
  fs.writeFileSync(filePath, content, 'utf8');
}

function walk(dir) {
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (full.endsWith('.html') || full.endsWith('.css')) fixFile(full);
  }
}

walk(docsDir);