const path = require('path');
const { mkdir, copyFile, readdir } = require('fs/promises');

const filesPath = path.join(__dirname, 'files');
const filesCopyPath = path.join(__dirname, 'files-copy');

function copyFolder() {
  mkdir(filesCopyPath, { recursive: true })
    .then(() => readdir(filesPath, { withFileTypes: true }))
    .then((res) =>
      res.forEach((item) => {
        copyFile(path.join(filesPath, item.name), path.join(filesCopyPath, item.name));
      })
    );
}

copyFolder();
