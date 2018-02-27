const codegen = (ast) => {
  let js = "";
  ast.forEach((node) => {
    js += genNode(node);
  });
  return js;
};

const operators = {
  '~=': '!==',
  '==': '===',
  '<=': '<=',
  '>=': '>=',
  '>': '>',
  '<': '<',
};

const genCommaSeparatedSeq = (seq) => {
  return seq.map((node) => genNode(node)).join(', ');
};

const rules = {
  number: (node) => `${node.value}`,
  identifier: (node) => `${node.name}`,
  declaration: (node) => `let ${node.identifier} = ${genNode(node.value)};\n`,
  if: (node) => `if (${genNode(node.condition)}) {\n${codegen(node.body)}}\n`,
  comparison: (node) => `${genNode(node.left)} ${operators[node.operator]} ${genNode(node.right)}`,
  while: (node) => `while (${genNode(node.condition)}) {\n${codegen(node.body)}}\n`,
  assignment: (node) => `${node.identifier} = ${genNode(node.value)}\n`,
  math: (node) => `${genNode(node.left)} ${node.operator} ${genNode(node.right)}`,
  function: (node) => `function ${node.name}(${genCommaSeparatedSeq(node.arguments)}) {\n${codegen(node.body)}\n}\n`,
  return: (node) => `return ${genNode(node.value)}`,
};

const genNode = (node) => {
  const rule = rules[node.type];
  if (!rule) throw new Error(`Unknown node type: ${JSON.stringify(node)}`);
  return rule(node);
};

module.exports = codegen;
