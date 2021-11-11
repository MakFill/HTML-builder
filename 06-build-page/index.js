const path = require('path');
const { mkdir, readdir, copyFile } = require('fs/promises');
const { promisify } = require('util');
const { readFile, writeFile } = require('fs');

const distPath = path.join(__dirname, 'project-dist');
const indexPath = path.join(distPath, 'index.html');
const stylePath = path.join(distPath, 'style.css');
const assetsFolderPath = path.join(distPath, 'assets');
const asyncReadFile = promisify(readFile);

async function buildIndex() {
  await mkdir(distPath, { recursive: true });
  let template = await asyncReadFile(path.join(__dirname, 'template.html'), { encoding: 'utf-8' });
  const files = await readdir(path.join(__dirname, 'components'), { withFileTypes: true });

  for await (let file of files) {
    const fileName = file.name.slice(0, file.name.indexOf('.'));
    const fileContent = await asyncReadFile(path.join(__dirname, 'components', file.name), {
      encoding: 'utf-8',
    });
    template = template.replace(`{{${fileName}}}`, fileContent);
  }

  writeFile(indexPath, template, () => {});
}

buildIndex();

async function buildStyles() {
  const styles = await readdir(path.join(__dirname, 'styles'), { withFileTypes: true });
  writeFile(stylePath, '', { flag: 'w' }, () => {});

  for await (let style of styles) {
    const dataPath = path.join(__dirname, 'styles', style.name);
    if (style.isFile() && path.extname(dataPath) === '.css') {
      const styleData = await asyncReadFile(dataPath, { encoding: 'utf-8' });
      writeFile(stylePath, styleData + '\n', { flag: 'a' }, () => {});
    }
  }
}

buildStyles();

async function copyAssets() {
  await mkdir(assetsFolderPath, { recursive: true });
  const assetFolders = await readdir(path.join(__dirname, 'assets'), { withFileTypes: true });
  for await (let folder of assetFolders) {
    const folderPath = path.join(assetsFolderPath, folder.name);
    await mkdir(folderPath, { recursive: true });
    const assetFiles = await readdir(path.join(__dirname, 'assets', folder.name), {
      withFileTypes: true,
    });
    for await (file of assetFiles) {
      const assetPath = path.join(__dirname, 'assets', folder.name, file.name);
      copyFile(assetPath, path.join(folderPath, file.name));
    }
  }
}

copyAssets();
