# 📋 Métricas de Sección: Certificates

## 🎯 Propósito
Definir las métricas y comportamientos esperados para la sección "Certificados" del portfolio.

---

## 📁 Estructura de Archivos

### Componentes Relacionados
```
app/
├── sections/
│   └── Certificates.tsx    # Componente principal de certificados
├── components/
│   ├── Sidebar.tsx           # Navegación (item: "certificates")
│   └── SwiperContainer.tsx # Contenedor con slideMapping
└── SKILLS/
    └── certificates.md        # Este archivo de métricas
```

---

## 🎨 Comportamiento Visual Esperado

### Layout Principal
- **Título**: "Certificados" con gradiente naranja-rojo
- **Categorías**: Agrupadas por tecnología o institución
- **Cards de Certificados**: Información completa con badges
- **Diseño responsivo**: Grid adaptativo con scroll

### Categorías Típicas
```typescript
interface CertificateCategory {
  name: string;           // "Frontend", "Backend", "Cloud"
  icon: string;           // Icono representativo
  color: string;          // Gradiente de color
  certificates: Certificate[];
}
```

---

## 📊 Métricas de Contenido

### Información del Certificado (Requerida)
```typescript
interface Certificate {
  title: string;           // "React Developer Certification"
  issuer: string;          // "Meta", "Microsoft", "AWS"
  date: string;            // "2024", "2023"
  category: string;        // "Frontend", "Languages", "Cloud"
  description: string;     // Descripción del certificado
  skills: string[];        // ["React", "Hooks", "Performance"]
  credentialId?: string;   // ID de verificación (opcional)
  credentialUrl?: string;   // URL de verificación (opcional)
}
```

### Estadísticas (Opcional pero Recomendado)
```typescript
interface CertificateStats {
  totalCertificates: number;    // 10-15 certificados
  categoriesCount: number;    // 4-6 categorías
  recentCertificates: number; // Obtenidos en últimos 2 años
  verifiedCertificates: number; // Con verificación oficial
}
```

### Categorías Predefinidas
```typescript
type CertificateCategory = 
  | "Frontend" 
  | "Backend" 
  | "Cloud" 
  | "DevOps" 
  | "Database" 
  | "Mobile" 
  | "Data Science" 
  | "Languages" 
  | "Security";
```

### Colores por Categoría
```typescript
const getCategoryGradient = (category: CertificateCategory) => {
  switch (category) {
    case "Frontend":
      return "from-orange-400 to-red-600";
    case "Backend":
      return "from-green-400 to-emerald-600";
    case "Cloud":
      return "from-blue-400 to-indigo-600";
    case "DevOps":
      return "from-purple-400 to-pink-600";
    case "Database":
      return "from-cyan-400 to-blue-600";
    case "Mobile":
      return "from-pink-400 to-rose-600";
    case "Data Science":
      return "from-indigo-400 to-purple-600";
    case "Languages":
      return "from-yellow-400 to-orange-600";
    case "Security":
      return "from-red-400 to-pink-600";
    default:
      return "from-gray-400 to-gray-600";
  }
};
```

---

## 🎯 Comportamientos Interactivos

### Animaciones
- **Entrada**: Fade-in desde arriba con escalado
- **Hover**: Efectos sutiles en cards de certificados
- **Transiciones**: Suaves entre categorías
- **Loading**: Skeletons mientras cargan datos

### Filtros y Búsqueda
- **Por categoría**: Botones para filtrar certificados
- **Por año**: Slider o select para filtrar por antigüedad
- **Búsqueda**: Input para buscar certificados específicos
- **Por verificación**: Toggle para mostrar solo certificados verificados

### Accesibilidad
- **Semántica**: Etiquetas HTML5 apropiadas
- **ARIA**: Labels y descripciones
- **Teclado**: Navegación completa con Tab/Enter
- **Contraste**: Colores accesibles (WCAG 2.1)

---

## 🔧 Configuración Técnica

### Estados del Componente
```typescript
interface CertificatesProps {
  // No props requeridas - componente autónomo
}

const Certificates = () => {
  // Estados internos si son necesarios
  const [selectedCategory, setSelectedCategory] = useState<CertificateCategory | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  
  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-2 sm:p-4 lg:p-6 overflow-y-auto min-h-screen">
      {/* Contenido */}
    </div>
  );
};
```

### Estilos CSS Esperados
```css
/* Cards de certificados */
.certificate-card {
  @apply bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-xl transition-all duration-300;
}

.certificate-header {
  @apply flex items-center justify-between mb-4;
}

.certificate-badge {
  @apply px-3 py-1 text-xs font-medium bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-300 rounded-full;
}

/* Categorías */
.category-filter {
  @apply px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors;
}
.category-filter.active {
  @apply bg-orange-500 text-white;
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
<div className="grid grid-cols-1 gap-4">

// Tablet (2 columnas)
<div className="grid grid-cols-2 gap-4">

// Desktop (3-4 columnas)
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
```

---

## 🚀 Integración con Navegación

### Sidebar Integration
```typescript
// En Sidebar.tsx
const navigationItems = [
  { id: "certificates", label: "Certificados", icon: "..." },
  // ... otros items
];
```

### Swiper Integration
```typescript
// En SwiperContainer.tsx
const slideMapping: Record<NavigationItem, number> = {
  about: 0,
  skills: 1,
  projects: 2,
  certificates: 3,     // Cuarta posición
  contact: 4,
};
```

---

## 📝 Validación de Calidad

### Checklist de Implementación
- [ ] **Categorías completas**: Todas las áreas tecnológicas cubiertas
- [ ] **Información completa**: Todos los campos requeridos
- [ ] **Responsive test**: Probar en 3 tamaños
- [ ] **Accesibilidad**: WCAG 2.1 AA mínimo
- [ ] **Performance**: LCP < 2.5s
- [ ] **SEO**: Meta tags descriptivos

### Métricas de Rendimiento
- **LCP**: < 2.5 segundos
- **FID**: < 100ms
- **CLS**: < 0.1
- **Tamaño total**: < 600KB comprimido
- **Animaciones**: 60fps suaves

---

## 🤖 IA Instructions

### Contexto Automático
```
SECCIÓN: Certificates
PROPOSITO: Demostrar certificaciones y habilidades validadas
CONTENIDO_ESPERADO: Cards con información completa, categorías con filtros
ESTILO: Profesional con gradientes naranjas/rojos
RESPONSIVE: Grid 1-4 columnas según viewport
ACCESIBILIDAD: WCAG 2.1 AA, navegación por teclado
PERFORMANCE: Optimizado para LCP < 2.5s
```

### Reglas de Comportamiento
1. **Sin indicaciones humanas**: La IA debe inferir el contexto
2. **Basado en métricas**: Seguir las especificaciones técnicas
3. **Consistente**: Mismo estilo que otras secciones
4. **Autónomo**: Funcionar sin props externas
5. **Optimizado**: Imágenes comprimidas y lazy loading
6. **Categorizado**: Certificados agrupados lógicamente
7. **Verificación**: Destacar certificados oficiales con badges

---

## 🔄 Actualización y Mantenimiento

### Frecuencia de Actualización
- **Nuevos certificados**: Cada vez que se obtiene uno
- **Categorías**: Anualmente reorganizar si es necesario
- **Diseño**: Cada 6 meses refrescar animaciones
- **Verificación**: Actualizar IDs de credenciales

### Monitoreo
- **Interacciones**: Tiempo en cada categoría
- **Performance**: Velocidad de carga de certificados
- **Accesibilidad**: Tests automáticos
- **Feedback**: Formulario de contacto o LinkedIn

---

## 🎯 Conclusión

Esta sección debe presentar certificaciones profesionales de manera visualmente atractiva, organizada por categorías con filtros interactivos y verificación de credenciales, demostrando crecimiento continuo y validación de habilidades.
