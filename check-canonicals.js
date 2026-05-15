'use strict';
const fs = require('fs');

function checkCanonical(file) {
  const html = fs.readFileSync(file, 'utf8');
  const match = html.match(/rel="canonical" href="([^"]+)"/);
  return match ? match[1] : 'MISSING';
}

const files = [
  ['dist/index.html', 'homepage'],
  ['dist/about.html', 'about'],
  ['dist/contact.html', 'contact'],
  ['dist/exterior-painting/index.html', 'exterior-painting'],
  ['dist/commercial-painting/index.html', 'commercial-painting'],
  ['dist/areas-served/index.html', 'areas-served'],
  ['dist/areas-served/timnath-co/index.html', 'areas-served/timnath-co'],
  ['dist/services/index.html', 'services'],
  ['dist/gallery/index.html', 'gallery'],
  ['dist/hoa-painting/index.html', 'hoa-painting'],
  ['dist/fence-staining/index.html', 'fence-staining'],
];

files.forEach(function(pair) {
  var f = pair[0], name = pair[1];
  try {
    console.log(name + ': ' + checkCanonical(f));
  } catch(e) {
    console.log(name + ': FILE NOT FOUND');
  }
});
