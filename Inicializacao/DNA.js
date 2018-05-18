const FileLoader = require('./FileLoader');
const SALAS = 'salas';
const PROFESSORES = 'professores';
const MATERIAS = 'materias';

module.exports = class DNA {
  static getSalasDeAula(location) {
    return FileLoader.readInput(location, SALAS);
  }

  static getProfessores(location) {
    return FileLoader.readInput(location, PROFESSORES);
  }

  static getMaterias(location) {
    return FileLoader.readInput(location, MATERIAS);
  }
}
