const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');
const folder = path.join(__dirname, 'files');
const copyFolder = path.join(__dirname, 'files-copy');

async function copyDir(from, to) {
  const entries = await fsp.readdir(from, { withFileTypes: true });
  await fsp.mkdir(to, { recursive: true });
  for (let entry of entries) {
    const fromPath = path.join(from, entry.name);
    const toPath = path.join(to, entry.name);
    if (entry.isDirectory()) {
      await copyDir(fromPath, toPath);
    } else {
      await fsp.copyFile(fromPath, toPath);
    }
  }
}

fs.access(copyFolder, function (error) {
  if (error) {
    copyDir(folder, copyFolder);
    console.log('Папка: "files" успешно cкопирована!');
  } else {
    fs.rm(copyFolder, { recursive: true }, function (err) {
      if (err) throw err;
      copyDir(folder, copyFolder);
      console.log('Папка: "files" успешно cкопирована!');
    });
  }
});
