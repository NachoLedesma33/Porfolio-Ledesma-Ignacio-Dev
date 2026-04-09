# 📋 Métricas de Sección: About

## 🎯 Propósito
Definir las métricas y comportamientos esperados para la sección "Sobre Mi" del portfolio.

---

## 📁 Estructura de Archivos

### Componentes Relacionados
```
app/
├── sections/
│   └── About.tsx           # Componente principal de About
├── components/
│   ├── Sidebar.tsx           # Navegación (item: "about")
│   └── SwiperContainer.tsx # Contenedor con slideMapping
└── SKILLS/
    └── about.md             # Este archivo de métricas
```

---

## 🎨 Comportamiento Visual Esperado

### Layout Principal
- **Título**: "Sobre Mi" con gradiente azul-morado
- **Contenido**: Información personal y profesional
- **Imagen**: Avatar o foto de perfil redondeada
- **Estadísticas**: Métricas en grid (años exp, proyectos, etc.)

### Diseño Responsivo
- **Móvil**: 1 columna, padding reducido
- **Tablet**: 2 columnas para estadísticas
- **Desktop**: 3 columnas para estadísticas

---

## 📊 Métricas de Contenido

### Información Personal (Requerida)
```typescript
interface AboutContent {
  name: string;           // "Ignacio Ledesma"
  title: string;          // "Full Stack Developer"
  description: string;     // Breve descripción profesional
  avatar: string;          // URL de imagen de perfil
  location: string;        // "Córdoba, Argentina"
  email: string;          // "nacholedesma33@gmail.com"
}
```

### Estadísticas (Opcional pero Recomendado)
```typescript
interface AboutStats {
  yearsExperience: number;    // 5+
  projectsCompleted: number;  // 10+
  technologiesCount: number; // 15+
  clientsSatisfied: number;  // 20+
}
```

### Habilidades Principales
```typescript
interface KeySkills {
  technical: string[];      // ["React", "Node.js", "TypeScript"]
  soft: string[];          // ["Liderazgo", "Comunicación", "Resolución de problemas"]
}
```

---

## 🎯 Comportamientos Interactivos

### Animaciones
- **Entrada**: Fade-in desde abajo
- **Hover**: Efectos sutiles en tarjetas
- **Transiciones**: Suaves entre secciones

### Accesibilidad
- **Semántica**: Etiquetas HTML5 apropiadas
- **ARIA**: Labels y descripciones
- **Teclado**: Navegación completa con Tab
- **Contraste**: Colores accesibles (WCAG 2.1)

---

## 🔧 Configuración Técnica

### Estados del Componente
```typescript
interface AboutProps {
  // No props requeridas - componente autónomo
}

const About = () => {
  // Estados internos si son necesarios
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-2 sm:p-4 lg:p-6 overflow-y-auto min-h-screen">
      {/* Contenido */}
    </div>
  );
};
```

### Estilos CSS Esperados
```css
/* Gradientes */
.about-gradient {
  background: linear-gradient(to-r, from-blue-400 to-purple-600);
}

/* Tarjetas */
.about-card {
  @apply bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-xl transition-all duration-300;
}

/* Estadísticas */
.stat-item {
  @apply text-center;
}
.stat-number {
  @apply text-3xl font-bold text-blue-600 dark:text-blue-400;
}
.stat-label {
  @apply text-sm text-gray-600 dark:text-gray-400;
}
```

---

## 📱 Responsive Design

### Breakpoints
- **sm**: 640px+ - Tablet y arriba
- **md**: 768px+ - Desktop pequeño
- **lg**: 1024px+ - Desktop estándar
- **xl**: 1280px+ - Desktop grande

### Layout Adaptativo
```typescript
// Móvil
<div className="grid grid-cols-1 gap-4">

// Tablet
<div className="grid grid-cols-2 gap-4">

// Desktop
<div className="grid grid-cols-3 gap-4">
```

---

## 🚀 Integración con Navegación

### Sidebar Integration
```typescript
// En Sidebar.tsx
const navigationItems = [
  { id: "about", label: "Sobre Mi", icon: "..." },
  // ... otros items
];
```

### Swiper Integration
```typescript
// En SwiperContainer.tsx
const slideMapping: Record<NavigationItem, number> = {
  about: 0,        // Primera posición
  skills: 1,
  projects: 2,
  certificates: 3,
  contact: 4,
};
```

---

## 📝 Validación de Calidad

### Checklist de Implementación
- [ ] **Información completa**: Todos los campos requeridos
- [ ] **Imagen optimizada**: Avatar < 100KB
- [ ] **Responsive test**: Probar en 3 tamaños
- [ ] **Accesibilidad**: WCAG 2.1 AA mínimo
- [ ] **Performance**: LCP < 2.5s
- [ ] **SEO**: Meta tags descriptivos

### Métricas de Rendimiento
- **LCP**: < 2.5 segundos
- **FID**: < 100ms
- **CLS**: < 0.1
- **Tamaño total**: < 500KB comprimido

---

## 🤖 IA Instructions

### Contexto Automático
```
SECCIÓN: About
PROPOSITO: Presentación personal y profesional
CONTENIDO_ESPERADO: Información biográfica, estadísticas, habilidades
ESTILO: Profesional moderno con gradientes azules/morados
RESPONSIVE: Adaptativo con 1-3 columnas según viewport
ACCESIBILIDAD: WCAG 2.1 AA, navegación por teclado
PERFORMANCE: Optimizado para LCP < 2.5s
```

### Reglas de Comportamiento
1. **Sin indicaciones humanas**: La IA debe inferir el contexto
2. **Basado en métricas**: Seguir las especificaciones técnicas
3. **Consistente**: Mismo estilo que otras secciones
4. **Autónomo**: Funcionar sin props externas
5. **Optimizado**: Imágenes comprimidas y lazy loading

---

## 🔄 Actualización y Mantenimiento

### Frecuencia de Actualización
- **Información personal**: Cada 6 meses
- **Estadísticas**: Cada proyecto completado
- **Habilidades**: Cada nueva tecnología aprendida
- **Diseño**: Anualmente o según tendencias

### Monitoreo
- **Analytics**: Tiempo en página, interacciones
- **Performance**: Core Web Vitals
- **Errores**: Console errors y warnings
- **Feedback**: Formulario de contacto o redes sociales

---

## 🎯 Conclusión

Esta sección debe presentar información profesional de manera visualmente atractiva y técnicamente optimizada, sirviendo como la primera impresión del portfolio del visitante.
