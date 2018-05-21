let Gene = require('./Inicializacao/Gene');
Gene = new Gene('./Inputs/');

let professores = Gene.getProfessores();
console.log(professores);
const professor = Gene.pegaProfessor(professores);
console.log('-------------------------------------');
console.log(professor);
console.log('-------------------------------------');
professores = Gene.removerElemento(professores, professor);
console.log(professores);
