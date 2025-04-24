/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import { Context } from "elysia";

async function processFindUniq(context: Context) {
  const { name } = context.query;
  const process = await prisma.process.findUnique({
    where: { id: "process_id" },
  });

  if (!process) return { data: null };

  const result = (process.jsonData as any[]).find((process) => process.name === name) || null;
  return { data: result };
}

export default processFindUniq;
