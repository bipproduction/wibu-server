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
        id: "admin",
        name: 'admin',
        email: 'admin@wibudev.com',
        password: 'admin',
        userRoleId: 'admin'
    },
    {
        id: "user",
        name: 'user',
        email: 'user@wibudev.com',
        password: 'user',
        userRoleId: 'user'
    }
];

; (async () => {

    //seed user role
    for (let ur of user_role) {
        await prisma.userRole.upsert({
            where: { id: ur.id },
            update: ur,
            create: ur
        })
    }
    console.log('seed user role success')

    // seed user
    for (let u of list_user) {
        await prisma.user.upsert({
            where: { id: u.id },
            update: u,
            create: u
        })
    }
    console.log('seed user success')

})().then(() => prisma.$disconnect()).catch(e => {
    console.error(e)
    prisma.$disconnect()
    process.exit()
})