import V2GitState from "@/app/v2/_state/git";
import {
  ActionIcon,
  Container,
  Flex,
  Group,
  Paper,
  Skeleton,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useDebouncedCallback, useShallowEffect } from "@mantine/hooks";
import { Prisma } from "@prisma/client";
import { IconGitBranch, IconRefresh, IconSearch } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { useProxy } from "valtio/utils";
import RepoSyncButton from "./RepoSyncButton";

const RepoListView = () => {
  const gitSt = useProxy(V2GitState);
  const flush = useDebouncedCallback((q: string) => {
    gitSt.repo.search.q = q;
    gitSt.repo.search.load();
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
            onChange={(e) => flush(e.target.value)}
          />
          <RepoSyncButton />
        </Flex>
        {gitSt.repo.findMany.data.map((repo) => (
          <RepoItem key={repo.id} repo={repo} gitSt={gitSt} />
        ))}
      </Stack>
    </Container>
  );
};

const RepoItem = ({
  repo,
  gitSt,
}: {
  repo: Prisma.ReposGetPayload<{
    omit: { isActive: true };
    include: { _count: { select: { Branches: true } } };
  }>;
  gitSt: typeof V2GitState;
}) => {
  const [loading, setLoading] = useState(false);
  return (
    <Paper p={"xs"} withBorder>
      <Stack gap={"xs"}>
        <Text fw={"bold"}>{repo.name}</Text>
        <Link href={repo.html_url} target="_blank">
          {repo.html_url}
        </Link>
        <Group align={"center"} bg={"dark"} gap={"md"} p={"sm"}>
          <Text>{repo._count.Branches}</Text>
          <IconGitBranch />
          <ActionIcon
            loading={loading}
            variant="subtle"
            onClick={async () => {
              setLoading(true);
              await gitSt.branch.sync.submit(repo.id);
              setLoading(false);
            }}
          >
            <IconRefresh />
          </ActionIcon>
        </Group>
      </Stack>
    </Paper>
  );
};

export default RepoListView;
