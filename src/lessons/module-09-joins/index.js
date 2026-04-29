export default {
  id: 9,
  title: '9. Uniendo Tablas (JOINs)',
  description: 'Relacionando datos de distintos lugares',
  content: `
    <h3>La Magia de las Relaciones</h3>
    <p>En el modelo relacional, los datos se separan en diferentes tablas para evitar repeticiones (Normalización). Los <strong>JOINs</strong> son las herramientas que nos permiten "pegar" estas piezas de nuevo para obtener información completa.</p>

    <div class="info-box">
      <strong>🔗 El Vínculo: PK y FK</strong>
      Para unir dos tablas, necesitamos un campo común:
      <ul>
        <li><strong>PK (Primary Key)</strong>: El ID único de una tabla (ej. <code>ciudades.id</code>).</li>
        <li><strong>FK (Foreign Key)</strong>: El campo en otra tabla que hace referencia a ese ID (ej. <code>estudiantes.ciudad_id</code>).</li>
      </ul>
    </div>

    <h3>1. INNER JOIN (Parejas Perfectas)</h3>
    <p>Solo devuelve los registros que tienen una pareja en la otra tabla. Si un estudiante tiene un <code>ciudad_id</code> que no existe en la tabla de ciudades, <strong>desaparecerá</strong> del resultado.</p>
    
    <div class="schema-visual">
      <div style="display: flex; position: relative; width: 300px; height: 120px; align-items: center; justify-content: center; margin: 0 auto;">
        <div style="width: 120px; height: 120px; border-radius: 50%; background: rgba(79, 70, 229, 0.4); border: 2px solid var(--primary); position: absolute; left: 0; display: flex; align-items: center; padding-left: 20px;">Estud.</div>
        <div style="width: 120px; height: 120px; border-radius: 50%; background: rgba(16, 185, 129, 0.4); border: 2px solid var(--secondary); position: absolute; right: 0; display: flex; align-items: center; justify-content: flex-end; padding-right: 20px;">Ciud.</div>
        <div style="z-index: 10; font-weight: bold; background: white; padding: 4px; border-radius: 4px; border: 1px solid var(--gray-300); font-size: 0.8rem;">INNER</div>
      </div>
    </div>

    <h3>2. LEFT JOIN (Prioridad Izquierda)</h3>
    <p>Devuelve TODOS los registros de la tabla de la "izquierda" (la que pones primero en el FROM), incluso si no tienen pareja. Los huecos se rellenan con un valor especial: <strong>NULL</strong>.</p>

    <div class="tip-box">
      <strong>🚀 Sintaxis Profesional: Alias</strong>
      En lugar de escribir nombres largos, usa alias cortos (como apodos):
      <pre><code>SELECT e.nombre, c.nombre_ciudad 
FROM estudiantes e 
LEFT JOIN ciudades c ON e.ciudad_id = c.id;</code></pre>
    </div>

    <h3>🚀 Extra: Uniendo 3 o más tablas</h3>
    <p>¡No hay límite! Puedes encadenar JOINs uno tras otro:</p>
    <pre><code>SELECT e.nombre, c.nombre_ciudad, s.nombre_sede
FROM estudiantes e
JOIN ciudades c ON e.ciudad_id = c.id
JOIN sedes s ON c.sede_id = s.id;</code></pre>

    <div class="warning-box">
      <strong>⚠️ Columnas Ambiguas</strong>
      Si ambas tablas tienen una columna llamada igual (ej. "nombre"), SQL no sabrá cuál quieres. Usa siempre el alias del punto: <code>e.nombre</code> o <code>c.nombre</code>.
    </div>

    <h3>Reto: El Mapper de Estudiantes</h3>
    <p>Necesitamos un reporte de todos nuestros estudiantes junto al nombre de su ciudad.</p>
    <p>Obtén una lista que muestre el <strong>nombre del estudiante</strong> y el <strong>nombre de su ciudad</strong>. Asegúrate de incluir a TODOS los estudiantes, incluso si su ciudad aún no está registrada en nuestra tabla maestra (Usa <code>LEFT JOIN</code>).</p>
  `,
  initialCode: '-- Une estudiantes y ciudades usando LEFT JOIN y alias\nSELECT ',
  expectedOutput: 'join_left_pro',
  hint: 'Usa: SELECT e.nombre, c.nombre_ciudad FROM estudiantes e LEFT JOIN ciudades c ON e.ciudad_id = c.id;'
};

