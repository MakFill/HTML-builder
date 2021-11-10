const { createWriteStream } = require('fs');
const { stdin, stdout, exit } = require('process');
const readline = require('readline');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');

const writeStream = createWriteStream(filePath, { flag: 'a' });
console.log('Enter message');
const rl = readline.createInterface(stdin);
rl.on('line', (data) => {
  if (data.toString() === 'exit') {
    rl.emit('close');
  } else {
    writeStream.write(data + '\n');
  }
});
rl.on('close', () => {
  stdout.write('Exit');
  exit();
});
process.on('SIGINT', () => {
  stdout.write('Exit');
  exit();
});
