const Gene = require('./Inicializacao/Gene');

const novoGene = new Gene('./Inputs/');

const todasMaterias = novoGene.getMaterias();
const materiaEscolhida = Gene.pegaMateria(todasMaterias);
/* const materiaComplementar = Gene.pegaMateriaComplementar(materiaEscolhida, todasMaterias);
console.log(materiaEscolhida);

const salasDeAula = novoGene.getSalasDeAula();
const salasDeAulaReduzidas = Gene.reduzirSalasDeAula(salasDeAula);

let salasCompativeis =
  Object.keys(salasDeAulaReduzidas).map(key =>
    Gene.pegaSalasDeAula(salasDeAulaReduzidas[key], materiaEscolhida, []));
salasCompativeis = salasCompativeis.filter(detalhesSala => detalhesSala.length > 0);
console.log(salasCompativeis);

let salasComplementares;
if (materiaComplementar) {
  salasComplementares =
    Object.keys(salasDeAulaReduzidas).map(key =>
      Gene.pegaSalasDeAula(salasDeAulaReduzidas[key], materiaComplementar, []));
  salasComplementares = salasComplementares.filter(detalhesSala => detalhesSala.length > 0);
}
console.log(materiaComplementar);
console.log(salasComplementares); */

const professores = novoGene.getProfessores();
const pp = Gene.pegaProfessor(professores, materiaEscolhida);
console.log(materiaEscolhida);
console.log(pp);
