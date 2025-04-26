import V2Router from "@/app/v2/_router";
import V2GitState from "@/app/v2/_state/git";
import {
  Container,
  Flex,
  Paper,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  TextInput
} from "@mantine/core";
import { useDebouncedCallback, useShallowEffect } from "@mantine/hooks";
import { Prisma } from "@prisma/client";
import { IconSearch } from "@tabler/icons-react";
import Link from "next/link";
import { useProxy } from "valtio/utils";
import RepoSyncButton from "./RepoSyncButton";

const RepoListView = () => {
  const gitSt = useProxy(V2GitState);
  const flush = useDebouncedCallback(() => {
    gitSt.repo.findMany.load();
  }, 500);

  useShallowEffect(() => {
    gitSt.repo.findMany.load();
  }, []);
  if (!gitSt.repo.findMany.data) {
    return (
      <Container w={"100%"}>
        <Stack>
          {Array.from({ length: 5 }).map((v, k) => (
            <Skeleton key={k} h={40} />
          ))}
        </Stack>
      </Container>
    );
  }
  return (
    <Container w={"100%"}>
      <Stack>
        <Flex gap={"md"} align={"center"}>
          <TextInput
            rightSection={<IconSearch />}
            placeholder="Search"
            value={gitSt.repo.findMany.q}
            onChange={(e) => {
              gitSt.repo.findMany.q = e.target.value;
              flush()
            }}
          />
          <RepoSyncButton />
        </Flex>
        <SimpleGrid
          cols={{
            base: 1,
            sm: 2,
          }}
        >
          {gitSt.repo.findMany.data.map((repo) => (
            <RepoItem key={repo.id} repo={repo} />
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  );
};

const RepoItem = ({
  repo,
}: {
  repo: Prisma.ReposGetPayload<{
    omit: { isActive: true };
    include: { _count: { select: { Branches: true } } };
  }>;
}) => {
  return (
    <Paper
      c={"white"}
      p={"xs"}
      withBorder
      component={Link}
      href={V2Router.routes.dashboard.git.query({
        action: "detail",
        repoId: repo.id,
      })}
    >
      <Stack gap={"xs"}>
        <Text fw={"bold"}>{repo.name}</Text>
      </Stack>
    </Paper>
  );
};


export default RepoListView;
