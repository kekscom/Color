
const fs = require('fs');
const Terser = require('terser');


//*****************************************************************************

const jsSrc = [
  'src/Qolor.js'
];

//*****************************************************************************

function joinFiles (files) {
  if (!files.push) {
    files = [files];
  }
  return files.map(file => fs.readFileSync(`${__dirname}/${file}`)).join('\n');
}

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

function rmdir (dir) {
  if (!fs.existsSync(dir)) {
    return;
  }

  fs.readdirSync(dir).forEach(entry => {
    const path = `${dir}/${entry}`;
    const stat = fs.statSync(path);
    if (stat.isDirectory()) {
      rmdir(path);
      fs.unlinkSync(path);
    }
    fs.unlinkSync(path);
  });
}

function cpdir (srcDir, dstDir) {
  if (!fs.existsSync(dstDir)) {
    mkpath(dstDir);
  }

  // console.log(srcDir, dstDir);
  fs.readdirSync(srcDir).forEach(entry => {
    const srcPath = `${srcDir}/${entry}`;
    const dstPath = `${dstDir}/${entry}`;
    const stat = fs.statSync(srcPath);
    if (stat.isDirectory()) {
      cpdir(srcPath, dstPath);
    } else {
      fs.writeFileSync(dstPath, joinFiles(srcPath));
    }
  });
}

//*****************************************************************************

// rmdir(`dist`);

mkpath(`dist`);

const joinedJsSrc = joinFiles(jsSrc);
fs.writeFileSync(`dist/Qolor.debug.js`, joinedJsSrc);

const minifiedJs = Terser.minify(joinedJsSrc);
fs.writeFileSync(`dist/Qolor.js`, minifiedJs.code);

console.log('done');
