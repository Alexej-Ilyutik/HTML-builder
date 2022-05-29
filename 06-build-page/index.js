const fsp = require('fs/promises');
const path = require('path');

const projectFolder = path.join(__dirname, 'project-dist');
const componentsPath = path.join(__dirname, 'components');
const templatePath = path.join(__dirname, 'template.html');
const stylesPath = path.join(__dirname, 'styles');
const assets = path.join(__dirname, 'assets');
const copyAssets = path.join(projectFolder, 'assets');

async function createProjectFolder(nameDir) {
  await fsp.mkdir(nameDir);
}

async function createHTML() {
  const components = (
    await fsp.readdir(componentsPath, {
      withFileTypes: true,
    })
  )
    .filter((file) => file.isFile() && path.extname(file.name) === '.html')
    .map((file) => file.name);

  let template = await fsp.readFile(templatePath, 'utf-8');

  for (const component of components) {
    const re = new RegExp(`{{${component.replace(/\.[^/.]+$/, '')}}}`, 'g');
    const file = await fsp.readFile(
      path.join(componentsPath, component),
      'utf-8'
    );
    template = template.replace(re, file);
  }

  await fsp.writeFile(
    path.join(projectFolder, 'index.html'),
    template,
    'utf-8'
  );
}

async function createStyle() {
  const styles = (await fsp.readdir(stylesPath, { withFileTypes: true }))
    .filter((file) => file.isFile() && path.extname(file.name) === '.css')
    .map((file) => file.name);

  for (const style of styles) {
    const file = await fsp.readFile(path.join(stylesPath, style), 'utf-8');
    await fsp.appendFile(path.join(projectFolder, 'style.css'), file + '\n');
  }
}

async function copyDir(from, to) {
  const entries = await fsp.readdir(from, { withFileTypes: true });
  await fsp.mkdir(to, { recursive: true });
  for (let entry of entries) {
    const fromPath = path.join(from, entry.name);
    const toPath = path.join(to, entry.name);
    if (entry.isDirectory()) {
      await copyDir(fromPath, toPath);
    } else {
      await fsp.copyFile(fromPath, toPath);
    }
  }
}

async function createProject() {
  await fsp.rm(projectFolder, { recursive: true, force: true });
  createProjectFolder(projectFolder);
  createHTML();
  createStyle();
  copyDir(assets, copyAssets);
}

createProject();

