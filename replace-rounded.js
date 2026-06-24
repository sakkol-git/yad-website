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
      if (file.endsWith('.tsx') || file.endsWith('.jsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replacements
  // rounded-none -> rounded-sm
  content = content.replace(/\brounded-none\b/g, 'rounded-sm');
  
  // rounded-lg -> rounded-md
  content = content.replace(/\brounded-lg\b/g, 'rounded-md');
  
  // rounded-xl -> rounded-md (some might be avatars, but mostly cards)
  content = content.replace(/\brounded-xl\b/g, 'rounded-md');
  
  // rounded-2xl -> rounded-md
  content = content.replace(/\brounded-2xl\b/g, 'rounded-md');
  
  // rounded-3xl -> rounded-md
  content = content.replace(/\brounded-3xl\b/g, 'rounded-md');
  
  // rounded -> rounded-md (bare rounded class)
  content = content.replace(/\brounded\b/g, 'rounded-md');
  
  // For rounded-full, let's keep it for avatars, but if it's explicitly a button with rounded-full, 
  // maybe we leave it unless the user complains. The guideline says "Icons/Avatars: rounded-full".
  
  fs.writeFileSync(file, content, 'utf8');
});

console.log("Done replacing rounded classes!");
