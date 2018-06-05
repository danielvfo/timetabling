const FileLoader = require('./FileLoader');
const shuffle = require('shuffle-array');

const SALAS = 'salas';
const PROFESSORES = 'professores';
const MATERIAS = 'materias';

module.exports = class Gene {
  constructor(location) {
    this.salas =
      FileLoader.readInput(`${location + SALAS}.csv`, SALAS);
    this.professores =
      FileLoader.readInput(`${location + PROFESSORES}.csv`, PROFESSORES);
    this.materias =
      FileLoader.readInput(`${location + MATERIAS}.csv`, MATERIAS);
  }

  getSalasDeAula() {
    return shuffle(this.salas);
  }

  getProfessores() {
    return shuffle(this.professores);
  }

  getMaterias() {
    return shuffle(this.materias);
  }

  // Verificar quantidade de créditos

  // Remove um elemento especifico de um array
  static removerElemento(array, elemento) {
    const indice = array.indexOf(elemento);
    if (indice > -1) {
      array.splice(indice, 1);
    }
    return array;
  }

  // Pega a primeira materia do array de materias
  static pegaMateria(materias) {
    const materiaEscolhida = materias.filter((materia, index) => index === 0);
    return materiaEscolhida.pop();
  }

  static pegaMateriaComplementar(materia, materias) {
    const materiaComplementar = materias.filter(item =>
      item.materia === materia.materia && item.curso === materia.curso &&
      item.semestre === materia.semestre && item.id !== materia.id);
    return materiaComplementar.pop();
  }

  // Retorna um objeto no formato: {Sala1: [M1, M2, ...], Sala2: [T1, T2, ...]}
  static reduzirSalasDeAula(salasDeAula) {
    const salasDeAulaReduzidas = salasDeAula.reduce((salasJanela, sala) => {
      if (sala.sala in salasJanela) {
        salasJanela[sala.sala].push(sala.janela);
      } else {
        salasJanela[sala.sala] = [sala.janela];// eslint-disable-line no-param-reassign
      }
      return salasJanela;
    }, {});
    return salasDeAulaReduzidas;
  }

  // Verifica se o turno entre uma materia e uma sala de aula combinam
  static turnoCombina(salasDeAula, materia) {
    if ((materia.turno === 'I') && (salasDeAula.janela[0] === 'M')) {
      return true;
    }
    if ((materia.turno === 'I') && (salasDeAula.janela[0] === 'T')) {
      return true;
    }
    if ((materia.turno === 'M') && (salasDeAula.janela[0] === 'M')) {
      return true;
    }
    if ((materia.turno === 'T') && (salasDeAula.janela[0] === 'T')) {
      return true;
    }
    if ((materia.turno === 'N') && (salasDeAula.janela[0] === 'N')) {
      return true;
    }
    return false;
  }

  static pegaSalaDeAula(sala, janela, salasDeAula) {
    const salaDeAula = salasDeAula.filter(item =>
      item.sala === sala && item.janela === janela);
    return salaDeAula.pop();
  }

  // pegaProfessor(creditos, disciplina, professores, DNA) {
  static pegaProfessor(professores) {
    const professorEscolhido = professores.filter(professor =>
      professores.indexOf(professor) === 0);
    return professorEscolhido.pop();
  }
};
