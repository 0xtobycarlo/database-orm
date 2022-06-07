const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
    const createdCustomer = await prisma.customer.create({
        data: {
            name: 'Alice',
            contact: {
                create: {
                    phone: "01234567890"
                    email: "test@test.com"
                }
            }
        },
        include: {
            contact: true
        }
    });

    console.log('Customer created', createdCustomer);

    // Add your code here

    const createdContact = await prisma.contact.create({
        data: {
            phone: '123',
            email: '123@example.com',
            customer: {
                create: {
                    name: 'Bob',
                },
            },
        },
    });

    const createdMovies = await prisma.movie.create ({
        data: {
            title: "Movie",
            runtimeMins: 999
        },
    });

    const createdScreen = await prisma.screen.create ({
        data: {
            number: 1,
        },
    });

    const createdScreening = await prisma.screening.create ({
        data: {
            startsAt: new Date("2022-06-12T17:00"),
            movie: {
                create: {
                    title: "Movie2",
                    runtimeMins: 888
                },
            },
            screen: {
                create: {
                    number: 2,
                }
            }
        },
    });

    // Don't edit any of the code below this line
    process.exit(0);
}

seed()
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    })
