import { prisma } from "@/lib/prisma";

async function projectFindMany() {
  const data = await prisma.projects.findMany();
  return {
    data,
    count: data.length,
  };
}

export default projectFindMany;
