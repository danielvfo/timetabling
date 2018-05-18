const DNA = require('./Inicializacao/DNA');

const salasDeAula = DNA.getSalasDeAula('./Inputs/salas.csv');
const professores = DNA.getProfessores('./Inputs/professores.csv');
const materias = DNA.getMaterias('./Inputs/materias.csv');
console.log(professores);
