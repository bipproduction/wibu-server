"use client";
import {
  ActionIcon,
  Button,
  Container,
  Divider,
  Flex,
  Group,
  Paper,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import {
  IconChevronLeft,
  IconChevronRight,
  IconPlus,
  IconTrash,
  IconTrashX,
} from "@tabler/icons-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useProxy } from "valtio/utils";
import Routes from "../../_routes";
import stateProject from "../../_state/state-project";

export default function Page() {
  const { projectId } = Routes.routes.project.detail.parse(useSearchParams());

  if (!projectId)
    return (
      <Container w={"100%"} suppressHydrationWarning>
        <Stack>
          {Array.from({ length: 2 }).map((v, k) => (
            <Skeleton h={100} key={k} />
          ))}
        </Stack>
      </Container>
    );
  return (
    <Container w={"100%"}>
      <Stack>
        <ProjectDetail params={{ id: projectId }} />
      </Stack>
    </Container>
  );
}

function ProjectDetail({ params }: { params: Record<string, string> }) {
  const project = useProxy(stateProject);
  useShallowEffect(() => {
    project.project.getProject.load({ id: params.id });
  }, []);

  if (!project.project.getProject.data)
    return (
      <Container w={"100%"}>
        <Stack>
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} height={100} />
          ))}
        </Stack>
      </Container>
    );

  return (
    <Container
      w={{
        base: "100%",
      }}
    >
      <Stack gap={"xs"}>
        <ActionIcon
          color="gray"
          component={Link}
          href={Routes.routes.project.get()}
        >
          <IconChevronLeft />
        </ActionIcon>
        <Button.Group>
          <Button
            color="grey"
            leftSection={<IconTrash />}
            variant="outline"
            onClick={() => project.project.delete.soft({ id: params.id })}
          >
            delete
          </Button>
          <Button
            color="grey"
            leftSection={<IconTrashX />}
            variant="outline"
            onClick={() => project.project.delete.hard({ id: params.id })}
          >
            hard delete
          </Button>
        </Button.Group>
        <Paper withBorder p={"md"}>
          <Divider label="Project" labelPosition="left" />
          <Stack gap={"xs"}>
            <Flex gap={"md"}>
              <Text w={"200"}>Name</Text>
              <Text>{project.project.getProject.data.name}</Text>
            </Flex>
            <Flex gap={"md"}>
              <Text w={"200"}>Full Name</Text>
              <Text>{project.project.getProject.data.full_name}</Text>
            </Flex>
            <Flex gap={"md"}>
              <Text w={"200"}>Push</Text>
              <Text>{project.project.getProject.data.push ? "Yes" : "No"}</Text>
            </Flex>
            <Flex gap={"md"}>
              <Text w={"200"}>Seed</Text>
              <Text>{project.project.getProject.data.seed ? "Yes" : "No"}</Text>
            </Flex>
            <Flex gap={"md"}>
              <Text w={"200"}>Build</Text>
              <Text>
                {project.project.getProject.data.build ? "Yes" : "No"}
              </Text>
            </Flex>
          </Stack>
        </Paper>
        <ProjectEnvironmentView />
      </Stack>
    </Container>
  );
}

function ProjectEnvironmentView() {
  const project = useProxy(stateProject);
  // const { projectId } = projectRoutes.detail.Parse();
  const { projectId } = Routes.routes.project.detail.parse(useSearchParams());

  useShallowEffect(() => {
    if (!projectId) return;
    project.environtment.findMany.load({ projectId });
  }, [projectId]);
  return (
    <Paper withBorder p={"md"}>
      <Stack gap={"md"}>
        <Group>
          <Button
            color="grey"
            variant="outline"
            leftSection={<IconPlus />}
            component={Link}
            href={Routes.routes.project.environment.create.query({
              projectId: projectId!,
            })}
          >
            Add Environment
          </Button>
        </Group>
        <Divider label="Environment" labelPosition="left" />
        <Stack>
          <SimpleGrid
            cols={{
              base: 1,
              sm: 2,
            }}
          >
            {project.environtment.findMany.data?.map((item) => (
              <Stack key={item.id} gap={"md"}>
                <Flex gap={"md"}>
                  <ActionIcon
                    color="gray"
                    component={Link}
                    href={Routes.routes.project.environment.query({
                      projectId: projectId,
                      environmentId: item.id,
                    })}
                  >
                    <IconChevronRight />
                  </ActionIcon>
                  <Text>{item.name}</Text>
                </Flex>
              </Stack>
            ))}
          </SimpleGrid>
        </Stack>
      </Stack>
    </Paper>
  );
}
