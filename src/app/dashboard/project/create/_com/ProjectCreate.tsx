"use client";
import Routes from "@/app/dashboard/_routes";
import {
  ActionIcon,
  Button,
  Flex,
  Group,
  Stack,
  Text
} from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";
import { ReposView } from "../../../_components/repos/ReposView";
import { ProjectCreateDetail } from "./ProjectCreateDetail";

export function ProjectCreate() {
  const { action } = Routes.routes.project.create.parse(useSearchParams());

  if(action === "selectrepo") {
    return <Stack>
      <ReposView />
      <Group>
        <Button variant="white" component={"a"} href={Routes.routes.project.create.query({action: "form"})}>
          Next
        </Button>
      </Group>
    </Stack>;
  }
  return (
    <Stack>
      <Flex p={"md"}>
        <ActionIcon radius={100} component="a" href={Routes.routes.project.get()}>
          <IconChevronLeft />
        </ActionIcon>
      </Flex>

      <Stack>
        <Text>Project Create</Text>
        <ProjectCreateDetail />
      </Stack>
    </Stack>
  );
}
