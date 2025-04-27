import { prisma } from "@/lib/prisma";

const data = await prisma.config.findUnique({
  where: {
    projectEnvironmentId: ""
  }
})

console.log(data)