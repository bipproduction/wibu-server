"use client";
import {
  ActionIcon,
  Container,
  Paper,
  Skeleton,
  Stack,
  Text
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconChevronLeft } from "@tabler/icons-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useProxy } from "valtio/utils";
import V2Router from "../../_router";
import V2GitState from "../../_state/git";
import BranchListView from "./_lib/BranchListView";
import RepoListView from "./_lib/RepoListView";

const Page = () => {
  const { action } = V2Router.routes.dashboard.git.parse(useSearchParams());

  switch (action) {
    case "no-action":
      return <RepoListView />;
    case "detail":
      return <RepoDetail />;
    default:
      return <RepoListView />;
  }
};

const RepoDetail = () => {
  return (
    <Container w={"100%"}>
      <Stack>
        <ActionIcon
          variant="light"
          component={Link}
          href={V2Router.routes.dashboard.git.query({
            action: "no-action",
          })}
        >
          <IconChevronLeft />
        </ActionIcon>
        <RepoDetailView />
        <BranchListView />
      </Stack>
    </Container>
  );
};

const RepoDetailView = () => {
  const { repoId } = V2Router.routes.dashboard.git.parse(useSearchParams());
  const gitProxy = useProxy(V2GitState);

  useShallowEffect(() => {
    if (!repoId) return;
    gitProxy.repo.find.load(repoId);
  }, [repoId]);

  if (gitProxy.repo.find.loading) {
    return (
      <Stack>
        {Array.from({ length: 5 }).map((v, k) => (
          <Skeleton key={k} h={40} />
        ))}
      </Stack>
    );
  }

  return (
    <Paper p={"md"} withBorder>
      <Stack gap={"xs"}>
        <Text size="2rem">Repository</Text>
        <Text>{gitProxy.repo.find.data?.name}</Text>
        <Text>{gitProxy.repo.find.data?.full_name}</Text>
        <Text>{gitProxy.repo.find.data?.description}</Text>
      </Stack>
    </Paper>
  );
};

export default Page;
