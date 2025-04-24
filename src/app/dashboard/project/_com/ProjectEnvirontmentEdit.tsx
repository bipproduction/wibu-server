/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  ActionIcon,
  Container,
  Divider,
  Paper,
  SimpleGrid,
  Skeleton,
  Stack,
  TextInput
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconChevronLeft } from "@tabler/icons-react";
import Link from "next/dist/client/link";
import { useParams } from "next/navigation";
import { useProxy } from "valtio/utils";
import Routes from "../../_routes";
import stateProject from "../../_state/state-project";

function ProjectEnvirontmentEdit() {
  const { slug } = useParams();
  const [projectId, action, environmentId] = slug || [];
  const project = useProxy(stateProject);

  useShallowEffect(() => {
    project.project.getEnvironmentDetail.load({ environmentId });
  }, [environmentId]);

  if (!project.project.getEnvironmentDetail.data) {
    return (
      <Container w={"100%"}>
        <Stack>
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} height={100} />
          ))}
        </Stack>
      </Container>
    );
  }

  return (
    <Container w={"100%"}>
      <Stack>
        {/* <ActionIcon component={Link} href={projectRoutes.detail.build({ projectId })}> */}
        <ActionIcon component={Link} href={Routes.routes.project.detail.query({ projectId })}>
          <IconChevronLeft />
        </ActionIcon>
        <TextInput
          label="Name"
          defaultValue={project.project.getEnvironmentDetail.data?.name}
        />
        <Paper withBorder p={"md"}>
          <Stack>
            <Divider label="Process Config" labelPosition="left" />
            <SimpleGrid
              cols={{
                base: 2,
              }}
            >
              {(
                (project.project.getEnvironmentDetail.data?.config?.json as any)
                  .apps as any[]
              ).map((app: any, key) => (
                <Stack key={key}>
                  <TextInput label="Namespace" defaultValue={app.namespace} />
                  <TextInput label="App Name" defaultValue={app.name} />
                </Stack>
              ))}
            </SimpleGrid>
          </Stack>
        </Paper>
        <Paper withBorder p={"md"}>
          <Stack>
            <Divider label="Env Config" labelPosition="left" />
            {project.project.getEnvironmentDetail.data?.env?.json && (
              <Stack>
                {Object.entries(
                  project.project.getEnvironmentDetail.data?.env?.json
                ).map(([key, value]) => (
                  <TextInput key={key} label={key} defaultValue={value} />
                ))}
              </Stack>
            )}
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}

export default ProjectEnvirontmentEdit;
