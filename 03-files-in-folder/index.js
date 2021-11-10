const { readdir } = require('fs/promises');
const { stat } = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

readdir(folderPath, { withFileTypes: true }).then((res) => {
  res
    .filter((item) => item.isFile())
    .forEach((elem) =>
      stat(path.join(folderPath, elem.name), (err, stats) => {
        const fileName = elem.name.slice(0, elem.name.indexOf('.'));
        const fileExt = path.extname(elem.name).slice(1);
        console.log(`${fileName}-${fileExt}-${stats.size}`);
      })
    );
});
