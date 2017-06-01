const fs = require('fs');
const input = fs.createReadStream('data.txt');
const output = fs.createWriteStream('result.txt');
const crypto = require('crypto');
const hash = crypto.createHash('md5');

input.pipe(hash).pipe(process.stdout); // в консоль
input.pipe(hash).pipe(output); // в файл