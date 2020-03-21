
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

const js = fs.readFileSync(`src/Qolor.js`).toString();

fs.writeFileSync(`dist/Qolor.debug.js`, js);
fs.writeFileSync(`dist/Qolor.js`, Terser.minify(js).code);

console.log('done');
