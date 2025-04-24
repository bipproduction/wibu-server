"use client";

import { Button, Container, Flex, Stack, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useProxy } from "valtio/utils";
import stateProject from "../_state/state-project";
import Routes from "../_routes";
import { ProjectList } from "./_com/ProjectList";

export default function Page() {
  return (
    <Container w={"100%"}>
      <Stack>
        <Flex gap={"md"}>
          <ProjectSearch />
          <Button
            variant="white"
            component={"a"}
            href={Routes.routes.project.create.query({action: "selectrepo"})}
          >
            Create Project
          </Button>
        </Flex>
        <ProjectList />
      </Stack>
    </Container>
  );
}

function ProjectSearch() {
  const projectState = useProxy(stateProject);
  return (
    <TextInput
      onChange={(e) => {
        if (e.target.value === "") {
          projectState.project.list.load();
          return;
        }
        projectState.project.list.search(e.target.value);
      }}
      placeholder="Search projects"
      leftSection={<IconSearch />}
      w={"100%"}
    />
  );
}
