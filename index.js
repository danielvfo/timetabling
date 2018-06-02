const Gene = require('./Inicializacao/Gene');

const instanceofGene = new Gene('./Inputs/');

let professores = instanceofGene.getProfessores();
console.log(professores);
const professor = Gene.pegaProfessor(professores);
console.log('-------------------------------------');
console.log(professor);
console.log('-------------------------------------');
professores = Gene.removerElemento(professores, professor);
console.log(professores);
