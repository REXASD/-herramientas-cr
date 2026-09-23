# HerramientasCR

Plataforma web de calculadoras y guías para Costa Rica construida con **Next.js 16 + React 19 + TypeScript**.

> Estado del proyecto: **versión funcional previa al lanzamiento oficial**. El nombre, dominio, correo, Analytics y AdSense se dejaron configurables para sustituirlos sin reescribir el sitio.

## Incluido

### Herramientas
- Calculadora de aguinaldo.
- Calculadora de vacaciones.
- Calculadora de salario neto 2026.
- Calculadora de IVA con tarifas predefinidas y personalizada.
- Calculadora de préstamos con tabla de amortización.
- Estimador de traspaso vehicular.
- Conversor USD ↔ CRC con tasa ingresada por el usuario.

### Contenido y navegación
- Página de inicio responsive.
- Buscador interno de herramientas y guías.
- 7 guías temáticas.
- Acerca de, contacto, privacidad, cookies y términos.
- Página 404, estado de carga y boundary de error.

### SEO y publicación
- Metadata y canonical por página.
- Open Graph y Twitter metadata base.
- JSON-LD para el sitio, herramientas y preguntas frecuentes.
- `sitemap.xml` y `robots.txt` generados por Next.js.
- Manifest e icono temporal.
- URLs configurables por entorno.
- Cabeceras básicas de seguridad.

### Monetización preparada
- Espacios publicitarios visibles en modo vista previa para definir la distribución antes de activar AdSense.
- Panel de consentimiento por categorías para analítica y publicidad.
- Carga opcional de Google Analytics con consentimiento.
- Integración de AdSense desactivada por defecto.
- `/ads.txt` generado desde variable de entorno.
- Textos base de privacidad/cookies preparados para revisión final.

## Desarrollo local

Requiere Node.js moderno (recomendado Node 22).

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Pruebas y compilación

```bash
npm run verify
npm run typecheck
npm run build
```

`npm run verify` ejecuta casos de prueba sobre las fórmulas principales sin depender del navegador.

## Variables de entorno

Copia `.env.example` como `.env.local`.

```env
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_CONTACT_EMAIL=herramientascrinfo@gmail.com
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=
NEXT_PUBLIC_ENABLE_ADSENSE=false
NEXT_PUBLIC_ADSENSE_CLIENT=
ADSENSE_PUBLISHER_ID=
NEXT_PUBLIC_SHOW_AD_PREVIEWS=true
NEXT_PUBLIC_ADSENSE_SLOT_TOP=
NEXT_PUBLIC_ADSENSE_SLOT_MID=
NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM=
```

### Durante el desarrollo

Puedes dejar `NEXT_PUBLIC_SITE_URL` vacío. En Vercel, el proyecto intenta usar automáticamente la URL de producción de Vercel mientras no exista dominio propio.

### Antes del lanzamiento oficial

1. Definir nombre definitivo del proyecto.
2. Comprar/conectar dominio y configurar `NEXT_PUBLIC_SITE_URL`.
3. Crear correo oficial y configurar `NEXT_PUBLIC_CONTACT_EMAIL`.
4. Crear propiedad de Search Console y configurar la verificación.
5. Si se desea, configurar Google Analytics.
6. Revisar nuevamente las fórmulas y textos sujetos a normativa.
7. Revisar políticas de privacidad/cookies con los servicios que realmente se activen.
8. Solicitar AdSense cuando el sitio ya tenga contenido, navegación y páginas legales publicadas.
9. Antes de activar AdSense, configurar desde Google AdSense una CMP certificada para las regiones donde sea obligatoria. El panel interno del sitio no sustituye esa certificación.
10. Configurar `NEXT_PUBLIC_ADSENSE_CLIENT`, `ADSENSE_PUBLISHER_ID` y finalmente `NEXT_PUBLIC_ENABLE_ADSENSE=true`.

## Deploy en Vercel

1. Sube la carpeta a un repositorio de GitHub.
2. Importa el repositorio en Vercel.
3. Agrega las variables de entorno que ya tengas disponibles.
4. Ejecuta el deploy.
5. Verifica `/sitemap.xml`, `/robots.txt` y `/ads.txt`.
6. Conecta el dominio cuando esté definido.

## Datos que se deben revisar periódicamente

- Cuota obrera CCSS.
- Tramos del impuesto sobre salarios y créditos fiscales.
- Tarifas y tratamientos del IVA.
- Reglas laborales de aguinaldo y vacaciones.
- Aranceles, impuestos y timbres de traspaso.
- Políticas de Google AdSense y consentimiento.

## Fuentes institucionales usadas como referencia

- Ministerio de Trabajo y Seguridad Social (MTSS).
- Caja Costarricense de Seguro Social (CCSS).
- Ministerio de Hacienda.
- Registro Nacional.
- Banco Central de Costa Rica (BCCR).

## Nota sobre exactitud

Las calculadoras son orientativas. Las normas, tasas y circunstancias individuales pueden cambiar. Las páginas reguladas enlazan las fuentes oficiales utilizadas como referencia y muestran su fecha de revisión.
