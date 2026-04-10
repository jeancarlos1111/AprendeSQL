import alasql from 'alasql';

class Database {
  constructor() {
    this.db = alasql('DATABASE sqlLearnDB');
    this.initializeSampleData();
  }

  initializeSampleData() {
    // Crear tabla de estudiantes
    alasql(
      'CREATE TABLE IF NOT EXISTS estudiantes (id INT PRIMARY KEY AUTO_INCREMENT, nombre STRING, edad INT, ciudad STRING)'
    );

    // Insertar datos de ejemplo
    const estudiantesData = [
      { id: 1, nombre: 'Ana García', edad: 20, ciudad: 'Madrid' },
      { id: 2, nombre: 'Carlos Ruiz', edad: 22, ciudad: 'Barcelona' },
      { id: 3, nombre: 'María López', edad: 19, ciudad: 'Valencia' },
      { id: 4, nombre: 'Juan Sánchez', edad: 21, ciudad: 'Sevilla' },
      { id: 5, nombre: 'Laura Martín', edad: 23, ciudad: 'Bilbao' }
    ];

    // Verificar si ya hay datos
    const count = alasql('SELECT COUNT(*) AS total FROM estudiantes')[0].total;
    if (count === 0) {
      estudiantesData.forEach(est => {
        alasql('INSERT INTO estudiantes VALUES (?, ?, ?, ?)', [
          est.id,
          est.nombre,
          est.edad,
          est.ciudad
        ]);
      });
    }

    // Crear tabla de ciudades para JOINs
    alasql(
      'CREATE TABLE IF NOT EXISTS ciudades (id INT PRIMARY KEY, nombre_ciudad STRING, poblacion INT)'
    );

    const ciudadesData = [
      { id: 1, nombre_ciudad: 'Madrid', poblacion: 3223000 },
      { id: 2, nombre_ciudad: 'Barcelona', poblacion: 1620000 },
      { id: 3, nombre_ciudad: 'Valencia', poblacion: 791000 },
      { id: 4, nombre_ciudad: 'Sevilla', poblacion: 688000 },
      { id: 5, nombre_ciudad: 'Bilbao', poblacion: 346000 }
    ];

    const ciudadesCount = alasql('SELECT COUNT(*) AS total FROM ciudades')[0].total;
    if (ciudadesCount === 0) {
      ciudadesData.forEach(ciudad => {
        alasql('INSERT INTO ciudades VALUES (?, ?, ?)', [
          ciudad.id,
          ciudad.nombre_ciudad,
          ciudad.poblacion
        ]);
      });
    }

    // Agregar campo ciudad_id a estudiantes para JOINs
    try {
      alasql('ALTER TABLE estudiantes ADD COLUMN ciudad_id INT');
      alasql('UPDATE estudiantes SET ciudad_id = id');
    } catch (e) {
      // La columna ya existe
    }
  }

  executeQuery(sql) {
    const startTime = performance.now();
    try {
      const result = alasql(sql);
      const endTime = performance.now();
      return {
        success: true,
        data: result,
        executionTime: (endTime - startTime).toFixed(2)
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        executionTime: 0
      };
    }
  }

  resetDatabase() {
    alasql('DROP TABLE IF EXISTS estudiantes');
    alasql('DROP TABLE IF EXISTS ciudades');
    this.initializeSampleData();
  }

  getTableNames() {
    const tables = alasql('SHOW TABLES');
    return tables.map(t => Object.values(t)[0]);
  }
}

export default new Database();
