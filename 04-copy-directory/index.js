const path = require('path');
const { mkdir, copyFile, readdir, unlink } = require('fs/promises');

const filesPath = path.join(__dirname, 'files');
const filesCopyPath = path.join(__dirname, 'files-copy');

function copyDir() {
  mkdir(filesCopyPath, { recursive: true })
    .then(() => readdir(filesCopyPath, { withFileTypes: true }))
    .then(async (res) => {
      for await (let file of res) {
        await unlink(path.join(filesCopyPath, file.name));
      }
    })
    .then(() => readdir(filesPath, { withFileTypes: true }))
    .then((res) =>
      res.forEach((item) => {
        copyFile(path.join(filesPath, item.name), path.join(filesCopyPath, item.name));
      })
    );
}

copyDir();
