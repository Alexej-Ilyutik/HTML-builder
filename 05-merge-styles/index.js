const fs = require('fs');
const path = require('path');
const dist = path.join(__dirname, 'project-dist');
const styles = path.join(__dirname, 'styles');

fs.readdir(styles, { withFileTypes: true }, (err, files) => {
  fs.unlink(dist + '/' + 'bundle.css', function () {});
  if (err) throw err;
  files.forEach((file) => {
    fs.stat(styles + '/' + file.name, (err, stats) => {
      if (stats.isFile() && path.extname(file.name) === '.css') {
        fs.readFile(styles + '/' + file.name, 'utf8', function (error, data) {
          if (error) throw error;

          fs.appendFile(
            path.join(dist, 'bundle.css'),
            data + '\n' + '\n',
            function (error) {
              if (error) throw error;
            }
          );
        });
      }
    });
  });
  console.log('Запись файла "bundle.css" завершена');
});
