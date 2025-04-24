import { prisma } from "@/lib/prisma";
export async function domainConfig() {
  const muku = await prisma.domain.findUnique({
    where: {
      domain_name: "muku",
    },
  });
  const wibuDev = await prisma.domain.findUnique({
    where: {
      domain_name: "wibuDev",
    },
  });

  return {
    wibuDev,
    muku,
  };
}
