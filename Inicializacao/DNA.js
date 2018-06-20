const Gene = require('./Gene');

module.exports = class DNA {
  constructor(todasMaterias, todasSalas, todosProfessores) {
    this.todasMaterias = todasMaterias;
    this.todasSalas = todasSalas;
    this.todosProfessores = todosProfessores;
    this.dna = [];
  }

  pegaPrimeirasSalas(salasCompativeis, materia) {
    const ids = [];
    salasCompativeis.forEach((element) => {
      element.forEach((item) => {
        const splittedDetalhesSala = item.split('-');
        ids.push(splittedDetalhesSala[0]);
      });
    });
    const salasEncontradas = this.todasSalas.filter(sala => ids.includes(sala.id));
    const salasEscolhidas = salasEncontradas.filter((sala, index) => index < materia.creditos);
    return salasEscolhidas;
  }

  removeMateria(materia) {
    const materias = this.todasMaterias.filter(item => item.id !== materia.id);
    this.todasMaterias = materias;
  }

  removeSala(sala) {
    const salas = this.todasSalas.filter(item => item.id !== sala.id);
    this.todasSalas = salas;
  }

  removeProfessorZero() {
    const professores = this.todosProfessores.filter(item => item.creditos > 0);
    this.todosProfessores = professores;
  }

  removeProfessor(professor) {
    const professores = this.todosProfessores.filter(item => item.id !== professor.id);
    this.todosProfessores = professores;
  }

  subtraiCreditosProfessor(materia, professor) {
    const professorTemp = { ...professor };
    professorTemp.creditos = `${professorTemp.creditos - materia.creditos}`;
    this.removeProfessor(professor);
    this.todosProfessores.push(professorTemp);
  }

  montaTrio() {
    const trioArray = [];
    const salasDeAulaReduzidas = Gene.reduzirSalasDeAula(this.todasSalas);
    const trio = {};
    const materiaEscolhida = Gene.pegaMateria(this.todasMaterias);
    let salasCompativeis =
    Object.keys(salasDeAulaReduzidas).map(key =>
      Gene.pegaSalasDeAulaCompativeis(salasDeAulaReduzidas[key], materiaEscolhida, []));
    salasCompativeis = salasCompativeis.filter(detalhesSala => detalhesSala.length > 0);
    const salasEscolhidas = this.pegaPrimeirasSalas(salasCompativeis, materiaEscolhida);
    const professorEscolhido = Gene.pegaProfessor(this.todosProfessores, materiaEscolhida);
    trio.materia = materiaEscolhida;
    trio.salas = salasEscolhidas;
    trio.professor = professorEscolhido;
    trioArray.push(trio);
    this.subtraiCreditosProfessor(materiaEscolhida, professorEscolhido);
    // Para a matéria complementar
    /* const trioComp = {};
    const materiaComplementar = Gene.pegaMateriaComplementar(materiaEscolhida, this.todasMaterias);
    if (materiaComplementar) {
      let salasComplementares =
        Object.keys(salasDeAulaReduzidas).map(key =>
          Gene.pegaSalasDeAulaCompativeis(salasDeAulaReduzidas[key], materiaComplementar, []));
      salasComplementares = salasComplementares.filter(detalhesSala => detalhesSala.length > 0);
      const salasCompEscolhidas = this.pegaPrimeirasSalas(salasComplementares, materiaComplementar);
      const professorComplementar = Gene.pegaProfessor(this.todosProfessores, materiaComplementar);
      trioComp.materia = materiaComplementar;
      trioComp.salas = salasCompEscolhidas;
      trioComp.professor = professorComplementar;
      trioArray.push(trioComp);
      this.subtraiCreditosProfessor(materiaComplementar, professorComplementar);
    } */
    return trioArray;
  }

  montaDNA() {
    const dna = [];
    const trioArray = this.montaTrio();
    trioArray.forEach((trio) => {
      this.removeMateria(trio.materia);
      // this.removeSala(trio.salas);
      this.removeProfessorZero();
      dna.push(trio);
    });
    return dna;
  }
};
