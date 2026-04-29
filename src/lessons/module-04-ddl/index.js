export default {
  id: 4,
  title: '4. Creación de Tablas (DDL)',
  description: 'De la teoría a la práctica con CREATE TABLE',
  content: `
    <h3>Paso 1: El Esqueleto (Básico)</h3>
    <p>Para crear una tabla necesitamos un nombre y una lista de columnas con sus tipos. Sin embargo, una tabla sin reglas es peligrosa.</p>
    <pre><code>-- Tabla "vulnerable"
CREATE TABLE usuarios (
  id INT,
  nombre TEXT
);</code></pre>

    <h3>Paso 2: La Armadura (Restricciones)</h3>
    <p>Añadimos reglas para evitar datos vacíos o correos duplicados usando <strong>NOT NULL</strong> y <strong>UNIQUE</strong>.</p>
    <pre><code>CREATE TABLE usuarios (
  id INT,
  nombre TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL
);</code></pre>

    <div class="info-box">
      <strong>🔑 El Identificador: PRIMARY KEY</strong>
      Cada tabla necesita un líder. La <code>PRIMARY KEY</code> identifica de forma única cada fila y nunca puede ser nula. Además, podemos usar <code>AUTOINCREMENT</code> para que SQL genere los números por nosotros.
    </div>

    <h3>Paso 3: Conexiones (FOREIGN KEY)</h3>
    <p>Aquí es donde las tablas se "hablan" entre sí. Una <strong>Clave Foránea (FK)</strong> permite que una tabla dependa de otra, manteniendo la integridad referencial.</p>
    
    <div class="schema-visual">
      <div class="table-card">
        <div class="table-card-header">CLIENTES (Padre)</div>
        <div class="table-card-content">
          <div class="column-item"><span class="column-name">id (PK)</span></div>
        </div>
      </div>
      <div class="visual-connector">─▶</div>
      <div class="table-card">
        <div class="table-card-header">PEDIDOS (Hijo)</div>
        <div class="table-card-content">
          <div class="column-item"><span class="column-name">cliente_id (FK)</span></div>
        </div>
      </div>
    </div>

    <pre><code>-- Ejemplo de conexión
CREATE TABLE pedidos (
  id INT PRIMARY KEY AUTOINCREMENT,
  monto INT,
  cliente_id INT,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);</code></pre>

    <h3>Paso 4: El Control Total (DEFAULT y CHECK)</h3>
    <p>Podemos dar valores por defecto o validar reglas de negocio directamente en el motor.</p>
    <pre><code>CREATE TABLE empleados (
  id INT PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  salario INT CHECK (salario > 0),
  estado TEXT DEFAULT 'activo'
);</code></pre>

    <div class="tip-box">
      <strong>🚀 ¡A Practicar!</strong>
      Crea una tabla llamada <code>empleados</code> con:
      1. <code>id</code> (PK, entero, autoincremental).
      2. <code>nombre</code> (Texto, no nulo).
      3. <code>salario</code> (Entero, obligatorio mayor a 0).
    </div>
  `,
  initialCode: '-- Define aquí la tabla empleados\n',
  expectedOutput: 'ddl_create_pro_v2',
  hint: 'Sintaxis: CREATE TABLE empleados (id INT PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, salario INT CHECK (salario > 0));'
};
