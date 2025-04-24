import { prisma } from "@/lib/prisma";
import { PROCESS } from "@/types/process";
import { Context } from "elysia";

export default async function processByPort(
  context: Context<{ params: { port: string } }>
): Promise<{ data: PROCESS | null }> {
  const { port } = context.params;
  const data = await prisma.process.findUnique({
    where: {
      id: "process_id",
    },
  });

  if (!data) return { data: null };

  const result =
    (data.jsonData as PROCESS[]).find(
      (process) => process.pm2_env.PORT == port
    ) || null;
  return {
    data: result,
  };
}
