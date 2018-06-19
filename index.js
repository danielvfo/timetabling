const Gene = require('./Inicializacao/Gene');
const DNA = require('./Inicializacao/DNA');

const novoGene = new Gene('./Inputs/');
const todasMaterias = novoGene.getMaterias();
const todasSalas = novoGene.getSalasDeAula();
const todosProfessores = novoGene.getProfessores();
const novoDNA = new DNA(todasMaterias, todasSalas, todosProfessores);

const trioArray = novoDNA.montaTrio();
console.log(trioArray);
