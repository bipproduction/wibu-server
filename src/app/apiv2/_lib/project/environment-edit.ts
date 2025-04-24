/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";

export default async function environmentEdit({ body }: { body: any }) {
  const { environmentId } = body;
  
  const [projectEnv, environtment] = await Promise.all([
    prisma.projectEnvironment.findUnique({ where: { id: environmentId } }),
    prisma.env.findUnique({ where: { projectEnvironmentId: environmentId } }),
  ]);
  
  if (!projectEnv || !environtment) {
    return {
      success: false,
      message: "Environment not found",
      data: null,
    };
  }
  
  return {
    success: true,
    message: "Environment edited",
    data: null,
  };
}
  


  