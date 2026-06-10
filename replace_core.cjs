const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

const dirs = ['./src/app', './src/features', './src/server', './src/shared'];
let files = [];
dirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    files = files.concat(walk(dir));
  }
});

files.forEach(file => {
  if (!file.endsWith('.tsx') && !file.endsWith('.ts')) return;
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('@/core/')) {
    content = content.replace(/@\/core\//g, '@/shared/');
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated imports in: ' + file);
  }
});
