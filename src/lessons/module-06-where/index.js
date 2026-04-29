export default {
  id: 6,
  title: '6. Filtrado (WHERE)',
  description: 'Condiciones y lógica de selección',
  content: `
    <h3>La Selección de Datos</h3>
    <p>Mientras que SELECT corta la tabla verticalmente, la cláusula <strong>WHERE</strong> la corta horizontalmente. Es el "filtro" que decide qué filas se muestran y cuáles no.</p>

    <div class="schema-visual">
      <div class="table-card" style="border-top: 4px solid var(--accent);">
        <div class="table-card-header">Filtrado Horizontal (Selección)</div>
        <table class="results-table">
          <thead><tr><th>nombre</th><th>edad</th><th>ciudad</th></tr></thead>
          <tbody>
            <tr style="opacity: 0.5;"><td>Ana García</td><td>20</td><td>Madrid</td></tr>
            <tr style="background: rgba(245, 158, 11, 0.2); font-weight: bold; border: 2px solid var(--accent);"><td>Carlos Ruiz</td><td>22</td><td>Barcelona</td></tr>
            <tr style="opacity: 0.5;"><td>María López</td><td>19</td><td>Valencia</td></tr>
          </tbody>
        </table>
        <div style="padding: 10px; font-size: 0.8rem; text-align: center; color: var(--accent);">↑ Fila que cumple la condición ↑</div>
      </div>
    </div>

    <h3>1. Operadores de Comparación</h3>
    <p>Son las herramientas básicas para comparar valores:</p>
    <ul>
      <li><code>=</code> : Igual a. (ej: <code>ciudad = 'Madrid'</code>)</li>
      <li><code>!=</code> o <code><></code> : Diferente de. (ej: <code>edad <> 20</code>)</li>
      <li><code>></code> , <code><</code> : Mayor que, Menor que. (ej: <code>edad > 18</code>)</li>
      <li><code>>=</code> , <code><=</code> : Mayor o igual, Menor o igual.</li>
    </ul>

    <div class="tip-box">
      <strong>💡 Ejemplo rápido:</strong>
      <pre><code>SELECT * FROM estudiantes WHERE edad >= 21;</code></pre>
      <em>Esto nos daría a Carlos, Juan y Laura.</em>
    </div>

    <h3>2. Operadores Lógicos</h3>
    <p>Permiten combinar múltiples filtros para búsquedas complejas:</p>
    <ul>
      <li><strong>AND:</strong> Ambas condiciones deben ser ciertas.
        <pre><code>SELECT * FROM estudiantes WHERE ciudad = 'Madrid' AND edad > 18;</code></pre>
      </li>
      <li><strong>OR:</strong> Al menos una condición debe ser cierta.
        <pre><code>SELECT * FROM estudiantes WHERE ciudad = 'Sevilla' OR ciudad = 'Bilbao';</code></pre>
      </li>
      <li><strong>NOT:</strong> Invierte la condición (lo que NO sea...).
        <pre><code>SELECT * FROM estudiantes WHERE NOT ciudad = 'Madrid';</code></pre>
      </li>
    </ul>

    <h3>3. Patrones y Rangos (Operadores Especiales)</h3>
    <p>A veces no buscas un valor exacto, sino una "idea" o un grupo:</p>
    <ul>
      <li><strong>BETWEEN:</strong> Filtra en un rango inclusivo (números o fechas).
        <pre><code>SELECT * FROM estudiantes WHERE edad BETWEEN 18 AND 20;</code></pre>
      </li>
      <li><strong>IN:</strong> Filtra si el valor coincide con cualquiera de una lista.
        <pre><code>SELECT * FROM estudiantes WHERE ciudad IN ('Madrid', 'Valencia', 'Barcelona');</code></pre>
      </li>
      <li><strong>LIKE:</strong> Busca patrones de texto usando <code>%</code> como comodín.
        <pre><code>SELECT * FROM estudiantes WHERE nombre LIKE 'A%'; -- Empiezan con A</code></pre>
      </li>
    </ul>

    <div class="warning-box">
      <strong>⚠️ El caso especial de NULL</strong>
      En SQL, "nada" no es igual a nada (<code>= NULL</code> siempre falla). 
      Para encontrar registros vacíos usa: <code>WHERE columna IS NULL</code> o <code>IS NOT NULL</code>.
    </div>

    <h3>Reto WHERE</h3>
    <p>Estamos organizando un evento para alumnos mayores de 20 años que vivan en las sedes de 'Madrid' o 'Valencia'. 
    Escribe la consulta que los encuentre.</p>
  `,
  initialCode: '-- Filtra por ciudad (Madrid o Valencia) Y edad (> 20)\nSELECT ',
  expectedOutput: 'where_pro',
  hint: "Usa: WHERE ciudad IN ('Madrid', 'Valencia') AND edad > 20;"
};
