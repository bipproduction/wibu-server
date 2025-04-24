"use client";

import { Button, Flex, Stack } from "@mantine/core";
import Routes from "../../_routes";
import { ProjectList } from "./ProjectList";
import { ProjectSearch } from "./ProjectSearch";


export function ProjectView() {
  return (
    <Stack>
      <Flex gap={"md"}>
        <ProjectSearch />
        <Button
          variant="white"
          component={"a"}
          // href={projectRoutes.create.build()}
          href={Routes.routes.project.create.get()}
        >
          Create Project
        </Button>
      </Flex>
      <ProjectList />
    </Stack>
  );
}
