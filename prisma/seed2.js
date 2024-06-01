const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

; (async () => {
    const data = Array.from(new Array(100)).map((val, key) => ({
        id: key + 1,
        name: `data ${key + 1}`
    }))

    for (let d of data) {
        await prisma.testScroll.upsert({
            where: { id: d.id },
            update: d,
            create: d
        })
    }
})()
    .then(() => {
        process.exit(0)
    })
    .catch((e) => {
        console.log(e)
        process.exit(0)
    })