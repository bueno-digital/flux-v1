# Flux - Comunidad de Bienestar en Andorra

Plataforma web para la comunidad de bienestar Flux en Andorra. Organiza y gestiona eventos de running, yoga, naturaleza, y más.

## Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Base de datos**: SQLite + Prisma ORM
- **Estilos**: Tailwind CSS
- **Autenticación**: JWT + cookies
- **Validación**: Zod

## Requisitos

- Node.js 18+
- npm o yarn

## Instalación

1. **Clonar el repositorio e instalar dependencias**

```bash
cd flux-v1
npm install
```

2. **Configurar variables de entorno**

El archivo `.env` ya está configurado para desarrollo:

```env
DATABASE_URL="file:./flux.db"
JWT_SECRET="flux-andorra-wellness-community-secret-key-change-in-production"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

3. **Inicializar la base de datos**

```bash
# Generar cliente Prisma
npm run db:generate

# Crear tablas en la base de datos
npm run db:push

# Cargar datos de prueba
npm run db:seed
```

4. **Iniciar el servidor de desarrollo**

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## Acceso al Panel de Administración

URL: [http://localhost:3000/admin](http://localhost:3000/admin)

**Credenciales de demo:**
- Email: `admin@flux.ad`
- Password: `flux2024`

## Estructura del Proyecto

```
flux-v1/
├── prisma/
│   ├── schema.prisma      # Modelos de datos
│   └── seed.ts            # Datos de prueba
├── src/
│   ├── app/
│   │   ├── (public)/      # Landing + Eventos públicos
│   │   │   └── eventos/   # Lista y detalle de eventos
│   │   ├── admin/         # Panel de administración
│   │   │   ├── eventos/   # CRUD de eventos
│   │   │   └── registros/ # Lista de registros
│   │   └── api/           # API REST endpoints
│   ├── components/        # Componentes reutilizables
│   │   ├── ui/            # Botones, inputs, etc.
│   │   ├── events/        # Componentes de eventos
│   │   ├── admin/         # Componentes del admin
│   │   └── layout/        # Header, Footer
│   ├── lib/               # Utilidades
│   │   ├── prisma.ts      # Cliente Prisma
│   │   ├── auth.ts        # Autenticación JWT
│   │   ├── utils.ts       # Helpers
│   │   └── validations.ts # Esquemas Zod
│   └── types/             # TypeScript types
└── public/                # Assets estáticos
```

## API Endpoints

### Eventos
- `GET /api/events` - Listar eventos (público)
- `GET /api/events/:id` - Obtener evento (público)
- `POST /api/events` - Crear evento (admin)
- `PUT /api/events/:id` - Actualizar evento (admin)
- `DELETE /api/events/:id` - Eliminar evento (admin)
- `GET /api/events/:id/registrations` - Registros de un evento (admin)

### Registros
- `GET /api/registrations` - Listar registros (admin)
- `POST /api/registrations` - Registrarse a evento (público)
- `DELETE /api/registrations/:id` - Eliminar registro (admin)
- `PATCH /api/registrations/:id` - Actualizar estado (admin)

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/logout` - Cerrar sesión
- `GET /api/auth/me` - Verificar sesión

### Estadísticas
- `GET /api/stats` - Dashboard stats (admin)

## Scripts Disponibles

```bash
npm run dev        # Servidor de desarrollo
npm run build      # Build de producción
npm run start      # Servidor de producción
npm run lint       # Linting

npm run db:generate # Generar cliente Prisma
npm run db:push     # Sincronizar schema con DB
npm run db:seed     # Cargar datos de prueba
npm run db:studio   # Abrir Prisma Studio
npm run db:reset    # Resetear DB y recargar seed
```

## Funcionalidades MVP

### Landing Pública
- Hero con claim de comunidad
- Sección "Por qué Flux"
- Categorías de actividades
- Valores de la comunidad
- CTA para ver eventos

### Página de Eventos
- Lista de eventos próximos
- Filtros por categoría y ubicación
- Tarjetas con información clave
- Indicador de plazas disponibles

### Detalle de Evento
- Información completa del evento
- Formulario de registro
- Validación de capacidad
- Confirmación de registro

### Panel de Administración
- Dashboard con estadísticas
- CRUD completo de eventos
- Lista de registros
- Gestión de participantes

## Escalabilidad Futura

El proyecto está preparado para añadir:

- **Usuarios registrados**: Perfiles, historial, preferencias
- **Organizadores externos**: Multi-tenant, verificación
- **Pagos**: Integración con Stripe, membresías
- **Eventos recurrentes**: Patrones de repetición
- **Comunidad**: Mensajes, foros, grupos
- **Local físico**: Reservas, menús, promos

Los modelos comentados en `prisma/schema.prisma` muestran la estructura propuesta.

## Despliegue

### Vercel (Recomendado)

1. Conectar repositorio a Vercel
2. Configurar variables de entorno en Vercel Dashboard
3. Para producción, usar PostgreSQL en lugar de SQLite:
   - Crear DB en Supabase, Neon, o PlanetScale
   - Actualizar `DATABASE_URL` en Vercel
   - Cambiar provider en `schema.prisma` a `postgresql`

### Variables de Producción

```env
DATABASE_URL="postgresql://..."
JWT_SECRET="[generar-secret-seguro]"
NEXT_PUBLIC_APP_URL="https://flux.ad"
```

## Licencia

Proyecto privado - Flux Andorra
