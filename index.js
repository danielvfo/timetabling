const Gene = require('./Inicializacao/Gene');

const novoGene = new Gene('./Inputs/');

/* let professores = novoGene.getProfessores();
console.log(professores);
const professor = Gene.pegaProfessor(professores);
console.log('-------------------------------------');
console.log(professor);
console.log('-------------------------------------');
professores = Gene.removerElemento(professores, professor);
console.log(professores); */

const materias = novoGene.getMaterias();
const materia = Gene.pegaMateria(materias);
const materiaComplementar = Gene.pegaMateriaComplementar(materia, materias);
console.log(materia);
console.log(materiaComplementar);
