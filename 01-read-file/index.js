const { createReadStream } = require('fs');
const path = require('path');

const readStream = createReadStream(path.join(__dirname, 'text.txt'));
readStream.on('data', (data) => {
  process.stdout.write(data);
});
