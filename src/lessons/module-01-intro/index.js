export default {
  id: 1,
  title: '1. Fundamentos de Bases de Datos',
  description: 'Conceptos generales y tipos de datos',
  content: `
    <h3>¿Qué es una Base de Datos?</h3>
    <p>Una base de datos es un sistema organizado para almacenar, gestionar y recuperar información. En el mundo relacional, los datos se organizan en <strong>tablas</strong>.</p>
    
    <div class="info-box">
      <strong>💡 RDBMS vs NoSQL</strong>
      Los sistemas relacionales (como PostgreSQL, MySQL o SQLite) usan SQL y tablas. Los NoSQL (como MongoDB) usan documentos o grafos y son más flexibles pero menos estructurados.
    </div>
    
    <h3>Tipos de Datos Comunes</h3>
    <ul>
      <li><code>INTEGER</code>: Números enteros.</li>
      <li><code>VARCHAR / TEXT</code>: Cadenas de texto.</li>
      <li><code>BOOLEAN</code>: Verdadero o falso.</li>
      <li><code>DATE / TIMESTAMP</code>: Fechas y horas.</li>
    </ul>
    
    <h3>Ejercicio de Introducción</h3>
    <p>Para comenzar, veamos qué tablas tenemos preparadas para ti. Ejecuta:</p>
    <pre><code>SELECT * FROM estudiantes;</code></pre>
  `,
  initialCode: 'SELECT * FROM estudiantes;',
  expectedOutput: 'estudiantes',
  hint: 'Escribe SELECT * FROM estudiantes; para ver la tabla de ejemplo.'
};
