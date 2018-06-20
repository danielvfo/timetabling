const Gene = require('./Inicializacao/Gene');
const DNA = require('./Inicializacao/DNA');

const novoGene = new Gene('./Inputs/');
const todasMaterias = novoGene.getMaterias();
const todasSalas = novoGene.getSalasDeAula();
const todosProfessores = novoGene.getProfessores();
const novoDNA = new DNA(todasMaterias, todasSalas, todosProfessores);

const dna = novoDNA.montaDNA();
console.log(dna);
console.log(novoDNA.todasMaterias);
