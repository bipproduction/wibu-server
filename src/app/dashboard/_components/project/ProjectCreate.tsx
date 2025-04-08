"use client";
import {
  ActionIcon,
  Container,
  Flex,
  Paper,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { ReposView } from "../repos/ReposView";
import { useProxy } from "valtio/utils";
import stateGithub from "../../_state/state-github";
import { IconCircle } from "@tabler/icons-react";

export function ProjectCreate() {
  return (
    <Stack>
      <Flex p={"md"}>
        <ActionIcon radius={100} component="a" href={"/dashboard"}>
          <IconCircle />
        </ActionIcon>
      </Flex>

      <Container  
        fluid
        w={{
          base: "100%",
          sm: "80%",
        }}
      >
        <Stack>
          <Text>Project Create</Text>
          <SimpleGrid cols={2}>
            <ReposView />
            <Detail />
          </SimpleGrid>
        </Stack>
      </Container>
    </Stack>
  );
}

function Detail() {
  const github = useProxy(stateGithub);
  return (
    <Paper p={"md"} withBorder>
      <Stack>
        <Text>Project Detail</Text>
        <Paper p="sm" bg={"gray.8"}>
          <Text fz={"xs"}>Repo From</Text>
          <Text>{github.repos.selected?.full_name}</Text>
        </Paper>
      </Stack>
    </Paper>
  );
}
