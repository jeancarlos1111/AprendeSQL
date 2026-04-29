export default {
  id: 8,
  title: '8. Agregación y Agrupamiento',
  description: 'Estadísticas globales y lógica de GROUP BY',
  content: `
    <h3>Resumiendo la Realidad</h3>
    <p>A veces no necesitas ver los detalles de cada estudiante, sino obtener una <strong>visión panorámica</strong>: ¿Cuál es el promedio de notas? ¿Cuántos alumnos hay por ciudad? Las funciones de agregación "colapsan" múltiples filas en un solo resultado estadístico.</p>

    <h3>1. Las 5 Funciones Estelares</h3>
    <ul>
      <li><code>COUNT(*)</code>: Cuenta todas las filas.</li>
      <li><code>SUM(columna)</code>: Suma los valores numéricos.</li>
      <li><code>AVG(columna)</code>: Calcula el promedio (Average).</li>
      <li><code>MIN()</code> / <code>MAX()</code>: Encuentra el valor más bajo o más alto.</li>
    </ul>

    <div class="tip-box">
      <strong>🏷️ Usa Alias (AS)</strong>
      Las funciones de agregación suelen devolver nombres de columna feos como <code>COUNT(*)</code>. Usa <code>AS</code> para darles un nombre profesional: <br>
      <code>SELECT COUNT(*) AS total_estudiantes FROM estudiantes;</code>
    </div>

    <h3>2. Agrupando con GROUP BY</h3>
    <p><code>GROUP BY</code> es como poner tus datos en "cubetas" basadas en un valor común. Si agrupas por <code>ciudad</code>, SQL creará una cubeta para cada ciudad diferente y luego aplicará la función de agregación dentro de cada una.</p>

    <div class="schema-visual">
      <div class="table-card" style="border-top: 4px solid var(--secondary);">
        <div class="table-card-header">Agrupamiento por Ciudad</div>
        <table class="results-table">
          <thead><tr><th>ciudad</th><th>estudiantes</th></tr></thead>
          <tbody>
            <tr><td>Madrid</td><td><span class="progress-badge">12</span></td></tr>
            <tr><td>Barcelona</td><td><span class="progress-badge">8</span></td></tr>
            <tr><td>Valencia</td><td><span class="progress-badge">5</span></td></tr>
          </tbody>
        </table>
        <div style="padding: 10px; font-size: 0.8rem; text-align: center; color: var(--secondary);">Cada ciudad es una fila de resumen</div>
      </div>
    </div>

    <div class="warning-box">
      <strong>⚠️ La Regla de Oro</strong>
      Cuando usas <code>GROUP BY</code>, <strong>solo</strong> puedes poner en el <code>SELECT</code> las columnas que están en el agrupamiento o funciones de agregación. Intentar poner "nombre" si agrupas por "ciudad" dará error, pues ¿cuál de todos los nombres del grupo debería mostrar?
    </div>

    <h3>3. DISTINCT vs GROUP BY</h3>
    <p>Ambos pueden listar valores únicos, pero tienen propósitos diferentes:</p>
    <ul>
      <li>Usa <code>DISTINCT</code> si solo quieres ver la lista de valores sin duplicados.</li>
      <li>Usa <code>GROUP BY</code> si quieres realizar <strong>operaciones matemáticas</strong> sobre esos valores (contar, sumar, promediar).</li>
    </ul>

    <h3>4. Filtrando Grupos con HAVING</h3>
    <p>Aquí es donde muchos se confunden. ¿Cuál es la diferencia entre WHERE y HAVING?</p>
    <ul>
      <li><code>WHERE</code>: Filtra las filas <strong>antes</strong> de agrupar.</li>
      <li><code>HAVING</code>: Filtra los resultados <strong>después</strong> de agrupar y calcular la estadística.</li>
    </ul>

    <div class="info-box">
      <strong>⏳ Orden de Ejecución Real</strong>
      <code>FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY</code>
    </div>

    <pre><code>-- Ejemplo: Ciudades con promedio de edad mayor a 20
SELECT ciudad, AVG(edad) AS promedio
FROM estudiantes
GROUP BY ciudad
HAVING AVG(edad) > 20;</code></pre>

    <h3>Reto: El Analista de Ciudades</h3>
    <p>Estamos planificando nuevas sedes y necesitamos saber en qué ciudades ya tenemos una presencia sólida.</p>
    <p>Calcula cuántos estudiantes viven en cada ciudad, pero muestra <strong>únicamente</strong> las ciudades que tengan <strong>más de 1 estudiante</strong>.</p>
  `,
  initialCode: '-- Muestra ciudad y el conteo (como "conteo") filtrando ciudades con > 1 estudiante\nSELECT ',
  expectedOutput: 'group_having_pro',
  hint: 'Usa: SELECT ciudad, COUNT(*) AS conteo FROM estudiantes GROUP BY ciudad HAVING COUNT(*) > 1;'
};


