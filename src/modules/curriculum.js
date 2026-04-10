export const curriculum = [
  {
    id: 1,
    title: 'Introducción a SQL',
    description: 'Conceptos básicos y primer SELECT',
    content: `
      <h3>¿Qué es SQL?</h3>
      <p>SQL (Structured Query Language) es el lenguaje estándar para trabajar con bases de datos relacionales. Nos permite comunicar con la base de datos para realizar operaciones como consultar, insertar, actualizar o eliminar datos.</p>
      
      <div class="info-box">
        <strong>💡 Concepto Clave</strong>
        Una base de datos relacional organiza la información en tablas compuestas por filas (registros) y columnas (campos).
      </div>
      
      <h3>Tu Primera Consulta: SELECT</h3>
      <p>El comando <code>SELECT</code> es la instrucción más básica y utilizada en SQL. Sirve para recuperar datos de una tabla.</p>
      
      <pre><code>-- Sintaxis básica
SELECT columna1, columna2 FROM tabla;

-- Seleccionar todas las columnas
SELECT * FROM tabla;</code></pre>
      
      <h3>Ejercicio Práctico</h3>
      <p>En el editor de la derecha, escribe la siguiente consulta para ver todos los estudiantes:</p>
      <pre><code>SELECT * FROM estudiantes;</code></pre>
      
      <div class="tip-box">
        <strong>💡 Consejo</strong>
        El asterisco (*) significa "todas las columnas". Es útil para explorar datos, pero en producción es mejor especificar las columnas que necesitas.
      </div>
    `,
    initialCode: '-- Escribe tu consulta aquí\nSELECT * FROM estudiantes;',
    expectedOutput: 'estudiantes',
    hint: 'Usa SELECT * FROM estudiantes para ver todos los registros de la tabla'
  },
  {
    id: 2,
    title: 'Filtrando Datos con WHERE',
    description: 'Aprende a filtrar resultados específicos',
    content: `
      <h3>La Cláusula WHERE</h3>
      <p>La cláusula <code>WHERE</code> nos permite filtrar los resultados de una consulta según condiciones específicas. Solo los registros que cumplan la condición serán mostrados.</p>
      
      <pre><code>-- Sintaxis
SELECT columnas FROM tabla WHERE condicion;

-- Ejemplos
SELECT * FROM estudiantes WHERE edad = 20;
SELECT * FROM estudiantes WHERE ciudad = 'Madrid';
SELECT * FROM productos WHERE precio > 100;</code></pre>
      
      <h3>Operadores de Comparación</h3>
      <ul>
        <li><code>=</code> - Igual a</li>
        <li><code>&lt;&gt;</code> o <code>!=</code> - Diferente de</li>
        <li><code>&gt;</code> - Mayor que</li>
        <li><code>&lt;</code> - Menor que</li>
        <li><code>&gt;=</code> - Mayor o igual que</li>
        <li><code>&lt;=</code> - Menor o igual que</li>
      </ul>
      
      <h3>Ejercicio Práctico</h3>
      <p>Selecciona solo los estudiantes que tengan más de 20 años:</p>
      <pre><code>SELECT * FROM estudiantes WHERE edad > 20;</code></pre>
      
      <div class="warning-box">
        <strong>⚠️ Importante</strong>
        Los valores de texto deben ir entre comillas simples (' '), mientras que los números no llevan comillas.
      </div>
    `,
    initialCode:
      '-- Filtra estudiantes mayores de 20 años\nSELECT * FROM estudiantes WHERE edad > 20;',
    expectedOutput: 'filtro',
    hint: 'Usa WHERE edad > 20 para filtrar los estudiantes'
  },
  {
    id: 3,
    title: 'Ordenando Resultados con ORDER BY',
    description: 'Organiza tus resultados ascendente o descendentemente',
    content: `
      <h3>La Cláusula ORDER BY</h3>
      <p><code>ORDER BY</code> se utiliza para ordenar los resultados de una consulta. Por defecto, el orden es ascendente (ASC), pero puedes especificar orden descendente (DESC).</p>
      
      <pre><code>-- Orden ascendente (por defecto)
SELECT * FROM estudiantes ORDER BY nombre;

-- Orden descendente
SELECT * FROM estudiantes ORDER BY edad DESC;

-- Múltiples columnas
SELECT * FROM empleados ORDER BY departamento ASC, salario DESC;</code></pre>
      
      <h3>Combinando WHERE y ORDER BY</h3>
      <p>Puedes combinar ambas cláusulas para filtrar y luego ordenar los resultados:</p>
      
      <pre><code>SELECT * FROM productos 
WHERE precio > 50 
ORDER BY precio DESC;</code></pre>
      
      <h3>Ejercicio Práctico</h3>
      <p>Obtén todos los estudiantes ordenados por edad de mayor a menor:</p>
      <pre><code>SELECT * FROM estudiantes ORDER BY edad DESC;</code></pre>
      
      <div class="tip-box">
        <strong>💡 Consejo Pro</strong>
        Cuando combines WHERE y ORDER BY, siempre va primero WHERE y luego ORDER BY.
      </div>
    `,
    initialCode:
      '-- Ordena estudiantes por edad descendente\nSELECT * FROM estudiantes ORDER BY edad DESC;',
    expectedOutput: 'orden',
    hint: 'Usa ORDER BY edad DESC para ordenar de mayor a menor'
  },
  {
    id: 4,
    title: 'Funciones de Agregación',
    description: 'COUNT, SUM, AVG, MIN, MAX',
    content: `
      <h3>¿Qué son las Funciones de Agregación?</h3>
      <p>Las funciones de agregación realizan cálculos sobre un conjunto de valores y devuelven un único valor resultante. Son esenciales para generar reportes y estadísticas.</p>
      
      <h3>Principales Funciones</h3>
      
      <pre><code>-- COUNT: Cuenta el número de registros
SELECT COUNT(*) FROM estudiantes;

-- SUM: Suma los valores de una columna
SELECT SUM(ventas) FROM pedidos;

-- AVG: Calcula el promedio
SELECT AVG(edad) FROM estudiantes;

-- MIN: Obtiene el valor mínimo
SELECT MIN(precio) FROM productos;

-- MAX: Obtiene el valor máximo
SELECT MAX(salario) FROM empleados;</code></pre>
      
      <h3>Usando Alias con AS</h3>
      <p>Puedes dar nombres personalizados a los resultados usando <code>AS</code>:</p>
      
      <pre><code>SELECT 
  COUNT(*) AS total_estudiantes,
  AVG(edad) AS edad_promedio
FROM estudiantes;</code></pre>
      
      <h3>Ejercicio Práctico</h3>
      <p>Cuenta cuántos estudiantes hay en total:</p>
      <pre><code>SELECT COUNT(*) AS total FROM estudiantes;</code></pre>
      
      <div class="info-box">
        <strong>📊 Dato Interesante</strong>
        Las funciones de agregación ignoran los valores NULL, excepto COUNT(*).
      </div>
    `,
    initialCode: '-- Cuenta el total de estudiantes\nSELECT COUNT(*) AS total FROM estudiantes;',
    expectedOutput: 'agregacion',
    hint: 'Usa COUNT(*) para contar todos los registros'
  },
  {
    id: 5,
    title: 'Agrupando con GROUP BY',
    description: 'Agrupa resultados y aplica funciones de agregación',
    content: `
      <h3>La Cláusula GROUP BY</h3>
      <p><code>GROUP BY</code> agrupa filas que tienen los mismos valores en columnas específicas. Se usa frecuentemente con funciones de agregación.</p>
      
      <pre><code>-- Contar estudiantes por ciudad
SELECT ciudad, COUNT(*) AS total
FROM estudiantes
GROUP BY ciudad;

-- Promedio de salario por departamento
SELECT departamento, AVG(salario) AS promedio
FROM empleados
GROUP BY departamento;</code></pre>
      
      <h3>Filtrando Grupos con HAVING</h3>
      <p><code>HAVING</code> es como WHERE pero para grupos. Se usa después de GROUP BY:</p>
      
      <pre><code>-- Ciudades con más de 5 estudiantes
SELECT ciudad, COUNT(*) AS total
FROM estudiantes
GROUP BY ciudad
HAVING COUNT(*) > 5;</code></pre>
      
      <h3>Diferencia entre WHERE y HAVING</h3>
      <ul>
        <li><strong>WHERE</strong>: Filtra filas ANTES de agrupar</li>
        <li><strong>HAVING</strong>: Filtra grupos DESPUÉS de agrupar</li>
      </ul>
      
      <h3>Ejercicio Práctico</h3>
      <p>Cuenta cuántos estudiantes hay en cada ciudad:</p>
      <pre><code>SELECT ciudad, COUNT(*) AS total FROM estudiantes GROUP BY ciudad;</code></pre>
      
      <div class="warning-box">
        <strong>⚠️ Regla Importante</strong>
        Todas las columnas en el SELECT que no estén en una función de agregación deben estar en GROUP BY.
      </div>
    `,
    initialCode:
      '-- Agrupa estudiantes por ciudad\nSELECT ciudad, COUNT(*) AS total FROM estudiantes GROUP BY ciudad;',
    expectedOutput: 'grupo',
    hint: 'Usa GROUP BY ciudad para agrupar por ciudad'
  },
  {
    id: 6,
    title: 'Uniendo Tablas con JOIN',
    description: 'Combina datos de múltiples tablas',
    content: `
      <h3>¿Qué es JOIN?</h3>
      <p>Los <code>JOIN</code> permiten combinar filas de dos o más tablas basándose en una relación entre ellas. Es fundamental en bases de datos relacionales.</p>
      
      <h3>Tipos de JOIN</h3>
      
      <pre><code>-- INNER JOIN: Solo registros coincidentes
SELECT e.nombre, p.nombre_producto
FROM estudiantes e
INNER JOIN pedidos p ON e.id = p.estudiante_id;

-- LEFT JOIN: Todos los de la izquierda + coincidentes
SELECT e.nombre, p.nombre_producto
FROM estudiantes e
LEFT JOIN pedidos p ON e.id = p.estudiante_id;

-- RIGHT JOIN: Todos los de la derecha + coincidentes
SELECT e.nombre, p.nombre_producto
FROM estudiantes e
RIGHT JOIN pedidos p ON e.id = p.estudiante_id;</code></pre>
      
      <h3>Usando Alias de Tabla</h3>
      <p>Los alias hacen las consultas más legibles:</p>
      
      <pre><code>SELECT e.nombre, c.nombre AS curso
FROM estudiantes e
INNER JOIN cursos c ON e.curso_id = c.id;</code></pre>
      
      <h3>Ejercicio Práctico</h3>
      <p>Une estudiantes con sus ciudades:</p>
      <pre><code>SELECT e.nombre, c.nombre_ciudad
FROM estudiantes e
INNER JOIN ciudades c ON e.ciudad_id = c.id;</code></pre>
      
      <div class="tip-box">
        <strong>💡 Mejor Práctica</strong>
        Usa INNER JOIN cuando solo quieras registros que existan en ambas tablas. Usa LEFT JOIN cuando quieras todos los registros de la tabla principal incluso si no tienen coincidencia.
      </div>
    `,
    initialCode:
      '-- Une estudiantes con ciudades\nSELECT e.nombre, c.nombre_ciudad\nFROM estudiantes e\nINNER JOIN ciudades c ON e.ciudad_id = c.id;',
    expectedOutput: 'join',
    hint: 'Usa INNER JOIN para conectar las tablas estudiantes y ciudades'
  },
  {
    id: 7,
    title: 'Insertando Datos con INSERT',
    description: 'Agrega nuevos registros a tus tablas',
    content: `
      <h3>La Sentencia INSERT</h3>
      <p><code>INSERT INTO</code> se utiliza para agregar nuevos registros a una tabla existente.</p>
      
      <pre><code>-- Insertar un registro especificando columnas
INSERT INTO estudiantes (nombre, edad, ciudad)
VALUES ('Ana García', 22, 'Barcelona');

-- Insertar múltiples registros
INSERT INTO estudiantes (nombre, edad, ciudad)
VALUES 
  ('Carlos Ruiz', 21, 'Valencia'),
  ('María López', 23, 'Sevilla');

-- Insertar sin especificar columnas (todas)
INSERT INTO estudiantes
VALUES (4, 'Pedro Sánchez', 20, 'Madrid');</code></pre>
      
      <h3>Consideraciones Importantes</h3>
      <ul>
        <li>El número de valores debe coincidir con el número de columnas</li>
        <li>Los valores deben estar en el mismo orden que las columnas</li>
        <li>Los textos van entre comillas simples, los números no</li>
        <li>Si una columna tiene AUTO_INCREMENT, no es necesario incluirla</li>
      </ul>
      
      <h3>Ejercicio Práctico</h3>
      <p>Inserta un nuevo estudiante llamado "Juan Pérez" de 25 años en "Bilbao":</p>
      <pre><code>INSERT INTO estudiantes (nombre, edad, ciudad)
VALUES ('Juan Pérez', 25, 'Bilbao');</code></pre>
      
      <div class="info-box">
        <strong>✅ Verificación</strong>
        Después de INSERT, ejecuta un SELECT para verificar que los datos se guardaron correctamente.
      </div>
    `,
    initialCode:
      "-- Inserta un nuevo estudiante\nINSERT INTO estudiantes (nombre, edad, ciudad)\nVALUES ('Juan Pérez', 25, 'Bilbao');",
    expectedOutput: 'insert',
    hint: 'Usa INSERT INTO con VALUES para agregar el nuevo estudiante'
  },
  {
    id: 8,
    title: 'Actualizando Datos con UPDATE',
    description: 'Modifica registros existentes',
    content: `
      <h3>La Sentencia UPDATE</h3>
      <p><code>UPDATE</code> modifica registros existentes en una tabla. ¡Cuidado! Sin WHERE, actualizarás TODOS los registros.</p>
      
      <pre><code>-- Actualizar un registro específico
UPDATE estudiantes
SET edad = 23
WHERE id = 1;

-- Actualizar múltiples columnas
UPDATE estudiantes
SET edad = 24, ciudad = 'Madrid'
WHERE nombre = 'Ana García';

-- ⚠️ PELIGRO: Esto actualiza TODOS los registros
UPDATE estudiantes SET edad = 20;</code></pre>
      
      <h3>Mejores Prácticas</h3>
      <ol>
        <li><strong>SIEMPRE</strong> usa WHERE a menos que quieras actualizar todo</li>
        <li>Primero haz un SELECT con el mismo WHERE para verificar</li>
        <li>Usa transacciones en producción</li>
      </ol>
      
      <pre><code>-- Patrón seguro
-- 1. Primero verifica qué vas a actualizar
SELECT * FROM estudiantes WHERE id = 1;

-- 2. Luego actualiza
UPDATE estudiantes SET edad = 23 WHERE id = 1;

-- 3. Verifica el cambio
SELECT * FROM estudiantes WHERE id = 1;</code></pre>
      
      <h3>Ejercicio Práctico</h3>
      <p>Actualiza la edad del estudiante con id = 1 a 26 años:</p>
      <pre><code>UPDATE estudiantes SET edad = 26 WHERE id = 1;</code></pre>
      
      <div class="warning-box">
        <strong>⚠️ ADVERTENCIA CRÍTICA</strong>
        Nunca ejecutes UPDATE sin WHERE en producción. Podrías modificar miles de registros accidentalmente.
      </div>
    `,
    initialCode:
      '-- Actualiza la edad del estudiante 1\nUPDATE estudiantes SET edad = 26 WHERE id = 1;',
    expectedOutput: 'update',
    hint: 'Usa UPDATE con SET y WHERE para modificar solo un registro'
  },
  {
    id: 9,
    title: 'Eliminando Datos con DELETE',
    description: 'Remueve registros de forma segura',
    content: `
      <h3>La Sentencia DELETE</h3>
      <p><code>DELETE</code> elimina registros de una tabla. Al igual que UPDATE, requiere extremo cuidado con la cláusula WHERE.</p>
      
      <pre><code>-- Eliminar un registro específico
DELETE FROM estudiantes WHERE id = 1;

-- Eliminar múltiples registros
DELETE FROM estudiantes WHERE edad > 30;

-- ⚠️ PELIGRO: Esto elimina TODOS los registros
DELETE FROM estudiantes;</code></pre>
      
      <h3>Diferencia entre DELETE y TRUNCATE</h3>
      <ul>
        <li><strong>DELETE</strong>: Elimina registros específicos (con WHERE), se puede deshacer con transacción</li>
        <li><strong>TRUNCATE</strong>: Elimina TODOS los registros, reinicia auto-incrementos, más rápido</li>
      </ul>
      
      <pre><code>-- Eliminar solo algunos registros
DELETE FROM estudiantes WHERE edad > 30;

-- Eliminar toda la tabla (cuidado!)
TRUNCATE TABLE estudiantes;</code></pre>
      
      <h3>Patrón Seguro</h3>
      <pre><code>-- 1. Primero selecciona lo que vas a eliminar
SELECT * FROM estudiantes WHERE id = 1;

-- 2. Confirma que son los correctos

-- 3. Luego elimina
DELETE FROM estudiantes WHERE id = 1;

-- 4. Verifica que se eliminó
SELECT * FROM estudiantes WHERE id = 1;</code></pre>
      
      <h3>Ejercicio Final</h3>
      <p>Elimina el estudiante con id = 5:</p>
      <pre><code>DELETE FROM estudiantes WHERE id = 5;</code></pre>
      
      <div class="tip-box">
        <strong>🎉 ¡Felicidades!</strong>
        Has completado todos los módulos de SQL Learn. Ahora tienes una base sólida en SQL. ¡Sigue practicando!
      </div>
    `,
    initialCode: '-- Elimina el estudiante con id = 5\nDELETE FROM estudiantes WHERE id = 5;',
    expectedOutput: 'delete',
    hint: 'Usa DELETE FROM con WHERE para eliminar solo un registro específico'
  }
];

export default curriculum;
