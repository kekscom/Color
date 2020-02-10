
const fs = require('fs');
const Terser = require('terser');


//*****************************************************************************

function mkpath (dir) {
  let path = '', stat;
  dir.split('/').forEach(entry => {
    path += entry + '/';
    stat = fs.existsSync(path) ? fs.statSync(path) : null;
    if (!stat || !stat.isDirectory()) {
      fs.mkdirSync(path);
    }
  });
}

//*****************************************************************************

mkpath(`dist`);

fs.writeFileSync(`dist/Qolor.debug.js`, `src/Qolor.js`);
fs.writeFileSync(`dist/Qolor.js`, Terser.minify(`src/Qolor.js`).code);

console.log('done');
