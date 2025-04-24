import { Card, SimpleGrid, Skeleton, Stack, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { useProxy } from "valtio/utils";
import Routes from "../../_routes";
import stateProject from "../../_state/state-project";

export function ProjectList() {
  const project = useProxy(stateProject);

  useShallowEffect(() => {
    if (!project.project.list.data) {
      project.project.list.load();
    }
  }, []);

  if (!project.project.list.data) return <Loading />;
  return (
    <Stack>
      <SimpleGrid
        cols={{
          base: 1,
          sm: 2
        }}
      >
        {project.project.list.data?.map(
          (
            item: Prisma.ProjectsGetPayload<{
              select: {
                id: true;
                name: true;
                full_name: true;
              };
            }>,
            key
          ) => (
            <Card
              key={key}
              withBorder
              p={"md"}
              component={Link}
              // href={projectRoutes.detail.build({ projectId: item.id })}
              href={Routes.routes.project.detail.query({ projectId: item.id })}
            >
              <Stack>
                <Text>{item.name}</Text>
                <Text>{item.full_name}</Text>
              </Stack>
            </Card>
          )
        )}
      </SimpleGrid>
    </Stack>
  );
}

function Loading() {
  return (
    <SimpleGrid
      cols={{
        base: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 5,
      }}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} height={150} />
      ))}
    </SimpleGrid>
  );
}
