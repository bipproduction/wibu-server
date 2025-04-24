import { Context } from "elysia";
import { prisma } from "@/lib/prisma";

const gitRepoSearch = async (context: Context) => {
  const { q = "", page = 1, per_page = 10 } = context.query;

  const data = await prisma.repos.findMany({
    where: {
      name: {
        contains: q,
      },
    },
    skip: (Number(page) - 1) * Number(per_page),
    take: Number(per_page),
    include: {
      _count: {
        select: {
          Branches: true
        }
      }
    }
  });

  console.log(data);
  return {
    data,
  };
};

export default gitRepoSearch;
