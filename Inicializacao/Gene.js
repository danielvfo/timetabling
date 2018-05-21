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
  removerElemento(array, elemento) {
    const indice = array.indexOf(elemento);
    if (indice > -1) {
      array.splice(indice, 1);
    }
    return array;
  };

  // Pega a primeira materia do array de materias
  pegaMateria(materias) {
    let materia = materias.filter(materia => materias.indexOf(materia) === 0);
    return materia.pop();
  }

  pegaMateriaComplementar(materia, materias) {
    return materiaComplementar;
  }

  pegaSalasDeAula(creditos, salasDeAula, DNA) {
    return salasDeAula;
  }

  //pegaProfessor(creditos, disciplina, professores, DNA) {
  pegaProfessor(professores) {
    let professor = professores.filter(professor => professores.indexOf(professor) === 0);
    return professor.pop();
  }
}
