export default {
  id: 5,
  title: '5. Consultas Básicas (SELECT)',
  description: 'Recuperando información específica',
  content: `
    <h3>1. El Asterisco Mágico (SELECT *)</h3>
    <p>El comando más básico es seleccionar todo. Es útil para explorar, pero en bases de datos reales evitamos usarlo para no desperdiciar recursos.</p>
    <pre><code>SELECT * FROM estudiantes;</code></pre>

    <h3>2. Proyección y Alias (AS)</h3>
    <p>Podemos elegir solo las columnas que necesitamos. Con <strong>AS</strong>, renombramos la salida para que sea más clara.</p>
    <pre><code>SELECT nombre AS [Nombre del Alumno], ciudad FROM estudiantes;</code></pre>

    <h3>3. Columnas Dinámicas</h3>
    <p>SQL puede transformar datos al vuelo. Puedes realizar cálculos o unir (concatenar) textos.</p>
    <ul>
      <li><strong>Cálculos:</strong> <code>SELECT edad + 1 FROM estudiantes;</code></li>
      <li><strong>Unir Textos:</strong> <code>SELECT nombre || ' vive en ' || ciudad FROM estudiantes;</code></li>
    </ul>

    <h3>4. Limpiando el Ruido (DISTINCT)</h3>
    <p>Si quieres saber en qué ciudades viven tus alumnos sin ver nombres repetidos, usas <strong>DISTINCT</strong>.</p>
    
    <div class="schema-visual">
      <div class="table-card" style="border-left: 4px solid var(--danger);">
        <div class="table-card-header">🔴 SIN DISTINCT</div>
        <table class="results-table">
          <thead><tr><th>ciudad</th></tr></thead>
          <tbody>
            <tr><td>Madrid</td></tr>
            <tr><td>Madrid</td></tr>
            <tr><td>Valencia</td></tr>
          </tbody>
        </table>
      </div>
      <div class="visual-connector">─▶</div>
      <div class="table-card" style="border-left: 4px solid var(--secondary);">
        <div class="table-card-header">🟢 CON DISTINCT</div>
        <table class="results-table">
          <thead><tr><th>ciudad</th></tr></thead>
          <tbody>
            <tr><td>Madrid</td></tr>
            <tr><td>Valencia</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="tip-box">
      <strong>🚀 Reto de Análisis</strong>
      Necesitamos saber cuántas sedes geográficas tenemos. Obtén una lista de todas las <code>ciudad</code> únicas de la tabla <code>estudiantes</code>.
    </div>
  `,
  initialCode: '-- Obtén las ciudades sin repeticiones\n',
  expectedOutput: 'select_distinct_pro',
  hint: 'Usa: SELECT DISTINCT ciudad FROM estudiantes;'
};
