export default {
  id: 7,
  title: '7. Orden y Límite',
  description: 'Controlando la presentación y cantidad de datos',
  content: `
    <h3>El Caos por Defecto</h3>
    <p>En el mundo de las bases de datos, <strong>no existe un orden garantizado</strong>. Si haces un <code>SELECT</code> simple, el motor te devolverá las filas en el orden que le sea más cómodo en ese momento. Para tener control total, necesitamos las cláusulas <code>ORDER BY</code> y <code>LIMIT</code>.</p>

    <h3>1. Clasificando con ORDER BY</h3>
    <p>Esta cláusula organiza los resultados basándose en una o más columnas. Puedes elegir el sentido del orden:</p>
    <ul>
      <li><code>ASC</code>: Ascendente (de menor a mayor, de A a Z). <strong>Es el valor predeterminado.</strong></li>
      <li><code>DESC</code>: Descendente (de mayor a menor, de Z a A).</li>
    </ul>

    <div class="schema-visual">
      <div class="table-card" style="border-top: 4px solid var(--primary);">
        <div class="table-card-header">Orden por Edad (DESC)</div>
        <table class="results-table">
          <thead><tr><th>nombre</th><th>edad</th></tr></thead>
          <tbody>
            <tr style="background: rgba(79, 70, 229, 0.1);"><td>Laura Martínez</td><td>23</td></tr>
            <tr><td>Carlos Ruiz</td><td>22</td></tr>
            <tr><td>Ana García</td><td>20</td></tr>
          </tbody>
        </table>
        <div style="padding: 10px; font-size: 0.8rem; text-align: center; color: var(--primary);">Los mayores aparecen primero</div>
      </div>
    </div>

    <h3>Ordenamiento Multi-columna</h3>
    <p>Puedes ordenar por varias columnas a la vez. SQL resolverá el primero y, en caso de empate, usará el segundo.</p>
    <pre><code>-- Ordenar por ciudad (A-Z) y dentro de la ciudad, por nota (más alta primero)
SELECT * FROM estudiantes 
ORDER BY ciudad ASC, nota DESC;</code></pre>

    <h3>2. Restringiendo con LIMIT</h3>
    <p>¿Qué pasa si tu tabla tiene 1 millón de registros? No querrás verlos todos. <code>LIMIT</code> te permite decir exactamente cuántas filas quieres recibir.</p>
    
    <div class="tip-box">
      <strong>⚡ Rendimiento SQL</strong>
      Usar <code>LIMIT</code> no solo limpia tu pantalla, también ayuda a que la base de datos trabaje menos al no tener que procesar todos los resultados innecesarios.
    </div>

    <h3>3. Paginación (OFFSET)</h3>
    <p>Para crear sistemas de "páginas" como en las tiendas online, combinamos <code>LIMIT</code> con <code>OFFSET</code> (que significa "saltar").</p>
    
    <ul>
      <li><code>LIMIT 5</code>: Dame 5 registros.</li>
      <li><code>OFFSET 10</code>: Sáltate los primeros 10.</li>
    </ul>

    <div class="info-box">
      <strong>📋 La Fórmula de la Paginación</strong>
      Si quieres ver la página <strong>P</strong> con <strong>N</strong> elementos por página:<br>
      <code>LIMIT N OFFSET (P - 1) * N</code>
    </div>

    <pre><code>-- Ejemplo: Ver los estudiantes 6 al 10 (Página 2 de 5 elementos)
SELECT * FROM estudiantes LIMIT 5 OFFSET 5;</code></pre>

    <div class="warning-box">
      <strong>⚠️ El Orden de las Cláusulas</strong>
      El orden es sagrado en SQL. Si los mezclas, obtendrás un error:
      <code>SELECT -> FROM -> WHERE -> ORDER BY -> LIMIT/OFFSET</code>
    </div>

    <h3>Reto: El Estudiante Veterano</h3>
    <p>Necesitamos identificar al estudiante <strong>con mayor edad</strong> que vive específicamente en <strong>'Madrid'</strong> para asignarle el rol de mentor.</p>
    <p>Escribe la consulta que devuelva únicamente el nombre de ese estudiante.</p>
  `,
  initialCode: '-- Encuentra el nombre del estudiante más veterano de Madrid\nSELECT ',
  expectedOutput: 'order_limit_pro',
  hint: "Usa: SELECT nombre FROM estudiantes WHERE ciudad = 'Madrid' ORDER BY edad DESC LIMIT 1;"
};

