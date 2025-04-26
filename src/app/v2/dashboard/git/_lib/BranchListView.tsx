/* eslint-disable @typescript-eslint/no-explicit-any */
import V2Router from "@/app/v2/_router";
import V2GitState from "@/app/v2/_state/git";
import {
  Button,
  Divider,
  Flex,
  Group,
  Paper,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useDebouncedCallback, useShallowEffect } from "@mantine/hooks";
import { IconRefresh, IconSearch } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { useProxy } from "valtio/utils";

const BranchListView = () => {
  const gitProxy = useProxy(V2GitState);
  const { repoId } = V2Router.routes.dashboard.git.parse(useSearchParams());

  const flush = useDebouncedCallback(() => {
    if (!repoId) return;
    gitProxy.branch.findMany.load({ repoId });
  }, 300);

  useShallowEffect(() => {
    if (!repoId) return;
    gitProxy.branch.findMany.load({ repoId });
    gitProxy.sha.findMany.branchId = null;
  }, [repoId]);

  return (
    <Paper p={"md"} withBorder>
      <Stack>
        <Text size="2rem">Branches</Text>
        <Flex gap={"md"} align={"center"}>
          <TextInput
            value={gitProxy.branch.findMany.q}
            onChange={(e) => {
              gitProxy.branch.findMany.q = e.target.value;
              flush();
            }}
            placeholder="Search"
            rightSection={<IconSearch />}
          />
          <Button
            loading={gitProxy.branch.sync.loading}
            onClick={() => {
              if (!repoId) return;
              gitProxy.branch.sync.submit(repoId);
            }}
            leftSection={<IconRefresh />}
            variant="light"
          >
            Sync
          </Button>
        </Flex>
        {gitProxy.branch.findMany.loading ? <Loading /> : <ListItemView />}
      </Stack>
    </Paper>
  );
};

const ListItemView = () => {
  const gitProxy = useProxy(V2GitState);
  return (
    <Stack>
      <SimpleGrid
        cols={{
          base: 1,
          sm: 2,
          md: 4,
        }}
      >
        {gitProxy.branch.findMany.data?.map((branch) => (
          <Paper
            bg={
              gitProxy.sha.findMany.branchId === branch.id
                ? "gray.7"
                : undefined
            }
            withBorder
            p={"xs"}
            key={branch.id}
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              if (!branch.id) return;
              gitProxy.sha.findMany.repoId = branch.repoId;
              gitProxy.sha.findMany.branchId = branch.id;
              gitProxy.sha.findMany.load();
            }}
          >
            <Stack>
              <Text>{branch.name}</Text>
            </Stack>
          </Paper>
        ))}
      </SimpleGrid>
      <Divider />
      <ShaView />
    </Stack>
  );
};

const ShaView = () => {
  const gitProxy = useProxy(V2GitState);

  if (!gitProxy.sha.findMany.branchId || !gitProxy.sha.findMany.repoId)
    return null;
  return (
    <Stack>
      <Text size="2rem">Sha</Text>
      <Group>
        <Button
          loading={gitProxy.sha.sync.loading}
          onClick={() => {
            if (!gitProxy.sha.findMany.branchId) return;
            gitProxy.sha.sync.repoId = gitProxy.sha.findMany.repoId;
            gitProxy.sha.sync.branchId = gitProxy.sha.findMany.branchId;
            gitProxy.sha.sync.submit();
          }}
          leftSection={<IconRefresh />}
          variant="light"
        >
          Sync
        </Button>
      </Group>
      {gitProxy.sha.findMany.data?.map((sha) => (
        <Paper key={sha.id} withBorder p={"xs"}>
          <Stack gap={"xs"}>
            <Text fw={"bold"}>{(sha.json as any).sha}</Text>
            <Text fw={"lighter"}>{(sha.json as any).commit.author.name}</Text>
            <Text fw={"lighter"}>{(sha.json as any).commit.message}</Text>
            <Text >{dayjs((sha.json as any).commit.author.date).format("YYYY-MM-DD HH:mm:ss")}</Text>
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
};

const Loading = () => {
  return (
    <Stack>
      <SimpleGrid
        cols={{
          base: 1,
          sm: 2,
          md: 4,
        }}
      >
        {Array.from({ length: 10 }).map((v, k) => (
          <Skeleton key={k} h={50} />
        ))}
      </SimpleGrid>
    </Stack>
  );
};

export default BranchListView;
