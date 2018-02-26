const parse = require('./grammar.js').parse;
const commander = require('commander');
const fs = require('fs');
const codegen = require('./codegen.js');

commander.parse(process.argv);
const fileName = commander.args[0];

const source = fs.readFileSync(fileName, {encoding: 'utf-8'});

console.log("\n======================\n");

const ast = parse(source);
console.log(JSON.stringify(ast, null, 4));

console.log("\n======================\n");

const js = codegen(ast);

console.log(js);

console.log("\n======================\n");
