export default {
  id: 10,
  title: '10. Subconsultas y Desafíos',
  description: 'Consultas anidadas y lógica avanzada',
  content: `
    <h3>Consultas en "Inception"</h3>
    <p>Una <strong>subconsulta</strong> es simplemente una consulta <code>SELECT</code> dentro de otra. Imagina que tienes una pregunta cuya respuesta necesitas para hacer otra pregunta. Por ejemplo: "¿Quiénes son más altos que el promedio?" (Primero calculas el promedio, luego comparas).</p>

    <div class="schema-visual">
      <div class="table-card" style="border: 2px dashed var(--gray-400); width: 100%;">
        <div class="table-card-header" style="background: var(--gray-500);">Consulta Externa (Main Query)</div>
        <div class="table-card-content">
          <p>SELECT * FROM tabla_a WHERE columna OPERADOR (</p>
          <div class="table-card" style="margin-left: 20px; border: 2px solid var(--primary);">
            <div class="table-card-header" style="background: var(--primary);">Subconsulta Interna (Inner Query)</div>
            <div class="table-card-content">
              SELECT columna FROM tabla_b WHERE condicion...
            </div>
          </div>
          <p>)</p>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>⏳ Orden de Ejecución</strong>
      SQL ejecuta primero la subconsulta interna. El resultado de esta se "inyecta" en la consulta externa para que esta pueda completarse.
    </div>

    <h3>1. Subconsultas en el WHERE (Filtrado Dinámico)</h3>
    <p>Es el uso más común. Permite filtrar registros basándose en un conjunto de valores calculados al vuelo.</p>

    <h4>A. Con el operador IN (Listas de valores)</h4>
    <p>Útil cuando la subconsulta devuelve múltiples filas.</p>
    <pre><code>-- Estudiantes que viven en ciudades con gran población (> 1M)
SELECT nombre, ciudad 
FROM estudiantes 
WHERE ciudad IN (
  SELECT nombre_ciudad FROM ciudades WHERE poblacion > 1000000
);</code></pre>

    <h4>B. Con Operadores de Comparación (Escalares)</h4>
    <p>Si la subconsulta devuelve <strong>un solo valor</strong> (un número, una fecha, etc.), puedes usar <code>=</code>, <code>></code>, <code><</code>, etc.</p>
    <pre><code>-- Estudiantes mayores que la edad promedio
SELECT nombre, edad 
FROM estudiantes 
WHERE edad > (SELECT AVG(edad) FROM estudiantes);</code></pre>

    <div class="tip-box">
      <strong>💡 Subconsultas Escalares</strong>
      Asegúrate de que tu subconsulta realmente devuelva una sola fila y columna si usas <code>=</code> o <code>></code>. Si devuelve más de una, ¡SQL lanzará un error!
    </div>

    <h3>2. Subconsultas con EXISTS</h3>
    <p>El operador <code>EXISTS</code> es muy potente. No le importa <em>qué</em> devuelve la subconsulta, sino <em>si</em> devuelve algo. Es binario: ¿Hay algún registro que cumpla esto? (Sí/No).</p>
    <pre><code>-- Ciudades que tienen al menos un estudiante registrado
SELECT nombre_ciudad 
FROM ciudades c
WHERE EXISTS (
  SELECT 1 FROM estudiantes e WHERE e.ciudad = c.nombre_ciudad
);</code></pre>

    <div class="warning-box">
      <strong>⚠️ NOT IN vs NOT EXISTS</strong>
      Ten cuidado con <code>NOT IN</code> si la subconsulta devuelve un valor <code>NULL</code>, ya que la consulta externa no devolverá nada. <code>NOT EXISTS</code> es generalmente más seguro y robusto en estos casos.
    </div>

    <h3>3. Subconsultas en el FROM (Tablas Temporales)</h3>
    <p>Puedes usar una subconsulta como si fuera una tabla física. A esto se le llama <strong>Tabla Derivada</strong> o <strong>Vista Inline</strong>. ¡Siempre deben llevar un alias!</p>
    <pre><code>SELECT promedio_edad, total 
FROM (
  SELECT AVG(edad) AS promedio_edad, COUNT(*) AS total FROM estudiantes
) AS resumen;</code></pre>

    <h3>4. Subconsultas en el SELECT</h3>
    <p>A veces quieres mostrar un cálculo extra en cada fila que requiere mirar otra tabla o hacer un conteo específico.</p>
    <pre><code>-- Lista de ciudades y cuántos estudiantes tiene cada una
SELECT nombre_ciudad, 
  (SELECT COUNT(*) FROM estudiantes WHERE ciudad = c.nombre_ciudad) AS total_estudiantes
FROM ciudades c;</code></pre>

    <h3>¿IN, EXISTS o JOIN?</h3>
    <table class="results-table">
      <thead>
        <tr>
          <th>Herramienta</th>
          <th>Mejor uso</th>
          <th>Resultado</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>JOIN</strong></td>
          <td>Combinar columnas de varias tablas.</td>
          <td>Muestra datos de A y B.</td>
        </tr>
        <tr>
          <td><strong>IN</strong></td>
          <td>Filtrar A basado en una lista simple de B.</td>
          <td>Muestra datos solo de A.</td>
        </tr>
        <tr>
          <td><strong>EXISTS</strong></td>
          <td>Verificar si existe relación (más eficiente en tablas grandes).</td>
          <td>Muestra datos solo de A.</td>
        </tr>
      </tbody>
    </table>

    <div class="warning-box">
      <strong>🚀 Rendimiento</strong>
      Aunque las subconsultas son fáciles de leer, a veces un <strong>JOIN</strong> es más rápido porque el optimizador de SQL puede manejarlo mejor. Úsalas con sabiduría.
    </div>

    <h3>Desafío: El Detective de Ciudades</h3>
    <p>Necesitamos identificar a los estudiantes que viven en ciudades donde tenemos una alta concentración de alumnos (más de un estudiante).</p>
    <p>Utiliza una subconsulta con <code>IN</code> para encontrar a todos los estudiantes cuya ciudad aparezca más de una vez en la tabla <code>estudiantes</code>.</p>
  `,
  initialCode: '-- Encuentra estudiantes en ciudades con múltiples alumnos\nSELECT * FROM estudiantes\nWHERE ciudad IN (\n  -- Escribe aquí la subconsulta\n);',
  expectedOutput: 'subquery_pro',
  hint: 'Usa: WHERE ciudad IN (SELECT ciudad FROM estudiantes GROUP BY ciudad HAVING COUNT(*) > 1);'
};
