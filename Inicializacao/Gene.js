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

  // Retorna um objeto no formato: {Sala1: [1-2-M1-1-1, 1-2-M2-1-1, ...], Sala2: [...]}
  static reduzirSalasDeAula(salasDeAula) {
    const salasDeAulaReduzidas = salasDeAula.reduce((salas, sala) => {
      if (sala.sala in salas) {
        salas[sala.sala]
          .push(`${sala.id}-${sala.diaSemana}-${sala.janela}-${sala.lab}-${sala.tipoLab}`);
      } else {
        salas[sala.sala] = // eslint-disable-line no-param-reassign
          [`${sala.id}-${sala.diaSemana}-${sala.janela}-${sala.lab}-${sala.tipoLab}`];
      }
      return salas;
    }, {});
    return salasDeAulaReduzidas;
  }

  // Verifica se o turno entre uma materia e uma sala de aula combinam
  static turnoCombina(detalhesSala, materia) {
    const splittedDetalhesSala = detalhesSala.split('-'); // Sala1: [1-2-M1-1-1, 1-2-M2-1-1]
    if ((materia.turno === 'I') && (splittedDetalhesSala[2][0] === 'M')) {
      return true;
    }
    if ((materia.turno === 'I') && (splittedDetalhesSala[2][0] === 'T')) {
      return true;
    }
    if ((materia.turno === 'M') && (splittedDetalhesSala[2][0] === 'M')) {
      return true;
    }
    if ((materia.turno === 'T') && (splittedDetalhesSala[2][0] === 'T')) {
      return true;
    }
    if ((materia.turno === 'N') && (splittedDetalhesSala[2][0] === 'N')) {
      return true;
    }
    return false;
  }

  static contaCreditosNoTurno(sala, materia) {
    const creditosDisponiveis = sala.reduce((total, detalhesSala) => {
      // detalhesSala -> [1-2-M1-1-1]
      if (this.turnoCombina(detalhesSala, materia)) {
        return total + 1;
      }
      return total + 0;
    }, 0);
    return creditosDisponiveis;
  }

  static labCombina(detalhesSala, materia) {
    const splittedDetalhesSala = detalhesSala.split('-');
    if (materia.lab === splittedDetalhesSala[3] && materia.tipoLab === splittedDetalhesSala[4]) {
      return true;
    }
    return false;
  }

  static janelaUtilizada(detalhesSala, cromossomo) {
    const splittedDetalhesSala = detalhesSala.split('-');
    const sala = cromossomo.reduce((total, gene) => {
      if (gene[1].janela === splittedDetalhesSala[2]) {
        return total + 1;
      }
      return total + 0;
    }, 0);
    if (sala > 0) {
      return true;
    }
    return false;
  }

  // Possibilidade de construir função para preferir salas de em sequência

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
