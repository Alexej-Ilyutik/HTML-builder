// const fs = require('fs');
// const path = require('path');
// const folder = path.join(__dirname, 'secret-folder');

// fs.readdir(folder, { withFileTypes: true }, (err, data) => {
//   if (err) throw err;
//   data.forEach((file) => {
//     fs.stat(folder + '/' + file.name, (err, stats) => {
//       if (err) throw err;
//       if (stats.isFile()) {
//         console.log(
//           file.name.split('.')[0] +
//             ' - ' +
//             file.name.split('.')[1] +
//             ' - ' +
//             stats.size / 1000 +
//             ' kb'
//         );
//       }
//     });
//   });
// });

// Solution Example without callback:

const { readdir, stat } = require('fs/promises');
const path = require('path');
const pathToFolder = path.join(__dirname, 'secret-folder');

const getBaseName = (pathToFile, ext) => {
  return path.basename(pathToFile, ext);
};

const getExtension = (pathToFile) => {
  const extension = path.extname(pathToFile);
  return extension.slice(1);
};

const getSize = (itemStats) => {
  return itemStats.size;
};

const readDirectory = async () => {
  try {
    const folderContent = await readdir(pathToFolder);
    folderContent.forEach(async (item) => {
      const pathToFile = path.join(pathToFolder, item);
      const itemStats = await stat(pathToFile);
      if (itemStats.isFile()) {
        const ext = path.extname(pathToFile);
        const baseName = getBaseName(pathToFile, ext);
        const extension = getExtension(pathToFile);
        const fileSize = getSize(itemStats);
        const output = `${baseName} - ${extension} - ${fileSize}b`;
        console.log(output);
      }
    });
  } catch (err) {
    if (err) throw err;
  }
};

readDirectory();
