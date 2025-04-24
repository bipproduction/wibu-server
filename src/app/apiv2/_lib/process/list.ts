import { prisma } from "@/lib/prisma";
import { PROCESS } from "@/types/process";

export default async function processList() {
  const data = await prisma.process.findUnique({
    where: {
      id: "process_id",
    },
  });

  if (!data) return { data: { online: [], offline: [] } };

  const online = (data?.jsonData as PROCESS[]).filter(
    (process) => process.pm2_env.status === "online"
  );

  const offline = (data?.jsonData as PROCESS[]).filter(
    (process) => process.pm2_env.status !== "online"
  );

  return { data: { online, offline } };
}
