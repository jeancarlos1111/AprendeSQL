# AprendeSQL PWA - Herramienta Interactiva de Aprendizaje de SQL

## 📋 Descripción del Proyecto

**AprendeSQL PWA** es una herramienta educativa interactiva diseñada para que estudiantes aprendan SQL directamente desde su navegador web, sin necesidad de configuraciones complejas ni dependencias de backend.

## 🎯 Objetivo Principal

Proporcionar una plataforma accesible, gratuita y offline-first que permita a los estudiantes:

- Aprender SQL desde cero mediante una guía didáctica paso a paso
- Practicar comandos SQL en un entorno interactivo y seguro
- Progresar a su propio ritmo con ejercicios prácticos y retroalimentación inmediata
- Acceder al contenido sin conexión a internet gracias a las capacidades PWA

## ✨ Características Principales

### 🔹 Arquitectura Sin Backend (Backend-less)

- **100% Client-side**: Toda la lógica se ejecuta en el navegador del usuario
- **SQL Engine en JavaScript**: Utiliza [AlaSQL](https://github.com/AlaSQL/alasql) o [SQL.js](https://sql.js.org/) para procesar consultas SQL directamente en el cliente
- **Base de datos en memoria**: Datos temporales almacenados en IndexedDB o localStorage
- **Sin servidor requerido**: Fácil despliegue en cualquier hosting estático (GitHub Pages, Netlify, Vercel, etc.)

### 🔹 Progressive Web App (PWA)

- **Funcionamiento offline**: Una vez cargada, la aplicación funciona sin conexión a internet
- **Instalable**: Los usuarios pueden instalar la app en sus dispositivos móviles y de escritorio
- **Service Workers**: Caché inteligente de recursos para mejor rendimiento
- **Responsive Design**: Interfaz adaptada para móviles, tablets y escritorio
- **Manifest file**: Configuración completa para instalación nativa

### 🔹 Guía Didáctica Interactiva

- **Aprendizaje paso a paso**: Lecciones estructuradas desde conceptos básicos hasta avanzados
- **Módulos progresivos**:
  1. **Introducción a las bases de datos**: Conceptos generales, SGBD, bases de datos relacionales vs NoSQL.
  2. **Modelado Entidad-Relación (ER)**: Entidades, atributos, y tipos de relaciones (1:1, 1:N, N:M).
  3. **Normalización de Bases de Datos**: Claves primarias (PK), foráneas (FK) y las formas normales (1NF, 2NF, 3NF).
  4. **Creación y modificación de tablas (DDL)**: `CREATE TABLE`, tipos de datos, `ALTER TABLE`.
  5. **Consultas SELECT básicas**: `SELECT`, `AS`, `DISTINCT`.
  6. **Filtrado con WHERE**: Operadores lógicos, `LIKE`, `IN`, `BETWEEN`.
  7. **Ordenamiento y Paginación**: `ORDER BY`, `LIMIT`.
  8. **Funciones agregadas**: `COUNT`, `SUM`, `AVG`, `MAX`, `MIN` y `GROUP BY`.
  9. **JOINs y relaciones entre tablas**: `INNER JOIN`, `LEFT JOIN` aplicando relaciones de bases de datos.
  10. **Subconsultas**: Consultas anidadas.
  11. **Modificación de datos (DML)**: `INSERT`, `UPDATE`, `DELETE`.

- **Ejemplos interactivos**: Cada concepto incluye ejemplos ejecutables
- **Ejercicios prácticos**: Retos con validación automática
- **Pistas y soluciones**: Ayuda contextual cuando el estudiante se atasca
- **Sistema de progreso**: Tracking del avance del usuario

### 🔹 Entorno de Práctica Interactivo

- **Editor de código SQL**: Con resaltado de sintaxis y autocompletado
- **Ejecución en tiempo real**: Resultados inmediatos de las consultas
- **Visualización de datos**: Tablas interactivas para mostrar resultados
- **Consola de errores**: Mensajes claros y educativos para depuración
- **Datos de ejemplo**: Conjuntos de datos predefinidos para practicar

## 🛠️ Stack Tecnológico Recomendado

### Frontend

- **Framework**: React, Vue.js o Svelte (opcional, puede ser vanilla JS)
- **SQL Engine**: AlaSQL o SQL.js
- **Editor de código**: Monaco Editor (VS Code) o CodeMirror
- **Estilizado**: CSS3, TailwindCSS o Styled Components
- **Estado**: Context API, Vuex, Pinia o Zustand

### PWA

- **Service Workers**: Workbox o implementación nativa
- **Manifest**: Web App Manifest para instalabilidad
- **IndexedDB**: Para almacenamiento local de datos y progreso
- **Cache API**: Para almacenamiento de recursos estáticos

### Herramientas de Desarrollo

- **Build**: Vite, Webpack o Parcel
- **Testing**: Jest, Vitest o Cypress
- **Linting**: ESLint + Prettier
- **Control de versiones**: Git

## 📁 Estructura del Proyecto

```
aprendesql-pwa/
├── public/
│   ├── manifest.json
│   ├── icons/
│   └── sw.js (Service Worker)
├── src/
│   ├── components/
│   │   ├── Editor/
│   │   ├── ResultsTable/
│   │   ├── LessonNavigator/
│   │   └── ProgressBar/
│   ├── lessons/
│   │   ├── module-01-intro/
│   │   ├── module-02-er-model/
│   │   ├── module-03-normalization/
│   │   ├── module-04-ddl/
│   │   └── ...
│   ├── data/
│   │   ├── sample-databases/
│   │   └── exercises/
│   ├── engine/
│   │   ├── sql-parser.js
│   │   ├── query-executor.js
│   │   └── validation.js
│   ├── utils/
│   ├── styles/
│   ├── App.vue/.jsx/.svelte
│   └── main.js
├── package.json
├── vite.config.js / webpack.config.js
└── README.md
```

## 🚀 Roadmap de Desarrollo

### Fase 1: MVP (Minimum Viable Product)

- [ ] Configuración del proyecto y estructura base
- [ ] Implementación del motor SQL en cliente
- [ ] Editor de código básico
- [ ] 3 módulos iniciales de lecciones
- [ ] Sistema de ejecución de queries
- [ ] Service Worker básico para offline

### Fase 2: Mejoras de UX

- [ ] Diseño responsive completo
- [ ] Sistema de progreso y gamificación
- [ ] Validación de ejercicios
- [ ] Más módulos de lecciones (hasta 6)
- [ ] Mejoras en el editor (autocompletado, highlighting)

### Fase 3: PWA Completa

- [ ] Manifest completo para instalación
- [ ] Estrategias de caché avanzadas
- [ ] Notificaciones push (opcional)
- [ ] Sincronización de progreso en IndexedDB
- [ ] Optimización de performance

### Fase 4: Contenido Avanzado

- [ ] Todos los módulos de lecciones completados
- [ ] Ejercicios de desafío
- [ ] Modo de práctica libre
- [ ] Exportar/importar progreso
- [ ] Documentación completa

## 🎨 Diseño y Experiencia de Usuario

### Principios de Diseño

- **Minimalista**: Interfaz limpia que no distraiga del aprendizaje
- **Accesible**: Cumplimiento de WCAG 2.1 AA
- **Intuitivo**: Navegación clara y flujo lógico
- **Motivador**: Sistema de recompensas y logros

### Paleta de Colores Sugerida

- Primario: Azul educativo (#3498db)
- Secundario: Verde éxito (#2ecc71)
- Acento: Naranja energía (#e67e22)
- Fondo: Claro y oscuro (modo dual)

## 📊 Métricas de Éxito

- **Tiempo de carga inicial**: < 3 segundos
- **Funcionamiento offline**: 100% de características disponibles
- **Score Lighthouse PWA**: > 90
- **Compatibilidad**: Chrome, Firefox, Safari, Edge (últimas 2 versiones)
- **Tamaño del bundle**: < 500KB (gzip)

## 🤝 Contribuciones

Este proyecto está abierto a contribuciones de la comunidad educativa y desarrolladores interesados en mejorar la enseñanza de SQL.

### Cómo Contribuir

1. Fork del repositorio
2. Crear rama para feature (`git checkout -b feature/AmazingFeature`)
3. Commit de cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🙏 Agradecimientos

- Comunidad de código abierto por las librerías SQL en JavaScript
- Educadores que inspiran métodos de enseñanza interactivos
- Estudiantes que motivan la creación de herramientas accesibles

---

**¡Comencemos a construir el futuro del aprendizaje de SQL! 🚀**
