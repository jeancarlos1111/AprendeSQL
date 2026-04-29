export default {
  id: 3,
  title: '3. Normalización',
  description: 'Evitando la redundancia de datos',
  content: `
    <h3>¿Por qué Normalizar?</h3>
    <p>La normalización es el proceso de organizar los datos para evitar <strong>anomalías</strong>. Imagina que un cliente cambia de dirección: si esa dirección está repetida en 50 pedidos, ¡tendrías que actualizarla 50 veces! Si olvidas una, los datos pierden integridad.</p>

    <div class="warning-box">
      <strong>⚠️ El Caos de los Datos Duplicados</strong>
      Sin normalización, tu base de datos se vuelve lenta, consume espacio innecesario y es propensa a errores humanos.
    </div>

    <h3>1. Primera Forma Normal (1FN): Atomedicidad</h3>
    <p>La regla es simple: <strong>Un valor por cada celda</strong>. Evita las listas separadas por comas.</p>
    
    <div class="schema-visual">
      <div class="table-card" style="border-left: 4px solid var(--danger);">
        <div class="table-card-header">🔴 ANTES (Incorrecto)</div>
        <table class="results-table">
          <thead><tr><th>ID</th><th>Cliente</th><th>Productos</th></tr></thead>
          <tbody><tr><td>1</td><td>Ana</td><td>Laptop, Mouse</td></tr></tbody>
        </table>
      </div>
      <div class="visual-connector">▶</div>
      <div class="table-card" style="border-left: 4px solid var(--secondary);">
        <div class="table-card-header">🟢 DESPUÉS (1FN)</div>
        <table class="results-table">
          <thead><tr><th>ID</th><th>Cliente</th><th>Producto</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>Ana</td><td>Laptop</td></tr>
            <tr><td>1</td><td>Ana</td><td>Mouse</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <h3>2. Segunda Forma Normal (2FN): Dependencia Total</h3>
    <p>Debes cumplir la 1FN y asegurar que cada columna dependa de la <strong>Clave Primaria completa</strong>. Si algo no depende de la clave, sepáralo en otra tabla.</p>
    
    <div class="tip-box">
      <strong>💡 Ejemplo</strong>
      En la tabla anterior, el "Nombre del Cliente" no tiene nada que ver con el "Producto". Debemos separar <strong>Clientes</strong> de <strong>Ventas</strong>.
    </div>

    <h3>3. Tercera Forma Normal (3FN): Independencia Transitiva</h3>
    <p>La regla de oro: Una columna no debe depender de otra columna que no sea la clave primaria. <strong>"Cada dato en su sitio"</strong>.</p>

    <div class="schema-visual">
      <div class="table-card">
        <div class="table-card-header">CLIENTES</div>
        <table class="results-table">
          <thead><tr><th>ID</th><th>Nombre</th><th>Email</th></tr></thead>
          <tbody><tr><td>1</td><td>Ana</td><td>ana@mail.com</td></tr></tbody>
        </table>
      </div>
      <div class="table-card">
        <div class="table-card-header">PRODUCTOS</div>
        <table class="results-table">
          <thead><tr><th>ID</th><th>Nombre</th><th>Precio</th></tr></thead>
          <tbody><tr><td>50</td><td>Laptop</td><td>$900</td></tr></tbody>
        </table>
      </div>
    </div>

    <p class="mt-lg">Al final, tenemos tablas pequeñas, rápidas y conectadas mediante IDs, eliminando el riesgo de datos inconsistentes.</p>

    <h3>Práctica Conceptual</h3>
    <p>Para confirmar que dominas las Formas Normales, escribe:</p>
    <pre><code>-- Entiendo la 1FN, 2FN y 3FN</code></pre>
  `,
  initialCode: '-- Escribe aquí tu confirmación\n',
  expectedOutput: 'teoria_norm_deep',
  hint: 'Escribe: -- Entiendo la 1FN, 2FN y 3FN'
};
