export default {
  id: 11,
  title: '11. Modificación de Datos (DML)',
  description: 'INSERT, UPDATE y DELETE',
  content: `
    <h3>Data Manipulation Language (DML)</h3>
    <p>Hasta ahora hemos aprendido a consultar datos. Pero, ¿cómo llegan los datos ahí? El <strong>DML</strong> es el conjunto de comandos que nos permite manipular el contenido de nuestras tablas. Es el motor que mantiene la información viva y actualizada.</p>

    <div class="info-box">
      <strong>📋 DDL vs DML</strong>
      <ul>
        <li><strong>DDL (Definition)</strong>: Crea el "estante" (CREATE, ALTER, DROP).</li>
        <li><strong>DML (Manipulation)</strong>: Gestiona los "libros" en el estante (INSERT, UPDATE, DELETE).</li>
      </ul>
    </div>

    <h3>1. INSERT: Sembrando Datos</h3>
    <p>El comando <code>INSERT INTO</code> nos permite añadir nuevas filas. Es importante que los valores coincidan con el tipo de dato de cada columna.</p>

    <h4>A. Inserción Básica</h4>
    <pre><code>INSERT INTO estudiantes (nombre, edad, ciudad) 
VALUES ('Ana García', 21, 'Madrid');</code></pre>

    <h4>B. Inserción Múltiple (Bulk Insert)</h4>
    <p>Puedes ahorrar tiempo insertando varios registros en una sola consulta:</p>
    <pre><code>INSERT INTO estudiantes (nombre, edad, ciudad) VALUES 
  ('Carlos Ruiz', 22, 'Barcelona'),
  ('María López', 20, 'Valencia');</code></pre>

    <div class="tip-box">
      <strong>💡 Columnas Omitidas</strong>
      Si una columna tiene un valor por defecto (como un ID autoincremental), puedes omitirla en la lista de columnas y SQL se encargará del resto.
    </div>

    <h3>2. UPDATE: El Arte de Evolucionar</h3>
    <p>Los datos cambian. Los estudiantes cumplen años, se mudan o corrigen errores en su perfil. Para eso usamos <code>UPDATE</code>.</p>

    <h4>A. Actualización Simple</h4>
    <pre><code>UPDATE estudiantes 
SET edad = 22 
WHERE nombre = 'Ana García';</code></pre>

    <h4>B. Actualización de Múltiples Campos y Cálculos</h4>
    <pre><code>-- ¡Feliz cumpleaños a todos los de Madrid!
UPDATE estudiantes 
SET edad = edad + 1, ciudad = 'Madrid Capital'
WHERE ciudad = 'Madrid';</code></pre>

    <div class="warning-box">
      <strong>⚠️ ¡PELIGRO! El WHERE es vital</strong>
      Si ejecutas <code>UPDATE estudiantes SET edad = 99;</code> sin un WHERE, <strong>TODOS</strong> los estudiantes pasarán a tener 99 años. No hay botón de deshacer en SQL puro.
    </div>

    <h3>3. DELETE: Limpieza y Mantenimiento</h3>
    <p>Cuando un registro ya no es necesario, usamos <code>DELETE</code>. Al igual que el UPDATE, es extremadamente dependiente de la cláusula <code>WHERE</code>.</p>
    <pre><code>DELETE FROM estudiantes 
WHERE id = 5; -- Borra al estudiante con ID 5</code></pre>

    <h3>4. DML Avanzado: Usando Subconsultas</h3>
    <p>Puedes actualizar o borrar registros basándote en el resultado de otra consulta. ¡Aquí es donde todo se une!</p>
    <pre><code>-- Borrar estudiantes que viven en ciudades muy pequeñas
DELETE FROM estudiantes 
WHERE ciudad IN (
  SELECT nombre_ciudad FROM ciudades WHERE poblacion < 500000
);</code></pre>

    <div class="schema-visual">
      <div class="table-card" style="border-top: 4px solid var(--primary); width: 100%;">
        <div class="table-card-header">El Ciclo de Vida del Dato</div>
        <div style="padding: 15px; display: flex; flex-direction: column; gap: 10px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="progress-badge" style="background: var(--success);">1</span>
            <span><strong>INSERT</strong>: El dato nace.</span>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="progress-badge" style="background: var(--info);">2</span>
            <span><strong>UPDATE</strong>: El dato evoluciona.</span>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="progress-badge" style="background: var(--danger);">3</span>
            <span><strong>DELETE</strong>: El dato se despide.</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>🛡️ Transacciones (Concepto)</strong>
      En entornos profesionales, usamos <code>BEGIN TRANSACTION</code>, <code>COMMIT</code> (guardar) y <code>ROLLBACK</code> (deshacer). Es como tener un punto de guardado antes de hacer cambios arriesgados.
    </div>

    <h3>Reto Final: La Huella de AprendeSQL</h3>
    <p>¡Has llegado al final del camino! Para graduarte, debes dejar tu marca en la base de datos.</p>
    <p>Inserta un nuevo estudiante con tu nombre de usuario: <strong>'AprendeSQL'</strong> y una edad de <strong>99</strong> años. Deja la ciudad en blanco (NULL) o pon la que prefieras.</p>
  `,
  initialCode: '-- ¡Completa tu última misión!\nINSERT INTO estudiantes (nombre, edad) \nVALUES (\' \', );',
  expectedOutput: 'insert_final',
  hint: "Usa: INSERT INTO estudiantes (nombre, edad) VALUES ('AprendeSQL', 99);"
};
