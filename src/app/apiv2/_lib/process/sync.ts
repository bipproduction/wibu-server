import { prisma } from "@/lib/prisma";
import _processGetList from "./_get-list";
import { PROCESS } from "@/types/process";

export default async function processSync() {
  const { data } = await _processGetList();

  const result = await prisma.process.upsert({
    where: {
      id: "process_id",
    },
    update: {
      jsonData: data,
    },
    create: {
      id: "process_id",
      jsonData: data,
    },
  });

  return { success: true, data: result.jsonData as PROCESS[] };
}
