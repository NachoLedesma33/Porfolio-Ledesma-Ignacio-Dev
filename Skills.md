# 📋 Guía de Integración de Nuevos Proyectos

## 🎯 Propósito
Este documento proporciona una guía detallada y genérica para agregar nuevos proyectos a la sección de proyectos del portfolio, asegurando consistencia y reutilizabilidad del código.

---

## 📁 Estructura de Archivos

### Archivos Principales
```
app/
├── sections/
│   └── Projects.tsx     # Componente principal de proyectos
├── components/
│   └── Sidebar.tsx       # Navegación (si se agrega nueva sección)
└── public/
    └── game-2048/      # Imágenes del proyecto (crear carpeta específica)
        ├── 1.png
        ├── 2.png
        ├── 3.png
        └── 4.png
```

---

## 🔧 Proceso de Integración

### Paso 1: Preparar Assets del Proyecto

#### Organizar Imágenes
1. **Crear carpeta específica** en `public/`
   ```
   public/nombre-proyecto/
   ├── 1.png    # Imagen principal (card)
   ├── 2.png    # Imágenes adicionales (galería)
   ├── 3.png
   └── 4.png
   ```

2. **Optimizar imágenes**:
   - **Formato**: PNG o WebP
   - **Dimensiones recomendadas**:
     - Card: 800x600px (proporción 4:3)
     - Galería: 1200x900px
   - **Tamaño máximo**: 500KB por imagen

### Paso 2: Agregar Proyecto al Array

#### Estructura de Datos del Proyecto
```typescript
{
  title: "Nombre del Proyecto",
  description: "Descripción detallada del proyecto (máximo 200 caracteres)",
  tech: ["Tecnología1", "Tecnología2", "Tecnología3"],
  status: "Completed" | "In Progress" | "Planning",
  link: "https://url-del-proyecto.com",
  repo: "https://github.com/usuario/repositorio", // Opcional
  images: ["/nombre-proyecto/1.png", "/nombre-proyecto/2.png", "/nombre-proyecto/3.png", "/nombre-proyecto/4.png"]
}
```

#### Ejemplo Completo
```typescript
{
  title: "Mi App Innovadora",
  description: "Aplicación web revolucionaria que utiliza inteligencia artificial para automatizar procesos empresariales, con interfaz moderna y responsive design.",
  tech: ["React", "Node.js", "MongoDB", "AI/ML", "TypeScript"],
  status: "Completed",
  link: "https://miappinnovadora.com",
  repo: "https://github.com/miusuario/miapp",
  images: ["/miapp/1.png", "/miapp/2.png", "/miapp/3.png", "/miapp/4.png"]
}
```

### Paso 3: Integrar en Projects.tsx

#### Ubicación en el Array
```typescript
export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  
  const projects = [
    // ...proyectos existentes...
    
    // NUEVO PROYECTO - Insertar aquí
    {
      title: "Mi App Innovadora",
      description: "Aplicación web revolucionaria que utiliza inteligencia artificial...",
      tech: ["React", "Node.js", "MongoDB", "AI/ML", "TypeScript"],
      status: "Completed",
      link: "https://miappinnovadora.com",
      repo: "https://github.com/miusuario/miapp",
      images: ["/miapp/1.png", "/miapp/2.png", "/miapp/3.png", "/miapp/4.png"]
    },
    
    // ...más proyectos...
  ];
```

---

## 🎨 Características del Sistema

### Modal de Proyecto
El modal incluye automáticamente:
- ✅ **Galería de imágenes** en fila horizontal
- ✅ **Información completa** del proyecto
- ✅ **Botones de acción**: "Abrir Proyecto" y "Ver Código"
- ✅ **Cierre múltiple**: X, clic fuera, tecla Esc
- ✅ **Animaciones suaves** de entrada y salida

### Cards de Proyectos
Cada proyecto muestra:
- ✅ **Imagen principal** optimizada
- ✅ **Título y descripción** resumida
- ✅ **Tecnologías** en badges
- ✅ **Estado** con color codificado
- ✅ **Botones**: "Ver Proyecto" y "Abrir Proyecto"

---

## 🔄 Estados y Colores

### Estados Disponibles
```typescript
type ProjectStatus = "Completed" | "In Progress" | "Planning";
```

### Colores Asociados
```typescript
const getStatusColor = (status: ProjectStatus) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "In Progress":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "Planning":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
};
```

---

## 📝 Buenas Prácticas

### Nomenclatura
- **Carpetas**: `kebab-case` (ej: `mi-proyecto`)
- **Títulos**: `Title Case` (ej: "Mi Proyecto Innovador")
- **Tecnologías**: `PascalCase` para frameworks, `UPPERCASE` para lenguajes

### Imágenes
1. **Siempre incluir la primera imagen** para el card
2. **Máximo 4 imágenes** por proyecto para consistencia
3. **Nomenclatura secuencial**: 1.png, 2.png, 3.png, 4.png
4. **Optimización WebP** para mejor rendimiento

### Enlaces
- **Demo**: Siempre incluir enlace funcional
- **Repositorio**: Agregar si el código es público
- **Protocolo**: Usar `https://` siempre

---

## 🚀 Flujo Completo de Integración

### Checklist de Integración
- [ ] **Preparar imágenes** en carpeta `public/nombre-proyecto/`
- [ ] **Optimizar imágenes** (tamaño y formato)
- [ ] **Definir objeto** del proyecto con todos los campos
- [ ] **Agregar al array** de proyectos en `Projects.tsx`
- [ ] **Probar visualización** en cards
- [ ] **Verificar modal** con imágenes y botones
- [ ] **Testear enlaces** (demo y repositorio)
- [ ] **Validar responsive** en diferentes tamaños

### Validación Final
```bash
# Compilar y verificar errores
npx tsc --noEmit

# Probar localmente
npm run dev
```

---

## 🔧 Personalización Avanzada

### Modificar Estructura del Modal
Si necesitas personalizar el modal, edita esta sección en `Projects.tsx`:
```typescript
{/* Project Detail View */}
{selectedProject && (
  <div data-modal-backdrop className="fixed inset-0 bg-black bg-opacity-0 ...">
    <div data-modal-content className="bg-white dark:bg-gray-800 rounded-lg ...">
      {/* Contenido personalizado aquí */}
    </div>
  </div>
)}
```

### Agregar Nuevos Estados
Para agregar nuevos estados:
1. **Actualizar el tipo** `ProjectStatus`
2. **Agregar caso** en `getStatusColor()`
3. **Definir estilo** CSS para el nuevo color

---

## 📱 Consideraciones de Responsive Design

### Cards en Grid
- **Móvil**: 1 columna (`grid-cols-1`)
- **Tablet**: 2 columnas (`grid-cols-2`)
- **Desktop**: 3 columnas (`grid-cols-3`)

### Modal en Móvil
- **Ancho**: `w-full` con padding
- **Altura**: `max-h-[90vh]` para no exceder pantalla
- **Scroll**: `overflow-y-auto` para contenido largo

---

## 🎯 Ejemplo Práctico Completo

### Agregar Proyecto "E-Commerce Moderno"

#### 1. Preparar Assets
```bash
# Crear carpeta
mkdir public/ecommerce-moderno

# Agregar imágenes (optimizadas)
cp ~/imagenes/ecommerce/* public/ecommerce-moderno/
```

#### 2. Definir Objeto
```typescript
{
  title: "E-Commerce Moderno",
  description: "Plataforma de e-commerce con carrito de compras, pasarela de pago integrada, panel de administración y sistema de inventario en tiempo real.",
  tech: ["Next.js", "Stripe", "PostgreSQL", "Redis", "Tailwind CSS"],
  status: "Completed",
  link: "https://tienda-ejemplo.com",
  repo: "https://github.com/miusuario/ecommerce-moderno",
  images: ["/ecommerce-moderno/1.png", "/ecommerce-moderno/2.png", "/ecommerce-moderno/3.png", "/ecommerce-moderno/4.png"]
}
```

#### 3. Integrar
```typescript
const projects = [
  // ...proyectos existentes
  
  // NUEVO PROYECTO
  {
    title: "E-Commerce Moderno",
    description: "Plataforma de e-commerce con carrito de compras...",
    tech: ["Next.js", "Stripe", "PostgreSQL", "Redis", "Tailwind CSS"],
    status: "Completed",
    link: "https://tienda-ejemplo.com",
    repo: "https://github.com/miusuario/ecommerce-moderno",
    images: ["/ecommerce-moderno/1.png", "/ecommerce-moderno/2.png", "/ecommerce-moderno/3.png", "/ecommerce-moderno/4.png"]
  },
];
```

---

## 🐛 Troubleshooting Común

### Problemas Frecuentes

#### Imágenes no cargan
```typescript
// ❌ Incorrecto
images: ["game-2048/1.png"]

// ✅ Correcto
images: ["/game-2048/1.png"] // Siempre con /
```

#### Modal no abre
```typescript
// Verificar que el proyecto tenga imágenes
{project.images && project.images.length > 0 && (
  <button onClick={() => setSelectedProject(project)}>
    Ver Proyecto
  </button>
)}
```

#### Enlaces rotos
```typescript
// Siempre usar https://
link: "https://mi-proyecto.com" // ✅
link: "mi-proyecto.com"         // ❌
```

---

## 📚 Referencias Útiles

### Documentación
- [Next.js Image Optimization](https://nextjs.org/docs/api-reference/next/image)
- [Tailwind CSS Flexbox](https://tailwindcss.com/docs/flexbox)
- [TypeScript React Types](https://react-typescript-cheatsheet.netlify.app/)

### Herramientas Recomendadas
- **Optimización de imágenes**: Squoosh.app
- **Generador de placeholders**: Placehold.co
- **Validación de TypeScript**: npx tsc --noEmit

---

## 🎉 Conclusión

Siguiendo esta guía, cualquier nuevo proyecto se integrará de manera consistente y profesional en el portfolio. El sistema está diseñado para ser:

- ✅ **Reutilizable**: Estructura genérica para cualquier tipo de proyecto
- ✅ **Consistente**: Mismo estilo y comportamiento para todos
- ✅ **Escalable**: Fácil de mantener y extender
- ✅ **Optimizado**: Imágenes y rendimiento web
- ✅ **Accesible**: Navegación por teclado y screen readers

**¡Tu portfolio está listo para crecer con nuevos proyectos! 🚀**
