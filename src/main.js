import './styles/main.css';
import CodeMirror from 'codemirror';
import 'codemirror/mode/sql/sql';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/matchbrackets';
import database from './utils/database.js';
import curriculum from './modules/curriculum.js';

// State
let currentModule = 0;
let completedModules = new Set();
let editor = null;
let deferredPrompt = null;

// Persistence Keys
const STORAGE_KEY = 'aprendesql_progress';

// Progress Persistence
function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(completedModules)));
}

function loadProgress() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const array = JSON.parse(saved);
      completedModules = new Set(array);
    } catch (e) {
      console.error('Error loading progress:', e);
      completedModules = new Set();
    }
  }
}

// DOM Elements
const moduleList = document.getElementById('module-list');
const lessonTitle = document.getElementById('lesson-title');
const lessonContent = document.getElementById('lesson-content');
const resultsContent = document.getElementById('results-content');
const executionTime = document.getElementById('execution-time');
const progressBadge = document.getElementById('progress-badge');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const btnRun = document.getElementById('btn-run');
const btnClear = document.getElementById('btn-clear');
const btnInstall = document.getElementById('btn-install');
const btnFreePractice = document.getElementById('btn-free-practice');
const btnExport = document.getElementById('btn-export');
const btnImport = document.getElementById('btn-import');
const importFileInput = document.getElementById('import-file');
const toastContainer = document.getElementById('toast-container');
const dbSchemaContainer = document.getElementById('db-schema');

// Initialize CodeMirror Editor
function initEditor() {
  const textarea = document.getElementById('sql-editor');
  editor = CodeMirror.fromTextArea(textarea, {
    mode: 'text/x-sql',
    theme: 'dracula',
    lineNumbers: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    indentUnit: 2,
    tabSize: 2,
    lineWrapping: true,
    extraKeys: {
      'Ctrl-Enter': runQuery,
      'Cmd-Enter': runQuery
    }
  });

  // Set initial height
  editor.setSize(null, '200px');
}

// Render Module List
function renderModuleList() {
  moduleList.innerHTML = '';

  curriculum.forEach((module, index) => {
    const item = document.createElement('div');
    item.className = `module-item ${index === currentModule ? 'active' : ''} ${completedModules.has(index) ? 'completed' : ''}`;
    item.onclick = () => loadModule(index);

    const statusIcon = completedModules.has(index)
      ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>'
      : `${index + 1}`;

    item.innerHTML = `
      <div class="module-number">${index + 1}</div>
      <div class="module-status">${statusIcon}</div>
      <div class="module-info">
        <div class="module-title">${module.title}</div>
        <div class="module-description">${module.description}</div>
      </div>
    `;

    moduleList.appendChild(item);
  });

  updateProgress();
}

// Load Module
function loadModule(index) {
  if (index < 0 || index >= curriculum.length) return;

  currentModule = index;
  const module = curriculum[index];

  lessonTitle.textContent = module.title;
  lessonContent.innerHTML = module.content;
  editor.setValue(module.initialCode);

  // Clear results
  resultsContent.innerHTML =
    '<p class="placeholder-text">Ejecuta una consulta para ver los resultados</p>';
  executionTime.textContent = '';

  // Update navigation
  btnPrev.disabled = index === 0;
  btnNext.textContent = index === curriculum.length - 1 ? '¡Completado!' : 'Siguiente →';
  btnNext.classList.remove('pulse-btn');

  renderModuleList();
  showToast(index === 999 ? 'Modo Práctica Libre' : `Módulo ${index + 1}: ${module.title}`, 'info');
}

// Load Free Practice Mode
function loadFreePractice() {
  currentModule = 999;

  lessonTitle.textContent = 'Modo Práctica Libre';
  lessonContent.innerHTML = `
    <h3>Explora y Practica</h3>
    <p>En este modo puedes ejecutar cualquier consulta SQL sin restricciones. Experimenta con las tablas existentes o crea las tuyas propias.</p>
    
    <div class="info-box">
      <strong>📋 Tablas Disponibles</strong>
      <ul>
        <li><code>estudiantes</code>: Datos de alumnos</li>
        <li><code>ciudades</code>: Datos de ciudades</li>
      </ul>
    </div>

    <div class="flex gap-sm mt-md">
      <button id="btn-show-schema" class="btn btn-outline btn-sm" style="color: var(--primary); border-color: var(--primary);">
        Ver Esquema Gráfico
      </button>
      <button id="btn-reset-db" class="btn btn-danger btn-sm">
        Resetear Base de Datos
      </button>
    </div>
  `;

  // Attach listeners
  setTimeout(() => {
    document.getElementById('btn-show-schema')?.addEventListener('click', showSchema);
    document.getElementById('btn-reset-db')?.addEventListener('click', resetDatabase);
  }, 100);

  editor.setValue('-- Escribe aquí tus consultas libres\nSELECT * FROM estudiantes;');

  // Clear results
  resultsContent.innerHTML =
    '<p class="placeholder-text">Ejecuta una consulta para ver los resultados</p>';
  executionTime.textContent = '';

  // Update navigation
  btnPrev.disabled = false;
  btnNext.textContent = 'Lecciones →';

  renderModuleList();
  showToast('Modo Práctica Libre activado', 'success');
}

// Render Database Schema in Sidebar
function renderSchema() {
  if (!dbSchemaContainer) return;
  
  const schema = database.getSchema();
  const tableNames = Object.keys(schema);
  
  if (tableNames.length === 0) {
    dbSchemaContainer.innerHTML = '<p class="placeholder-text" style="font-size: 0.8rem; padding: 10px;">No hay tablas creadas.</p>';
    return;
  }

  let html = '';
  tableNames.forEach(table => {
    html += `
      <div class="table-card" style="margin-bottom: var(--spacing-md); border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--gray-200);">
        <div class="table-card-header" style="background: var(--gray-700); padding: 6px 10px; font-size: 0.8rem;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="3" y1="9" x2="21" y2="9"></line>
            <line x1="9" y1="21" x2="9" y2="9"></line>
          </svg>
          ${table.toUpperCase()}
        </div>
        <div class="table-card-content" style="padding: 8px 10px; gap: 4px;">
    `;

    schema[table].forEach(col => {
      html += `
        <div class="column-item" style="padding: 2px 0;">
          <span class="column-name" style="font-size: 0.75rem;">${col.name}</span>
          <span class="column-type" style="font-size: 0.7rem;">${col.type.toLowerCase()}</span>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;
  });

  dbSchemaContainer.innerHTML = html;
}

// Show Schema in Results Area
function showSchema() {
  renderSchema(); // Always sync sidebar
  const schema = database.getSchema();
  const tables = Object.keys(schema);
  let html = '<h3>Estructura del Esquema</h3>';
  html += '<div class="schema-visual">';

  tables.forEach(table => {
    html += `
      <div class="table-card">
        <div class="table-card-header">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="3" y1="9" x2="21" y2="9"></line>
            <line x1="9" y1="21" x2="9" y2="9"></line>
          </svg>
          ${table.toUpperCase()}
        </div>
        <div class="table-card-content">
    `;

    schema[table].forEach(col => {
      html += `
        <div class="column-item">
          <span class="column-name">${col.name}</span>
          <span class="column-type">${col.type.toLowerCase()}</span>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;
  });

  html += '</div>';
  resultsContent.innerHTML = html;
  showToast('Esquema visual generado', 'info');
}

// Reset Database
function resetDatabase() {
  if (confirm('¿Estás seguro de que deseas resetear la base de datos? Se perderán todos los cambios que hayas hecho en las tablas de práctica.')) {
    database.resetDatabase();
    showToast('Base de datos reseteada a su estado original', 'success');
    renderSchema();
    if (currentModule === 999) loadFreePractice();
  }
}

// Export Progress
function exportProgress() {
  const progress = {
    completedModules: Array.from(completedModules),
    exportDate: new Date().toISOString(),
    version: '1.0'
  };

  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(progress));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href', dataStr);
  downloadAnchorNode.setAttribute('download', 'aprendesql_progress.json');
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();

  showToast('Progreso exportado correctamente', 'success');
}

// Import Progress
function importProgress(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result);
      if (data.completedModules && Array.isArray(data.completedModules)) {
        completedModules = new Set(data.completedModules);
        saveProgress();
        renderModuleList();
        loadModule(currentModule >= 999 ? 0 : currentModule);
        renderSchema();
        showToast('Progreso importado con éxito', 'success');
      } else {
        throw new Error('Formato inválido');
      }
    } catch (err) {
      showToast('Error al importar el archivo: ' + err.message, 'error');
    }
  };
  reader.readAsText(file);
  // Reset input
  event.target.value = '';
}

// Update Progress Badge
function updateProgress() {
  const count = completedModules.size;
  const total = curriculum.length;
  let rank = 'Novato';

  if (count === total) rank = 'Maestro SQL';
  else if (count >= 8) rank = 'Experto';
  else if (count >= 4) rank = 'Aprendiz';

  progressBadge.textContent = `${count}/${total} - ${rank}`;
}

// Run Query
function runQuery() {
  const sql = editor.getValue();
  const startTime = performance.now();

  const result = database.executeQuery(sql);
  const endTime = performance.now();

  if (result.success) {
    displayResults(result.data);
    executionTime.textContent = `${result.executionTime}ms`;

    // Update schema visualization if DDL or DML that might change schema
    const upperSql = sql.toUpperCase();
    if (upperSql.includes('CREATE') || upperSql.includes('DROP') || upperSql.includes('ALTER')) {
      renderSchema();
    }

    // Check if module should be marked as complete
    checkModuleCompletion(sql);

    showToast('Consulta ejecutada exitosamente', 'success');
  } else {
    displayError(result.error);
    executionTime.textContent = '';
    showToast('Error en la consulta', 'error');
  }
}

// Display Results
function displayResults(data) {
  if (!data || data.length === 0) {
    resultsContent.innerHTML = '<p class="placeholder-text">La consulta no devolvió resultados</p>';
    return;
  }

  const columns = Object.keys(data[0]);

  let html = '<table class="results-table"><thead><tr>';
  columns.forEach(col => {
    html += `<th>${col}</th>`;
  });
  html += '</tr></thead><tbody>';

  data.forEach(row => {
    html += '<tr>';
    columns.forEach(col => {
      html += `<td>${row[col] !== null ? row[col] : 'NULL'}</td>`;
    });
    html += '</tr>';
  });

  html += '</tbody></table>';
  html += `<p class="text-muted mt-sm">${data.length} registro(s)</p>`;

  resultsContent.innerHTML = html;
}

// Display Error
function displayError(error) {
  resultsContent.innerHTML = `
    <div class="error-message">
      <strong>Error:</strong><br>
      ${error}
    </div>
  `;
}

// Check Module Completion
function checkModuleCompletion(sql) {
  if (currentModule === 999) return; // Skip in free practice

  const module = curriculum[currentModule];
  const sqlUpper = sql.toUpperCase().trim();

  // Simple validation based on expected output type
  let isComplete = false;

  switch (module.expectedOutput) {
    case 'estudiantes':
      isComplete = sqlUpper.includes('SELECT') && sqlUpper.includes('FROM ESTUDIANTES');
      break;
    case 'teoria':
    case 'teoria_er_deep':
    case 'teoria_norm_deep':
      isComplete = sqlUpper.includes('--');
      break;
    case 'ddl_create':
    case 'ddl_create_pro':
    case 'ddl_create_pro_v2':
      isComplete = sqlUpper.includes('CREATE TABLE') && 
                   sqlUpper.includes('EMPLEADOS') && 
                   sqlUpper.includes('PRIMARY KEY') &&
                   sqlUpper.includes('NOT NULL') &&
                   sqlUpper.includes('CHECK');
      break;
    case 'select_nombre':
    case 'select_alias':
    case 'select_distinct_pro':
      isComplete = sqlUpper.includes('SELECT') && 
                   sqlUpper.includes('DISTINCT') && 
                   sqlUpper.includes('CIUDAD');
      break;
    case 'where_complex':
    case 'where_pro':
      isComplete = sqlUpper.includes('WHERE') && 
                   (sqlUpper.includes('IN') || (sqlUpper.includes('MADRID') && sqlUpper.includes('VALENCIA'))) && 
                   sqlUpper.includes('EDAD');
      break;
    case 'order_limit':
    case 'order_limit_pro':
      isComplete = sqlUpper.includes('ORDER BY') && 
                   sqlUpper.includes('LIMIT') && 
                   sqlUpper.includes('MADRID');
      break;
    case 'avg_edad':
    case 'group_having_pro':
      isComplete = sqlUpper.includes('GROUP BY') && 
                   sqlUpper.includes('HAVING') && 
                   sqlUpper.includes('COUNT');
      break;
    case 'join':
    case 'join_left_pro':
      isComplete = sqlUpper.includes('JOIN') && 
                   sqlUpper.includes('LEFT') && 
                   sqlUpper.includes('ON');
      break;
    case 'subquery_challenge':
    case 'subquery_pro':
      isComplete = sqlUpper.includes('WHERE') && 
                   sqlUpper.includes('(') && 
                   sqlUpper.includes('SELECT') && 
                   sqlUpper.includes(')');
      break;
    case 'insert_final':
      isComplete = sqlUpper.includes('INSERT INTO') && (sqlUpper.includes('ANTIGRAVITY') || sqlUpper.includes('99'));
      break;
  }

  if (isComplete && !completedModules.has(currentModule)) {
    completedModules.add(currentModule);
    saveProgress();
    renderModuleList();

    const isChallenge = module.expectedOutput.startsWith('desafio');
    showToast(isChallenge ? '🏆 ¡RETO SUPERADO! 🏆' : '🎉 ¡Módulo completado con éxito! 🎉', 'success');

    // Highlight Next button
    if (currentModule < curriculum.length - 1) {
      btnNext.classList.add('pulse-btn');
    }
  }
}

// Clear Editor and Results
function clearEditor() {
  editor.setValue('');
  resultsContent.innerHTML =
    '<p class="placeholder-text">Ejecuta una consulta para ver los resultados</p>';
  executionTime.textContent = '';
  editor.focus();
}

// Toast Notification
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const icons = {
    success:
      '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
    error:
      '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>',
    info: '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>',
    warning:
      '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>'
  };

  toast.innerHTML = `
    ${icons[type] || icons.info}
    <span class="toast-message">${message}</span>
  `;

  toastContainer.appendChild(toast);

  // Auto-remove after 3 seconds
  setTimeout(() => {
    toast.style.animation = 'slideIn 0.3s ease reverse';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// PWA Install Handler
function setupPWAInstall() {
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredPrompt = e;
    btnInstall.style.display = 'flex';
  });

  btnInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        showToast('¡Gracias por instalar AprendeSQL!', 'success');
      }

      deferredPrompt = null;
      btnInstall.style.display = 'none';
    }
  });

  // Hide install button if already installed
  window.addEventListener('appinstalled', () => {
    btnInstall.style.display = 'none';
    deferredPrompt = null;
  });
}

// Event Listeners
function setupEventListeners() {
  btnPrev.addEventListener('click', () => loadModule(currentModule - 1));
  btnNext.addEventListener('click', () => {
    if (currentModule < curriculum.length - 1) {
      loadModule(currentModule + 1);
    }
  });

  btnRun.addEventListener('click', runQuery);
  btnClear.addEventListener('click', clearEditor);
  btnFreePractice.addEventListener('click', loadFreePractice);
  btnExport.addEventListener('click', exportProgress);
  btnImport.addEventListener('click', () => importFileInput.click());
  importFileInput.addEventListener('change', importProgress);
}

// Initialize App
function init() {
  initEditor();
  setupEventListeners();
  setupPWAInstall();
  loadProgress();
  loadModule(0);

  // Welcome message
  setTimeout(() => {
    showToast('¡Bienvenido a AprendeSQL! Comienza tu aprendizaje', 'success');
  }, 500);
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
