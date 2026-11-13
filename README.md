# BMJC Devs - Software Studio & Landing Page

Sitio web corporativo y de presentación de **BMJC Devs**, estudio especializado en desarrollo de aplicaciones web y móviles de alto rendimiento, agentes inteligentes de IA con arquitectura RAG y software operativo a medida.

## ✨ Características y Mejoras Implementadas

- **Diseño Editorial & Tech**: Tipografía moderna (*Plus Jakarta Sans*, *Playfair Display* y *JetBrains Mono*) con micro-interacciones de alto nivel.
- **Modo Oscuro / Claro Persistente**: Tema Obsidian Tech y Pearl Editorial con detección de preferencia del sistema y guardado en `localStorage`.
- **Consola Interactiva del Hero (Live Demo)**: Pestañas interactivas que simulan el pipeline del agente TechHogar con LangChain y arquitectura RAG (`techhogar_agent.py`) y las métricas de estado del estudio (`studio_metrics.json`).
- **Filtros de Portafolio Dinámicos**: Filtrado instantáneo por categorías (*Todos*, *IA & Agentes*, *En producción*, *Productos propios*).
- **Copiado de Email en 1 Clic**: Botón interactivo con retroalimentación visual inmediata ("¡Copiado!") y notificación toast flotante accesible.
- **Scroll Spy**: Seguimiento activo en el menú de navegación al desplazarse por las distintas secciones.
- **Rendimiento Puro**: 100% Vanilla JavaScript y CSS nativo sin dependencias pesadas ni frameworks, garantizando carga instantánea.
- **Totalmente Responsive**: Menú móvil accesible con soporte de gestos y diseño adaptable a cualquier pantalla.

## 📁 Estructura del Proyecto

```text
bmjc-devs/
├── index.html        # Estructura semántica HTML5, metadatos y accesibilidad
├── css/
│   └── style.css     # Design tokens, variables CSS, temas (Dark/Light) y layout responsive
├── js/
│   └── main.js       # Control de tema, consola interactiva, filtros, toast y scroll spy
└── README.md         # Documentación del proyecto
```

## 🚀 Despliegue y Uso Local

Simplemente abre `index.html` en tu navegador o levanta un servidor de desarrollo estático:

```bash
# Con Python
python -m http.server 3000

# Con Node (npx)
npx serve .
```

---
© 2026 BMJC Devs
