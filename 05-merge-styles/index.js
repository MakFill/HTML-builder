const path = require('path');
const { readdir } = require('fs/promises');
const { createReadStream, createWriteStream } = require('fs');

const stylesPath = path.join(__dirname, 'styles');
const distPath = path.join(__dirname, 'project-dist', 'bundle.css');

async function mergeStyles() {
  const writeStream = createWriteStream(distPath, { flags: 'w' });
  const files = await readdir(stylesPath, { withFileTypes: true });
  for await (let file of files) {
    const filePath = path.join(stylesPath, file.name);
    if (file.isFile() && path.extname(filePath) === '.css') {
      const readStream = createReadStream(filePath);
      readStream.on('data', (data) => {
        writeStream.write(data);
        writeStream.write('\n');
      });
    }
  }
}

mergeStyles();
