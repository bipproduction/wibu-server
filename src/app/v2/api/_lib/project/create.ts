import { Context } from "elysia";
import { V2ProjectCreateBody } from ".";
import v2ConfigGenerator from "@/app/v2/_lib/v2-config-generator";
import { prisma } from "@/lib/prisma";

const projectCreate = async (context: Context) => {
  const body = context.body as V2ProjectCreateBody;

  const project = await prisma.projects.findUnique({
    where: {
      name: body.name,
    },
  });

  if (project) {
    return context.error(409, "Project already exists");
  }

  const config = await v2ConfigGenerator({
    name: body.name,
    namespace: `${body.name}-${body.projectEnvironment.name}`,
    count: body.instance,
    env: body.env,
  });

  const create = await prisma.$transaction(async (tx) => {
    return await tx.projects.create({
      data: {
        name: body.name,
        full_name: body.full_name,
        build: body.build,
        push: body.push,
        seed: body.seed,
        description: "",
        projectEnvironment: {
          create: {
            name: body.projectEnvironment.name,
            branch: body.projectEnvironment.branch,
            config: {
              create: {
                instance: body.instance,
                json: config,
                ports: config.apps?.map((app) => app.env.PORT),
              },
            },
            env: {
              create: {
                json: body.env,
              },
            },
          },
        },
        reposId: body.reposId,
      },
    });
  });

  return {
    data: create,
  };
};

export default projectCreate;
