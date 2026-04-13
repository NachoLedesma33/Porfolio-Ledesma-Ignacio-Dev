# Guía de la sección Habilidades (Skills)

## Propósito

Este documento describe cómo está implementada la sección **Habilidades** del portfolio y cómo agregar o modificar habilidades manteniendo el mismo comportamiento y estilo que el código actual en `app/sections/Skills.tsx`.

---

## Archivos relacionados

| Archivo | Rol |
|--------|-----|
| `app/sections/Skills.tsx` | Lista de habilidades, categorías, grid y enlaces externos |
| `app/hooks/useMouseDragScroll.ts` | Scroll con arrastre (ratón) en el contenedor de la sección |
| `app/components/SectionVenomBackdrop.tsx` | Fondo animado (Venom Beam) + velo para legibilidad |
| `app/components/ui/venom-beam.tsx` | Canvas del efecto de fondo en modo embebido |
| `app/globals.css` | Clases globales como `.section-heading`, `.accent-rule` |
| `next.config.ts` | `images.remotePatterns` para logos desde **svgl.app** |

---

## Modelo de datos

Cada entrada del array `skills` cumple el tipo `Skill`:

```typescript
type SvglRoute = string | { light: string; dark: string };

type Skill = {
  name: string;
  url: string;
  category: string;
  /** Ruta en SVGL (https://svgl.app). Si falta, se usa `emoji`. */
  svgl?: SvglRoute;
  emoji?: string;
};
```

- **`name`**: Texto visible bajo el icono.
- **`url`**: Destino del enlace (`target="_blank"`, `rel="noopener noreferrer"`).
- **`category`**: Agrupa la habilidad. Las categorías que ves en pantalla se calculan con `Array.from(new Set(skills.map((s) => s.category)))`, es decir, **no hay lista fija**: basta con usar un string nuevo para crear una nueva sección.
- **`svgl`**: URL del SVG en [SVGL](https://svgl.app). Puede ser un string único o un objeto `{ light, dark }` cuando el logo cambia entre tema claro y oscuro (el componente `SkillIcon` usa `useSyncExternalStore` con `prefers-color-scheme`).
- **`emoji`**: Solo si no hay `svgl` (ejemplo actual: Hibernate con 🐘).

---

## Categorías actuales en el proyecto

Según el array definido en `Skills.tsx`, las categorías usadas son:

- **Frontend**
- **Backend**
- **Database**
- **DevOps & Tools**

Si agregás una habilidad con `category: "Mobile"`, aparecerá automáticamente un bloque **Mobile** en la UI.

---

## Cómo agregar una habilidad

1. Abrí `app/sections/Skills.tsx`.
2. Dentro del array `skills`, agregá un objeto respetando el tipo `Skill`.
3. Preferí un logo desde **SVGL** copiando la ruta de la documentación del icono (formato `https://svgl.app/library/...`).
4. Si el sitio ofrece variantes claro/oscuro, usá el objeto `{ light: "...", dark: "..." }` como en React, Astro, MySQL, etc.
5. Ejecutá `npm run build` para comprobar tipos y que las URLs remotas sigan permitidas en `next.config.ts`.

### Ejemplo con un solo SVG

```typescript
{
  name: "Vite",
  svgl: "https://svgl.app/library/vite.svg",
  url: "https://vite.dev/",
  category: "Frontend",
},
```

### Ejemplo con variantes claro / oscuro

```typescript
{
  name: "Ejemplo",
  svgl: {
    light: "https://svgl.app/library/ejemplo-light.svg",
    dark: "https://svgl.app/library/ejemplo-dark.svg",
  },
  url: "https://ejemplo.com/",
  category: "Frontend",
},
```

### Ejemplo solo con emoji (sin SVGL)

```typescript
{
  name: "Hibernate",
  emoji: "🐘",
  url: "https://hibernate.org/",
  category: "Backend",
},
```

---

## Imágenes remotas (Next.js)

Los logos se cargan con `next/image` y **`unoptimized`** en `SkillIcon` (SVG externos desde SVGL).

En `next.config.ts` debe existir el host permitido:

```typescript
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "svgl.app",
      pathname: "/library/**",
    },
  ],
},
```

Si en el futuro usás otro CDN para SVGs, agregá aquí el correspondiente `hostname` y `pathname`.

---

## Comportamiento de la sección (UI / UX)

- **Scroll**: el contenedor principal usa `ref={scrollRef}` con `useMouseDragScroll` y la clase `scrollbar-hide` (scroll sin barra visible, coherente con el resto de secciones).
- **Fondo**: `SectionVenomBackdrop` envuelve título, bloque “Mi Trayectoria Profesional” y grids; respeta `prefers-reduced-motion` dentro del componente Venom Beam.
- **Título**: clases `section-heading` y regla `accent-rule` definidas en `globals.css` (paleta rosa / rojo del sitio).
- **Grid**: `grid-cols-2` en móvil hasta `xl:grid-cols-6` en pantallas anchas; cada celda es un `<a>` con hover (sombra, anillo rose, texto rose en hover).

---

## Checklist rápido

- [ ] Objeto `Skill` con `name`, `url`, `category`.
- [ ] `svgl` **o** `emoji` (al menos uno para que haya icono).
- [ ] URL de documentación oficial o recurso coherente en `url`.
- [ ] Si es host nuevo de imágenes, actualizar `next.config.ts`.
- [ ] `npm run build` sin errores.

---

## Referencias

- [SVGL — biblioteca de logos](https://svgl.app)
- [Next.js Image — remotePatterns](https://nextjs.org/docs/app/api-reference/components/image#remotepatterns)
- [ScrollX UI — Venom Beam](https://scrollxui.dev/docs/components/venom-beam) (fondo usado vía `SectionVenomBackdrop`)

Para agregar o editar **proyectos** (cards, modal, imágenes en `public/`), usá la guía que corresponda a `Projects.tsx` o documentación específica de esa sección; este archivo queda dedicado solo a **Habilidades**.
