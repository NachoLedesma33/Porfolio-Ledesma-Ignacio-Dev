# 📋 Métricas de Sección: Projects

## 🎯 Propósito
Definir las métricas y comportamientos esperados para la sección "Proyectos" del portfolio.

---

## 📁 Estructura de Archivos

### Componentes Relacionados
```
app/
├── sections/
│   └── Projects.tsx         # Componente principal de proyectos
├── components/
│   ├── Sidebar.tsx           # Navegación (item: "projects")
│   └── SwiperContainer.tsx # Contenedor con slideMapping
└── SKILLS/
    └── projects.md            # Este archivo de métricas
```

---

## 🎨 Comportamiento Visual Esperado

### Layout Principal
- **Título**: "Proyectos" con gradiente morado-rosa
- **Grid de Cards**: 1-3 columnas según viewport
- **Modal de Detalles**: Galería de imágenes y botones
- **Filtros**: Por estado o tecnología

### Diseño Responsivo
- **Móvil**: 1 columna con cards verticales
- **Tablet**: 2 columnas para mejor aprovechamiento
- **Desktop**: 3 columnas con espaciado óptimo

---

## 📊 Métricas de Contenido

### Información del Proyecto (Requerida)
```typescript
interface Project {
  title: string;           // "Nombre del Proyecto"
  description: string;     // Descripción detallada (máx 200 caracteres)
  tech: string[];         // Tecnologías usadas
  status: ProjectStatus;   // Estado del proyecto
  link: string;           // URL de la demo
  repo?: string;           // URL del repositorio (opcional)
  images: string[];        // Array de URLs de imágenes
}
```

### Estados del Proyecto
```typescript
type ProjectStatus = "Completed" | "In Progress" | "Planning";
```

### Tecnologías Típicas
```typescript
interface TechStack {
  frontend: string[];      // ["React", "Vue", "Angular"]
  backend: string[];       // ["Node.js", "Python", "Java"]
  database: string[];       // ["MongoDB", "PostgreSQL", "MySQL"]
  devops: string[];        // ["Docker", "AWS", "CI/CD"]
  mobile: string[];        // ["React Native", "Flutter"]
}
```

### Imágenes del Proyecto
```typescript
interface ProjectImages {
  main: string;           // Imagen principal (card)
  gallery: string[];        // Imágenes adicionales (modal)
  aspectRatio: string;       // "16:9" o "4:3"
  maxSize: number;          // 500KB por imagen
}
```

---

## 🎯 Comportamientos Interactivos

### Animaciones y Transiciones
- **Hover**: Elevación de cards (-translate-y-1)
- **Modal**: Fade-in con backdrop oscurecido
- **Carga**: Skeletons mientras cargan datos
- **Navegación**: Transiciones suaves entre secciones

### Interacciones del Usuario
- **Click en card**: Abre modal con detalles
- **Click fuera**: Cierra modal (backdrop)
- **Teclado**: Escape para cerrar modal
- **Galería**: Scroll horizontal para imágenes

### Accesibilidad
- **Semántica**: Estructura HTML5 apropiada
- **ARIA**: Labels y descripciones
- **Teclado**: Navegación completa con Tab
- **Contraste**: Colores WCAG 2.1 AA

---

## 🔧 Configuración Técnica

### Estados del Componente
```typescript
interface ProjectsProps {
  // No props requeridas - componente autónomo
}

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-2 sm:p-4 lg:p-6 overflow-y-auto min-h-screen">
      {/* Contenido */}
    </div>
  );
};
```

### Estilos CSS Esperados
```css
/* Cards de proyectos */
.project-card {
  @apply bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1;
}

/* Modal de detalles */
.project-modal {
  @apply fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4;
}

/* Galería de imágenes */
.project-gallery {
  @apply flex gap-4 overflow-x-auto pb-4;
}
```

---

## 📱 Responsive Design

### Breakpoints
- **sm**: 640px+ - Móvil grande
- **md**: 768px+ - Tablet
- **lg**: 1024px+ - Desktop pequeño
- **xl**: 1280px+ - Desktop grande

### Layout Adaptativo
```typescript
// Móvil (1 columna)
<div className="grid grid-cols-1 gap-4 sm:gap-6">

// Tablet (2 columnas)
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

// Desktop (3 columnas)
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
```

---

## 🚀 Integración con Navegación

### Sidebar Integration
```typescript
// En Sidebar.tsx
const navigationItems = [
  { id: "projects", label: "Proyectos", icon: "..." },
  // ... otros items
];
```

### Swiper Integration
```typescript
// En SwiperContainer.tsx
const slideMapping: Record<NavigationItem, number> = {
  about: 0,
  skills: 1,
  projects: 2,        // Tercera posición
  certificates: 3,
  contact: 4,
};
```

---

## 📝 Validación de Calidad

### Checklist de Implementación
- [ ] **Proyectos completos**: Todos los campos requeridos
- [ ] **Imágenes optimizadas**: Tamaño y formato correctos
- [ ] **Responsive test**: Probar en 3 tamaños
- [ ] **Modal funcional**: Galería y botones operando
- [ ] **Accesibilidad**: WCAG 2.1 AA mínimo
- [ ] **Performance**: LCP < 2.5s
- [ ] **SEO**: Meta tags descriptivos

### Métricas de Rendimiento
- **LCP**: < 2.5 segundos
- **FID**: < 100ms
- **CLS**: < 0.1
- **Tamaño total**: < 1MB comprimido
- **Imágenes**: WebP con lazy loading

---

## 🤖 IA Instructions

### Contexto Automático
```
SECCIÓN: Projects
PROPOSITO: Portafolio de proyectos realizados
CONTENIDO_ESPERADO: Cards con información resumida, modal con galería
ESTILO: Profesional con gradientes morados/rosados
RESPONSIVE: Grid 1-3 columnas según viewport
ACCESIBILIDAD: WCAG 2.1 AA, navegación por teclado
PERFORMANCE: Optimizado para LCP < 2.5s
```

### Reglas de Comportamiento
1. **Sin indicaciones humanas**: La IA debe inferir el contexto
2. **Basado en métricas**: Seguir las especificaciones técnicas
3. **Consistente**: Mismo estilo que otras secciones
4. **Autónomo**: Funcionar sin props externas
5. **Optimizado**: Imágenes WebP, lazy loading
6. **Modal completo**: Galería con cierre múltiple

---

## 🔄 Actualización y Mantenimiento

### Frecuencia de Actualización
- **Nuevos proyectos**: Cada vez que se completa uno
- **Estado actualizado**: Cambiar "In Progress" → "Completed"
- **Imágenes**: Actualizar capturas de pantalla
- **Tecnologías**: Agregar nuevas tecnologías aprendidas

### Monitoreo
- **Analytics**: Tiempo en página, clicks en proyectos
- **Performance**: Core Web Vitals
- **Errores**: Console errors y warnings
- **Feedback**: Formulario de contacto o estadísticas

---

## 🎯 Conclusión

Esta sección debe presentar el portafolio de proyectos de manera visualmente atractiva, técnicamente optimizada y fácilmente navegable, mostrando el crecimiento profesional y habilidades técnicas del desarrollador.
