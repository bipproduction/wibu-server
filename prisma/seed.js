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
        await prisma.user.delete({
            where: {
                id: u.id
            }
        })
        
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