import { Card, SimpleGrid, Stack, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { useProxy } from "valtio/utils";
import stateProject from "../../_state/state-project";

const root = "/dashboard";

export function ProjectList() {
  const project = useProxy(stateProject);

  useShallowEffect(() => {
    if (!project.list.data) {
      project.list.load();
    }
  }, []);
  return (
    <Stack>
      <SimpleGrid
        cols={{
          base: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 5,
        }}
      >
        {project.list.data?.map(
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
              href={`${root}/project/${item.name}`}
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
