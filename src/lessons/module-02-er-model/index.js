export default {
  id: 2,
  title: '2. Modelo Entidad-Relación (ER)',
  description: 'Diseñando la estructura de los datos',
  content: `
    <h3>El Mapa antes del Viaje</h3>
    <p>Antes de escribir una sola línea de SQL, un profesional de datos debe diseñar. Imagina intentar construir un rascacielos sin planos; terminaría en desastre. El <strong>Modelo Entidad-Relación (ER)</strong> es ese plano para tu base de datos.</p>

    <div class="tip-box">
      <strong>💡 ¿Por qué diseñar?</strong>
      Diseñar primero te ayuda a entender el negocio, evitar duplicidad de datos y asegurar que la base de datos pueda crecer sin romperse en el futuro.
    </div>

    <h3>1. Entidades (Los Protagonistas)</h3>
    <p>Una entidad es cualquier objeto, persona o concepto del que queremos guardar información. Se representan gráficamente como rectángulos.</p>
    
    <div class="schema-visual">
      <div class="table-card" style="border-left: 4px solid var(--primary);">
        <div class="table-card-header">ENTIDAD: Cliente</div>
        <div class="table-card-content">
          <p style="font-size: 0.8rem; color: var(--gray-500);">Representa a las personas que compran en nuestra tienda.</p>
        </div>
      </div>
      <div class="table-card" style="border-left: 4px solid var(--secondary);">
        <div class="table-card-header">ENTIDAD: Producto</div>
        <div class="table-card-content">
          <p style="font-size: 0.8rem; color: var(--gray-500);">Representa los artículos que vendemos.</p>
        </div>
      </div>
    </div>

    <h3>2. Atributos (Las Características)</h3>
    <p>Los atributos son las propiedades que definen a una entidad. Por ejemplo, un <strong>Cliente</strong> tiene nombre, email y teléfono.</p>
    
    <div class="info-box">
      <strong>🔑 La Clave Primaria (PK)</strong>
      Es el atributo más importante. Es un identificador único (como el DNI o el ID) que garantiza que no haya dos registros iguales en la tabla.
    </div>

    <h3>3. Relaciones y Cardinalidad</h3>
    <p>Las relaciones definen cómo interactúan las entidades entre sí. La <strong>cardinalidad</strong> nos dice cuántos elementos de un lado se conectan con el otro.</p>

    <ul>
      <li><strong>1:1 (Uno a Uno):</strong> Un Usuario tiene un solo Perfil. Poco común, pero útil para seguridad.</li>
      <li><strong>1:N (Uno a Muchos):</strong> Un <strong>Cliente</strong> puede realizar muchos <strong>Pedidos</strong>. Es la relación más común en bases de datos.</li>
      <li><strong>N:M (Muchos a Muchos):</strong> Un <strong>Pedido</strong> puede contener muchos <strong>Productos</strong>, y un <strong>Producto</strong> puede estar en muchos <strong>Pedidos</strong>.</li>
    </ul>

    <div class="warning-box">
      <strong>🔗 Visualizando una Relación 1:N</strong>
      Abajo vemos cómo el Cliente se conecta con sus Pedidos mediante un ID común.
    </div>

    <div class="schema-visual">
      <div class="table-card">
        <div class="table-card-header">CLIENTES</div>
        <div class="table-card-content">
          <div class="column-item"><span class="column-name">id (PK)</span> <span class="column-type">101</span></div>
          <div class="column-item"><span class="column-name">nombre</span> <span class="column-type">Juan Perez</span></div>
        </div>
      </div>
      <div class="visual-connector">────────▶</div>
      <div class="table-card">
        <div class="table-card-header">PEDIDOS</div>
        <div class="table-card-content">
          <div class="column-item"><span class="column-name">id_pedido</span> <span class="column-type">5001</span></div>
          <div class="column-item"><span class="column-name">cliente_id (FK)</span> <span class="column-type">101</span></div>
        </div>
      </div>
    </div>

    <p class="mt-lg">Como ves, el <code>cliente_id</code> en la tabla de Pedidos nos dice exactamente a quién pertenece esa compra. A esto se le llama <strong>Clave Foránea (FK)</strong>.</p>

    <h3>Práctica Conceptual</h3>
    <p>Para confirmar que has entendido estos pilares del diseño de datos, escribe el siguiente comando en el editor:</p>
    <pre><code>-- Comprendo Entidades, Atributos y Relaciones 1:N</code></pre>
  `,
  initialCode: '-- Escribe aquí tu confirmación\n',
  expectedOutput: 'teoria_er_deep',
  hint: 'Escribe: -- Comprendo Entidades, Atributos y Relaciones 1:N'
};
