const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


const user_role = [
    {
        id: "admin",
        name: 'admin',
    },
    {
        id: "user",
        name: 'user',
    }
];

const list_user = [
    {
        id: "1",
        name: 'admin',
        email: 'admin@wibudev.com',
        password: 'admin',
        userRoleId: 'admin'
    },
    {
        id: "2",
        name: 'user',
        email: 'user@wibudev.com',
        password: 'user',
        userRoleId: 'user'
    },
    {
        id: "3",
        name: 'bagas',
        email: 'bagas@wibudev.com',
        password: 'user',
        userRoleId: 'user'
    },
    {
        id: "4",
        name: 'lukman',
        email: 'lukman@wibudev.com',
        password: 'user',
        userRoleId: 'user'
    },
    {
        id: "5",
        name: 'amel',
        email: 'amel@wibudev.com',
        password: 'user',
        userRoleId: 'user'
    }
];

; (async () => {
    const boxen = (await import('boxen')).default
    //seed user role    
    for (let ur of user_role) {
        await prisma.userRole.upsert({
            where: { id: ur.id },
            update: ur,
            create: ur
        })
    }
    console.log(boxen('seed user role success', { padding: 1, margin: 1, borderStyle: 'round' }))

    // seed user
    for (let u of list_user) {
        try {
            await prisma.user.delete({
                where: {
                    id: u.id
                }
            })
        } catch (error) {
            console.log(boxen(error.message, { padding: 1, margin: 1, borderStyle: 'round' }))
        }

        try {
            await prisma.user.upsert({
                where: { id: u.id },
                update: u,
                create: u
            })
        } catch (error) {
            console.log(boxen(error.message, { padding: 1, margin: 1, borderStyle: 'round' }))
        }
    }
    console.log(boxen('seed user success', { padding: 1, margin: 1, borderStyle: 'round' }))

})().then(() => prisma.$disconnect()).catch(e => {
    console.error(e)
    prisma.$disconnect()
    process.exit()
})