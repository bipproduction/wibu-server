import { prisma } from "@/lib/prisma";
import { Context } from "elysia";

async function environtmentFindUniq(con: Context) {
  const { environmentId } = con.params;
  const environment = await prisma.projectEnvironment.findUnique({
    where: { id: environmentId },
    include: { env: true, config: true },
  });
  return { data: environment };
}

export default environtmentFindUniq;
