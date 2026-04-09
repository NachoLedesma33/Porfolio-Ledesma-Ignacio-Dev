# 📋 Métricas de Sección: Contact

## 🎯 Propósito
Definir las métricas y comportamientos esperados para la sección "Contacto" del portfolio.

---

## 📁 Estructura de Archivos

### Componentes Relacionados
```
app/
├── sections/
│   └── Contact.tsx         # Componente principal de contacto
├── components/
│   ├── Sidebar.tsx           # Navegación (item: "contact")
│   └── SwiperContainer.tsx # Contenedor con slideMapping
└── SKILLS/
    └── contact.md            # Este archivo de métricas
```

---

## 🎨 Comportamiento Visual Esperado

### Layout Principal
- **Título**: "Contacto" con gradiente naranja-rojo
- **Formulario**: Campos de contacto con validación
- **Información**: Datos personales y redes sociales
- **Diseño responsivo**: Adaptado para todos los dispositivos

### Formulario de Contacto
- **Nombre**: Campo de texto requerido
- **Email**: Campo de email con validación
- **Mensaje**: Área de texto con validación de longitud
- **Botón**: Envío con estado de carga

### Información Adicional
- **Ubicación**: Dirección física
- **Email**: Email de contacto profesional
- **Redes sociales**: Enlaces a GitHub y LinkedIn
- **Horarios**: Información de disponibilidad

---

## 📊 Métricas de Contenido

### Información de Contacto (Requerida)
```typescript
interface ContactInfo {
  name: string;           // "Ignacio Ledesma"
  title: string;          // "Full Stack Developer"
  email: string;          // "nacholedesma33@gmail.com"
  phone?: string;          // "+54 9 XXX XXXXXX"
  location: string;        // "Córdoba Capital, Córdoba, Argentina"
  availability: string;    // "Disponible para proyectos freelance"
}
```

### Redes Sociales
```typescript
interface SocialLinks {
  github: string;          // URL del perfil
  linkedin: string;        // URL del perfil
  twitter?: string;         // URL del perfil (opcional)
  instagram?: string;        // URL del perfil (opcional)
}
```

### Formulario de Contacto
```typescript
interface ContactForm {
  name: string;           // Requerido, min 2 caracteres
  email: string;           // Requerido, formato email válido
  subject?: string;         // Opcional, max 100 caracteres
  message: string;         // Requerido, min 10 caracteres, max 1000
  phone?: string;           // Opcional, formato telefónico
}
```

---

## 🎯 Comportamientos Interactivos

### Validación de Formulario
- **Validación en tiempo real**: Feedback instantáneo
- **Mensajes de error**: Claros y específicos
- **Estados de envío**: Loading, success, error
- **Reset automático**: Después de envío exitoso

### Animaciones y Transiciones
- **Entrada**: Fade-in suave del formulario
- **Hover**: Efectos sutiles en campos y botones
- **Focus**: Estados visuales claros
- **Transiciones**: Suaves entre diferentes secciones

### Accesibilidad
- **Semántica**: Etiquetas HTML5 apropiadas
- **ARIA**: Labels y descripciones completas
- **Teclado**: Navegación completa con Tab y Enter
- **Contraste**: Colores WCAG 2.1 AA

---

## 🔧 Configuración Técnica

### Estados del Componente
```typescript
interface ContactProps {
  // No props requeridas - componente autónomo
}

const Contact = () => {
  // Estados del formulario
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  
  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-2 sm:p-4 lg:p-6 overflow-y-auto min-h-screen">
      {/* Contenido */}
    </div>
  );
};
```

### Estilos CSS Esperados
```css
/* Formulario */
.contact-form {
  @apply space-y-4;
}

.form-field {
  @apply space-y-2;
}

.form-input {
  @apply w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white;
}

.submit-button {
  @apply w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed;
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
<div className="space-y-6">

// Tablet (2 columnas)
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

// Desktop (2 columnas)
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
```

---

## 🚀 Integración con Navegación

### Sidebar Integration
```typescript
// En Sidebar.tsx
const navigationItems = [
  { id: "contact", label: "Contacto", icon: "..." },
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
  certificates: 3,
  contact: 4,        // Cuarta y última posición
};
```

---

## 📝 Validación de Calidad

### Checklist de Implementación
- [ ] **Formulario completo**: Todos los campos funcionales
- [ ] **Validación activa**: Feedback en tiempo real
- [ ] **Responsive test**: Probar en 3 tamaños
- [ ] **Accesibilidad**: WCAG 2.1 AA mínimo
- [ ] **Performance**: LCP < 2.5s
- [ ] **SEO**: Meta tags descriptivos
- [ ] **Redes sociales**: Enlaces funcionales
- [ ] **Información completa**: Todos los datos requeridos

### Métricas de Rendimiento
- **LCP**: < 2.5 segundos
- **FID**: < 100ms
- **CLS**: < 0.1
- **Tamaño total**: < 400KB comprimido
- **Formulario**: Submit < 1 segundo

---

## 🤖 IA Instructions

### Contexto Automático
```
SECCIÓN: Contact
PROPOSITO: Canal de comunicación y networking profesional
CONTENIDO_ESPERADO: Formulario funcional con información de contacto y redes sociales
ESTILO: Profesional con gradientes naranjas/rojos
RESPONSIVE: Adaptado con formulario e información en 1-2 columnas
ACCESIBILIDAD: WCAG 2.1 AA, navegación por teclado
PERFORMANCE: Optimizado para LCP < 2.5s
```

### Reglas de Comportamiento
1. **Sin indicaciones humanas**: La IA debe inferir el contexto
2. **Basado en métricas**: Seguir las especificaciones técnicas
3. **Consistente**: Mismo estilo que otras secciones
4. **Autónomo**: Funcionar sin props externas
5. **Validación activa**: Feedback inmediato al usuario
6. **Optimizado**: Formulario ligero y rápido

---

## 🔄 Actualización y Mantenimiento

### Frecuencia de Actualización
- **Información personal**: Cada 6 meses o cambio significativo
- **Redes sociales**: Actualizar perfiles y enlaces
- **Disponibilidad**: Actualizar estado de freelance
- **Diseño**: Cada 6 meses refrescar animaciones

### Monitoreo
- **Formularios enviados**: Analytics de conversiones
- **Interacciones**: Tiempo en página y clicks
- **Performance**: Core Web Vitals
- **Feedback**: Respuestas a formularios y consultas

---

## 🎯 Conclusión

Esta sección debe facilitar la comunicación profesional con el visitante, proporcionando múltiples canales de contacto, validación efectiva de datos y experiencia de usuario optimizada y accesible.
