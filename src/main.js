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
const toastContainer = document.getElementById('toast-container');

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

  renderModuleList();
  showToast(`Módulo ${index + 1}: ${module.title}`, 'info');
}

// Update Progress Badge
function updateProgress() {
  progressBadge.textContent = `${completedModules.size}/${curriculum.length} Módulos`;
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
  const module = curriculum[currentModule];
  const sqlUpper = sql.toUpperCase().trim();

  // Simple validation based on expected output type
  let isComplete = false;

  switch (module.expectedOutput) {
    case 'estudiantes':
      isComplete = sqlUpper.includes('SELECT') && sqlUpper.includes('FROM ESTUDIANTES');
      break;
    case 'filtro':
      isComplete =
        sqlUpper.includes('WHERE') && sqlUpper.includes('EDAD') && sqlUpper.includes('>');
      break;
    case 'orden':
      isComplete = sqlUpper.includes('ORDER BY') && sqlUpper.includes('DESC');
      break;
    case 'agregacion':
      isComplete =
        sqlUpper.includes('COUNT') || sqlUpper.includes('SUM') || sqlUpper.includes('AVG');
      break;
    case 'grupo':
      isComplete = sqlUpper.includes('GROUP BY');
      break;
    case 'join':
      isComplete = sqlUpper.includes('JOIN');
      break;
    case 'insert':
      isComplete = sqlUpper.includes('INSERT INTO');
      break;
    case 'update':
      isComplete =
        sqlUpper.includes('UPDATE') && sqlUpper.includes('SET') && sqlUpper.includes('WHERE');
      break;
    case 'delete':
      isComplete = sqlUpper.includes('DELETE FROM') && sqlUpper.includes('WHERE');
      break;
  }

  if (isComplete && !completedModules.has(currentModule)) {
    completedModules.add(currentModule);
    renderModuleList();
    showToast('¡Módulo completado! 🎉', 'success');

    // Auto-advance to next module after delay
    if (currentModule < curriculum.length - 1) {
      setTimeout(() => {
        loadModule(currentModule + 1);
      }, 2000);
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
        showToast('¡Gracias por instalar SQL Learn!', 'success');
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
}

// Initialize App
function init() {
  initEditor();
  setupEventListeners();
  setupPWAInstall();
  loadModule(0);

  // Welcome message
  setTimeout(() => {
    showToast('¡Bienvenido a SQL Learn! Comienza tu aprendizaje', 'success');
  }, 500);
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
