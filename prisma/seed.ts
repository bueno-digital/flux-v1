import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Clean existing data
  await prisma.registration.deleteMany()
  await prisma.event.deleteMany()
  await prisma.admin.deleteMany()

  // Create admin user
  const hashedPassword = await bcrypt.hash('flux2024', 10)
  const admin = await prisma.admin.create({
    data: {
      email: 'admin@flux.ad',
      password: hashedPassword,
      name: 'Admin Flux',
      role: 'superadmin',
    },
  })
  console.log('✅ Admin created:', admin.email)

  // Helper to create future dates
  const futureDate = (daysFromNow: number) => {
    const date = new Date()
    date.setDate(date.getDate() + daysFromNow)
    return date
  }

  // Create events
  const events = await Promise.all([
    // Running events
    prisma.event.create({
      data: {
        title: 'Running Club - Ruta del Valira',
        description: 'Ruta de 8km siguiendo el río Valira desde Andorra la Vella hasta Santa Coloma. Ritmo tranquilo, ideal para todos los niveles. Después del running, café en grupo para conocernos mejor.',
        category: 'running',
        date: futureDate(2),
        time: '19:00',
        duration: 60,
        location: 'Andorra la Vella',
        address: 'Parc Central, junto a la fuente',
        level: 'todos',
        capacity: 20,
        status: 'active',
      },
    }),
    prisma.event.create({
      data: {
        title: 'Trail Running - Camí de les Pardines',
        description: 'Ruta de montaña de 12km con desnivel moderado. Vistas espectaculares del valle. Se requiere calzado de trail y llevar agua. Grupo reducido para mantener buen ritmo.',
        category: 'running',
        date: futureDate(5),
        time: '08:00',
        duration: 120,
        location: 'Encamp',
        address: 'Parking Funicamp',
        level: 'intermedio',
        capacity: 12,
        status: 'active',
      },
    }),

    // Yoga events
    prisma.event.create({
      data: {
        title: 'Yoga al Amanecer',
        description: 'Sesión de Hatha Yoga para empezar el día con energía. Posturas suaves y meditación guiada. Trae tu esterilla y ropa cómoda. Si no tienes esterilla, tenemos algunas de préstamo.',
        category: 'yoga',
        date: futureDate(1),
        time: '07:30',
        duration: 75,
        location: 'Escaldes-Engordany',
        address: 'Jardines del Parc de la Mola',
        level: 'todos',
        capacity: 15,
        status: 'active',
      },
    }),
    prisma.event.create({
      data: {
        title: 'Yoga Flow Dinámico',
        description: 'Sesión de Vinyasa Flow para quienes buscan una práctica más activa. Sincronizamos movimiento y respiración en secuencias fluidas. Experiencia previa recomendada.',
        category: 'yoga',
        date: futureDate(4),
        time: '18:30',
        duration: 60,
        location: 'La Massana',
        address: 'Centre Esportiu de La Massana',
        level: 'intermedio',
        capacity: 20,
        status: 'active',
      },
    }),

    // Mindfulness events
    prisma.event.create({
      data: {
        title: 'Meditación en la Naturaleza',
        description: 'Sesión de meditación guiada en plena naturaleza. Desconectamos del ruido y conectamos con el momento presente. No se necesita experiencia previa. Traer manta o cojín para sentarse.',
        category: 'mindfulness',
        date: futureDate(3),
        time: '10:00',
        duration: 45,
        location: 'Ordino',
        address: 'Bosque de Ordino, entrada principal',
        level: 'todos',
        capacity: 15,
        status: 'active',
      },
    }),
    prisma.event.create({
      data: {
        title: 'Taller de Respiración Consciente',
        description: 'Aprende técnicas de respiración para reducir el estrés y mejorar tu bienestar. Taller práctico de 90 minutos con ejercicios que podrás aplicar en tu día a día.',
        category: 'mindfulness',
        date: futureDate(8),
        time: '11:00',
        duration: 90,
        location: 'Andorra la Vella',
        address: 'Espai Flux (dirección por confirmar)',
        level: 'todos',
        capacity: 12,
        status: 'active',
      },
    }),

    // Padel events
    prisma.event.create({
      data: {
        title: 'Pádel Social - Nivel Iniciación',
        description: 'Partidas de pádel para principiantes. Rotación de parejas para conocer gente nueva. No importa tu nivel, lo importante es pasarlo bien y hacer ejercicio.',
        category: 'padel',
        date: futureDate(2),
        time: '20:00',
        duration: 90,
        location: 'Andorra la Vella',
        address: 'Poliesportiu Andorra',
        level: 'principiante',
        capacity: 8,
        status: 'active',
      },
    }),
    prisma.event.create({
      data: {
        title: 'Torneo Pádel Flux',
        description: 'Mini torneo amistoso de pádel para la comunidad Flux. Americano de 3 horas con rotación de parejas. Premios simbólicos y muchas risas garantizadas.',
        category: 'padel',
        date: futureDate(10),
        time: '10:00',
        duration: 180,
        location: 'La Massana',
        address: 'Pàdel La Massana',
        level: 'intermedio',
        capacity: 16,
        status: 'active',
      },
    }),

    // Nature events
    prisma.event.create({
      data: {
        title: 'Ruta de Senderismo - Llac de Tristaina',
        description: 'Excursión al lago de Tristaina, uno de los lugares más bonitos de Andorra. Ruta circular de 7km con vistas impresionantes. Nivel moderado, apto para quienes caminan habitualmente.',
        category: 'nature',
        date: futureDate(6),
        time: '09:00',
        duration: 240,
        location: 'Ordino',
        address: 'Parking Arcalís',
        level: 'intermedio',
        capacity: 15,
        status: 'active',
      },
    }),
    prisma.event.create({
      data: {
        title: 'Paseo por el Valle del Madriu',
        description: 'Caminata suave por el Valle del Madriu, Patrimonio de la Humanidad. Disfrutaremos del paisaje y la tranquilidad. Ideal para familias y todos los niveles.',
        category: 'nature',
        date: futureDate(7),
        time: '10:00',
        duration: 180,
        location: 'Escaldes-Engordany',
        address: 'Entrada Vall del Madriu',
        level: 'todos',
        capacity: 20,
        status: 'active',
      },
    }),

    // Social events
    prisma.event.create({
      data: {
        title: 'Café Flux - Networking Wellness',
        description: 'Quedada informal para conocernos mejor tomando un café. Hablamos de bienestar, compartimos experiencias y hacemos comunidad. Abierto a todos.',
        category: 'social',
        date: futureDate(3),
        time: '11:00',
        duration: 90,
        location: 'Andorra la Vella',
        address: 'La Fábrica Coffee (Av. Meritxell)',
        level: 'todos',
        capacity: 15,
        status: 'active',
      },
    }),
    prisma.event.create({
      data: {
        title: 'Brunch Saludable Flux',
        description: 'Brunch comunitario con opciones saludables. Compartimos mesa, conversación y buenos momentos. Precio del brunch no incluido (aprox. 15-20€).',
        category: 'social',
        date: futureDate(9),
        time: '11:30',
        duration: 120,
        location: 'Escaldes-Engordany',
        address: 'Por confirmar',
        level: 'todos',
        capacity: 20,
        status: 'active',
      },
    }),

    // Workout events
    prisma.event.create({
      data: {
        title: 'Entrenamiento Funcional al Aire Libre',
        description: 'Sesión de entrenamiento funcional en el parque. Ejercicios variados adaptables a todos los niveles. Traer ropa deportiva, agua y una esterilla si tienes.',
        category: 'workout',
        date: futureDate(1),
        time: '18:00',
        duration: 45,
        location: 'Andorra la Vella',
        address: 'Parc Central',
        level: 'todos',
        capacity: 20,
        status: 'active',
      },
    }),
    prisma.event.create({
      data: {
        title: 'HIIT Express',
        description: 'Sesión intensa de 30 minutos de entrenamiento HIIT. Quema calorías y mejora tu condición física. Para quienes buscan un entrenamiento desafiante.',
        category: 'workout',
        date: futureDate(4),
        time: '07:00',
        duration: 30,
        location: 'Escaldes-Engordany',
        address: 'Pista de atletismo',
        level: 'avanzado',
        capacity: 15,
        status: 'active',
      },
    }),

    // Swimming event
    prisma.event.create({
      data: {
        title: 'Natación en Grupo',
        description: 'Sesión de natación libre en grupo. Nadamos juntos, cada uno a su ritmo. Después, posibilidad de spa y relax. Entrada a piscina no incluida.',
        category: 'swimming',
        date: futureDate(5),
        time: '20:00',
        duration: 60,
        location: 'Escaldes-Engordany',
        address: 'Caldea',
        level: 'todos',
        capacity: 10,
        status: 'active',
      },
    }),
  ])

  console.log(`✅ Created ${events.length} events`)

  // Create some sample registrations
  const registrations = await Promise.all([
    prisma.registration.create({
      data: {
        eventId: events[0].id,
        name: 'Maria Garcia',
        email: 'maria@example.com',
        phone: '+376 123 456',
      },
    }),
    prisma.registration.create({
      data: {
        eventId: events[0].id,
        name: 'Pere López',
        email: 'pere@example.com',
        phone: '+376 234 567',
      },
    }),
    prisma.registration.create({
      data: {
        eventId: events[0].id,
        name: 'Anna Martí',
        email: 'anna@example.com',
      },
    }),
    prisma.registration.create({
      data: {
        eventId: events[2].id,
        name: 'Joan Ribas',
        email: 'joan@example.com',
        phone: '+376 345 678',
      },
    }),
    prisma.registration.create({
      data: {
        eventId: events[2].id,
        name: 'Laura Puig',
        email: 'laura@example.com',
      },
    }),
    prisma.registration.create({
      data: {
        eventId: events[4].id,
        name: 'Marc Serra',
        email: 'marc@example.com',
        phone: '+376 456 789',
      },
    }),
    prisma.registration.create({
      data: {
        eventId: events[10].id,
        name: 'Carla Vidal',
        email: 'carla@example.com',
      },
    }),
    prisma.registration.create({
      data: {
        eventId: events[12].id,
        name: 'Pol Andreu',
        email: 'pol@example.com',
        phone: '+376 567 890',
      },
    }),
  ])

  console.log(`✅ Created ${registrations.length} sample registrations`)
  console.log('')
  console.log('🎉 Database seeded successfully!')
  console.log('')
  console.log('📋 Admin credentials:')
  console.log('   Email: admin@flux.ad')
  console.log('   Password: flux2024')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
