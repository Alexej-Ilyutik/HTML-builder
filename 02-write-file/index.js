const fs = require('fs');
const readline = require('readline');
const { stdout } = process;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const list = fs.createWriteStream(__dirname + '/newFile.txt');

stdout.write('Введите текст:\n');

rl.on('line', (input) => {
  if (input.toString().toLowerCase().trim() == 'exit') {
    process.exit();
  }
  list.write(input + '\n');
  console.log(`Вы ввели: ${input} \n`);
  console.log(
    'Введите следующий текст. Либо нажмите ctrl+C или введите:"Exit", чтобы выйти.'
  );
});

process.on('exit', () => stdout.write('Успехов в учебе!'));

