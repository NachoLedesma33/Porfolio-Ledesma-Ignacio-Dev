# 📋 Métricas de Sección: Skills

## 🎯 Propósito
Definir las métricas y comportamientos esperados para la sección "Habilidades" del portfolio.

---

## 📁 Estructura de Archivos

### Componentes Relacionados
```
app/
├── sections/
│   └── Skills.tsx          # Componente principal de habilidades
├── components/
│   ├── Sidebar.tsx           # Navegación (item: "skills")
│   └── SwiperContainer.tsx # Contenedor con slideMapping
└── SKILLS/
    └── skills.md            # Este archivo de métricas
```

---

## 🎨 Comportamiento Visual Esperado

### Layout Principal
- **Título**: "Habilidades" con gradiente verde-azul
- **Categorías**: Agrupadas por tecnología o área
- **Barras de progreso**: Visuales y animadas
- **Nivel de habilidad**: Porcentaje o dominio
- **Diseño responsivo**: Grid adaptativo

### Categorías Típicas
```typescript
interface SkillCategory {
  name: string;           // "Frontend", "Backend", "DevOps"
  icon: string;           // Icono representativo
  color: string;          // Gradiente de color
  skills: Skill[];
}

interface Skill {
  name: string;           // "React", "TypeScript", "Docker"
  level: number;           // 1-100 (porcentaje)
  years: number;           // Años de experiencia
  description: string;     // Breve descripción
}
```

---

## 📊 Métricas de Contenido

### Estructura de Datos
```typescript
interface SkillsContent {
  categories: SkillCategory[];
  totalSkills: number;      // 15-20 habilidades
  expertiseAreas: string[]; // ["Frontend", "Backend", "Cloud"]
}
```

### Niveles de Habilidad
```typescript
type SkillLevel = 
  | 90 | "Experto"      // 90-100%
  | 70 | "Avanzado"     // 70-89%
  | 50 | "Intermedio"    // 50-69%
  | 30 | "Básico"       // 30-49%
  | 10 | "Novato";       // 10-29%
```

### Colores por Categoría
```typescript
const getCategoryGradient = (category: string) => {
  switch (category) {
    case "Frontend":
      return "from-blue-400 to-cyan-600";
    case "Backend":
      return "from-green-400 to-emerald-600";
    case "DevOps":
      return "from-orange-400 to-red-600";
    case "Database":
      return "from-purple-400 to-pink-600";
    case "Cloud":
      return "from-indigo-400 to-purple-600";
    default:
      return "from-gray-400 to-gray-600";
  }
};
```

---

## 🎯 Comportamientos Interactivos

### Animaciones
- **Entrada**: Fade-in con escalado suave
- **Hover**: Efectos en barras de progreso
- **Transiciones**: Entre categorías
- **Loading**: Skeletons mientras cargan datos

### Filtros y Búsqueda
- **Por categoría**: Botones para filtrar habilidades
- **Por nivel**: Slider o select para filtrar por dominio
- **Búsqueda**: Input para buscar habilidades específicas

### Accesibilidad
- **Semántica**: Etiquetas apropiadas para habilidades
- **ARIA**: Labels y descripciones
- **Teclado**: Navegación completa con Tab/Enter
- **Contraste**: Colores accesibles (WCAG 2.1)

---

## 🔧 Configuración Técnica

### Estados del Componente
```typescript
interface SkillsProps {
  // No props requeridas - componente autónomo
}

const Skills = () => {
  // Estados internos
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-2 sm:p-4 lg:p-6 overflow-y-auto min-h-screen">
      {/* Contenido */}
    </div>
  );
};
```

### Estilos CSS Dinámicos
```css
/* Barras de progreso animadas */
.skill-bar {
  @apply bg-gray-200 dark:bg-gray-700 rounded-full h-2 relative overflow-hidden;
}

.skill-progress {
  @apply h-full rounded-full transition-all duration-500 ease-out;
  animation: fillProgress 1.5s ease-out;
}

@keyframes fillProgress {
  from { width: 0; }
  to { width: var(--skill-level); }
}

/* Categorías hover */
.category-card {
  @apply bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:shadow-xl transition-all duration-300;
}
.category-card:hover {
  @apply transform -translate-y-1;
}
```

---

## 📱 Responsive Design

### Breakpoints
- **sm**: 640px+ - Móvil grande
- **md**: 768px+ - Tablet
- **lg**: 1024px+ - Desktop
- **xl**: 1280px+ - Desktop grande

### Layout Adaptativo
```typescript
// Móvil (1 columna)
<div className="grid grid-cols-1 gap-4">

// Tablet (2 columnas)
<div className="grid grid-cols-2 gap-4">

// Desktop (3-4 columnas)
<div className="grid grid-cols-3 lg:grid-cols-4 gap-4">
```

---

## 🚀 Integración con Navegación

### Sidebar Integration
```typescript
// En Sidebar.tsx
const navigationItems = [
  { id: "skills", label: "Habilidades", icon: "..." },
  // ... otros items
];
```

### Swiper Integration
```typescript
// En SwiperContainer.tsx
const slideMapping: Record<NavigationItem, number> = {
  about: 0,
  skills: 1,        // Segunda posición
  projects: 2,
  certificates: 3,
  contact: 4,
};
```

---

## 📝 Validación de Calidad

### Checklist de Implementación
- [ ] **Categorías completas**: Todas las áreas tecnológicas cubiertas
- [ ] **Niveles realistas**: Porcentajes basados en experiencia real
- [ ] **Animaciones suaves**: Sin saltos bruscos
- [ ] **Responsive test**: Probar en 3 tamaños
- [ ] **Accesibilidad**: WCAG 2.1 AA mínimo
- [ ] **Performance**: LCP < 2.5s
- [ ] **SEO**: Meta tags descriptivos

### Métricas de Rendimiento
- **LCP**: < 2.5 segundos
- **FID**: < 100ms
- **CLS**: < 0.1
- **Tamaño total**: < 400KB comprimido
- **Animaciones**: 60fps suaves

---

## 🤖 IA Instructions

### Contexto Automático
```
SECCIÓN: Skills
PROPOSITO: Demostrar habilidades técnicas y experiencia
CONTENIDO_ESPERADO: Categorías con barras de progreso animadas
ESTILO: Profesional con gradientes verdes/azules
RESPONSIVE: Grid 1-4 columnas según viewport
ACCESIBILIDAD: WCAG 2.1 AA, navegación por teclado
PERFORMANCE: Optimizado para LCP < 2.5s
```

### Reglas de Comportamiento
1. **Sin indicaciones humanas**: La IA debe inferir el contexto
2. **Basado en métricas**: Seguir las especificaciones técnicas
3. **Consistente**: Mismo estilo que otras secciones
4. **Autónomo**: Funcionar sin props externas
5. **Optimizado**: Animaciones CSS y lazy loading
6. **Categorizado**: Habilidades agrupadas lógicamente

---

## 🔄 Actualización y Mantenimiento

### Frecuencia de Actualización
- **Nuevas habilidades**: Cada proyecto completado o tecnología aprendida
- **Niveles**: Cada 6 meses revisar y ajustar
- **Categorías**: Anualmente reorganizar si es necesario
- **Diseño**: Cada 6 meses refrescar animaciones

### Monitoreo
- **Interacciones**: Tiempo en cada categoría
- **Performance**: Velocidad de animaciones
- **Accesibilidad**: Tests automáticos
- **Feedback**: Formulario de contacto o LinkedIn

---

## 🎯 Conclusión

Esta sección debe presentar habilidades técnicas de manera visualmente atractiva, organizada por categorías con indicadores de dominio claros y animaciones profesionales.
