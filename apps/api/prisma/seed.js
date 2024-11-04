const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient
const hashPassword = async (password) => {
  const saltRound = 10
  return await bcrypt.hash(password, saltRound)
}
async function main() {
  for (let i = 0; i <= 30; i++) {
    await prisma.eventOrganizer.create({
      data: {
        organizerName: `Organizer ${i + 1}`,
        ownerName: `Owner ${i + 1}`,
        email: `organizer${i + 1}@example.com`,
        password: '123',
        role: 'EO',
        phoneNumber: `+62123456${i + 7890}`,
        identityNumber: 123456780 + i,
        profilePicture: `https://example.com/profile${i + 1}.jpg`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  const categories = ['Music', 'Expo', 'Sports', 'Comedy', 'Comedy', 'Comedy'];
  for (const categoryName of categories) {
    await prisma.category.create({
      data: {
        Category: categoryName,
      },
    })
  }

  for (let i = 0; i <= 30; i++) {
    const eventOrganizerId = await prisma.eventOrganizer.findFirst({
      select: { id: true },
      where: { email: `organizer${(i % 5) + 1}@example.com` },
    });

    const categoryId = await prisma.category.findFirst({
      select: { id: true },
      where: { Category: categories[i % categories.length] },
    });

    await prisma.event.create({
      data: {
        eventName: `Event ${i + 1}`,
        location: `Location ${i + 1}`,
        description: `Description for Event ${i + 1}`,
        isPaid: i % 2 === 0,
        startEvent: new Date(`2024-12-0${(i % 3) + 1}T18:00:00Z`),
        endEvent: new Date(`2024-12-0${(i % 3) + 1}T23:00:00Z`),
        artist: `Artist ${i + 1}`,
        eventOrganizerId: eventOrganizerId?.id,
        categoryId: categoryId?.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  for (let i = 1; i <= 30; i++) {
    const eventId = await prisma.event.findFirst({
      select: { id: true },
      where: { eventName: `Event ${i}` },
    });

    await prisma.tickets.create({
      data: {
        price: 100000 + i * 10000,
        ticketName: `Ticket ${i}`,
        ticketType: 'General',
        seatAvailable: 100 - i * 10,
        eventId: eventId?.id,
        version: '1.0',
        discount: 10 * i,
        startDate: new Date(),
        endDate: new Date('2024-11-30T12:00:00Z'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    await prisma.eventImages.create({
      data: {
        eventImageUrl: `https://staticassets.kiostix.com/banner/1727060869672_Artboard%201-2.png`,
        eventsId: eventId?.id,
      },
    });
  }
}


main().catch((error) => {
  console.log(error)
}).finally(async () => {
  await prisma.$disconnect()
})