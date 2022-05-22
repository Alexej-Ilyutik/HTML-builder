const fs = require('fs');
const path = require('path');
const folder = path.join(__dirname, 'secret-folder');

fs.readdir(folder, { withFileTypes: true }, (err, data) => {
  if (err) throw err;
  data.forEach((file) => {
    fs.stat(folder + '/' + file.name, (err, stats) => {
      if (err) throw err;
      if (stats.isFile()) {
        console.log(
          file.name.split('.')[0] +
            ' - ' +
            file.name.split('.')[1] +
            ' - ' +
            stats.size / 1000 +
            ' kb'
        );
      }
    });
  });
});
