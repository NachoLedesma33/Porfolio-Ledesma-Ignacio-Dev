# Decisiones de Optimización de Rendimiento

## Contexto
Auditoría Lighthouse inicial: TBT 4,020 ms, Speed Index 12.7 s, Main-thread work 43.4 s.

## Decisiones

### 1. Cache de dimensiones en LetterGlitch (Fase 1)
**Problema**: `drawLetters()` leía `clientWidth/Height` en cada frame (~60 fps), forzando reflow.
**Solución**: `canvasSizeRef` cachea dimensiones; solo se actualiza en `resizeCanvas()`.
**Impacto**: Elimina ~10s de forced reflow.

### 2. Code splitting de secciones (Fase 2)
**Decisión**: 6 de 7 secciones cargan con `next/dynamic` + `ssr: false`.
**Hero** se mantiene como import directo por ser la primera vista.
**Impacto**: ~40% menos JS inicial.

### 3. Lazy rendering de LetterGlitch (Fase 2)
**Decisión**: Render condicional en `SectionLetterGlitchBackdrop` — el canvas solo existe en el DOM para la sección activa.
**Impacto**: 6 canvases inactivos eliminados del DOM.

### 4. GPU compositing para canvas (Fase 3)
**Decisión**: `will-change: transform` + `translateZ(0)` en el wrapper del canvas.
**Motivo**: Aísla repaints del canvas en capa GPU propia.

### 5. Monitoreo (Fase 4)
**Decisión**: `useReportWebVitals` para logging en desarrollo y opción de `sendBeacon` a endpoint analítico.
**LHCI**: Workflow de GitHub Actions con umbrales de rendimiento.

## No implementado (justificación)
- **next-devtools en producción**: Falso positivo de auditoría en dev server. Ausente en `next build`.
- **bfcache + WebSocket**: Solo HMR del dev server. Sin cambios necesarios.
- **Render-blocking CSS**: 3 archivos bloquean ~50ms. Impacto marginal.
- **OffscreenCanvas**: Beneficio marginal vs. complejidad. Reevaluar si el main thread sigue siendo cuello de botella tras las optimizaciones actuales.

## Métricas objetivo
| Métrica     | Pre-opt | Post-opt (estimado) |
|-------------|---------|---------------------|
| TBT         | 4,020ms | <200ms             |
| Speed Index | 12.7s   | <3s                |
| LCP         | 1.6s    | <1.5s              |
| Main thread | 43.4s   | <5s                |
