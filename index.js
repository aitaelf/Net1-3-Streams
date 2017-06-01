const fs = require('fs');
const input = fs.createReadStream('data.txt');
const output = fs.createWriteStream('result.txt');
const transform = require('stream').Transform;
const crypto = require('crypto');
const hash = crypto.createHash('md5');
const hash2 = crypto.createHash('md5');

class CTransform extends transform {
	constructor(options){
		super(options);
	}
	_transform(chunk, encoding, done) {
		hash2.update(chunk);
		done(null);
	}
	_flush(done) {
		let result = hash2.digest('hex');
		done(null, result);
	}
}

const t1 = new CTransform();

input
	.pipe(t1)
	.pipe(output);
input
	.pipe(t1)
	.pipe(process.stdout);

input
	.pipe(hash)
	.pipe(output);
input
	.pipe(hash)
	.pipe(process.stdout);