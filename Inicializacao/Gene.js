const FileLoader = require('./FileLoader');
const shuffle = require('shuffle-array');

const SALAS = 'salas';
const PROFESSORES = 'professores';
const MATERIAS = 'materias';

module.exports = class Gene {
  constructor(diretorio) {
    this.salas =
      FileLoader.readInput(`${diretorio + SALAS}.csv`, SALAS);
    this.professores =
      FileLoader.readInput(`${diretorio + PROFESSORES}.csv`, PROFESSORES);
    this.materias =
      FileLoader.readInput(`${diretorio + MATERIAS}.csv`, MATERIAS);
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

  // Retorna um objeto no formato: {Sala1: [1-2-M1-1-1, 34-2-M2-1-1, ...], Sala2: [...]}
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
    } else if ((materia.turno === 'I') && (splittedDetalhesSala[2][0] === 'T')) {
      return true;
    } else if ((materia.turno === 'M') && (splittedDetalhesSala[2][0] === 'M')) {
      return true;
    } else if ((materia.turno === 'T') && (splittedDetalhesSala[2][0] === 'T')) {
      return true;
    } else if ((materia.turno === 'N') && (splittedDetalhesSala[2][0] === 'N')) {
      return true;
    }
    return false;
  }

  // Recebe um array com os detalhes de uma sala
  static contaCreditosNoTurno(salas, materia) {
    const creditosDisponiveis = salas.reduce((total, detalhesSala) => {
      // detalhesSala é um elemento de um array, exemplo: [1-2-M1-1-1]
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

  // Recebe o objeto de salas reduzidas
  static pegaSalasDeAulaCompativeis(salasDeAulaReduzidas, materia, cromossomo) {
    let salasCompativeis = [];
    let creditosSala = 0;
    if (cromossomo.length > 0) {
      creditosSala = this.contaCreditosNoTurno(salasDeAulaReduzidas, materia);
      if (creditosSala >= materia.creditos) {
        salasCompativeis = salasDeAulaReduzidas.filter(detalhesSala =>
          this.labCombina(detalhesSala, materia) &&
          this.turnoCombina(detalhesSala, materia) &&
          !this.janelaUtilizada(detalhesSala, cromossomo));
      }
    } else {
      creditosSala = this.contaCreditosNoTurno(salasDeAulaReduzidas, materia);
      if (creditosSala >= materia.creditos) {
        salasCompativeis = salasDeAulaReduzidas.filter(detalhesSala =>
          this.labCombina(detalhesSala, materia) &&
          this.turnoCombina(detalhesSala, materia));
      }
    }
    return salasCompativeis;
  }

  static pegaProfessoresComPreferencia(professores) {
    const professoresComPreferencia = professores.filter(professor =>
      professor.materias.length > 0);
    return professoresComPreferencia;
  }

  static pegaProfessoresSemPreferencia(professores) {
    const professoresSemPreferencia = professores.filter(professor =>
      professor.materias.length === 0);
    return professoresSemPreferencia;
  }

  static professorTemCredito(professor, materia) {
    if (materia.creditos <= professor.creditos) {
      return true;
    }
    return false;
  }

  static existePreferencia(professor, materia) {
    const idsCombinados = professor.materias.filter(item => item === materia.id);
    if (idsCombinados.length > 0) {
      return true;
    }
    return false;
  }

  static pegaProfessor(professores, materia) {
    let professorEscolhido;
    const professoresComPreferencia = this.pegaProfessoresComPreferencia(professores);
    const professoresSemPreferencia = this.pegaProfessoresSemPreferencia(professores);
    professorEscolhido = professoresComPreferencia.filter(professor =>
      this.professorTemCredito(professor, materia) && this.existePreferencia(professor, materia));
    if (professorEscolhido.length === 0) {
      professorEscolhido = [professoresSemPreferencia[0]];
    }
    return professorEscolhido.pop();
  }
};
