const fs = require('fs');

module.exports = class FileLoader {
  // Abre e converte o arquivo .csv para um array de objetos JS
  static readInput(location, type) {
    const csv = fs.readFileSync(location, 'utf8');
    const array = csv.split('\n');
    let arrayObject = [];
    switch (type) {
      case 'salas':
        arrayObject = array.filter(sala =>
          array.indexOf(sala) > 0 && sala).map(sala => {
            return this.splitSala(sala);
        });
        break;
      case 'professores':
        arrayObject = array.filter(professor =>
          array.indexOf(professor) > 0 && professor).map(professor => {
            return this.splitProfessor(professor);
          });
        break;
      case 'materias':
        arrayObject = array.filter(materia =>
          array.indexOf(materia) > 0 && materia).map(materia => {
            return this.splitMateria(materia);
        });
        break;
    }
    return arrayObject;
  }

  static splitSala(sala) {
    const temp = sala.split(';');
    return {
      id: temp[0],
      sala: temp[1],
      janela: temp[2],
      lab: temp[3],
      tipoLab: temp[4],
      diaSemana: temp[5]
    }
  }

  static splitProfessor(professor) {
    const temp = professor.split(';');
    let materias = [];
    if (temp[3]) {
      materias = temp[3].split('.');
    }
    return {
      id: temp[0],
      professor: temp[1],
      creditos: temp[2],
      materias: materias
    }
  }

  static splitMateria(materia) {
    const temp = materia.split(';');
    return {
      id: temp[0],
      curso: temp[1],
      semestre: temp[2],
      materia: temp[3],
      descricao: temp[4],
      lab: temp[5],
      creditos: temp[6],
      tipoLab: temp[7],
      turno: temp[8]
    }
  }
}
